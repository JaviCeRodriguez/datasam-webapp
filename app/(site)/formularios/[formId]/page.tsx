"use client"

import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { getFormById } from "@/lib/form-data"
import type { FormField as FormFieldType } from "@/lib/form-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function FormularioPublico() {
  const params = useParams()
  const formId = params.formId as string
  const form = getFormById(formId)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Formulario no encontrado</h2>
            <p className="text-muted-foreground mb-4">El formulario que buscas no existe o ha sido eliminado.</p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("[v0] Form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const renderField = (field: FormFieldType) => {
    const fieldError = errors[field.id]

    switch (field.type) {
      case "text":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id, {
                required: field.required ? `${field.label} es requerido` : false,
                minLength: field.validation?.minLength
                  ? {
                      value: field.validation.minLength,
                      message: `Mínimo ${field.validation.minLength} caracteres`,
                    }
                  : undefined,
                pattern: field.validation?.pattern
                  ? {
                      value: new RegExp(field.validation.pattern),
                      message: "Formato inválido",
                    }
                  : undefined,
              })}
            />
            {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
          </div>
        )

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id, {
                required: field.required ? `${field.label} es requerido` : false,
              })}
            />
            {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
          </div>
        )

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select onValueChange={(value) => setValue(field.id, value)}>
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
            {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
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
                  <Checkbox
                    id={`${field.id}-${option}`}
                    onCheckedChange={(checked) => {
                      const currentValues = watch(field.id) || []
                      if (checked) {
                        setValue(field.id, [...currentValues, option])
                      } else {
                        setValue(
                          field.id,
                          currentValues.filter((v: string) => v !== option),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`${field.id}-${option}`} className="text-sm font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
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
                  <Checkbox
                    id={`${field.id}-${option}`}
                    onCheckedChange={(checked) => {
                      const currentValues = watch(field.id) || []
                      if (checked) {
                        setValue(field.id, [...currentValues, option])
                      } else {
                        setValue(
                          field.id,
                          currentValues.filter((v: string) => v !== option),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`${field.id}-${option}`} className="text-sm font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">¡Formulario enviado!</h2>
            <p className="text-muted-foreground mb-4">
              Gracias por completar el formulario. Hemos recibido tu información.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {form.title}
            </CardTitle>
            {form.description && <CardDescription className="text-base">{form.description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {form.fields.map(renderField)}

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar formulario
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
