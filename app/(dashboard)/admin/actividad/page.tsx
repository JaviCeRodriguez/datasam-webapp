import { PageHeader } from "../_componentes/PageHeader"
import { getAdminActivity } from "../_lib/admin-data"
import { ActivityFilters } from "./_componentes/ActivityFilters"
import { ActivityTable } from "./_componentes/ActivityTable"

type ActividadPageProps = {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

function parsePage(value: string | undefined) {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return Math.floor(parsed)
}

export default async function ActividadPage({ searchParams }: Readonly<ActividadPageProps>) {
  const { q = "", page } = await searchParams
  const activityResult = await getAdminActivity(q, parsePage(page))

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <PageHeader title="Actividad" description="Monitorea eventos del sitio con búsqueda y paginación" />

      <div className="flex-1 p-6 space-y-6">
        <ActivityFilters initialSearch={q} />
        <ActivityTable
          items={activityResult.items}
          total={activityResult.total}
          page={activityResult.page}
          pageSize={activityResult.pageSize}
          totalPages={activityResult.totalPages}
          search={activityResult.search}
        />
      </div>
    </div>
  )
}
