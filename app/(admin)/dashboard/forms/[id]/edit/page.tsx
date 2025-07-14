import createSupabaseServer from "@/lib/supabase/server";
import { getForm } from "@/queries/get-form";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FormEditClient from "./client";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FormEditPage(props: PageProps) {
  const params = await props.params;
  const id = params.id;
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
