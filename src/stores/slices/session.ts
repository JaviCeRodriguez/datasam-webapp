import type { Session } from "@supabase/supabase-js";
import { StoreApi } from "zustand";
import { RootStore } from "../root-store";

export type SessionState = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const createSessionStore = (
  set: StoreApi<RootStore>["setState"],
  get: StoreApi<RootStore>["getState"],
  ...rest: StoreApi<RootStore>[]
) => ({
  session: null,
  setSession: (session: Session | null) =>
    set((state) => ({ ...state, session })),
});
