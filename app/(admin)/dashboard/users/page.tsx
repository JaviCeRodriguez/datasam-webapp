import createSupabaseServer from "@/lib/supabase/server";
import { getUsersView } from "@/queries/get-users";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UsersClient from "./client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTitle } from "@/components/ui/alert";
import { HardHat } from "lucide-react";

export default async function UsersPage() {
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["users-view"],
    queryFn: () => getUsersView(supabase, { page: 0, perPage: 40 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-4">
        <Alert variant="warning">
          <HardHat className="h-4 w-4" />
          <AlertTitle className="font-bold">Página en construcción</AlertTitle>
          <AlertDescription>
            Esta página está en construcción! 🚧 En breve estará disponible en
            su totalidad.
          </AlertDescription>
        </Alert>
        <UsersClient />
      </div>
    </HydrationBoundary>
  );
}
