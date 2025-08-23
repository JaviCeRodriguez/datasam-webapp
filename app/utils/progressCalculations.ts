import { studyPlan } from "@/lib/study-plan-data"
import type { SubjectProgress } from "@/app/hooks/useSubjectProgress"

export const calculateProgress = (subjectProgress: SubjectProgress) => {
  const totalSubjects = studyPlan.reduce(
    (total, year) => total + year.quarters.reduce((yearTotal, quarter) => yearTotal + quarter.content.length, 0),
    0,
  )

  const completedSubjects = Object.values(subjectProgress).filter((status) => status === "completed").length

  return Math.round((completedSubjects / totalSubjects) * 100)
}

export const calculateCredits = (subjectProgress: SubjectProgress) => {
  const totalCredits = studyPlan.reduce(
    (total, year) =>
      total +
      year.quarters.reduce(
        (yearTotal, quarter) =>
          yearTotal + quarter.content.reduce((quarterTotal, subject) => quarterTotal + subject.creditos, 0),
        0,
      ),
    0,
  )

  const completedCredits = studyPlan.reduce(
    (total, year) =>
      total +
      year.quarters.reduce(
        (yearTotal, quarter) =>
          yearTotal +
          quarter.content.reduce((quarterTotal, subject) => {
            const status = subjectProgress[subject.code] || "pending"
            return quarterTotal + (status === "completed" ? subject.creditos : 0)
          }, 0),
        0,
      ),
    0,
  )

  return { completed: completedCredits, total: totalCredits }
}

export const calculateOverallProgress = (subjectProgress: SubjectProgress) => {
  return calculateProgress(subjectProgress)
}

export const calculateYearProgress = (year: number, subjectProgress: SubjectProgress) => {
  const yearData = studyPlan.find((y) => y.year === year)
  if (!yearData) return 0

  const yearSubjects = yearData.quarters.flatMap((quarter) => quarter.content)
  const completedInYear = yearSubjects.filter((subject) => subjectProgress[subject.code] === "completed").length

  return Math.round((completedInYear / yearSubjects.length) * 100)
}
