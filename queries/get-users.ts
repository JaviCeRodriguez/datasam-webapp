import { TypedSupabaseClient } from "@/lib/supabase/utils";

type Options = {
  page: number;
  perPage: number;
};

export async function getUsersView(
  client: TypedSupabaseClient,
  options: Options = { page: 0, perPage: 40 }
) {
  return client
    .from("user_view")
    .select("*")
    .range(
      options.page * options.perPage,
      (options.page + 1) * options.perPage
    );
}
