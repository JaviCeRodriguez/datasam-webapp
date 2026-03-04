import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

type ActivityFiltersProps = {
  initialSearch: string
}

export function ActivityFilters({ initialSearch }: Readonly<ActivityFiltersProps>) {
  const hasActiveFilters = initialSearch.trim().length > 0

  return (
    <form className="flex flex-col sm:flex-row gap-4" method="get">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          name="q"
          placeholder="Buscar actividad por tipo, usuario, acción o target..."
          defaultValue={initialSearch}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="outline" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar
        </Button>

        {hasActiveFilters ? (
          <Button type="button" variant="ghost" asChild className="flex items-center gap-2">
            <a href="/admin/actividad">
              <X className="h-4 w-4" />
              Limpiar
            </a>
          </Button>
        ) : null}
      </div>
    </form>
  )
}
