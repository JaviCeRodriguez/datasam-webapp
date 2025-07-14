import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function getUserRole(client: TypedSupabaseClient, userId: string) {
  return client
    .from("user_roles")
    .select(
      `
          user_id,
          role_id,
          roles:role_id (
            id,
            role_name
          )
        `
    )
    .eq("user_id", userId)
    .single();
}
