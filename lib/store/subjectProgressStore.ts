import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type SubjectStatus = "pending" | "in-progress" | "completed"

export interface SubjectProgress {
  [key: string]: SubjectStatus
}

export interface SubjectProgressState {
  subjectProgress: SubjectProgress
  updateSubjectStatus: (subjectCode: string, status: SubjectStatus) => void
  resetProgress: () => void
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
      resetProgress: () =>
        set({
          subjectProgress: {},
        }),
    }),
    {
      name: "datasam-subject-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
