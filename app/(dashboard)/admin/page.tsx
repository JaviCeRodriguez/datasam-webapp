import { DashboardHeader } from "./_componentes/DashboardHeader"
import { StatsCards } from "./_componentes/StatsCards"
import { ProgressChart } from "./_componentes/ProgressChart"
import { RecentActivity } from "./_componentes/RecentActivity"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <DashboardHeader />

      <div className="flex-1 p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCards />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProgressChart />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
