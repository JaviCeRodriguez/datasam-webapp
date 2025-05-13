"use client";
import { Button } from "@/components/ui/button";
import useSupabaseBrowser from "@/lib/supabase/client";
import { getForm } from "@/queries/get-form";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function FormResponsesClient({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();

  const { data: form, isLoading: isLoadingForm } = useQuery({
    queryKey: ["form", id],
    queryFn: () => getForm(supabase, id as string),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Respuestas del formulario
          </h2>
          <p className="text-muted-foreground">{form?.data?.title}</p>
        </div>
        <Link href={`/dashboard/forms/${id}/edit`}>
          <Button>Editar</Button>
        </Link>
      </div>
      <div>
        {isLoadingForm ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <div>
            <pre>{JSON.stringify(form?.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
