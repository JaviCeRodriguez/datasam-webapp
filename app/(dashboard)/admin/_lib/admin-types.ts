export type AdminStats = {
  activeStudents: number
  activeGrowthPercent: number | null
  availableSubjects: number
  annualApprovalCalendarRate: number | null
  annualApprovalAcademicRate: number | null
  calendarYear: number
}

export type ProgressByYearDatum = {
  yearLabel: string
  approvedCount: number
  attemptedCount: number
  approvalRate: number
}

export type RecentActivityItem = {
  id: string
  user: string
  connectorText: string
  target: string
  timeLabel: string
  type: string
}

export type AdminUserItem = {
  id: string
  fullName: string
  email: string
  isUnsam: boolean
  createdAt: string
  linkedProviders: string[]
  primaryProvider: string | null
}

export type AdminUsersResult = {
  items: AdminUserItem[]
  total: number
}
