import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { RecentActivityItem } from "../_lib/admin-types"

type RecentActivityProps = {
  activities: RecentActivityItem[]
}

function getBadgeVariant(type: string): "default" | "secondary" {
  if (type === "Progreso") {
    return "default"
  }

  return "secondary"
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Actividad Reciente
        </CardTitle>
        <CardDescription>Últimas acciones de los estudiantes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 && <p className="text-sm text-muted-foreground">Todavía no hay eventos registrados.</p>}

        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
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
                <span className="font-medium">{activity.user}</span> {activity.connectorText}{" "}
                <span className="font-medium text-primary">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.timeLabel}</p>
            </div>
            <Badge variant={getBadgeVariant(activity.type)} className="text-xs">
              {activity.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
