"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogIn, Settings, Shield, LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getUserAvatarUrl } from "@/lib/supabase/user";
import { getUserRolesAction } from "@/lib/supabase/get-user-roles";
import { ADMIN_ALLOWED_ROLES } from "@/lib/role-constants";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Navigation = () => {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      // Fetch user roles if authenticated
      if (user?.id) {
        const roles = await getUserRolesAction(user.id);
        setRoleNames(roles);
      }

      setIsLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user?.id) {
        const roles = await getUserRolesAction(session.user.id);
        setRoleNames(roles);
      } else {
        setRoleNames([]);
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "Usuario";
  const avatarUrl = getUserAvatarUrl(user);
  const canAccessAdmin = roleNames.some((role) => ADMIN_ALLOWED_ROLES.has(role));

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-poppins">
              <Link href="/">
                <Image
                  src="/images/logo_h_claro_final.svg"
                  alt="DataSam"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/materias"
              className="text-foreground hover:text-primary transition-colors"
            >
              Materias
            </Link>
            <Link
              href="/qr"
              className="text-foreground hover:text-primary transition-colors"
            >
              QR
            </Link>
          </div>

          {isLoading ? (
            <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarUrl ?? undefined} alt={displayName} />
                      <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5 text-red-500" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {displayName}
                    </div>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      {user.email}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/perfil" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Ver perfil
                      </Link>
                    </DropdownMenuItem>
                    {canAccessAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Ir al dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/cerrar-sesion"
                        className="flex items-center text-red-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesión
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/iniciar-sesion?metodo=google"
                        className="flex items-center"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Iniciar sesión con Google
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/iniciar-sesion?metodo=password"
                        className="flex items-center"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Iniciar sesión con contraseña
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};
