"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/hooks/useAuth";
import { Chrome, Mail, Lock } from "lucide-react";

function IniciarSesionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const metodo = searchParams.get("metodo") || "password";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    // Simular login con Google
    const mockUser = {
      id: "1",
      name: "Usuario Google",
      email: "usuario@gmail.com",
      avatar: "https://via.placeholder.com/40",
    };
    login(mockUser);
    router.push("/");
  };

  const handlePasswordLogin = () => {
    // Simular login con contraseña
    const mockUser = {
      id: "2",
      name: "Usuario Local",
      email: email || "usuario@ejemplo.com",
      avatar: "https://via.placeholder.com/40",
    };
    login(mockUser);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Iniciar Sesión
          </CardTitle>
          <CardDescription>
            {metodo === "google"
              ? "Inicia sesión con tu cuenta de Google"
              : "Inicia sesión con tu email y contraseña"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {metodo === "google" ? (
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
            >
              <Chrome className="h-4 w-4 mr-2" />
              Continuar con Google
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handlePasswordLogin} className="w-full">
                Iniciar Sesión
              </Button>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Modo desarrollo: Haz clic en cualquier botón para iniciar sesión
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function IniciarSesionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando...
        </div>
      }
    >
      <IniciarSesionContent />
    </Suspense>
  );
}
