import { FormBuilder } from "@/components/shared/form-builder";

export default function NewFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Crear nuevo formulario
        </h2>
        <p className="text-muted-foreground">
          Construye un formulario personalizado para recopilar respuestas
        </p>
      </div>

      <FormBuilder />
    </div>
  );
}
