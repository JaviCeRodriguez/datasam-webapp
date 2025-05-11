import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function getCollaborators(client: TypedSupabaseClient) {
  return client.from("collaborators").select("*");
}
