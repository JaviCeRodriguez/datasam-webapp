import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

type RoleData = {
  user_id: string;
  role_id: string;
  roles: {
    id: string;
    role_name: string;
  };
} | null;

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: userData, error: userError } = await supabase.auth.getUser();

    // Si no hay sesión y la ruta es /dashboard, redirigir a /
    if (
      (!userData || userError) &&
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Si hay sesión, verificar el rol del usuario
    if (userData && request.nextUrl.pathname.startsWith("/dashboard")) {
      const { data: roleData }: { data: RoleData } = await supabase
        .from("user_roles")
        .select(
          `
          user_id,
          role_id,
          roles:role_id (
            id,
            role_name
          )
        `
        )
        .eq("user_id", userData.user?.id)
        .single();

      // Si el usuario no tiene el rol de admin, redirigir a una página de acceso denegado
      if (!roleData || roleData.roles.role_name !== "admin") {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
    }

    return response;
  } catch {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
