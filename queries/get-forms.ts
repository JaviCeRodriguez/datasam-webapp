import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function getForms(client: TypedSupabaseClient) {
  return client.from("forms").select("*");
}
