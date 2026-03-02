import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AdminStats } from "../_lib/admin-types"
import { Users, BookOpen, TrendingUp } from "lucide-react"

type StatsCardsProps = {
  stats: AdminStats
}

function formatPercent(value: number | null) {
  if (value === null) {
    return "-"
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
}

function formatRate(value: number | null) {
  if (value === null) {
    return "-"
  }

  return `${value.toFixed(1)}%`
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Estudiantes Activos",
      value: stats.activeStudents.toLocaleString("es-AR"),
      change: formatPercent(stats.activeGrowthPercent),
      helper: "vs mes anterior",
      icon: Users,
      color: "from-primary to-secondary",
    },
    {
      title: "Materias Disponibles",
      value: stats.availableSubjects.toLocaleString("es-AR"),
      change: "catálogo",
      helper: "tabla subjects",
      icon: BookOpen,
      color: "from-secondary to-accent",
    },
    {
      title: "Tasa de Aprobación",
      value: formatRate(stats.annualApprovalCalendarRate),
      change: `Académica: ${formatRate(stats.annualApprovalAcademicRate)}`,
      helper: `Calendario ${stats.calendarYear}`,
      icon: TrendingUp,
      color: "from-accent to-primary",
    },
  ]

  return (
    <>
      {cards.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">{stat.change}</span> {stat.helper}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
