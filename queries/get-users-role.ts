import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function getUsersRole(client: TypedSupabaseClient) {
  return client.from("user_roles").select(
    `
          user_id,
          role_id,
          roles:role_id (
            id,
            role_name
          )
        `
  );
}
