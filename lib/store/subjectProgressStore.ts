import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type SubjectStatus = "pending" | "in-progress" | "completed"

export interface SubjectProgress {
  [key: string]: SubjectStatus
}

export interface SubjectProgressState {
  subjectProgress: SubjectProgress
  updateSubjectStatus: (subjectCode: string, status: SubjectStatus) => void
  setSubjectProgress: (progress: SubjectProgress) => void
  resetProgress: () => void
}

export const SUBJECT_PROGRESS_STORAGE_KEY = "datasam-subject-progress"

function isValidStatus(value: unknown): value is SubjectStatus {
  return value === "pending" || value === "in-progress" || value === "completed"
}

export function sanitizeSubjectProgress(input: unknown): SubjectProgress {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {}
  }

  return Object.entries(input).reduce<SubjectProgress>((acc, [subjectCode, value]) => {
    if (!subjectCode || !isValidStatus(value)) {
      return acc
    }

    acc[subjectCode] = value
    return acc
  }, {})
}

export function getPersistedSubjectProgress(): SubjectProgress {
  if (typeof window === "undefined") {
    return {}
  }

  const rawValue = window.localStorage.getItem(SUBJECT_PROGRESS_STORAGE_KEY)

  if (!rawValue) {
    return {}
  }

  try {
    const parsed = JSON.parse(rawValue) as {
      state?: {
        subjectProgress?: SubjectProgress
      }
    }

    return sanitizeSubjectProgress(parsed?.state?.subjectProgress)
  } catch {
    return {}
  }
}

export const useSubjectProgressStore = create<SubjectProgressState>()(
  persist(
    (set) => ({
      subjectProgress: {},
      updateSubjectStatus: (subjectCode: string, status: SubjectStatus) =>
        set((state) => ({
          subjectProgress: {
            ...state.subjectProgress,
            [subjectCode]: status,
          },
        })),
      setSubjectProgress: (progress: SubjectProgress) =>
        set({
          subjectProgress: sanitizeSubjectProgress(progress),
        }),
      resetProgress: () =>
        set({
          subjectProgress: {},
        }),
    }),
    {
      name: SUBJECT_PROGRESS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
