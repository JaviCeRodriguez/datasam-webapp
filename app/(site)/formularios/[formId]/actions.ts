"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import type { FormField, FormResponseAccess, FormSchema, FormStatus } from "@/lib/form-types"

type ActionResult<T> = {
  ok: boolean
  message?: string
  data?: T
}

type FormRow = {
  id: string
  title: string
  description: string | null
  fields: FormField[]
  created_by: string | null
  created_at: string
  updated_at: string
  status: FormStatus
  response_access: FormResponseAccess
  published_at: string | null
}

const submitResponseSchema = z.record(z.union([z.string(), z.number(), z.boolean(), z.array(z.string()), z.null()]))

function mapFormRow(row: FormRow): FormSchema {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    fields: row.fields ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by,
    status: row.status,
    responseAccess: row.response_access,
    publishedAt: row.published_at,
  }
}

export async function getPublicFormByIdAction(formId: string): Promise<ActionResult<FormSchema>> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("forms")
    .select("id, title, description, fields, created_by, created_at, updated_at, status, response_access, published_at")
    .eq("id", formId)
    .maybeSingle()

  if (error || !data) {
    return { ok: false, message: "Formulario no encontrado." }
  }

  const form = mapFormRow(data as FormRow)

  if (form.status !== "published") {
    return { ok: false, message: "Este formulario no está publicado." }
  }

  if (form.responseAccess === "authenticated" && !user) {
    return { ok: false, message: "Necesitás iniciar sesión para responder este formulario." }
  }

  return { ok: true, data: form }
}

export async function submitPublicFormResponseAction(
  formId: string,
  response: unknown
): Promise<ActionResult<{ responseId: string }>> {
  const parsedResponse = submitResponseSchema.safeParse(response)
  if (!parsedResponse.success) {
    return { ok: false, message: "La respuesta enviada es inválida." }
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: formData, error: formError } = await supabase
    .from("forms")
    .select("id, status, response_access")
    .eq("id", formId)
    .maybeSingle()

  if (formError || !formData) {
    return { ok: false, message: "Formulario no encontrado." }
  }

  if (formData.status !== "published") {
    return { ok: false, message: "Este formulario ya no acepta respuestas." }
  }

  if (formData.response_access === "authenticated" && !user) {
    return { ok: false, message: "Necesitás iniciar sesión para responder este formulario." }
  }

  const { data, error } = await supabase
    .from("form_responses")
    .insert({
      form_id: formId,
      user_id: user?.id ?? null,
      response: parsedResponse.data,
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single()

  if (error || !data) {
    return { ok: false, message: "No se pudo enviar la respuesta. Intentá nuevamente." }
  }

  revalidatePath(`/admin/formularios/${formId}/respuestas`)

  return { ok: true, data: { responseId: data.id } }
}
