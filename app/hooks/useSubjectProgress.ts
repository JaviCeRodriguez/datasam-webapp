"use client"

import { useSubjectProgressStore, type SubjectStatus, type SubjectProgress } from "@/lib/store/subjectProgressStore"
import type { SubjectProgressState } from "@/lib/store/subjectProgressStore"

export type { SubjectStatus, SubjectProgress }

export interface Subject {
  code: string
  nombre: string
  cuatrimestre: number
  anio: number
  creditos: number
  horasPresenciales: number
  horasVirtuales: number
  correlativas: string[] | null
}

export const useSubjectProgress = () => {
  const subjectProgress = useSubjectProgressStore((state: SubjectProgressState) => state.subjectProgress)
  const updateSubjectStatus = useSubjectProgressStore((state: SubjectProgressState) => state.updateSubjectStatus)

  const canTakeSubject = (subject: Subject) => {
    if (!subject.correlativas) return true
    return subject.correlativas.every((correlativa: string) => subjectProgress[correlativa] === "completed")
  }

  return {
    subjectProgress,
    updateSubjectStatus,
    canTakeSubject,
  }
}
