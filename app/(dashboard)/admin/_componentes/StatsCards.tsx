import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, TrendingUp, Award } from "lucide-react"

const stats = [
  {
    title: "Estudiantes Activos",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Materias Disponibles",
    value: "45",
    change: "+3",
    icon: BookOpen,
    color: "from-primary to-secondary",
  },
  {
    title: "Tasa de Aprobación",
    value: "87%",
    change: "+5%",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Certificados Emitidos",
    value: "892",
    change: "+23",
    icon: Award,
    color: "from-orange-500 to-red-500",
  },
]

export function StatsCards() {
  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
