"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UsersFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [emailFilter, setEmailFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const clearFilters = () => {
    setSearchTerm("")
    setEmailFilter("all")
  }

  const hasActiveFilters = searchTerm || emailFilter !== "all"

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Email</label>
            <Select value={emailFilter} onValueChange={setEmailFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por email" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="unsam">Solo UNSAM</SelectItem>
                <SelectItem value="external">Externos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Búsqueda: {searchTerm}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
            </Badge>
          )}
          {emailFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Email: {emailFilter === "unsam" ? "UNSAM" : "Externos"}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setEmailFilter("all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
