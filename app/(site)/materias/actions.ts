"use server"

import { createClient } from "@/lib/supabase/server"

type SubjectStatus = "pending" | "in-progress" | "completed"

type SubjectProgress = Record<string, SubjectStatus>

type ProgressResult = {
  ok: boolean
  isAuthenticated: boolean
  progress: SubjectProgress
  hasDbData: boolean
  message?: string
}

function isValidStatus(value: unknown): value is SubjectStatus {
  return value === "pending" || value === "in-progress" || value === "completed"
}

function sanitizeProgress(input: unknown): SubjectProgress {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {}
  }

  return Object.entries(input).reduce<SubjectProgress>((acc, [subjectCode, value]) => {
    if (!subjectCode || !isValidStatus(value)) {
      return acc
    }

    acc[subjectCode] = value
    return acc
  }, {})
}

function hasNonPendingProgress(progress: SubjectProgress): boolean {
  return Object.values(progress).some((status) => status !== "pending")
}

async function ensureCurrentUserRow() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return { supabase, user: null as null }
  }

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  )

  return { supabase, user }
}

export async function getSubjectProgressAction(): Promise<ProgressResult> {
  const { supabase, user } = await ensureCurrentUserRow()

  if (!user) {
    return {
      ok: true,
      isAuthenticated: false,
      progress: {},
      hasDbData: false,
    }
  }

  const { data, error } = await supabase
    .from("user_subject_progress")
    .select("progress")
    .eq("user_id", user.id)
    .maybeSingle()

  if (error) {
    return {
      ok: false,
      isAuthenticated: true,
      progress: {},
      hasDbData: false,
      message: "No se pudo cargar el progreso desde la base de datos.",
    }
  }

  const progress = sanitizeProgress(data?.progress)

  return {
    ok: true,
    isAuthenticated: true,
    progress,
    hasDbData: hasNonPendingProgress(progress),
  }
}

export async function upsertSubjectProgressAction(input: SubjectProgress): Promise<ProgressResult> {
  const progress = sanitizeProgress(input)
  const { supabase, user } = await ensureCurrentUserRow()

  if (!user) {
    return {
      ok: false,
      isAuthenticated: false,
      progress: {},
      hasDbData: false,
      message: "No hay sesión activa.",
    }
  }

  const { error } = await supabase.from("user_subject_progress").upsert(
    {
      user_id: user.id,
      progress,
      schema_version: 1,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  )

  if (error) {
    return {
      ok: false,
      isAuthenticated: true,
      progress: {},
      hasDbData: false,
      message: "No se pudo guardar el progreso en la base de datos.",
    }
  }

  return {
    ok: true,
    isAuthenticated: true,
    progress,
    hasDbData: hasNonPendingProgress(progress),
  }
}

export async function clearSubjectProgressAction(): Promise<ProgressResult> {
  return upsertSubjectProgressAction({})
}
