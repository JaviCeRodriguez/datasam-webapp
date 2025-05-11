import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function getUser(client: TypedSupabaseClient) {
  return client.auth.getUser();
  // const {
  //   data: { user },
  //   error,
  // } = await client.auth.getUser();

  // if (error || !user) {
  //   throw new Error("No authenticated user");
  // }

  // return client
  //   .from("user_roles")
  //   .select(
  //     `
  //         user_id,
  //         role_id,
  //         roles:role_id (
  //           id,
  //           role_name
  //         )
  //       `
  //   )
  //   .eq("user_id", user.id)
  //   .single();
}
