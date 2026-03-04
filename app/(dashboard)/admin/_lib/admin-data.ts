import "server-only"

import { createClient } from "@/lib/supabase/server"
import { getIdentityProviderSummary } from "@/lib/supabase/identity-providers"
import type {
  AdminActivityResult,
  AdminStats,
  AdminUsersResult,
  ProgressByYearDatum,
  RecentActivityItem,
} from "./admin-types"

type SubjectStatus = "pending" | "in-progress" | "completed"

type ProgressMap = Record<string, SubjectStatus>

type SubjectRow = {
  code: string
  name: string
  academic_year: number
}

type ActiveStudentRow = {
  user_id: string
  updated_at: string
  users?: Array<{
    email?: string | null
  }> | null
}

type EventRow = {
  type: string
  user_id: string | null
  user_full_name: string | null
  connector_text: string
  target: string | null
  created_at: string
  metadata: Record<string, unknown> | null
}

type RecentEventRow = {
  id: string
  type: string
  user_id: string | null
  user_full_name: string | null
  connector_text: string
  target: string | null
  created_at: string
}

type ActivityEventRow = {
  id: string
  type: string
  user_id: string | null
  user_full_name: string | null
  connector_text: string
  target: string | null
  created_at: string
}

type UserRow = {
  id: string
  email: string
  name: string | null
  surname: string | null
  created_at: string
  linked_providers: string[] | null
  primary_provider: string | null
}

const UNSAM_EMAIL_PATTERN = /@(?:[a-z0-9-]+\.)*unsam\.edu\.ar$/i
const CURRENT_YEAR = new Date().getUTCFullYear()
const ADMIN_ACTIVITY_PAGE_SIZE = 25

function isUnsamEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false
  }

  return UNSAM_EMAIL_PATTERN.test(email)
}

function parseProgress(input: unknown): ProgressMap {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {}
  }

  return Object.entries(input).reduce<ProgressMap>((acc, [subjectCode, status]) => {
    if (status === "pending" || status === "in-progress" || status === "completed") {
      acc[subjectCode] = status
    }

    return acc
  }, {})
}

function getMonthRange(offsetMonths = 0) {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() + offsetMonths

  const start = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0))
  const end = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0, 0))

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
  }
}

function getCalendarYearRange(year = CURRENT_YEAR) {
  const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0))
  const end = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0))

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
  }
}

function computeRate(numerator: number, denominator: number): number | null {
  if (denominator <= 0) {
    return null
  }

  return (numerator / denominator) * 100
}

function computeGrowthPercent(currentCount: number, previousCount: number): number | null {
  if (previousCount <= 0) {
    return currentCount > 0 ? 100 : 0
  }

  return ((currentCount - previousCount) / previousCount) * 100
}

function getRelativeTimeLabel(dateIso: string): string {
  const eventDate = new Date(dateIso)
  const now = new Date()
  const diffMs = eventDate.getTime() - now.getTime()
  const diffSeconds = Math.round(diffMs / 1000)

  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" })
  const absSeconds = Math.abs(diffSeconds)

  if (absSeconds < 60) {
    return rtf.format(diffSeconds, "second")
  }

  const diffMinutes = Math.round(diffSeconds / 60)
  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, "minute")
  }

  const diffHours = Math.round(diffMinutes / 60)
  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, "hour")
  }

  const diffDays = Math.round(diffHours / 24)
  if (Math.abs(diffDays) < 30) {
    return rtf.format(diffDays, "day")
  }

  const diffMonths = Math.round(diffDays / 30)
  if (Math.abs(diffMonths) < 12) {
    return rtf.format(diffMonths, "month")
  }

  const diffYears = Math.round(diffMonths / 12)
  return rtf.format(diffYears, "year")
}

function getEventTypeLabel(type: string): string {
  if (type === "subject_progress") {
    return "Progreso"
  }

  if (type === "user_registered") {
    return "Registro"
  }

  if (type === "account_linked" || type === "account_unlinked") {
    return "Cuenta"
  }

  if (type === "survey_created" || type === "survey_answered") {
    return "Encuesta"
  }

  return "Actividad"
}

function toDisplayName(row: Pick<UserRow, "name" | "surname" | "email">): string {
  const fullName = `${row.name ?? ""} ${row.surname ?? ""}`.trim()
  return fullName || row.email
}

async function getSubjectMap() {
  const supabase = await createClient()
  const { data } = await supabase.from("subjects").select("code, name, academic_year")

  const subjects = (data ?? []) as SubjectRow[]
  const map = new Map<string, SubjectRow>()

  for (const subject of subjects) {
    map.set(subject.code, subject)
  }

  return {
    subjects,
    subjectMap: map,
  }
}

async function getCurrentAndPreviousMonthActiveStudents() {
  const supabase = await createClient()
  const currentMonth = getMonthRange(0)
  const previousMonth = getMonthRange(-1)

  const [{ data: currentRows }, { data: previousRows }] = await Promise.all([
    supabase
      .from("user_subject_progress")
      .select("user_id, updated_at, users!inner(email)")
      .gte("updated_at", currentMonth.startIso)
      .lt("updated_at", currentMonth.endIso),
    supabase
      .from("user_subject_progress")
      .select("user_id, updated_at, users!inner(email)")
      .gte("updated_at", previousMonth.startIso)
      .lt("updated_at", previousMonth.endIso),
  ])

  const currentSet = new Set<string>()
  for (const row of ((currentRows ?? []) as ActiveStudentRow[])) {
    if (isUnsamEmail(row.users?.[0]?.email)) {
      currentSet.add(row.user_id)
    }
  }

  const previousSet = new Set<string>()
  for (const row of ((previousRows ?? []) as ActiveStudentRow[])) {
    if (isUnsamEmail(row.users?.[0]?.email)) {
      previousSet.add(row.user_id)
    }
  }

  return {
    currentCount: currentSet.size,
    previousCount: previousSet.size,
  }
}

async function getAnnualCalendarApprovalRate(year = CURRENT_YEAR): Promise<number | null> {
  const supabase = await createClient()
  const range = getCalendarYearRange(year)

  const { data } = await supabase
    .from("events")
    .select("user_id, metadata")
    .eq("type", "subject_progress")
    .gte("created_at", range.startIso)
    .lt("created_at", range.endIso)

  const attempted = new Set<string>()
  const approved = new Set<string>()

  for (const event of ((data ?? []) as Pick<EventRow, "user_id" | "metadata">[])) {
    const userId = event.user_id
    const metadata = event.metadata ?? {}
    const subjectCode = typeof metadata.subject_code === "string" ? metadata.subject_code : null
    const beforeStatus = metadata.status_before
    const afterStatus = metadata.status_after

    if (!userId || !subjectCode) {
      continue
    }

    const key = `${userId}:${subjectCode}`

    if (beforeStatus !== "pending" || afterStatus !== "pending") {
      attempted.add(key)
    }

    if (afterStatus === "completed") {
      approved.add(key)
    }
  }

  return computeRate(approved.size, attempted.size)
}

async function getAcademicApprovalRateAndChartData() {
  const supabase = await createClient()
  const [{ subjects, subjectMap }, { data: progressRows }] = await Promise.all([
    getSubjectMap(),
    supabase.from("user_subject_progress").select("progress"),
  ])

  const attemptedByYear = new Map<number, number>()
  const approvedByYear = new Map<number, number>()

  let totalAttempted = 0
  let totalApproved = 0

  for (const progressRow of (progressRows ?? [])) {
    const progress = parseProgress(progressRow.progress)

    for (const [subjectCode, status] of Object.entries(progress)) {
      if (status === "pending") {
        continue
      }

      const subject = subjectMap.get(subjectCode)
      if (!subject) {
        continue
      }

      const currentAttempted = attemptedByYear.get(subject.academic_year) ?? 0
      attemptedByYear.set(subject.academic_year, currentAttempted + 1)
      totalAttempted += 1

      if (status === "completed") {
        const currentApproved = approvedByYear.get(subject.academic_year) ?? 0
        approvedByYear.set(subject.academic_year, currentApproved + 1)
        totalApproved += 1
      }
    }
  }

  const years = Array.from(new Set(subjects.map((subject) => subject.academic_year))).sort((a, b) => a - b)
  const chartData: ProgressByYearDatum[] = years.map((academicYear) => {
    const approvedCount = approvedByYear.get(academicYear) ?? 0
    const attemptedCount = attemptedByYear.get(academicYear) ?? 0

    return {
      yearLabel: `${academicYear}° Año`,
      approvedCount,
      attemptedCount,
      approvalRate: computeRate(approvedCount, attemptedCount) ?? 0,
    }
  })

  return {
    academicRate: computeRate(totalApproved, totalAttempted),
    chartData,
  }
}

export async function getAdminDashboardData() {
  const supabase = await createClient()

  const [activeStudentsData, subjectsCountResult, calendarRate, academicData, recentEventsResult] = await Promise.all([
    getCurrentAndPreviousMonthActiveStudents(),
    supabase.from("subjects").select("code", { count: "exact", head: true }),
    getAnnualCalendarApprovalRate(CURRENT_YEAR),
    getAcademicApprovalRateAndChartData(),
    supabase
      .from("events")
      .select("id, type, user_id, user_full_name, connector_text, target, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
  ])

  const stats: AdminStats = {
    activeStudents: activeStudentsData.currentCount,
    activeGrowthPercent: computeGrowthPercent(activeStudentsData.currentCount, activeStudentsData.previousCount),
    availableSubjects: subjectsCountResult.count ?? 0,
    annualApprovalCalendarRate: calendarRate,
    annualApprovalAcademicRate: academicData.academicRate,
    calendarYear: CURRENT_YEAR,
  }

  const recentActivity: RecentActivityItem[] = ((recentEventsResult.data ?? []) as RecentEventRow[]).map((event) => ({
    id: `${event.type}-${event.created_at}-${event.user_id ?? "anon"}`,
    user: event.user_full_name || "Usuario",
    connectorText: event.connector_text,
    target: event.target ?? "-",
    timeLabel: getRelativeTimeLabel(event.created_at),
    type: getEventTypeLabel(event.type),
  }))

  return {
    stats,
    progressByYear: academicData.chartData,
    recentActivity,
  }
}

export async function getAdminUsers(searchTerm: string): Promise<AdminUsersResult> {
  const supabase = await createClient()
  const normalizedSearch = searchTerm.trim()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (authUser?.email) {
    const summary = getIdentityProviderSummary(authUser)

    await supabase.from("users").upsert(
      {
        id: authUser.id,
        email: authUser.email,
        linked_providers: summary.linkedProviders,
        primary_provider: summary.primaryProvider,
        identities_count: summary.identitiesCount,
        identities_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
  }

  let query = supabase
    .from("users")
    .select("id, email, name, surname, created_at, linked_providers, primary_provider")
    .order("created_at", { ascending: false })

  if (normalizedSearch) {
    const escaped = normalizedSearch.replaceAll(",", "")
    query = query.or(`name.ilike.%${escaped}%,surname.ilike.%${escaped}%,email.ilike.%${escaped}%`)
  }

  const { data, error } = await query

  let rows: UserRow[] = (data ?? []) as UserRow[]

  if (error) {
    let fallbackQuery = supabase
      .from("users")
      .select("id, email, name, surname, created_at")
      .order("created_at", { ascending: false })

    if (normalizedSearch) {
      const escaped = normalizedSearch.replaceAll(",", "")
      fallbackQuery = fallbackQuery.or(`name.ilike.%${escaped}%,surname.ilike.%${escaped}%,email.ilike.%${escaped}%`)
    }

    const { data: fallbackData } = await fallbackQuery
    rows = ((fallbackData ?? []) as Array<Omit<UserRow, "linked_providers" | "primary_provider">>).map((row) => ({
      ...row,
      linked_providers: [],
      primary_provider: null,
    }))
  }

  const allItems = rows.map((row) => ({
    id: row.id,
    fullName: toDisplayName(row),
    email: row.email,
    isUnsam: isUnsamEmail(row.email),
    createdAt: row.created_at,
    linkedProviders: row.linked_providers ?? [],
    primaryProvider: row.primary_provider,
  }))

  const items = normalizedSearch
    ? allItems.filter((item) => item.fullName.toLowerCase().includes(normalizedSearch.toLowerCase()) || item.email.toLowerCase().includes(normalizedSearch.toLowerCase()))
    : allItems

  return {
    items,
    total: items.length,
  }
}

export async function getAdminActivity(searchTerm: string, requestedPage: number): Promise<AdminActivityResult> {
  const supabase = await createClient()
  const normalizedSearch = searchTerm.trim()
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1

  let countQuery = supabase
    .from("events")
    .select("id", { count: "exact", head: true })

  if (normalizedSearch) {
    const escaped = normalizedSearch.replaceAll(",", "")
    countQuery = countQuery.or(
      `type.ilike.%${escaped}%,user_full_name.ilike.%${escaped}%,connector_text.ilike.%${escaped}%,target.ilike.%${escaped}%`
    )
  }

  const { count, error: countError } = await countQuery
  if (countError) {
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize: ADMIN_ACTIVITY_PAGE_SIZE,
      totalPages: 1,
      search: normalizedSearch,
    }
  }

  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / ADMIN_ACTIVITY_PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const from = (safePage - 1) * ADMIN_ACTIVITY_PAGE_SIZE
  const to = from + ADMIN_ACTIVITY_PAGE_SIZE - 1

  let dataQuery = supabase
    .from("events")
    .select("id, type, user_id, user_full_name, connector_text, target, created_at")
    .order("created_at", { ascending: false })
    .range(from, to)

  if (normalizedSearch) {
    const escaped = normalizedSearch.replaceAll(",", "")
    dataQuery = dataQuery.or(
      `type.ilike.%${escaped}%,user_full_name.ilike.%${escaped}%,connector_text.ilike.%${escaped}%,target.ilike.%${escaped}%`
    )
  }

  const { data } = await dataQuery
  const rows = (data ?? []) as ActivityEventRow[]

  return {
    items: rows.map((event) => ({
      id: event.id,
      type: event.type,
      typeLabel: getEventTypeLabel(event.type),
      user: event.user_full_name || "Usuario",
      connectorText: event.connector_text,
      target: event.target ?? "-",
      createdAt: event.created_at,
      timeLabel: getRelativeTimeLabel(event.created_at),
    })),
    total,
    page: safePage,
    pageSize: ADMIN_ACTIVITY_PAGE_SIZE,
    totalPages,
    search: normalizedSearch,
  }
}
