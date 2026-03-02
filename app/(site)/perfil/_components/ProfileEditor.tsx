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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Link2, Lock, Mail, Save, Upload, User } from "lucide-react";
import {
  linkEmailPasswordAction,
  setPrimaryIdentityAction,
  syncIdentityProvidersAction,
  updateProfileAction,
} from "../actions";
import type { UserIdentity } from "@supabase/supabase-js";
import { toast } from "sonner";

type IdentityRecord = UserIdentity;
type SupportedProvider = "email" | "google";

type ProfileEditorProps = {
  userId: string;
  email: string;
  initialName: string;
  initialSurname: string;
  initialAvatarUrl: string | null;
  initialPrimaryIdentityId: string | null;
  initialIdentities: IdentityRecord[];
  initialLinkedProviders: string[];
};

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function normalizeProvider(value: unknown): SupportedProvider | null {
  if (value === "google" || value === "email") {
    return value;
  }

  return null;
}

function normalizeLinkedProviders(values: string[]): SupportedProvider[] {
  const unique = new Set<SupportedProvider>();

  for (const value of values) {
    const provider = normalizeProvider(value);
    if (provider) {
      unique.add(provider);
    }
  }

  return Array.from(unique);
}

function getIdentityId(identity: IdentityRecord): string | null {
  if (typeof identity.identity_id === "string") {
    return identity.identity_id;
  }

  if (typeof identity.id === "string") {
    return identity.id;
  }

  return null;
}

function getIdentityLabel(identity: IdentityRecord): string {
  const email = identity.identity_data?.email;
  const name = identity.identity_data?.full_name ?? identity.identity_data?.name;
  const normalizedProvider = normalizeProvider(identity.provider);
  const provider = normalizedProvider === "google" ? "Google" : normalizedProvider === "email" ? "Email" : "Cuenta";

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
  initialLinkedProviders,
}: ProfileEditorProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState(initialName);
  const [surname, setSurname] = useState(initialSurname);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [avatarCacheBust, setAvatarCacheBust] = useState(0);
  const [identities, setIdentities] = useState<IdentityRecord[]>(initialIdentities);
  const [linkedProviders, setLinkedProviders] = useState<SupportedProvider[]>(
    normalizeLinkedProviders(initialLinkedProviders)
  );
  const [primaryIdentityId, setPrimaryIdentityId] = useState(initialPrimaryIdentityId);
  const [isEmailLinkModalOpen, setIsEmailLinkModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isLinkingGoogle, setIsLinkingGoogle] = useState(false);
  const [isLinkingEmailPassword, setIsLinkingEmailPassword] = useState(false);
  const [isUpdatingPrimary, setIsUpdatingPrimary] = useState(false);
  const [isRefreshingIdentities, setIsRefreshingIdentities] = useState(false);

  const hasGoogleProvider = linkedProviders.includes("google");
  const hasEmailProvider = linkedProviders.includes("email");
  const visibleIdentities = identities.filter((identity) => {
    const provider = normalizeProvider(identity.provider);
    return provider ? linkedProviders.includes(provider) : false;
  });
  const fullName = `${name} ${surname}`.trim() || email;
  const avatarDisplayUrl = avatarUrl ? `${avatarUrl}${avatarCacheBust > 0 ? `?v=${avatarCacheBust}` : ""}` : null;

  const refreshIdentities = async (notifyOnSuccess = false, silent = false) => {
    setIsRefreshingIdentities(true);
    const toastId = silent ? null : toast.loading("Actualizando cuentas vinculadas...");

    const { data, error } = await supabase.auth.getUserIdentities();

    if (error) {
      if (toastId) {
        toast.error("No se pudieron actualizar las cuentas vinculadas.", { id: toastId });
      }
      setIsRefreshingIdentities(false);
      return;
    }

    const nextIdentities = (data?.identities ?? []) as IdentityRecord[];
    setIdentities(nextIdentities);

    const syncResult = await syncIdentityProvidersAction();

    if (!syncResult.ok) {
      if (toastId) {
        toast.error(syncResult.message, { id: toastId });
      }
      setIsRefreshingIdentities(false);
      return;
    }

    const nextLinkedProviders = normalizeLinkedProviders(syncResult.linkedProviders ?? []);
    setLinkedProviders(nextLinkedProviders);

    const visibleIdentityIds = new Set(
      nextIdentities
        .filter((identity) => {
          const provider = normalizeProvider(identity.provider);
          return provider ? nextLinkedProviders.includes(provider) : false;
        })
        .map((identity) => getIdentityId(identity))
        .filter((identityId): identityId is string => typeof identityId === "string")
    );

    if (primaryIdentityId && !visibleIdentityIds.has(primaryIdentityId)) {
      setPrimaryIdentityId(null);
      await setPrimaryIdentityAction(null);
    }

    if (notifyOnSuccess) {
      if (toastId) {
        toast.success("Cuentas vinculadas actualizadas.", { id: toastId });
      }
    } else if (toastId) {
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
    if (hasGoogleProvider) {
      toast.error("Solo podés vincular 1 cuenta de Google.");
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

  const handleLinkEmailPassword = async () => {
    if (newPassword.trim().length < 6) {
      toast.error("Ingresá una contraseña de al menos 6 caracteres.");
      return;
    }

    setIsLinkingEmailPassword(true);
    const toastId = toast.loading("Vinculando email y contraseña...");

    const result = await linkEmailPasswordAction({
      password: newPassword,
      email: newEmail,
    });

    if (!result.ok) {
      toast.error(result.message, { id: toastId });
      setIsLinkingEmailPassword(false);
      return;
    }

    setLinkedProviders(normalizeLinkedProviders(result.linkedProviders ?? []));
    setNewEmail("");
    setNewPassword("");
    setIsEmailLinkModalOpen(false);
    await refreshIdentities(false, true);
    toast.success(result.message, { id: toastId });
    setIsLinkingEmailPassword(false);
    router.refresh();
  };

  const handleUnlink = async (identity: IdentityRecord) => {
    const provider = normalizeProvider(identity.provider);

    if (provider === "email") {
      toast.error("La cuenta de email principal no se puede desvincular.");
      return;
    }

    if (linkedProviders.length <= 1) {
      toast.error("No podés desvincular la última cuenta disponible.");
      return;
    }

    if (provider === "google" && !hasEmailProvider) {
      toast.error("Primero vinculá email y contraseña antes de desvincular Google.");
      return;
    }

    const identityId = getIdentityId(identity);
    if (!identityId) {
      toast.error("No se pudo identificar la cuenta seleccionada.");
      return;
    }

    const toastId = toast.loading("Desvinculando cuenta...");

    const { error } = await supabase.auth.unlinkIdentity(identity);

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    if (primaryIdentityId === identityId) {
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
            Hasta 1 cuenta de email con contraseña y 1 cuenta de Google por usuario.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasEmailProvider ? (
            <Dialog open={isEmailLinkModalOpen} onOpenChange={setIsEmailLinkModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Vincular email y contraseña
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Vincular email y contraseña</DialogTitle>
                  <DialogDescription>
                    Podés usar tu email actual o ingresar uno distinto.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="new-email">Email (opcional)</Label>
                    <Input
                      id="new-email"
                      type="email"
                      value={newEmail}
                      onChange={(event) => setNewEmail(event.target.value)}
                      placeholder={`Actual: ${email}`}
                      disabled={isLinkingEmailPassword}
                    />
                    <p className="text-xs text-muted-foreground">
                      Si lo dejás vacío, usamos {email}.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Contraseña</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      minLength={6}
                      placeholder="Ingresá una contraseña"
                      disabled={isLinkingEmailPassword}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEmailLinkModalOpen(false)}
                    disabled={isLinkingEmailPassword}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleLinkEmailPassword} disabled={isLinkingEmailPassword}>
                    {isLinkingEmailPassword ? "Vinculando..." : "Confirmar vinculación"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="border rounded-md p-3 text-sm text-muted-foreground">
              La cuenta de email y contraseña ya está vinculada.
            </div>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLink}
            disabled={isLinkingGoogle || hasGoogleProvider}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isLinkingGoogle ? "Redirigiendo..." : "Vincular cuenta de Google"}
          </Button>

          <div className="flex gap-2">
            <Badge variant="secondary">Google: {hasGoogleProvider ? "1/1" : "0/1"}</Badge>
            <Badge variant="outline">Email: {hasEmailProvider ? "1/1" : "0/1"}</Badge>
          </div>

          <div className="space-y-2">
            {visibleIdentities.map((identity) => {
              const identityId = getIdentityId(identity);
              if (!identityId) {
                return null;
              }

              const provider = normalizeProvider(identity.provider);
              const isPrimary = primaryIdentityId === identityId;

              return (
                <div key={identityId} className="border rounded-md p-3 space-y-2">
                  <p className="text-sm font-medium">{getIdentityLabel(identity)}</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={isPrimary ? "default" : "outline"}
                      disabled={isUpdatingPrimary}
                      onClick={() => {
                        void handleSetPrimary(identityId);
                      }}
                    >
                      {isPrimary ? "Cuenta principal" : "Definir como principal"}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={provider === "email" || (provider === "google" && !hasEmailProvider)}
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
