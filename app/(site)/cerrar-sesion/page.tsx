"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";

export default function CerrarSesionPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleCancel = () => {
    router.back();
  };

  if (!user) {
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
              Sesión actual: <span className="font-medium">{user.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex-1"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
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
