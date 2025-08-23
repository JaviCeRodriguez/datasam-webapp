"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"
import Link from "next/link"

export function FormsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Formularios
        </h1>
        <p className="text-muted-foreground">Crea y gestiona formularios para estudiantes de DataSam.</p>
      </div>

      <Button
        asChild
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
      >
        <Link href="/admin/formularios/crear">
          <Plus className="h-4 w-4 mr-2" />
          Crear Formulario
        </Link>
      </Button>
    </div>
  )
}
