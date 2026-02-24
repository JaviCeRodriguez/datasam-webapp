import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/iniciar-sesion");
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "Usuario";
  const avatarUrl = user.user_metadata?.avatar_url || "/placeholder.svg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mi Perfil
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
              <CardDescription>Tu información básica de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{displayName}</h3>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 w-fit"
                >
                  <Calendar className="h-3 w-3" />
                  Miembro desde: Enero 2024
                </Badge>
                <Badge variant="outline" className="w-fit">
                  {user.email?.includes("@unsam.edu.ar")
                    ? "Estudiante UNSAM"
                    : "Usuario Externo"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración
              </CardTitle>
              <CardDescription>Personaliza tu experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Settings className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Mail className="h-4 w-4 mr-2" />
                Cambiar Email
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                Preferencias de Notificaciones
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Progreso Académico</CardTitle>
            <CardDescription>Tu avance en el plan de estudios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">
                  Materias Aprobadas
                </div>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <div className="text-2xl font-bold text-secondary">8</div>
                <div className="text-sm text-muted-foreground">
                  Materias Pendientes
                </div>
              </div>
              <div className="text-center p-4 bg-green-500/5 rounded-lg">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm text-muted-foreground">
                  Progreso Total
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
