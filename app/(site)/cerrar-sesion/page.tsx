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
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CerrarSesionPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Usuario");
      setUserEmail(user.email ?? null);
      setLoading(false);
    };

    loadUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    setIsSubmitting(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return null;
  }

  if (!userEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cerrar Sesión
          </CardTitle>
          <CardDescription>
            ¿Estás seguro que deseas cerrar tu sesión?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Sesión actual: <span className="font-medium">{userName}</span>
            </p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex-1"
              disabled={isSubmitting}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isSubmitting ? "Cerrando..." : "Cerrar Sesión"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Home className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
