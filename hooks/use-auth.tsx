"use client";

import { useRouter } from "next/navigation";
import useSupabaseBrowser from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/queries/get-user";
import { getUserRole } from "@/queries/get-user-role";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(supabase),
  });
  const { data: userRoleData, isLoading: isLoadingUserRole } = useQuery({
    queryKey: ["user-role"],
    queryFn: () => getUserRole(supabase, userData?.data?.user?.id || ""),
  });
  const supabase = useSupabaseBrowser();
  const router = useRouter();

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
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    router.push("/");
  };

  return {
    userData,
    isLoadingUser,
    userRoleData,
    isLoadingUserRole,
    signInWithGoogle,
    signOut,
  };
};
