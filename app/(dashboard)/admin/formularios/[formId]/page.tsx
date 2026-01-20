"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { getFormById } from "@/lib/form-data"
import type { FormSchema } from "@/lib/form-types"
import { PageHeader } from "../../_componentes/PageHeader"
import FormBuilder from "./_componentes/FormBuilder"
import FormPreview from "./_componentes/FormPreview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Eye, EyeOff } from "lucide-react"

export default function EditarFormulario() {
  const params = useParams()
  const formId = params.formId as string
  const initialForm = getFormById(formId)

  const [form, setForm] = useState<FormSchema | null>(initialForm || null)
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  if (!form) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Formulario no encontrado" />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">El formulario que buscas no existe.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("[v0] Form saved:", form)
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
