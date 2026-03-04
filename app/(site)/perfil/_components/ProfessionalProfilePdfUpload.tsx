"use client";

import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import pdfToText from "react-pdftotext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type ExperienceItem = {
  role: string;
  company: string;
  dateRange: string;
  location: string;
  description: string;
};

type EducationItem = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  dateRange: string;
  description: string;
};

type ProfessionalProfileFormValues = {
  source: string;
  fileName: string;
  language: "es" | "en" | "";
  experience: ExperienceItem[];
  education: EducationItem[];
  skillsText: string;
  extractedText: string;
};

type ProfessionalProfileInitial = {
  source: string;
  fileName: string;
  language: "es" | "en" | null;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  extractedText: string;
};

type LlmParsingResponse = {
  ok: boolean;
  message?: string;
  model?: string;
  status?: number;
  result?: {
    detectedLanguage: "es" | "en" | "unknown";
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: string[];
    confidence?: number;
  };
};

const PREVIEW_LIMIT = 1400;

const emptyExperienceItem = (): ExperienceItem => ({
  role: "",
  company: "",
  dateRange: "",
  location: "",
  description: "",
});

const emptyEducationItem = (): EducationItem => ({
  institution: "",
  degree: "",
  fieldOfStudy: "",
  dateRange: "",
  description: "",
});

async function extractText(file: File) {
  return pdfToText(file);
}

async function parseWithLlm(text: string, fileName: string): Promise<LlmParsingResponse> {
  const response = await fetch("/api/linkedin-pdf-extract", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, fileName }),
  });

  const payload = (await response.json()) as LlmParsingResponse;
  return {
    ...payload,
    status: response.status,
  };
}

async function saveProfessionalProfile(payload: {
  source: string;
  fileName: string | null;
  language: "es" | "en" | null;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  extractedText: string;
}) {
  const response = await fetch("/api/professional-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { ok: boolean; message?: string };

  return {
    ok: response.ok && data.ok,
    message: data.message,
  };
}

function normalizeArray<T>(value: T[]) {
  return value.filter(Boolean);
}

function summarize(section: string) {
  if (section.length <= PREVIEW_LIMIT) {
    return section;
  }

  return `${section.slice(0, PREVIEW_LIMIT)}...`;
}

function parseSkillsText(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    )
  );
}

type ProfessionalProfilePdfUploadProps = {
  initialProfile: ProfessionalProfileInitial;
};

export function ProfessionalProfilePdfUpload({ initialProfile }: Readonly<ProfessionalProfilePdfUploadProps>) {
  const [isParsing, setIsParsing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfessionalProfileFormValues>({
    defaultValues: {
      source: initialProfile.source || "linkedin_pdf_llm",
      fileName: initialProfile.fileName || "",
      language: initialProfile.language ?? "",
      experience: normalizeArray(initialProfile.experience),
      education: normalizeArray(initialProfile.education),
      skillsText: normalizeArray(initialProfile.skills).join(", "),
      extractedText: initialProfile.extractedText || "",
    },
  });

  const experienceArray = useFieldArray({ control: form.control, name: "experience" });
  const educationArray = useFieldArray({ control: form.control, name: "education" });

  const language = form.watch("language");
  const skillsText = form.watch("skillsText");
  const parsedSkills = useMemo(() => parseSkillsText(skillsText), [skillsText]);
  const extractedText = form.watch("extractedText");
  const currentFileName = form.watch("fileName");

  let fileStatusMessage = "No hay archivo cargado. Podés completar el formulario manualmente o subir un PDF.";
  if (isParsing) {
    fileStatusMessage = "Procesando PDF...";
  } else if (currentFileName) {
    fileStatusMessage = `Archivo cargado: ${currentFileName}`;
  }

  const handlePdfChange = async (file: File | null) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Subí un archivo PDF válido.");
      return;
    }

    setIsParsing(true);

    try {
      const text = await extractText(file);
      const llmResponse = await parseWithLlm(text, file.name);

      if (!llmResponse.ok || !llmResponse.result) {
        const failMessage = llmResponse.status === 429
          ? "No ha sido posible leer el documento subido por límite de solicitudes. Volvé a intentar en otro momento."
          : "No ha sido posible leer el documento subido. Volvé a intentar en otro momento.";

        toast.error(failMessage);
        return;
      }

      form.setValue("fileName", file.name, { shouldDirty: true });
      form.setValue(
        "language",
        llmResponse.result.detectedLanguage === "unknown" ? "" : llmResponse.result.detectedLanguage,
        { shouldDirty: true }
      );
      form.setValue("experience", normalizeArray(llmResponse.result.experience), { shouldDirty: true });
      form.setValue("education", normalizeArray(llmResponse.result.education), { shouldDirty: true });
      form.setValue("skillsText", normalizeArray(llmResponse.result.skills).join(", "), { shouldDirty: true });
      form.setValue("extractedText", text, { shouldDirty: true });

      toast.success("PDF procesado con Gemini.");
    } catch (error) {
      console.error("Error procesando PDF:", error);
      toast.error("No ha sido posible leer el documento subido. Volvé a intentar en otro momento.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleSave = form.handleSubmit(async (values) => {
    setIsSaving(true);

    try {
      const payload = {
        source: values.source,
        fileName: values.fileName || null,
        language: values.language || null,
        experience: normalizeArray(values.experience),
        education: normalizeArray(values.education),
        skills: parseSkillsText(values.skillsText),
        extractedText: values.extractedText,
      };

      const result = await saveProfessionalProfile(payload);

      if (!result.ok) {
        toast.error(result.message ?? "No se pudo guardar el perfil profesional.");
        return;
      }

      toast.success("Perfil profesional guardado correctamente.");
    } catch (error) {
      console.error("No se pudo guardar el perfil profesional:", error);
      toast.error("No se pudo guardar el perfil profesional.");
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil profesional</CardTitle>
        <CardDescription>
          Si existe información guardada se completa automáticamente. Si no, podés subir un PDF o completar el formulario manualmente.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin-pdf">Archivo PDF</Label>
          <Input
            id="linkedin-pdf"
            type="file"
            accept="application/pdf"
            disabled={isParsing}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              void handlePdfChange(file);
            }}
          />
          <p className="text-xs text-muted-foreground">{fileStatusMessage}</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {(language || parsedSkills.length > 0 || experienceArray.fields.length > 0 || educationArray.fields.length > 0) ? (
            <div className="flex flex-wrap gap-2">
              {language ? <Badge variant="secondary">Idioma detectado: {language === "es" ? "Español" : "English"}</Badge> : null}
              <Badge variant="outline">Skills: {parsedSkills.length}</Badge>
              <Badge variant="outline">Experiencias: {experienceArray.fields.length}</Badge>
              <Badge variant="outline">Educación: {educationArray.fields.length}</Badge>
            </div>
          ) : null}

          <div className="rounded-md border p-3 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Experiencia</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => experienceArray.append(emptyExperienceItem())}
              >
                Agregar experiencia
              </Button>
            </div>

            {experienceArray.fields.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin experiencias cargadas.</p>
            ) : (
              <div className="space-y-3">
                {experienceArray.fields.map((field, index) => (
                  <div key={field.id} className="rounded-md border p-2 space-y-2">
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Rol</Label>
                        <Input {...form.register(`experience.${index}.role`)} />
                      </div>
                      <div className="space-y-1">
                        <Label>Empresa</Label>
                        <Input {...form.register(`experience.${index}.company`)} />
                      </div>
                      <div className="space-y-1">
                        <Label>Período</Label>
                        <Input {...form.register(`experience.${index}.dateRange`)} />
                      </div>
                      <div className="space-y-1">
                        <Label>Ubicación</Label>
                        <Input {...form.register(`experience.${index}.location`)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Descripción</Label>
                      <Textarea rows={4} {...form.register(`experience.${index}.description`)} />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => experienceArray.remove(index)}
                    >
                      Quitar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-md border p-3 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Educación</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => educationArray.append(emptyEducationItem())}
              >
                Agregar educación
              </Button>
            </div>

            {educationArray.fields.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin educación cargada.</p>
            ) : (
              <div className="space-y-3">
                {educationArray.fields.map((field, index) => (
                  <div key={field.id} className="rounded-md border p-2 space-y-2">
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Institución</Label>
                        <Input {...form.register(`education.${index}.institution`)} />
                      </div>
                      <div className="space-y-1">
                        <Label>Título</Label>
                        <Input {...form.register(`education.${index}.degree`)} />
                      </div>
                      <div className="space-y-1">
                        <Label>Área de estudio</Label>
                        <Input {...form.register(`education.${index}.fieldOfStudy`)} />
                      </div>
                      <div className="space-y-1">
                        <Label>Período</Label>
                        <Input {...form.register(`education.${index}.dateRange`)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Descripción</Label>
                      <Textarea rows={3} {...form.register(`education.${index}.description`)} />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => educationArray.remove(index)}
                    >
                      Quitar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-md border p-3 space-y-1">
            <Label>Skills (separadas por coma)</Label>
            <Textarea rows={3} placeholder="React, TypeScript, Next.js" {...form.register("skillsText")} />
          </div>

          {extractedText ? (
            <div className="rounded-md border p-3 space-y-1">
              <Label>Vista previa de texto extraído</Label>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summarize(extractedText)}</p>
            </div>
          ) : null}

          <Button type="submit" disabled={isSaving || isParsing}>
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
