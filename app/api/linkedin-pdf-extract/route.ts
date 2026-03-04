import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const requestSchema = z.object({
  text: z.string().min(1),
  fileName: z.string().optional(),
});

const experienceItemSchema = z.object({
  role: z.string().default(""),
  company: z.string().default(""),
  dateRange: z.string().default(""),
  location: z.string().default(""),
  description: z.string().default(""),
});

const educationItemSchema = z.object({
  institution: z.string().default(""),
  degree: z.string().default(""),
  fieldOfStudy: z.string().default(""),
  dateRange: z.string().default(""),
  description: z.string().default(""),
});

const llmOutputSchema = z.object({
  detectedLanguage: z.enum(["es", "en", "unknown"]).default("unknown"),
  experience: z.array(experienceItemSchema).default([]),
  education: z.array(educationItemSchema).default([]),
  skills: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).optional(),
});

function stripCodeFences(content: string) {
  return content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

const DAILY_REQUEST_LIMIT = 2;

async function logEvent(params: {
  eventType: string;
  userId: string;
  connectorText: string;
  target: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = await createClient();

  await supabase.rpc("append_event", {
    event_type: params.eventType,
    event_user_id: params.userId,
    event_connector_text: params.connectorText,
    event_target: params.target,
    event_target_type: params.targetType ?? null,
    event_target_id: params.targetId ?? null,
    event_metadata: params.metadata ?? {},
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "No hay sesión activa.",
      },
      { status: 401 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "GEMINI_API_KEY no está configurada en el servidor.",
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsedBody = requestSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Payload inválido. Debe incluir text.",
      },
      { status: 400 }
    );
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const ai = new GoogleGenAI({ apiKey });

  const now = new Date();
  const dayStartUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
  const dayEndUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)).toISOString();

  const { count: dailyCount, error: dailyCountError } = await supabase
    .from("linkedin_pdf_parse_requests")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", dayStartUtc)
    .lt("created_at", dayEndUtc)
    .in("status", ["processing", "success", "failed"]);

  if (dailyCountError) {
    return NextResponse.json(
      {
        ok: false,
        message: "No ha sido posible validar el límite diario. Volvé a intentar en otro momento.",
      },
      { status: 500 }
    );
  }

  if ((dailyCount ?? 0) >= DAILY_REQUEST_LIMIT) {
    const { data: blockedRequest } = await supabase
      .from("linkedin_pdf_parse_requests")
      .insert({
        user_id: user.id,
        file_name: parsedBody.data.fileName ?? null,
        model,
        status: "blocked_daily_limit",
        metadata: {
          daily_limit: DAILY_REQUEST_LIMIT,
          current_count: dailyCount,
        },
      })
      .select("id")
      .maybeSingle<{ id: string }>();

    void logEvent({
      eventType: "linkedin_pdf_parse_blocked",
      userId: user.id,
      connectorText: "alcanzó el límite diario de parseo de PDF",
      target: parsedBody.data.fileName ?? "LinkedIn PDF",
      targetType: "professional_profile",
      targetId: blockedRequest?.id,
      metadata: {
        daily_limit: DAILY_REQUEST_LIMIT,
        current_count: dailyCount,
        model,
      },
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Ya alcanzaste el límite de 2 solicitudes por día para procesar PDFs. Volvé a intentar mañana.",
      },
      { status: 429 }
    );
  }

  const { data: requestLog, error: requestLogError } = await supabase
    .from("linkedin_pdf_parse_requests")
    .insert({
      user_id: user.id,
      file_name: parsedBody.data.fileName ?? null,
      model,
      status: "processing",
      metadata: {
        daily_limit: DAILY_REQUEST_LIMIT,
        daily_count_before: dailyCount ?? 0,
      },
    })
    .select("id")
    .single<{ id: string }>();

  if (requestLogError || !requestLog) {
    return NextResponse.json(
      {
        ok: false,
        message: "No ha sido posible registrar la solicitud de parseo. Volvé a intentar en otro momento.",
      },
      { status: 500 }
    );
  }

  void logEvent({
    eventType: "linkedin_pdf_parse_requested",
    userId: user.id,
    connectorText: "solicitó parsear un PDF profesional",
    target: parsedBody.data.fileName ?? "LinkedIn PDF",
    targetType: "professional_profile",
    targetId: requestLog.id,
    metadata: {
      daily_limit: DAILY_REQUEST_LIMIT,
      daily_count_before: dailyCount ?? 0,
      model,
    },
  });

  const prompt = [
    "Sos un parser de CV/LinkedIn en PDF convertido a texto plano.",
    "Devolvé EXCLUSIVAMENTE JSON válido, sin markdown ni texto adicional.",
    "Campos requeridos:",
    "{",
    '  "detectedLanguage": "es" | "en" | "unknown",',
    '  "experience": Array<{ "role": string, "company": string, "dateRange": string, "location": string, "description": string }>,',
    '  "education": Array<{ "institution": string, "degree": string, "fieldOfStudy": string, "dateRange": string, "description": string }>,',
    '  "skills": string[],',
    '  "confidence": number // 0..1 opcional',
    "}",
    "Reglas:",
    "- No inventar datos que no estén en el texto.",
    "- Si no encontrás algo, usar string vacío en campos y arrays vacíos cuando corresponda.",
    "- experience y education siempre deben ser arrays (aunque estén vacíos).",
    "- skills debe ser una lista normalizada, sin duplicados.",
    "- Si por algún motivo no podés formular una respuesta válida, devolvé { detectedLanguage: 'unknown', experience: [], education: [], skills: [], confidence: 0 }",
    "",
    `Archivo: ${parsedBody.data.fileName ?? "unknown.pdf"}`,
    "",
    "Texto a parsear:",
    parsedBody.data.text,
  ].join("\n");

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    const raw = (response.text ?? "").trim();
    const normalized = stripCodeFences(raw);
    const parsedJson = JSON.parse(normalized);
    const parsedOutput = llmOutputSchema.safeParse(parsedJson);

    if (!parsedOutput.success) {
      await supabase
        .from("linkedin_pdf_parse_requests")
        .update({
          status: "failed",
          error_message: "invalid_llm_json",
          metadata: {
            daily_limit: DAILY_REQUEST_LIMIT,
            raw_response_preview: normalized.slice(0, 600),
          },
        })
        .eq("id", requestLog.id)
        .eq("user_id", user.id);

      void logEvent({
        eventType: "linkedin_pdf_parse_failed",
        userId: user.id,
        connectorText: "tuvo un error al parsear un PDF profesional",
        target: parsedBody.data.fileName ?? "LinkedIn PDF",
        targetType: "professional_profile",
        targetId: requestLog.id,
        metadata: {
          reason: "invalid_llm_json",
          model,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          message: "El modelo respondió un JSON con formato inválido.",
          rawResponsePreview: normalized.slice(0, 1200),
        },
        { status: 502 }
      );
    }

    await supabase
      .from("linkedin_pdf_parse_requests")
      .update({
        status: "success",
        error_message: null,
        metadata: {
          daily_limit: DAILY_REQUEST_LIMIT,
          experience_count: parsedOutput.data.experience.length,
          education_count: parsedOutput.data.education.length,
          skills_count: parsedOutput.data.skills.length,
          confidence: parsedOutput.data.confidence ?? null,
        },
      })
      .eq("id", requestLog.id)
      .eq("user_id", user.id);

    return NextResponse.json({
      ok: true,
      model,
      result: parsedOutput.data,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido al invocar Gemini.";
    const normalizedMessage = message.toLowerCase();

    const isRateLimited =
      normalizedMessage.includes("429") ||
      normalizedMessage.includes("rate") ||
      normalizedMessage.includes("quota") ||
      normalizedMessage.includes("resource_exhausted");

    await supabase
      .from("linkedin_pdf_parse_requests")
      .update({
        status: "failed",
        error_message: message,
        metadata: {
          daily_limit: DAILY_REQUEST_LIMIT,
          provider_rate_limited: isRateLimited,
          model,
        },
      })
      .eq("id", requestLog.id)
      .eq("user_id", user.id);

    void logEvent({
      eventType: "linkedin_pdf_parse_failed",
      userId: user.id,
      connectorText: "tuvo un error al parsear un PDF profesional",
      target: parsedBody.data.fileName ?? "LinkedIn PDF",
      targetType: "professional_profile",
      targetId: requestLog.id,
      metadata: {
        provider_rate_limited: isRateLimited,
        message,
        model,
      },
    });

    return NextResponse.json(
      {
        ok: false,
        message: isRateLimited
          ? "Se alcanzó el límite de solicitudes del proveedor. Volvé a intentar en otro momento."
          : "No ha sido posible leer el documento subido. Volvé a intentar en otro momento.",
      },
      { status: isRateLimited ? 429 : 500 }
    );
  }
}
