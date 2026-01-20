"use client"

import type { FormSchema, FormField } from "@/lib/form-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

interface FormPreviewProps {
  form: FormSchema
}

export default function FormPreview({ form }: FormPreviewProps) {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`preview-${field.id}`}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input id={`preview-${field.id}`} placeholder={field.placeholder} disabled />
          </div>
        )

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`preview-${field.id}`}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea id={`preview-${field.id}`} placeholder={field.placeholder} disabled />
          </div>
        )

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case "multiselect":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={`preview-${field.id}-${option}`} disabled />
                  <Label htmlFor={`preview-${field.id}-${option}`} className="text-sm font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )

      case "checkbox":
      case "multicheckbox":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={`preview-${field.id}-${option}`} disabled />
                  <Label htmlFor={`preview-${field.id}-${option}`} className="text-sm font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {form.title}
          </CardTitle>
          {form.description && <CardDescription>{form.description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {form.fields.map(renderField)}

            <div className="pt-4">
              <Button className="w-full" disabled>
                <Send className="w-4 h-4 mr-2" />
                Enviar formulario
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg text-muted-foreground">Debug - Estructura del Formulario</CardTitle>
          <CardDescription>
            Esta información te ayudará a entender cómo guardar el formulario en la base de datos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Esquema del Formulario (JSON):</Label>
              <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-96">
                {JSON.stringify(form, null, 2)}
              </pre>
            </div>

            <div>
              <Label className="text-sm font-medium">Estructura para Base de Datos:</Label>
              <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto">
                {`// Tabla: forms
{
  id: "${form.id}",
  title: "${form.title}",
  description: "${form.description || ""}",
  fields: ${JSON.stringify(form.fields, null, 2)},
  created_at: "timestamp",
  updated_at: "timestamp"
}

// Tabla: form_responses (para cada respuesta)
{
  id: "uuid",
  form_id: "${form.id}",
  responses: {
    // Cada campo tendrá su valor aquí
    ${form.fields.map((field) => `"${field.id}": "valor_del_usuario"`).join(",\n    ")}
  },
  submitted_at: "timestamp"
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
