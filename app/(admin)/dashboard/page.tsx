import createSupabaseServer from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from "@/queries/get-user";

export default async function Dashboard() {
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUser(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>sarasa</div>
    </HydrationBoundary>
  );
}
