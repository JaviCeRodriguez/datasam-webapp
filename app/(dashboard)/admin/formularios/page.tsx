import { PageHeader } from "../_componentes/PageHeader"
import { FormsHeader } from "./_componentes/FormsHeader"
import { FormsList } from "./_componentes/FormsList"
import { CreateFormDialog } from "./_componentes/CreateFormDialog"

export default function FormulariosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <PageHeader title="Formularios" description="Crea y gestiona formularios para estudiantes" />

      <div className="flex-1 p-6 space-y-6">
        <FormsHeader />
        <FormsList />
        <CreateFormDialog />
      </div>
    </div>
  )
}
