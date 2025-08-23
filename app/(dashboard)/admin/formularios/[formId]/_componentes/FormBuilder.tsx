"use client"

import { useState } from "react"
import type { FormSchema, FormField } from "@/lib/form-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Trash2, GripVertical, Type, AlignLeft, List, CheckSquare } from "lucide-react"

interface FormBuilderProps {
  form: FormSchema
  onChange: (form: FormSchema) => void
}

const fieldTypes = [
  { value: "text", label: "Texto", icon: Type },
  { value: "textarea", label: "Área de texto", icon: AlignLeft },
  { value: "select", label: "Selección simple", icon: List },
  { value: "multiselect", label: "Selección múltiple", icon: List },
  { value: "checkbox", label: "Checkbox simple", icon: CheckSquare },
  { value: "multicheckbox", label: "Checkbox múltiple", icon: CheckSquare },
]

export default function FormBuilder({ form, onChange }: FormBuilderProps) {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const updateForm = (updates: Partial<FormSchema>) => {
    onChange({ ...form, ...updates, updatedAt: new Date().toISOString() })
  }

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `Nuevo campo ${type}`,
      required: false,
      ...(type.includes("select") || type.includes("checkbox") ? { options: ["Opción 1", "Opción 2"] } : {}),
    }

    updateForm({
      fields: [...form.fields, newField],
    })
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    updateForm({
      fields: form.fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)),
    })
  }

  const removeField = (fieldId: string) => {
    updateForm({
      fields: form.fields.filter((field) => field.id !== fieldId),
    })
    if (selectedField === fieldId) {
      setSelectedField(null)
    }
  }

  const moveField = (fieldId: string, direction: "up" | "down") => {
    const currentIndex = form.fields.findIndex((field) => field.id === fieldId)
    if (currentIndex === -1) return

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= form.fields.length) return

    const newFields = [...form.fields]
    const [movedField] = newFields.splice(currentIndex, 1)
    newFields.splice(newIndex, 0, movedField)

    updateForm({ fields: newFields })
  }

  const selectedFieldData = form.fields.find((field) => field.id === selectedField)

  return (
    <div className="space-y-6">
      {/* Información básica del formulario */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-title">Título del formulario</Label>
          <Input id="form-title" value={form.title} onChange={(e) => updateForm({ title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="form-description">Descripción</Label>
          <Textarea
            id="form-description"
            value={form.description || ""}
            onChange={(e) => updateForm({ description: e.target.value })}
            placeholder="Descripción opcional del formulario"
          />
        </div>
      </div>

      {/* Agregar campos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Agregar campos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {fieldTypes.map((fieldType) => {
            const Icon = fieldType.icon
            return (
              <Button
                key={fieldType.value}
                variant="outline"
                size="sm"
                onClick={() => addField(fieldType.value as FormField["type"])}
                className="justify-start"
              >
                <Icon className="w-4 h-4 mr-2" />
                {fieldType.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Lista de campos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campos del formulario</h3>
        {form.fields.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No hay campos en este formulario. Agrega algunos usando los botones de arriba.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {form.fields.map((field, index) => (
              <Card
                key={field.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => {
                  setSelectedField(field.id)
                  setIsEditModalOpen(true)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{field.label}</span>
                          <Badge variant="secondary" className="text-xs">
                            {fieldTypes.find((t) => t.value === field.type)?.label}
                          </Badge>
                          {field.required && (
                            <Badge variant="destructive" className="text-xs">
                              Requerido
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">ID: {field.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          moveField(field.id, "up")
                        }}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          moveField(field.id, "down")
                        }}
                        disabled={index === form.fields.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeField(field.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Editor de campo seleccionado */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFieldData ? `Editar campo: ${selectedFieldData.label}` : "Editar campo"}</DialogTitle>
          </DialogHeader>

          {selectedFieldData && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Etiqueta</Label>
                <Input
                  value={selectedFieldData.label}
                  onChange={(e) => updateField(selectedField!, { label: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Placeholder</Label>
                <Input
                  value={selectedFieldData.placeholder || ""}
                  onChange={(e) => updateField(selectedField!, { placeholder: e.target.value })}
                  placeholder="Texto de ayuda para el usuario"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={selectedFieldData.required || false}
                  onCheckedChange={(checked) => updateField(selectedField!, { required: checked })}
                />
                <Label>Campo requerido</Label>
              </div>

              {(selectedFieldData.type.includes("select") || selectedFieldData.type.includes("checkbox")) && (
                <div className="space-y-2">
                  <Label>Opciones</Label>
                  <div className="space-y-2">
                    {selectedFieldData.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(selectedFieldData.options || [])]
                            newOptions[index] = e.target.value
                            updateField(selectedField!, { options: newOptions })
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newOptions = selectedFieldData.options?.filter((_, i) => i !== index)
                            updateField(selectedField!, { options: newOptions })
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [
                          ...(selectedFieldData.options || []),
                          `Opción ${(selectedFieldData.options?.length || 0) + 1}`,
                        ]
                        updateField(selectedField!, { options: newOptions })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar opción
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
