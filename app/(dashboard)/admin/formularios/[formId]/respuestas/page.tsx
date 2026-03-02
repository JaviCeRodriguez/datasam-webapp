"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Mail, Download } from "lucide-react"
import { PageHeader } from "../../_componentes/PageHeader"
import type { FormField, FormResponse } from "@/lib/form-types"
import { getAdminFormByIdAction, getFormResponsesAction } from "../../actions"

export default function FormResponsesPage() {
  const params = useParams()
  const formId = params.formId as string

  const [responses, setResponses] = useState<FormResponse[]>([])
  const [formTitle, setFormTitle] = useState("Formulario")
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      const [formResult, responsesResult] = await Promise.all([
        getAdminFormByIdAction(formId),
        getFormResponsesAction(formId),
      ])

      if (!formResult.ok || !formResult.data) {
        setErrorMessage(formResult.message || "No se pudo cargar el formulario.")
        setIsLoading(false)
        return
      }

      setFormTitle(formResult.data.title)
  setFormFields(formResult.data.fields)

      if (!responsesResult.ok || !responsesResult.data) {
        setErrorMessage(responsesResult.message || "No se pudieron cargar las respuestas.")
        setIsLoading(false)
        return
      }

      setResponses(responsesResult.data)
      setIsLoading(false)
    }

    loadData()
  }, [formId])

  const getResponseValueAsString = (value: unknown): string => {
    if (value === null || value === undefined) {
      return ""
    }

    if (Array.isArray(value)) {
      return value.map((item) => String(item)).join(" | ")
    }

    if (typeof value === "object") {
      return JSON.stringify(value)
    }

    return String(value)
  }

  const escapeCsvCell = (value: string): string => {
    const escaped = value.replace(/"/g, '""')
    return `"${escaped}"`
  }

  const handleExportCsv = () => {
    const baseHeaders = ["response_id", "submitted_at", "user_name", "user_email", "user_id"]
    const fieldHeaders = formFields.map((field) => field.id)
    const headers = [...baseHeaders, ...fieldHeaders]

    const rows = responses.map((response) => {
      const baseValues = [
        response.id,
        response.submittedAt,
        response.userName || "",
        response.userEmail || "",
        response.userId || "",
      ]

      const fieldValues = formFields.map((field) => getResponseValueAsString(response.responses[field.id]))

      return [...baseValues, ...fieldValues].map(escapeCsvCell).join(",")
    })

    const csvContent = [headers.map(escapeCsvCell).join(","), ...rows].join("\n")
    const csvBlob = new Blob(["\uFEFF", csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(csvBlob)

    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `respuestas-${formId}.csv`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)

    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return <div className="space-y-6 text-muted-foreground">Cargando respuestas...</div>
  }

  if (errorMessage) {
    return <div className="space-y-6 text-destructive">{errorMessage}</div>
  }

  return (
    <div className="space-y-6">
      <PageHeader title={`Respuestas: ${formTitle}`} description={`${responses.length} respuestas recibidas`} />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Todas las respuestas</h2>
        <Button variant="outline" onClick={handleExportCsv} disabled={responses.length === 0}>
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
                    <CardTitle className="text-lg">{response.userName || "Respuesta anónima"}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{response.userEmail || "Sin email"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={response.userEmail?.endsWith("@unsam.edu.ar") ? "default" : "secondary"}>
                    {response.userEmail?.endsWith("@unsam.edu.ar") ? "UNSAM" : "Externo"}
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
                              {String(item)}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="break-words">{String(value ?? "")}</span>
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
