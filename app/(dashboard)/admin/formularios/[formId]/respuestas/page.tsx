"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Mail, Download } from "lucide-react"
import { PageHeader } from "../../_componentes/PageHeader"

// Mock data para las respuestas
const mockResponses = [
  {
    id: 1,
    submittedAt: "2024-02-15T10:30:00Z",
    userEmail: "juan.perez@unsam.edu.ar",
    userName: "Juan Pérez",
    isUnsam: true,
    responses: {
      nombre: "Juan Pérez",
      email: "juan.perez@unsam.edu.ar",
      satisfaccion: "Muy satisfecho",
      comentarios: "Excelente plataforma, muy útil para el estudio.",
      materias_interes: ["Algoritmos", "Base de Datos"],
    },
  },
  {
    id: 2,
    submittedAt: "2024-02-14T15:45:00Z",
    userEmail: "maria.garcia@gmail.com",
    userName: "María García",
    isUnsam: false,
    responses: {
      nombre: "María García",
      email: "maria.garcia@gmail.com",
      satisfaccion: "Satisfecho",
      comentarios: "Buena herramienta, podría mejorar la interfaz.",
      materias_interes: ["Matemática", "Física"],
    },
  },
  {
    id: 3,
    submittedAt: "2024-02-13T09:15:00Z",
    userEmail: "carlos.rodriguez@unsam.edu.ar",
    userName: "Carlos Rodríguez",
    isUnsam: true,
    responses: {
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@unsam.edu.ar",
      satisfaccion: "Neutral",
      comentarios: "Está bien, pero necesita más funcionalidades.",
      materias_interes: ["Programación"],
    },
  },
]

const mockForm = {
  id: 1,
  title: "Encuesta de Satisfacción 2024",
  description: "Evaluación de la experiencia estudiantil en DataSam",
}

export default function FormResponsesPage() {
  const params = useParams()
  const formId = params.formId as string

  const [responses] = useState(mockResponses)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader title={`Respuestas: ${mockForm.title}`} description={`${responses.length} respuestas recibidas`} />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Todas las respuestas</h2>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      <div className="space-y-4">
        {responses.map((response) => (
          <Card key={response.id} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{response.userName}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{response.userEmail}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={response.isUnsam ? "default" : "secondary"}>
                    {response.isUnsam ? "UNSAM" : "Externo"}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(response.submittedAt)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(response.responses).map(([field, value]) => (
                  <div key={field} className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground capitalize">
                      {field.replace(/_/g, " ")}
                    </label>
                    <div className="text-sm bg-muted/30 p-3 rounded-md border">
                      {Array.isArray(value) ? (
                        <div className="flex flex-wrap gap-1">
                          {value.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="break-words">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
