import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FormsClient from "./client";
import createSupabaseServer from "@/lib/supabase/server";
import { getForms } from "@/queries/get-forms";
export default async function FormsPage() {
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["forms"],
    queryFn: () => getForms(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FormsClient />
    </HydrationBoundary>
  );
}
