"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.replace("/");
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Página no encontrada</h1>
        <p className="text-muted-foreground">Redirigiendo al inicio...</p>
      </div>
    </div>
  );
}
