import { FormType } from "@/components/shared/form-builder";
import { TypedSupabaseClient } from "@/lib/supabase/utils";

export async function updateForm(
  client: TypedSupabaseClient,
  id: string,
  form: Partial<FormType>
) {
  return client.from("forms").update(form).eq("id", id);
}
