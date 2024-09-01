import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSessionStore, SessionState } from "./slices/session";
import {
  CollaboratorsState,
  createCollaboratorsStore,
} from "./slices/collaborators";

export type RootStore = SessionState & CollaboratorsState;

export const useRootStore = create<RootStore>()(
  persist(
    (...zustandActions) => ({
      ...createSessionStore(...zustandActions),
      ...createCollaboratorsStore(...zustandActions),
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
