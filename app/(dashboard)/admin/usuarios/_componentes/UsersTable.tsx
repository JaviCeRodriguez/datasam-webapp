"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Mail, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data - en el futuro esto vendrá de una API
const mockUsers = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@unsam.edu.ar",
    avatar: "/portrait-woman.png",
    isUnsam: true,
    registeredAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@gmail.com",
    avatar: "/carlos-rodriguez-portrait.png",
    isUnsam: false,
    registeredAt: "2024-01-20",
  },
  {
    id: 3,
    name: "María López",
    email: "maria.lopez@unsam.edu.ar",
    avatar: "/portrait-maria-lopez.png",
    isUnsam: true,
    registeredAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Juan Pérez",
    email: "juan.perez@hotmail.com",
    avatar: "/portrait-juan-perez.png",
    isUnsam: false,
    registeredAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Laura Martínez",
    email: "laura.martinez@unsam.edu.ar",
    avatar: "/laura-martinez-portrait.png",
    isUnsam: true,
    registeredAt: "2024-02-15",
  },
]

export function UsersTable() {
  const [users] = useState(mockUsers)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Lista de Usuarios ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
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
                <TableCell className="text-sm text-muted-foreground">{formatDate(user.registeredAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                      <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Suspender usuario</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
