/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Session } from "@supabase/supabase-js";
import { StoreApi } from "zustand";
import { RootStore } from "../root-store";

export type SessionState = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const createSessionStore = (
  set: StoreApi<RootStore>["setState"],
  _get: StoreApi<RootStore>["getState"],
  ..._: StoreApi<RootStore>[]
) => ({
  session: null,
  setSession: (session: Session | null) =>
    set((state) => ({ ...state, session })),
});
