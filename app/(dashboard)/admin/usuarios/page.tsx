import { PageHeader } from "../_componentes/PageHeader"
import { UsersTable } from "./_componentes/UsersTable"
import { UsersFilters } from "./_componentes/UsersFilters"
import { getAdminUsers } from "../_lib/admin-data"

type UsuariosPageProps = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function UsuariosPage({ searchParams }: UsuariosPageProps) {
  const { q = "" } = await searchParams
  const usersResult = await getAdminUsers(q)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <PageHeader title="Usuarios" description="Gestiona y visualiza todos los usuarios registrados en la plataforma" />

      <div className="flex-1 p-6 space-y-6">
        <UsersFilters initialSearch={q} />
        <UsersTable users={usersResult.items} total={usersResult.total} />
      </div>
    </div>
  )
}
