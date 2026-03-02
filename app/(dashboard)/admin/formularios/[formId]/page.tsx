"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { FormSchema } from "@/lib/form-types"
import { PageHeader } from "../../_componentes/PageHeader"
import FormBuilder from "./_componentes/FormBuilder"
import FormPreview from "./_componentes/FormPreview"
import { getAdminFormByIdAction, updateFormAction } from "../actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Eye, EyeOff } from "lucide-react"

export default function EditarFormulario() {
  const params = useParams()
  const formId = params.formId as string

  const [form, setForm] = useState<FormSchema | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadForm = async () => {
      const result = await getAdminFormByIdAction(formId)
      if (!result.ok || !result.data) {
        setErrorMessage(result.message || "El formulario que buscas no existe.")
        setIsLoading(false)
        return
      }

      setForm(result.data)
      setIsLoading(false)
    }

    loadForm()
  }, [formId])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Cargando formulario..." />
      </div>
    )
  }

  if (!form) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Formulario no encontrado" />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{errorMessage || "El formulario que buscas no existe."}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)

    const result = await updateFormAction(formId, {
      title: form.title,
      description: form.description || null,
      fields: form.fields,
      status: form.status,
      responseAccess: form.responseAccess,
    })

    if (!result.ok || !result.data) {
      setErrorMessage(result.message || "No se pudo guardar el formulario.")
      setIsSaving(false)
      return
    }

    setForm(result.data)
    setIsSaving(false)
  }

  const handleFormChange = (updatedForm: FormSchema) => {
    setForm(updatedForm)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <PageHeader title={`Editar: ${form.title}`} />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Ocultar vista previa
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Mostrar vista previa
              </>
            )}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
        {/* Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Editor de formulario</CardTitle>
              <CardDescription>Arrastra y suelta campos para crear tu formulario</CardDescription>
            </CardHeader>
            <CardContent>
              <FormBuilder form={form} onChange={handleFormChange} />
            </CardContent>
          </Card>
        </div>

        {/* Vista previa */}
        {showPreview && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vista previa</CardTitle>
                <CardDescription>Así verán el formulario los usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <FormPreview form={form} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
