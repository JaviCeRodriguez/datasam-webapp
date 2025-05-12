import createSupabaseServer from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from "@/queries/get-user";
import { HardHat } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Dashboard() {
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUser(supabase),
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
        <div>Pronto...</div>
      </div>
    </HydrationBoundary>
  );
}
