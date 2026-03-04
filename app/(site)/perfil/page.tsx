import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserAvatarUrlWithOptions, getUserDisplayName } from "@/lib/supabase/user";
import { getIdentityProviderSummary } from "@/lib/supabase/identity-providers";
import { redirect } from "next/navigation";
import { ProfileEditor } from "@/app/(site)/perfil/_components/ProfileEditor";
import { ProfessionalProfilePdfUpload } from "@/app/(site)/perfil/_components/ProfessionalProfilePdfUpload";
import type { UserIdentity } from "@supabase/supabase-js";

type UserProfileRow = {
  name: string | null;
  surname: string | null;
  avatar_url: string | null;
  primary_identity_id: string | null;
  created_at: string | null;
};

type ProfessionalProfileRow = {
  source: string | null;
  file_name: string | null;
  language: string | null;
  experience: unknown;
  education: unknown;
  skills: unknown;
  extracted_text: string | null;
};

function asArray<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  return fallback;
}

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/iniciar-sesion");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("name, surname, avatar_url, primary_identity_id, created_at")
    .eq("id", user.id)
    .maybeSingle<UserProfileRow>();

  const { data: professionalProfile } = await supabase
    .from("professional_profiles")
    .select("source, file_name, language, experience, education, skills, extracted_text")
    .eq("user_id", user.id)
    .maybeSingle<ProfessionalProfileRow>();

  const displayName = getUserDisplayName(user, profile);
  const avatarUrl = getUserAvatarUrlWithOptions(user, { profile }) || "/placeholder.svg";
  const createdDate = profile?.created_at ?? user.created_at;

  const initialIdentities = (user.identities ?? []) as UserIdentity[];
  const initialProviderSummary = getIdentityProviderSummary(user, profile?.primary_identity_id ?? null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mi Perfil
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tu información personal y cuentas vinculadas
          </p>
        </div>

        <Tabs defaultValue="cuenta" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cuenta">Datos de cuenta</TabsTrigger>
            <TabsTrigger value="profesional">Perfil profesional</TabsTrigger>
          </TabsList>

          <TabsContent value="cuenta" className="space-y-6">
            <ProfileEditor
              userId={user.id}
              email={user.email ?? ""}
              initialName={profile?.name ?? ""}
              initialSurname={profile?.surname ?? ""}
              initialAvatarUrl={avatarUrl === "/placeholder.svg" ? null : avatarUrl}
              initialPrimaryIdentityId={profile?.primary_identity_id ?? null}
              initialIdentities={initialIdentities}
              initialLinkedProviders={initialProviderSummary.linkedProviders}
            />

            <Card>
              <CardHeader>
                <CardTitle>Resumen de Perfil</CardTitle>
                <CardDescription>Información visible para tu usuario actual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium">{displayName}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <Calendar className="h-3 w-3" />
                    Miembro desde: {createdDate ? new Date(createdDate).toLocaleDateString("es-AR") : "-"}
                  </Badge>
                  <Badge variant="outline" className="w-fit">
                    {user.email?.includes("@unsam.edu.ar") ? "Estudiante UNSAM" : "Usuario Externo"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profesional">
            <ProfessionalProfilePdfUpload
              initialProfile={{
                source: professionalProfile?.source ?? "linkedin_pdf_llm",
                fileName: professionalProfile?.file_name ?? "",
                language:
                  professionalProfile?.language === "es" || professionalProfile?.language === "en"
                    ? professionalProfile.language
                    : null,
                experience: asArray(professionalProfile?.experience, []),
                education: asArray(professionalProfile?.education, []),
                skills: asArray<string>(professionalProfile?.skills, []),
                extractedText: professionalProfile?.extracted_text ?? "",
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
