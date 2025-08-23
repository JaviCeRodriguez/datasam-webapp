import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, BookOpen } from "lucide-react"

interface ProgressOverviewProps {
  progress: number
  credits: { completed: number; total: number }
}

export const ProgressOverview = ({ progress, credits }: ProgressOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Progreso General</span>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{progress}% completado</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Créditos</span>
          </div>
          <p className="text-2xl font-bold">{credits.completed}</p>
          <p className="text-sm text-muted-foreground">de {credits.total} créditos</p>
        </CardContent>
      </Card>
    </div>
  )
}
