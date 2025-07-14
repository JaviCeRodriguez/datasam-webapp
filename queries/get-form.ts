import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function getForm(client: TypedSupabaseClient, id: string) {
  return client.from("forms").select("*").eq("id", id).single();
}
