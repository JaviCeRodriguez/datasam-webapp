import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, User } from "lucide-react"
import type { AdminUserItem } from "../../_lib/admin-types"

type UsersTableProps = {
  users: AdminUserItem[]
  total: number
}

export function UsersTable({ users, total }: UsersTableProps) {

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatDate = (dateIso: string) => {
    return new Date(dateIso).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getProviderLabel = (provider: string) => {
    if (provider === "google") {
      return "Google"
    }

    if (provider === "email") {
      return "Email"
    }

    return provider
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Lista de Usuarios ({total})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 && <p className="text-sm text-muted-foreground">No se encontraron usuarios para esa búsqueda.</p>}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>UNSAM</TableHead>
              <TableHead>Cuentas vinculadas</TableHead>
              <TableHead>Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={user.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.fullName}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.isUnsam ? "default" : "secondary"}
                    className={user.isUnsam ? "bg-gradient-to-r from-primary to-secondary" : ""}
                  >
                    {user.isUnsam ? "UNSAM" : "Externo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.linkedProviders.length === 0 && <Badge variant="outline">Sin sincronizar</Badge>}
                    {user.linkedProviders.map((provider) => (
                      <Badge key={provider} variant={provider === user.primaryProvider ? "default" : "secondary"}>
                        {getProviderLabel(provider)}
                        {provider === user.primaryProvider ? " (principal)" : ""}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
