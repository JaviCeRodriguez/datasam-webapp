"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
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
import { KeyRound, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function ConfirmarRegistroContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerifyCode = async () => {
    setError(null);
    setInfoMessage(null);

    if (!email || !code) {
      setError("Ingresa email y código para confirmar tu cuenta.");
      return;
    }

    setIsVerifying(true);

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code.trim(),
      type: "signup",
    });

    if (verifyError) {
      const normalizedMessage = verifyError.message.toLowerCase();

      if (normalizedMessage.includes("expired") || normalizedMessage.includes("invalid")) {
        setError("El código es inválido o expiró. Solicita uno nuevo.");
      } else {
        setError(verifyError.message);
      }

      setIsVerifying(false);
      return;
    }

    if (data.session) {
      setInfoMessage("Cuenta confirmada. Iniciando sesión...");
      router.replace("/");
      router.refresh();
      return;
    }

    setInfoMessage("Cuenta confirmada. Ya puedes iniciar sesión.");
    setIsVerifying(false);
  };

  const handleResendCode = async () => {
    setError(null);
    setInfoMessage(null);

    if (!email) {
      setError("Ingresa tu email para reenviar el código.");
      return;
    }

    setIsResending(true);

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${globalThis.location.origin}/auth/callback`,
      },
    });

    if (resendError) {
      setError(resendError.message);
      setIsResending(false);
      return;
    }

    setInfoMessage("Te enviamos un nuevo código de verificación.");
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Confirmar Registro
          </CardTitle>
          <CardDescription>
            Ingresa el código que recibiste por email para activar tu cuenta
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
                disabled={isVerifying || isResending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Código de verificación</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="pl-10"
                disabled={isVerifying || isResending}
              />
            </div>
          </div>

          <Button onClick={handleVerifyCode} className="w-full" disabled={isVerifying || !email || !code}>
            {isVerifying ? "Verificando..." : "Confirmar cuenta"}
          </Button>

          <Button
            variant="outline"
            onClick={handleResendCode}
            className="w-full"
            disabled={isResending || !email}
          >
            {isResending ? "Reenviando..." : "Reenviar código"}
          </Button>

          {error ? <p className="text-sm text-destructive text-center">{error}</p> : null}
          {infoMessage ? <p className="text-sm text-muted-foreground text-center">{infoMessage}</p> : null}

          <div className="text-center text-sm">
            <span className="text-muted-foreground">¿Ya verificaste tu cuenta? </span>
            <Link href="/iniciar-sesion?metodo=password" className="font-medium text-primary hover:underline">
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmarRegistroPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando...
        </div>
      }
    >
      <ConfirmarRegistroContent />
    </Suspense>
  );
}
