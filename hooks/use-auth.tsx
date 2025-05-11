"use client";

import { useEffect } from "react";
import { useRootStore } from "@/store/root-store";
import { useRouter } from "next/navigation";
import useSupabaseBrowser from "@/lib/supabase/client";

export const useAuth = () => {
  const session = useRootStore((state) => state.session);
  const setSession = useRootStore((state) => state.setSession);
  const supabase = useSupabaseBrowser();
  const router = useRouter();

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      setSession(null);
    }

    setSession(data.session);
  };

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.startsWith("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.endsWith("/") ? url : `${url}/`;
    // Append `/auth/callback` to the URL.
    url = `${url}auth/callback`;
    return url;
  };

  const signInWithGoogle = async () => {
    const { data: dataSignIn, error: errorSignIn } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getURL(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

    if (!errorSignIn && dataSignIn) {
      getSession();
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/");
  };

  useEffect(() => {
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { session, signInWithGoogle, signOut };
};
