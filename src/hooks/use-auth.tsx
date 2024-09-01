import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRootStore } from "@/stores/root-store";

export const useAuth = () => {
  const session = useRootStore((state) => state.session);
  const setSession = useRootStore((state) => state.setSession);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      setSession(null);
    }

    setSession(data.session);
  };

  const signInWithDiscord = async () => {
    const { data: dataSignIn, error: errorSignIn } =
      await supabase.auth.signInWithOAuth({
        provider: "discord",
      });

    if (!errorSignIn && dataSignIn) {
      getSession();
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  useEffect(() => {
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { session, signInWithDiscord, signOut };
};
