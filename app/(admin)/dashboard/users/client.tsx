"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSupabaseBrowser from "@/lib/supabase/client";
import { getUsersView } from "@/queries/get-users";
import { useQuery } from "@tanstack/react-query";

type UserMetadata = {
  picture?: string;
  full_name?: string;
  custom_claims?: {
    global_name?: string;
  };
};

type User = {
  id: string | null;
  email: string | null;
  raw_user_meta_data: Json | null;
  role_name: string | null;
  created_at: string | null;
  phone: string | null;
};

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export default function UsersClient() {
  const supabase = useSupabaseBrowser();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersView(supabase, { page: 0, perPage: 40 }),
  });

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "basic":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "collaborator":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getUserFullname = (user: User) => {
    const metadata = user.raw_user_meta_data as UserMetadata | null;
    if (!metadata?.full_name) return "Usuario sin nombre";
    if (!metadata?.custom_claims?.global_name) return metadata.full_name;
    return `${metadata.full_name} (${metadata.custom_claims.global_name})`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Nunca";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoadingUsers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha de registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron usuarios
                </TableCell>
              </TableRow>
            ) : (
              users?.data?.map((user) => {
                const metadata = user.raw_user_meta_data as UserMetadata | null;
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={metadata?.picture || ""}
                            alt={metadata?.full_name || ""}
                          />
                          <AvatarFallback>
                            {getInitials(metadata?.full_name || null)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {getUserFullname(user)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getRoleBadgeColor(user.role_name || "basic")}
                      >
                        {(user.role_name || "basic").charAt(0).toUpperCase() +
                          (user.role_name || "basic").slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
