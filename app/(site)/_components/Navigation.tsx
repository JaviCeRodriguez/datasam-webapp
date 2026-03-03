"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { getUserAvatarUrlWithOptions, getUserDisplayName } from "@/lib/supabase/user";
import { getUserRolesAction } from "@/lib/supabase/get-user-roles";
import { ADMIN_ALLOWED_ROLES } from "@/lib/role-constants";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type UserProfileRow = {
  name: string | null;
  surname: string | null;
  avatar_url: string | null;
  primary_identity_id: string | null;
};

export const Navigation = () => {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfileRow | null>(null);
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      await supabase.auth.signOut({ scope: "local" });
    }

    setUser(null);
    setProfile(null);
    setRoleNames([]);
    setIsSigningOut(false);
    router.replace("/");
    router.refresh();
  };

  useEffect(() => {
    const loadProfile = async (userId: string) => {
      const { data } = await supabase
        .from("users")
        .select("name, surname, avatar_url, primary_identity_id")
        .eq("id", userId)
        .maybeSingle<UserProfileRow>();

      setProfile(data ?? null);
    };

    const syncUrlFromOAuth = async () => {
      const url = new URL(globalThis.location.href);
      const code = url.searchParams.get("code");

      if (!code) {
        return;
      }

      await supabase.auth.exchangeCodeForSession(code);

      url.searchParams.delete("code");
      url.searchParams.delete("state");
      url.searchParams.delete("scope");
      url.searchParams.delete("authuser");
      url.searchParams.delete("prompt");

      globalThis.history.replaceState({}, "", url.toString());
    };

    const hydrateUserState = async (nextUser: SupabaseUser | null) => {
      setUser(nextUser);

      if (!nextUser?.id) {
        setRoleNames([]);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      const [rolesResult, profileResult] = await Promise.allSettled([
        getUserRolesAction(nextUser.id),
        loadProfile(nextUser.id),
      ]);

      if (rolesResult.status === "fulfilled") {
        setRoleNames(rolesResult.value);
      } else {
        setRoleNames([]);
      }

      if (profileResult.status === "rejected") {
        setProfile(null);
      }
    };

    const loadUser = async () => {
      await syncUrlFromOAuth();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      await hydrateUserState(user);
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void hydrateUserState(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const displayName = getUserDisplayName(user, profile);
  const avatarUrl = getUserAvatarUrlWithOptions(user, { profile });
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
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        void handleSignOut();
                      }}
                      className="flex items-center text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
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
