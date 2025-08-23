import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    user: "Juan Pérez",
    action: "completó",
    subject: "Álgebra I",
    time: "hace 2 horas",
    type: "success",
  },
  {
    user: "María García",
    action: "se inscribió en",
    subject: "Cálculo II",
    time: "hace 4 horas",
    type: "info",
  },
  {
    user: "Carlos López",
    action: "obtuvo certificado de",
    subject: "Estadística",
    time: "hace 1 día",
    type: "success",
  },
  {
    user: "Ana Martínez",
    action: "necesita ayuda con",
    subject: "Física I",
    time: "hace 2 días",
    type: "warning",
  },
  {
    user: "Luis Rodríguez",
    action: "completó",
    subject: "Programación",
    time: "hace 3 días",
    type: "success",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Actividad Reciente
        </CardTitle>
        <CardDescription>Últimas acciones de los estudiantes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-secondary/20">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                <span className="font-medium text-primary">{activity.subject}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge
              variant={
                activity.type === "success" ? "default" : activity.type === "warning" ? "destructive" : "secondary"
              }
              className="text-xs"
            >
              {activity.type === "success" ? "Completado" : activity.type === "warning" ? "Ayuda" : "Nuevo"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
