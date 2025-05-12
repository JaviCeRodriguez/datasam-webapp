import createSupabaseServer from "@/lib/supabase/server";
import { getUsersView } from "@/queries/get-users";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UsersClient from "./client";

export default async function UsersPage() {
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["users-view"],
    queryFn: () => getUsersView(supabase, { page: 0, perPage: 40 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersClient />
    </HydrationBoundary>
  );
}
