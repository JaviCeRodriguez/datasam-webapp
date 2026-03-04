import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { AdminActivityItem } from "../../_lib/admin-types"

type ActivityTableProps = {
  items: AdminActivityItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  search: string
}

function buildPageHref(page: number, search: string) {
  const params = new URLSearchParams()

  if (search.trim()) {
    params.set("q", search)
  }

  params.set("page", String(page))

  return `/admin/actividad?${params.toString()}`
}

function formatDate(dateIso: string) {
  return new Date(dateIso).toLocaleString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ActivityTable({ items, total, page, pageSize, totalPages, search }: Readonly<ActivityTableProps>) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad del sitio ({total})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay actividad para mostrar con ese criterio.</p>
        ) : null}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Acción</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Hace</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-sm text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.typeLabel}</Badge>
                </TableCell>
                <TableCell className="font-medium">{item.user}</TableCell>
                <TableCell>{item.connectorText}</TableCell>
                <TableCell className="text-primary">{item.target}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.timeLabel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Mostrando {from}-{to} de {total} registros
          </p>

          <div className="flex items-center gap-2">
            {page <= 1 ? (
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href={buildPageHref(Math.max(1, page - 1), search)}>Anterior</Link>
              </Button>
            )}
            <Badge variant="outline">Página {page} de {totalPages}</Badge>
            {page >= totalPages ? (
              <Button variant="outline" size="sm" disabled>
                Siguiente
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href={buildPageHref(Math.min(totalPages, page + 1), search)}>Siguiente</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
