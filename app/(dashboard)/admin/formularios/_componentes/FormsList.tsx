"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users, Calendar, MoreHorizontal, Eye, Edit, Copy, Trash2, Plus, BarChart3 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - en el futuro esto vendrá de una API
const mockForms = [
  {
    id: 1,
    title: "Encuesta de Satisfacción 2024",
    description: "Evaluación de la experiencia estudiantil en DataSam",
    status: "active",
    responses: 45,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-01",
  },
  {
    id: 2,
    title: "Registro de Interés - Nuevas Materias",
    description: "Formulario para conocer el interés en materias optativas",
    status: "draft",
    responses: 0,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
  },
  {
    id: 3,
    title: "Feedback Profesores",
    description: "Evaluación del desempeño docente por materia",
    status: "closed",
    responses: 128,
    createdAt: "2023-12-01",
    updatedAt: "2024-01-31",
  },
]

export function FormsList() {
  const [forms] = useState(mockForms)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "draft":
        return "Borrador"
      case "closed":
        return "Cerrado"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (forms.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay formularios</h3>
          <p className="text-muted-foreground text-center mb-4">
            Comienza creando tu primer formulario para estudiantes.
          </p>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Crear Primer Formulario
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {forms.map((form) => (
        <Card key={form.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl">{form.title}</CardTitle>
                <p className="text-muted-foreground">{form.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/formularios/${form.id}`} className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver formulario
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/formularios/${form.id}`} className="flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/formularios/${form.id}/respuestas`} className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver respuestas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(form.status)}>{getStatusText(form.status)}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {form.responses} respuestas
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Actualizado {formatDate(form.updatedAt)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
