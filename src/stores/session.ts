import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session: Session | null) => set({ session }),
    }),
    {
      name: "datasam-session",
    }
  )
);
