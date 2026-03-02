"use server"

import { createClient } from "@/lib/supabase/server"
import { getIdentityProviderSummary } from "@/lib/supabase/identity-providers"

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

  const providerSummary = getIdentityProviderSummary(user)

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      linked_providers: providerSummary.linkedProviders,
      primary_provider: providerSummary.primaryProvider,
      identities_count: providerSummary.identitiesCount,
      identities_synced_at: new Date().toISOString(),
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

  const { data: previousRow } = await supabase
    .from("user_subject_progress")
    .select("progress")
    .eq("user_id", user.id)
    .maybeSingle<{ progress: SubjectProgress | null }>()

  const previousProgress = sanitizeProgress(previousRow?.progress)

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

  const changedSubjectCodes = new Set<string>([
    ...Object.keys(previousProgress),
    ...Object.keys(progress),
  ])

  const changedStatuses = Array.from(changedSubjectCodes)
    .map((subjectCode) => {
      const beforeStatus = previousProgress[subjectCode] ?? "pending"
      const afterStatus = progress[subjectCode] ?? "pending"

      if (beforeStatus === afterStatus) {
        return null
      }

      return {
        subjectCode,
        beforeStatus,
        afterStatus,
      }
    })
    .filter((entry): entry is { subjectCode: string; beforeStatus: SubjectStatus; afterStatus: SubjectStatus } => entry !== null)

  if (changedStatuses.length > 0) {
    const { data: subjectsData } = await supabase
      .from("subjects")
      .select("code, name")
      .in(
        "code",
        changedStatuses.map((entry) => entry.subjectCode)
      )

    const subjectNameMap = new Map<string, string>()
    for (const subject of subjectsData ?? []) {
      subjectNameMap.set(subject.code, subject.name)
    }

    for (const entry of changedStatuses) {
      let connectorText = "actualizó progreso en"

      if (entry.afterStatus === "completed") {
        connectorText = "completó"
      } else if (entry.beforeStatus === "pending" && entry.afterStatus === "in-progress") {
        connectorText = "se inscribió en"
      } else if (entry.afterStatus === "pending") {
        connectorText = "reinició"
      }

      await supabase.rpc("append_event", {
        event_type: "subject_progress",
        event_user_id: user.id,
        event_connector_text: connectorText,
        event_target: subjectNameMap.get(entry.subjectCode) ?? entry.subjectCode,
        event_target_type: "subject",
        event_target_id: entry.subjectCode,
        event_metadata: {
          subject_code: entry.subjectCode,
          status_before: entry.beforeStatus,
          status_after: entry.afterStatus,
        },
      })
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
