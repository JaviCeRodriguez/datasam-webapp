"use client"
import { studyPlan } from "@/lib/study-plan-data"
import { useSubjectProgress } from "@/app/hooks/useSubjectProgress"
import { calculateProgress, calculateCredits } from "@/app/utils/progressCalculations"
import { ProgressOverview } from "./_componentes/ProgressOverview"
import { SubjectCard } from "./_componentes/SubjectCard"

export default function MateriasPage() {
  const { subjectProgress, updateSubjectStatus, canTakeSubject } = useSubjectProgress()

  const progress = calculateProgress(subjectProgress)
  const credits = calculateCredits(subjectProgress)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Plan de Estudios</h1>
            <p className="text-xl text-muted-foreground">Licenciatura en Ciencia de Datos</p>
          </div>

          <ProgressOverview progress={progress} credits={credits} />
        </div>

        <div className="space-y-8">
          {studyPlan.map((yearData) => (
            <div key={yearData.year} className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-6">Año {yearData.year}</h2>

              {yearData.quarters.map((quarter) => (
                <div key={quarter.quarter} className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Cuatrimestre {quarter.quarter}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quarter.content.map((subject) => {
                      const status = subjectProgress[subject.code] || "pending"
                      const canTake = canTakeSubject(subject)

                      return (
                        <SubjectCard
                          key={subject.code}
                          subject={subject}
                          status={status}
                          canTake={canTake}
                          onUpdateStatus={updateSubjectStatus}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
