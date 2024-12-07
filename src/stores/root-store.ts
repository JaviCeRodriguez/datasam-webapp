import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSessionStore, SessionState } from "./slices/session";
import {
  CollaboratorsState,
  createCollaboratorsStore,
} from "./slices/collaborators";
import { createSubjectsStore, SubjectsState } from "./slices/subjects";

export type RootStore = SessionState & CollaboratorsState & SubjectsState;

export const useRootStore = create<RootStore>()(
  persist(
    (...zustandActions) => ({
      ...createSessionStore(...zustandActions),
      ...createCollaboratorsStore(...zustandActions),
      ...createSubjectsStore(...zustandActions),
    }),
    {
      name: "datasam-store",
      // onRehydrateStorage: () => {
      //   return (state, error) => {
      //     console.log("Rehydrating state", state, error);
      //   };
      // },
    }
  )
);
