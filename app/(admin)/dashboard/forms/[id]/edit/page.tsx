import createSupabaseServer from "@/lib/supabase/server";
import { getForm } from "@/queries/get-form";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FormEditClient from "./client";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function FormEditPage({ params }: PageProps) {
  const { id } = params;
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["form", id],
    queryFn: () => getForm(supabase, id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FormEditClient id={id} />
    </HydrationBoundary>
  );
}
