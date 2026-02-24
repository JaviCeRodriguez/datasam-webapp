"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { createClient } from "@/lib/supabase/client";
import { Link2, Mail, Save, Upload, User } from "lucide-react";
import { setPrimaryIdentityAction, updateProfileAction } from "../actions";
import type { UserIdentity } from "@supabase/supabase-js";
import { toast } from "sonner";

type IdentityRecord = UserIdentity;

type ProfileEditorProps = {
  userId: string;
  email: string;
  initialName: string;
  initialSurname: string;
  initialAvatarUrl: string | null;
  initialPrimaryIdentityId: string | null;
  initialIdentities: IdentityRecord[];
};

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function getIdentityLabel(identity: IdentityRecord): string {
  const email = identity.identity_data?.email;
  const name = identity.identity_data?.full_name ?? identity.identity_data?.name;
  const provider = identity.provider === "google" ? "Google" : "Email";

  if (email && name) {
    return `${provider}: ${name} (${email})`;
  }

  if (email) {
    return `${provider}: ${email}`;
  }

  return provider;
}

export function ProfileEditor({
  userId,
  email,
  initialName,
  initialSurname,
  initialAvatarUrl,
  initialPrimaryIdentityId,
  initialIdentities,
}: ProfileEditorProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState(initialName);
  const [surname, setSurname] = useState(initialSurname);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [avatarCacheBust, setAvatarCacheBust] = useState(0);
  const [identities, setIdentities] = useState<IdentityRecord[]>(initialIdentities);
  const [primaryIdentityId, setPrimaryIdentityId] = useState(initialPrimaryIdentityId);

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isLinkingGoogle, setIsLinkingGoogle] = useState(false);
  const [isUpdatingPrimary, setIsUpdatingPrimary] = useState(false);
  const [isRefreshingIdentities, setIsRefreshingIdentities] = useState(false);

  const googleIdentityCount = identities.filter((identity) => identity.provider === "google").length;
  const fullName = `${name} ${surname}`.trim() || email;
  const avatarDisplayUrl = avatarUrl ? `${avatarUrl}${avatarCacheBust > 0 ? `?v=${avatarCacheBust}` : ""}` : null;

  const refreshIdentities = async (notifyOnSuccess = false) => {
    setIsRefreshingIdentities(true);
    const toastId = toast.loading("Actualizando cuentas vinculadas...");

    const { data, error } = await supabase.auth.getUserIdentities();

    if (error) {
      toast.error("No se pudieron actualizar las cuentas vinculadas.", { id: toastId });
      setIsRefreshingIdentities(false);
      return;
    }

    const nextIdentities = (data?.identities ?? []) as IdentityRecord[];
    setIdentities(nextIdentities);

    if (primaryIdentityId && !nextIdentities.some((identity) => identity.identity_id === primaryIdentityId)) {
      setPrimaryIdentityId(null);
      await setPrimaryIdentityAction(null);
    }

    if (notifyOnSuccess) {
      toast.success("Cuentas vinculadas actualizadas.", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }

    setIsRefreshingIdentities(false);
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    const toastId = toast.loading("Guardando perfil...");

    const result = await updateProfileAction({
      name,
      surname,
      avatarUrl,
    });

    if (!result.ok) {
      toast.error(result.message, { id: toastId });
      setIsSavingProfile(false);
      return;
    }

    toast.success(result.message, { id: toastId });
    setIsSavingProfile(false);
    router.refresh();
  };

  const handleAvatarUpload = async (file: File) => {
    if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
      toast.error("Formato inválido. Solo JPG, PNG o WebP.");
      return;
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      toast.error("El archivo supera el límite de 2MB.");
      return;
    }

    setIsUploadingAvatar(true);
    const toastId = toast.loading("Subiendo avatar...");

    const filePath = `${userId}/avatar`;
    const uploadResponse = await supabase.storage.from("avatars").upload(filePath, file, {
      upsert: true,
      cacheControl: "3600",
      contentType: file.type,
    });

    if (uploadResponse.error) {
      toast.error("No se pudo subir el avatar.", { id: toastId });
      setIsUploadingAvatar(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const newAvatarUrl = data.publicUrl;

    const saveResult = await updateProfileAction({
      name,
      surname,
      avatarUrl: newAvatarUrl,
    });

    if (!saveResult.ok) {
      toast.error(saveResult.message, { id: toastId });
      setIsUploadingAvatar(false);
      return;
    }

    setAvatarUrl(newAvatarUrl);
    setAvatarCacheBust(Date.now());
    toast.success("Avatar actualizado correctamente.", { id: toastId });
    setIsUploadingAvatar(false);
    router.refresh();
  };

  const handleGoogleLink = async () => {
    if (googleIdentityCount >= 2) {
      toast.error("Solo podés vincular hasta 2 cuentas de Google.");
      return;
    }

    setIsLinkingGoogle(true);
    const toastId = toast.loading("Redirigiendo para vincular Google...");

    const { error } = await supabase.auth.linkIdentity({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/perfil`,
      },
    });

    if (error) {
      toast.error(error.message, { id: toastId });
      setIsLinkingGoogle(false);
      return;
    }

    toast.dismiss(toastId);
  };

  const handleUnlink = async (identity: IdentityRecord) => {
    if (identity.provider === "email") {
      toast.error("La cuenta de email principal no se puede desvincular.");
      return;
    }

    if (identities.length <= 1) {
      toast.error("No podés desvincular la última cuenta disponible.");
      return;
    }

    const toastId = toast.loading("Desvinculando cuenta...");

    const { error } = await supabase.auth.unlinkIdentity(identity);

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    if (primaryIdentityId === identity.identity_id) {
      const actionResult = await setPrimaryIdentityAction(null);

      if (!actionResult.ok) {
        toast.error(actionResult.message, { id: toastId });
      } else {
        setPrimaryIdentityId(null);
      }
    }

    await refreshIdentities();
    toast.success("Cuenta desvinculada correctamente.", { id: toastId });
  };

  const handleSetPrimary = async (identityId: string) => {
    setIsUpdatingPrimary(true);
    const toastId = toast.loading("Actualizando cuenta principal...");

    const result = await setPrimaryIdentityAction(identityId);

    if (!result.ok) {
      toast.error(result.message, { id: toastId });
      setIsUpdatingPrimary(false);
      return;
    }

    setPrimaryIdentityId(identityId);
    toast.success(result.message, { id: toastId });
    setIsUpdatingPrimary(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información personal
          </CardTitle>
          <CardDescription>Editá tu nombre, apellido y avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarDisplayUrl ?? undefined} alt={fullName} />
              <AvatarFallback>{fullName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar (JPG, PNG o WebP, máx. 2MB)</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={isUploadingAvatar}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    return;
                  }

                  void handleAvatarUpload(file);
                }}
              />
              <p className="text-xs text-muted-foreground">
                El nuevo archivo reemplaza automáticamente el avatar anterior.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="surname">Apellido</Label>
            <Input
              id="surname"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              maxLength={80}
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {email}
            </p>
          </div>

          <Button onClick={handleSaveProfile} disabled={isSavingProfile || isUploadingAvatar} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isSavingProfile ? "Guardando..." : "Guardar perfil"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Cuentas vinculadas
          </CardTitle>
          <CardDescription>
            1 cuenta de email y hasta 2 cuentas de Google por usuario.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLink}
            disabled={isLinkingGoogle || googleIdentityCount >= 2}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isLinkingGoogle ? "Redirigiendo..." : "Vincular cuenta de Google"}
          </Button>

          <div className="flex gap-2">
            <Badge variant="secondary">Google: {googleIdentityCount}/2</Badge>
            <Badge variant="outline">Email: 1/1</Badge>
          </div>

          <div className="space-y-2">
            {identities.map((identity) => {
              const isPrimary = primaryIdentityId === identity.identity_id;

              return (
                <div key={identity.identity_id} className="border rounded-md p-3 space-y-2">
                  <p className="text-sm font-medium">{getIdentityLabel(identity)}</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={isPrimary ? "default" : "outline"}
                      disabled={isUpdatingPrimary}
                      onClick={() => {
                        void handleSetPrimary(identity.identity_id);
                      }}
                    >
                      {isPrimary ? "Cuenta principal" : "Definir como principal"}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={identity.provider === "email"}
                      onClick={() => {
                        void handleUnlink(identity);
                      }}
                    >
                      Desvincular
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <Button variant="ghost" className="w-full" onClick={() => void refreshIdentities(true)} disabled={isRefreshingIdentities}>
            {isRefreshingIdentities ? "Actualizando cuentas..." : "Actualizar listado de cuentas"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
