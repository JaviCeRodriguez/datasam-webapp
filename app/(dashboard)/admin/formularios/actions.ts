"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canAccessAdmin, getUserRoleNamesCached } from "@/lib/supabase/roles"
import { createClient } from "@/lib/supabase/server"
import type { FormField, FormListItem, FormResponse, FormResponseAccess, FormSchema, FormStatus } from "@/lib/form-types"

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

type FormResponseRow = {
  id: string
  form_id: string
  user_id: string | null
  response: Record<string, unknown>
  created_at: string
  submitted_at: string
}

type UserRow = {
  id: string
  email: string
  name: string | null
  surname: string | null
}

const formFieldSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["text", "textarea", "select", "multiselect", "checkbox", "multicheckbox"]),
  label: z.string().min(1),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  validation: z
    .object({
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      pattern: z.string().optional(),
    })
    .optional(),
})

const upsertFormSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().max(5000).nullable().optional(),
  fields: z.array(formFieldSchema),
  status: z.enum(["draft", "published", "closed"]),
  responseAccess: z.enum(["anonymous", "authenticated"]),
})

function mapFormRow(row: FormRow, responsesCount = 0): FormListItem {
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
    responsesCount,
  }
}

function extractEmailFromResponse(response: Record<string, unknown>): string | null {
  const directEmail = response.email
  if (typeof directEmail === "string" && directEmail.trim().length > 0) {
    return directEmail
  }

  const normalizedKey = Object.keys(response).find((key) => key.toLowerCase().includes("email"))
  if (!normalizedKey) {
    return null
  }

  const value = response[normalizedKey]
  return typeof value === "string" && value.trim().length > 0 ? value : null
}

function extractNameFromResponse(response: Record<string, unknown>): string | null {
  const directName = response.nombre
  if (typeof directName === "string" && directName.trim().length > 0) {
    return directName
  }

  const nameKey = Object.keys(response).find((key) => {
    const normalized = key.toLowerCase()
    return normalized.includes("nombre") || normalized.includes("name")
  })

  if (!nameKey) {
    return null
  }

  const value = response[nameKey]
  return typeof value === "string" && value.trim().length > 0 ? value : null
}

async function getAdminContext() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false as const, message: "No hay sesión activa." }
  }

  const roleNames = await getUserRoleNamesCached(user.id)
  if (!canAccessAdmin(roleNames)) {
    return { ok: false as const, message: "No tenés permisos para administrar formularios." }
  }

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  )

  return { ok: true as const, supabase, user }
}

export async function listAdminFormsAction(): Promise<ActionResult<FormListItem[]>> {
  const context = await getAdminContext()
  if (!context.ok) {
    return { ok: false, message: context.message }
  }

  const { supabase } = context
  const { data: forms, error } = await supabase
    .from("forms")
    .select("id, title, description, fields, created_by, created_at, updated_at, status, response_access, published_at")
    .order("updated_at", { ascending: false })

  if (error) {
    return { ok: false, message: "No se pudieron cargar los formularios." }
  }

  const formRows = (forms ?? []) as FormRow[]
  const formIds = formRows.map((form) => form.id)

  const responseCountMap = new Map<string, number>()
  if (formIds.length > 0) {
    const { data: responsesData } = await supabase.from("form_responses").select("form_id").in("form_id", formIds)

    for (const row of responsesData ?? []) {
      const current = responseCountMap.get(row.form_id) ?? 0
      responseCountMap.set(row.form_id, current + 1)
    }
  }

  const mappedForms = formRows.map((row) => mapFormRow(row, responseCountMap.get(row.id) ?? 0))

  return { ok: true, data: mappedForms }
}

export async function getAdminFormByIdAction(formId: string): Promise<ActionResult<FormSchema>> {
  const context = await getAdminContext()
  if (!context.ok) {
    return { ok: false, message: context.message }
  }

  const { supabase } = context
  const { data, error } = await supabase
    .from("forms")
    .select("id, title, description, fields, created_by, created_at, updated_at, status, response_access, published_at")
    .eq("id", formId)
    .maybeSingle()

  if (error || !data) {
    return { ok: false, message: "Formulario no encontrado." }
  }

  return { ok: true, data: mapFormRow(data as FormRow, 0) }
}

export async function createFormAction(input: unknown): Promise<ActionResult<FormSchema>> {
  const parsed = upsertFormSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, message: "Los datos del formulario son inválidos." }
  }

  const context = await getAdminContext()
  if (!context.ok) {
    return { ok: false, message: context.message }
  }

  const { supabase, user } = context
  const now = new Date().toISOString()
  const status = parsed.data.status

  const { data, error } = await supabase
    .from("forms")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description || null,
      fields: parsed.data.fields,
      status,
      response_access: parsed.data.responseAccess,
      published_at: status === "published" ? now : null,
      created_by: user.id,
      updated_at: now,
    })
    .select("id, title, description, fields, created_by, created_at, updated_at, status, response_access, published_at")
    .single()

  if (error || !data) {
    return { ok: false, message: "No se pudo crear el formulario." }
  }

  revalidatePath("/admin/formularios")
  revalidatePath(`/admin/formularios/${data.id}`)
  revalidatePath(`/formularios/${data.id}`)

  return { ok: true, data: mapFormRow(data as FormRow) }
}

function getPublishedAt(nextStatus: FormStatus, currentPublishedAt: string | null): string | null {
  if (nextStatus === "published") {
    return currentPublishedAt || new Date().toISOString()
  }
  if (nextStatus === "draft") {
    return null
  }
  return currentPublishedAt || null
}

export async function updateFormAction(formId: string, input: unknown): Promise<ActionResult<FormSchema>> {
  const parsed = upsertFormSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, message: "Los datos del formulario son inválidos." }
  }

  const context = await getAdminContext()
  if (!context.ok) {
    return { ok: false, message: context.message }
  }

  const { supabase } = context
  const { data: currentForm } = await supabase.from("forms").select("published_at, status").eq("id", formId).maybeSingle()

  const nextStatus = parsed.data.status
  const publishedAt = getPublishedAt(nextStatus, currentForm?.published_at || null)

  const { data, error } = await supabase
    .from("forms")
    .update({
      title: parsed.data.title,
      description: parsed.data.description || null,
      fields: parsed.data.fields,
      status: nextStatus,
      response_access: parsed.data.responseAccess,
      published_at: publishedAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formId)
    .select("id, title, description, fields, created_by, created_at, updated_at, status, response_access, published_at")
    .single()

  if (error || !data) {
    return { ok: false, message: "No se pudo actualizar el formulario." }
  }

  revalidatePath("/admin/formularios")
  revalidatePath(`/admin/formularios/${formId}`)
  revalidatePath(`/admin/formularios/${formId}/respuestas`)
  revalidatePath(`/formularios/${formId}`)

  return { ok: true, data: mapFormRow(data as FormRow) }
}

export async function getFormResponsesAction(formId: string): Promise<ActionResult<FormResponse[]>> {
  const context = await getAdminContext()
  if (!context.ok) {
    return { ok: false, message: context.message }
  }

  const { supabase } = context

  const { data: responsesData, error: responsesError } = await supabase
    .from("form_responses")
    .select("id, form_id, user_id, response, created_at, submitted_at")
    .eq("form_id", formId)
    .order("submitted_at", { ascending: false })

  if (responsesError) {
    return { ok: false, message: "No se pudieron cargar las respuestas." }
  }

  const responseRows = (responsesData ?? []) as FormResponseRow[]
  const userIds = Array.from(new Set(responseRows.map((row) => row.user_id).filter((userId): userId is string => !!userId)))

  const usersById = new Map<string, UserRow>()
  if (userIds.length > 0) {
    const { data: usersData } = await supabase.from("users").select("id, email, name, surname").in("id", userIds)

    for (const user of usersData ?? []) {
      usersById.set(user.id, user as UserRow)
    }
  }

  const mappedResponses: FormResponse[] = responseRows.map((row) => {
    const linkedUser = row.user_id ? usersById.get(row.user_id) : null
    const fallbackEmail = extractEmailFromResponse(row.response)
    const fallbackName = extractNameFromResponse(row.response)

    return {
      id: row.id,
      formId: row.form_id,
      responses: row.response,
      submittedAt: row.submitted_at,
      createdAt: row.created_at,
      userId: row.user_id,
      userEmail: linkedUser?.email ?? fallbackEmail,
      userName: linkedUser ? [linkedUser.name, linkedUser.surname].filter(Boolean).join(" ") || null : fallbackName,
    }
  })

  return { ok: true, data: mappedResponses }
}
