"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { FormSchema } from "@/lib/form-types"
import { PageHeader } from "../../_componentes/PageHeader"
import FormBuilder from "../[formId]/_componentes/FormBuilder"
import FormPreview from "../[formId]/_componentes/FormPreview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Eye, EyeOff } from "lucide-react"

export default function CrearFormulario() {
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [form, setForm] = useState<FormSchema>({
    id: `form_${Date.now()}`,
    title: "Nuevo Formulario",
    description: "",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("[v0] New form created:", form)
    setIsSaving(false)
    // Redirigir a la lista de formularios después de crear
    router.push("/admin/formularios")
  }

  const handleFormChange = (updatedForm: FormSchema) => {
    setForm(updatedForm)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Crear Formulario" description="Diseña un nuevo formulario para estudiantes" />
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
          <Button
            onClick={handleSave}
            disabled={isSaving || !form.title.trim() || form.fields.length === 0}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Creando..." : "Crear Formulario"}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
        {/* Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Editor de formulario</CardTitle>
              <CardDescription>
                Configura el título, descripción y agrega campos para crear tu formulario
              </CardDescription>
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
                <CardDescription>Así verán el formulario los estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                {form.fields.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Agrega campos al formulario para ver la vista previa</p>
                  </div>
                ) : (
                  <FormPreview form={form} />
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
