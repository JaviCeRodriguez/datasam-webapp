"use client";

import { FormBuilder } from "@/components/shared/form-builder";
import useSupabaseBrowser from "@/lib/supabase/client";
import { getForm } from "@/queries/get-form";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function FormEditClient({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();

  const { data: form, isLoading: isLoadingForm } = useQuery({
    queryKey: ["forms", id],
    queryFn: () => getForm(supabase, id),
  });

  if (isLoadingForm) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Editar formulario</h2>
      </div>

      {form?.data && <FormBuilder form={form.data} />}
    </div>
  );
}
