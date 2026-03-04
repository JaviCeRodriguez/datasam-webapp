import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

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

const savePayloadSchema = z.object({
  source: z.string().default("linkedin_pdf_llm"),
  fileName: z.string().nullable().optional(),
  language: z.enum(["es", "en"]).nullable().optional(),
  experience: z.array(experienceItemSchema).default([]),
  education: z.array(educationItemSchema).default([]),
  skills: z.array(z.string()).default([]),
  extractedText: z.string().nullable().optional(),
  parserModel: z.string().nullable().optional(),
  parserConfidence: z.number().nullable().optional(),
});

type ProfessionalProfileRow = {
  source: string | null;
  file_name: string | null;
  language: string | null;
  experience: unknown;
  education: unknown;
  skills: unknown;
  extracted_text: string | null;
  parser_model: string | null;
  parser_confidence: number | null;
  updated_at: string | null;
};

function asArray<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  return fallback;
}

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function GET() {
  const { supabase, user } = await getAuthenticatedContext();

  if (!user) {
    return NextResponse.json({ ok: false, message: "No hay sesión activa." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("professional_profiles")
    .select("source, file_name, language, experience, education, skills, extracted_text, parser_model, parser_confidence, updated_at")
    .eq("user_id", user.id)
    .maybeSingle<ProfessionalProfileRow>();

  if (error) {
    return NextResponse.json({ ok: false, message: "No se pudo recuperar el perfil profesional." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ ok: true, profile: null });
  }

  return NextResponse.json({
    ok: true,
    profile: {
      source: data.source ?? "linkedin_pdf_llm",
      fileName: data.file_name,
      language: data.language === "es" || data.language === "en" ? data.language : null,
      experience: asArray(data.experience, []),
      education: asArray(data.education, []),
      skills: asArray<string>(data.skills, []),
      extractedText: data.extracted_text,
      parserModel: data.parser_model,
      parserConfidence: data.parser_confidence,
      updatedAt: data.updated_at,
    },
  });
}

export async function POST(request: Request) {
  const { supabase, user } = await getAuthenticatedContext();

  if (!user) {
    return NextResponse.json({ ok: false, message: "No hay sesión activa." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = savePayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Payload inválido para guardar perfil profesional." }, { status: 400 });
  }

  const payload = parsed.data;

  const { error } = await supabase.from("professional_profiles").upsert(
    {
      user_id: user.id,
      source: payload.source,
      file_name: payload.fileName ?? null,
      language: payload.language ?? null,
      experience: payload.experience,
      education: payload.education,
      skills: payload.skills,
      extracted_text: payload.extractedText ?? null,
      parser_model: payload.parserModel ?? null,
      parser_confidence: payload.parserConfidence ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return NextResponse.json({ ok: false, message: "No se pudo guardar el perfil profesional." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Perfil profesional guardado." });
}
