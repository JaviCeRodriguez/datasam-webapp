"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
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
import { Globe, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function IniciarSesionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const metodo = searchParams.get("metodo") || "password";
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const confirmWithCodeHref = email
    ? `/confirmar-registro?email=${encodeURIComponent(email)}`
    : "/confirmar-registro";

  useEffect(() => {
    const errorCode = searchParams.get("error_code");
    const errorDescription = searchParams.get("error_description");

    if (!errorCode) {
      return;
    }

    if (errorCode === "otp_expired") {
      setError("El enlace de verificación expiró o ya fue usado.");
      setInfoMessage("Puedes iniciar sesión con contraseña si ya confirmaste, o solicitar un nuevo correo.");
      return;
    }

    const decodedDescription = errorDescription
      ? decodeURIComponent(errorDescription.replaceAll("+", " "))
      : "No se pudo completar la autenticación.";

    setError(decodedDescription);
  }, [searchParams]);

  useEffect(() => {
    if (metodo !== "google") {
      return;
    }

    let isMounted = true;

    const startGoogleFlow = async () => {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${globalThis.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (signInError && isMounted) {
        setError(signInError.message);
      }
    };

    void startGoogleFlow();

    return () => {
      isMounted = false;
    };
  }, [metodo, supabase]);

  const handlePasswordLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    setInfoMessage(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const normalizedMessage = signInError.message.toLowerCase();

      if (normalizedMessage.includes("email not confirmed") || normalizedMessage.includes("email_not_confirmed")) {
        setError("Tu correo todavía no está confirmado.");
        setInfoMessage("Solicita un nuevo correo de verificación e inténtalo nuevamente.");
      } else {
        setError(signInError.message);
      }

      setIsSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
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
            <div className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
              <Globe className="h-4 w-4" />
              {error ? "No se pudo redirigir a Google" : "Redirigiendo a Google..."}
            </div>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <Button onClick={handlePasswordLogin} className="w-full" disabled={isSubmitting || !email || !password}>
                {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </div>
          )}

          {error ? <p className="text-sm text-destructive text-center">{error}</p> : null}
          {infoMessage ? <p className="text-sm text-muted-foreground text-center">{infoMessage}</p> : null}

          {metodo === "password" ? (
            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿Tienes un código? </span>
              <Link href={confirmWithCodeHref} className="font-medium text-primary hover:underline">
                Confirmar registro con código
              </Link>
            </div>
          ) : null}

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Usa tu cuenta habilitada en Supabase Auth
            </p>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">¿No tienes cuenta? </span>
            <Link href="/registrarse" className="font-medium text-primary hover:underline">
              Regístrate
            </Link>
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
