"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, Users, Monitor } from "lucide-react"
import type { SubjectStatus } from "@/app/hooks/useSubjectProgress"

interface SubjectCardProps {
  subject: any
  status: SubjectStatus
  canTake: boolean
  onUpdateStatus: (code: string, status: SubjectStatus) => void
}

export const SubjectCard = ({ subject, status, canTake, onUpdateStatus }: SubjectCardProps) => {
  const getStatusIcon = (status: SubjectStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: SubjectStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200"
      case "in-progress":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg ${getStatusColor(status)} ${!canTake && status === "pending" ? "opacity-60" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base mb-1 leading-tight">{subject.nombre}</CardTitle>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs px-1 py-0">
                {subject.code}
              </Badge>
              <span>•</span>
              <span>{subject.creditos} créditos</span>
            </div>
          </div>
          {getStatusIcon(status)}
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{subject.horasPresenciales}h</span>
            </div>
            <div className="flex items-center space-x-1">
              <Monitor className="h-3 w-3" />
              <span>{subject.horasVirtuales}h</span>
            </div>
          </div>

          {subject.correlativas && (
            <div className="text-xs">
              <span className="font-medium">Correlativas: </span>
              <span className="text-muted-foreground">{subject.correlativas.join(", ")}</span>
            </div>
          )}

          {!canTake && status === "pending" && (
            <Badge variant="secondary" className="text-xs">
              Requiere correlativas
            </Badge>
          )}

          <div className="flex space-x-1 pt-2">
            <Button
              size="sm"
              variant={status === "in-progress" ? "default" : "outline"}
              onClick={() => onUpdateStatus(subject.code, "in-progress")}
              disabled={!canTake && status === "pending"}
              className="text-xs px-2 py-1 h-7"
            >
              Cursando
            </Button>
            <Button
              size="sm"
              variant={status === "completed" ? "default" : "outline"}
              onClick={() => onUpdateStatus(subject.code, "completed")}
              disabled={!canTake && status === "pending"}
              className="text-xs px-2 py-1 h-7"
            >
              Aprobada
            </Button>
            {status !== "pending" && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onUpdateStatus(subject.code, "pending")}
                className="text-xs px-2 py-1 h-7"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
