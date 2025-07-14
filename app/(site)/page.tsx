import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { ParticlesHome } from "@/components/sections/particles-home";
import { UsefulLinksHome } from "@/components/sections/useful-links-home";
import createSupabaseServer from "@/lib/supabase/server";
import { getCollaborators } from "@/queries/get-collaborators";
import { getUser } from "@/queries/get-user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUser(supabase),
  });

  await queryClient.prefetchQuery({
    queryKey: ["collaborators"],
    queryFn: () => getCollaborators(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <ParticlesHome />

        <div className="relative z-10 p-4 bg-white md:p-10">
          <About />
          <UsefulLinksHome />
          <Footer />
        </div>
      </div>
    </HydrationBoundary>
  );
}
