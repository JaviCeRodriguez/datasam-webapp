"use client"
import { useEffect, useMemo, useState } from "react"
import { studyPlan } from "@/lib/study-plan-data"
import { useSubjectProgress } from "@/app/hooks/useSubjectProgress"
import { calculateProgress, calculateCredits } from "@/app/utils/progressCalculations"
import {
  getPersistedSubjectProgress,
  sanitizeSubjectProgress,
  type SubjectProgress,
  type SubjectStatus,
} from "@/lib/store/subjectProgressStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { ProgressOverview } from "./_componentes/ProgressOverview"
import { SubjectCard } from "./_componentes/SubjectCard"
import { clearSubjectProgressAction, getSubjectProgressAction, upsertSubjectProgressAction } from "./actions"

function hasNonPendingProgress(progress: SubjectProgress): boolean {
  return Object.values(progress).some((status) => status !== "pending")
}

function isSameProgress(left: SubjectProgress, right: SubjectProgress): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

export default function MateriasPage() {
  const { subjectProgress, updateSubjectStatus, setSubjectProgress, resetProgress, canTakeSubject } = useSubjectProgress()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasHydratedDb, setHasHydratedDb] = useState(false)
  const [showSyncButton, setShowSyncButton] = useState(false)
  const [hasConflict, setHasConflict] = useState(false)
  const [isSavingRemote, setIsSavingRemote] = useState(false)
  const [isSyncingLocal, setIsSyncingLocal] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [hasLocalResetDraft, setHasLocalResetDraft] = useState(false)

  const shouldSaveDirectlyToDb = isAuthenticated && hasHydratedDb && !showSyncButton && !hasConflict

  const statusLabel = useMemo(() => {
    if (!isAuthenticated) {
      return "Guardando en localStorage"
    }

    if (hasConflict) {
      return "Conflicto detectado: elegí qué versión conservar"
    }

    if (showSyncButton) {
      return "Hay progreso local pendiente de sincronizar"
    }

    return "Guardado directo en base de datos"
  }, [isAuthenticated, hasConflict, showSyncButton])

  const persistToDb = async (progress: SubjectProgress) => {
    setIsSavingRemote(true)
    const result = await upsertSubjectProgressAction(progress)
    setIsSavingRemote(false)

    if (!result.ok) {
      toast.error(result.message ?? "No se pudo guardar el progreso.")
      return false
    }

    return true
  }

  const handleUpdateStatus = async (code: string, status: SubjectStatus) => {
    const nextProgress = sanitizeSubjectProgress({
      ...subjectProgress,
      [code]: status,
    })

    updateSubjectStatus(code, status)

    if (!shouldSaveDirectlyToDb) {
      return
    }

    await persistToDb(nextProgress)
  }

  const handleUseDbVersion = async () => {
    const loadingId = toast.loading("Aplicando versión de base de datos...")
    const result = await getSubjectProgressAction()

    if (!result.ok) {
      toast.error(result.message ?? "No se pudo cargar el progreso remoto.", { id: loadingId })
      return
    }

    setSubjectProgress(result.progress)
    setHasConflict(false)
    setShowSyncButton(false)
    toast.success("Se aplicó la versión de base de datos.", { id: loadingId })
  }

  const handleUseLocalVersion = async () => {
    const localProgress = getPersistedSubjectProgress()

    if (!hasNonPendingProgress(localProgress)) {
      setHasConflict(false)
      setShowSyncButton(false)
      toast.message("No hay progreso local para sincronizar.")
      return
    }

    const loadingId = toast.loading("Sincronizando versión local...")
    const ok = await persistToDb(localProgress)

    if (!ok) {
      toast.error("No se pudo sincronizar la versión local.", { id: loadingId })
      return
    }

    setSubjectProgress(localProgress)
    setHasConflict(false)
    setShowSyncButton(false)
    toast.success("Versión local sincronizada correctamente.", { id: loadingId })
  }

  const handleSyncLocalProgress = async () => {
    const localProgress = getPersistedSubjectProgress()

    if (!hasNonPendingProgress(localProgress)) {
      setShowSyncButton(false)
      toast.message("No hay progreso local para sincronizar.")
      return
    }

    setIsSyncingLocal(true)
    const loadingId = toast.loading("Sincronizando progreso local...")
    const ok = await persistToDb(localProgress)
    setIsSyncingLocal(false)

    if (!ok) {
      toast.error("No se pudo sincronizar el progreso local.", { id: loadingId })
      return
    }

    setShowSyncButton(false)
    setSubjectProgress(localProgress)
    toast.success("Progreso local sincronizado en la base de datos.", { id: loadingId })
  }

  const handleResetLocalDraft = () => {
    resetProgress()
    setHasLocalResetDraft(true)
    setIsResetDialogOpen(false)
    toast.success("Borrador local aplicado. Todavía no se guardó en la base de datos.")
  }

  const handleConfirmResetDb = async () => {
    setIsSavingRemote(true)
    const result = await clearSubjectProgressAction()
    setIsSavingRemote(false)

    if (!result.ok) {
      toast.error(result.message ?? "No se pudo reiniciar el progreso en la base de datos.")
      return
    }

    resetProgress()
    setHasLocalResetDraft(false)
    setIsResetDialogOpen(false)
    toast.success("Progreso reiniciado en localStorage y base de datos.")
  }

  const handleSaveDraftToDb = async () => {
    const loadingId = toast.loading("Guardando borrador local en la base de datos...")
    const ok = await persistToDb(subjectProgress)

    if (!ok) {
      toast.error("No se pudo guardar el borrador en la base de datos.", { id: loadingId })
      return
    }

    setHasLocalResetDraft(false)
    toast.success("Borrador guardado en la base de datos.", { id: loadingId })
  }

  useEffect(() => {
    let isMounted = true

    const loadProgress = async () => {
      const localProgress = getPersistedSubjectProgress()
      const localHasData = hasNonPendingProgress(localProgress)

      const result = await getSubjectProgressAction()

      if (!isMounted) {
        return
      }

      if (!result.ok) {
        toast.error(result.message ?? "No se pudo inicializar el progreso.")
        setHasHydratedDb(true)
        return
      }

      if (!result.isAuthenticated) {
        setIsAuthenticated(false)
        setHasHydratedDb(true)
        setShowSyncButton(false)
        return
      }

      const dbProgress = sanitizeSubjectProgress(result.progress)
      const dbHasData = result.hasDbData

      setIsAuthenticated(true)
      setHasHydratedDb(true)

      if (dbHasData) {
        if (localHasData && !isSameProgress(localProgress, dbProgress)) {
          setHasConflict(true)
          setShowSyncButton(false)
          return
        }

        setSubjectProgress(dbProgress)
        setHasConflict(false)
        setShowSyncButton(false)
        return
      }

      if (localHasData) {
        setShowSyncButton(true)
        setHasConflict(false)
        return
      }

      setShowSyncButton(false)
      setHasConflict(false)
    }

    void loadProgress()

    return () => {
      isMounted = false
    }
  }, [setSubjectProgress])

  const progress = calculateProgress(subjectProgress)
  const credits = calculateCredits(subjectProgress)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Plan de Estudios</h1>
            <p className="text-xl text-muted-foreground">Licenciatura en Ciencia de Datos</p>
          </div>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Estado de guardado</CardTitle>
              <CardDescription>{statusLabel}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2 pt-0">
              {showSyncButton && (
                <Button onClick={handleSyncLocalProgress} disabled={isSyncingLocal || isSavingRemote}>
                  {isSyncingLocal ? "Sincronizando..." : "Sincronizar progreso local"}
                </Button>
              )}

              {hasConflict && (
                <>
                  <Button onClick={handleUseDbVersion} disabled={isSavingRemote} variant="outline">
                    Usar versión DB
                  </Button>
                  <Button onClick={handleUseLocalVersion} disabled={isSavingRemote}>
                    Usar versión local
                  </Button>
                </>
              )}

              {isAuthenticated && hasLocalResetDraft && (
                <Button onClick={handleSaveDraftToDb} disabled={isSavingRemote}>
                  Guardar borrador en DB
                </Button>
              )}

              {isAuthenticated && (
                <Button variant="outline" onClick={() => setIsResetDialogOpen(true)} disabled={isSavingRemote}>
                  Reiniciar progreso
                </Button>
              )}
            </CardContent>
          </Card>

          <ProgressOverview progress={progress} credits={credits} />
        </div>

        <div className="space-y-8">
          {studyPlan.map((yearData) => (
            <div key={yearData.year} className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-6">Año {yearData.year}</h2>

              {yearData.quarters.map((quarter) => (
                <div key={quarter.quarter} className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Cuatrimestre {quarter.quarter}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quarter.content.map((subject) => {
                      const status = subjectProgress[subject.code] || "pending"
                      const canTake = canTakeSubject(subject)

                      return (
                        <SubjectCard
                          key={subject.code}
                          subject={subject}
                          status={status}
                          canTake={canTake}
                          onUpdateStatus={handleUpdateStatus}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reiniciar progreso</AlertDialogTitle>
            <AlertDialogDescription>
              Podés aplicar un borrador local primero o confirmar el reinicio permanente en base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                void handleConfirmResetDb()
              }}
            >
              Reiniciar en DB
            </AlertDialogAction>
            <Button variant="outline" onClick={handleResetLocalDraft}>
              Solo borrador local
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
