import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootStoreProvider } from "@/components/providers/root-store-provider";
import { ReactQueryClientProvider } from "@/components/providers/tsq-provider";
import "@/app/globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { BreadcrumbDashboard } from "@/components/shared/breadcrumb-dashboard";
import { Separator } from "@/components/ui/separator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DATA SAM",
  description:
    "DATA SAM: Donde el conocimiento se comparte y la comunidad se fortalece 🚀",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <RootStoreProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 md:gap-8">
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <BreadcrumbDashboard />
                  </header>
                  <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                      {children}
                    </div>
                  </div>
                </SidebarInset>
                <Analytics />
                <SpeedInsights />
              </SidebarProvider>
            </main>
          </body>
        </html>
      </RootStoreProvider>
    </ReactQueryClientProvider>
  );
}
