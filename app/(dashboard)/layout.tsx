import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import { createClient } from "@/lib/supabase/server";
import { canAccessAdmin, getUserRoleNamesCached } from "@/lib/supabase/roles";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/iniciar-sesion?metodo=google");
  }

  const roleNames = await getUserRoleNamesCached(user.id);
  const isAllowed = canAccessAdmin(roleNames);

  if (!isAllowed) {
    redirect("/unauthorized");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
