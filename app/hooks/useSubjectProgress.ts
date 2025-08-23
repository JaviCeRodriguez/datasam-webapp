"use client"

import { useState, useEffect } from "react"

export type SubjectStatus = "pending" | "in-progress" | "completed"

export interface SubjectProgress {
  [key: string]: SubjectStatus
}

export const useSubjectProgress = () => {
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress>({})

  useEffect(() => {
    const savedProgress = localStorage.getItem("datasam-subject-progress")
    if (savedProgress) {
      setSubjectProgress(JSON.parse(savedProgress))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("datasam-subject-progress", JSON.stringify(subjectProgress))
  }, [subjectProgress])

  const updateSubjectStatus = (subjectCode: string, status: SubjectStatus) => {
    setSubjectProgress((prev) => ({
      ...prev,
      [subjectCode]: status,
    }))
  }

  const canTakeSubject = (subject: any) => {
    if (!subject.correlativas) return true
    return subject.correlativas.every((correlativa: string) => subjectProgress[correlativa] === "completed")
  }

  return {
    subjectProgress,
    updateSubjectStatus,
    canTakeSubject,
  }
}
