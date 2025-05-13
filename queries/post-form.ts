import { FormType } from "@/components/shared/form-builder";
import { TypedSupabaseClient } from "@/lib/supabase/utils";

type PostFormType = Omit<FormType, "id">;

export async function postForm(
  client: TypedSupabaseClient,
  form: PostFormType
) {
  return client.from("forms").insert(form);
}
