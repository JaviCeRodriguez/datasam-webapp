import FormResponsesClient from "./client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import createSupabaseServer from "@/lib/supabase/server";
import { getForm } from "@/queries/get-form";

export default async function FormResponsesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["form", id],
    queryFn: () => getForm(supabase, id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FormResponsesClient id={id} />
    </HydrationBoundary>
  );
}
