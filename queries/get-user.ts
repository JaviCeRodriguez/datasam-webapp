import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function getUser(client: TypedSupabaseClient) {
  return client.auth.getUser();
}
