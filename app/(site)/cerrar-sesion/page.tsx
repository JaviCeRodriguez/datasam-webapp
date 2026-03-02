"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CerrarSesionPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [isSigningOut, setIsSigningOut] = useState(true);

  useEffect(() => {
    const signOutNow = async () => {
      await supabase.auth.signOut();
      setIsSigningOut(false);
      router.replace("/");
      router.refresh();
    };

    void signOutNow();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cerrar Sesión
          </CardTitle>
          <CardDescription>
            {isSigningOut ? "Cerrando sesión..." : "Sesión cerrada. Redirigiendo..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4 bg-muted/50 rounded-lg flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <LogOut className="h-4 w-4" />
            {isSigningOut ? "Estamos cerrando tu sesión" : "Redirigiendo al inicio"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
