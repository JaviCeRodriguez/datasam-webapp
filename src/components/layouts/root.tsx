import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/navbar";

export function RootLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 md:gap-8">
        <Outlet />
      </main>
    </div>
  );
}
