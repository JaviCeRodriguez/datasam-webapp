import createSupabaseServer from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from "@/queries/get-user";
import {
  Users,
  GraduationCap,
  FileText,
  Share2,
  TrendingUp,
  TrendingDown,
  HardHat,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock KPI data
const kpiData = {
  registeredUsers: {
    total: 1247,
    change: 12.5,
    trend: "up" as const,
    description: "Usuarios registrados",
  },
  unsamUsers: {
    total: 892,
    change: 8.3,
    trend: "up" as const,
    description: "Usuarios con dominio UNSAM",
  },
  formResponses: {
    total: 156,
    change: -3.2,
    trend: "down" as const,
    description: "Respuestas de formularios (último mes)",
  },
  sharedResources: {
    total: 234,
    change: 15.7,
    trend: "up" as const,
    description: "Recursos compartidos por estudiantes (este mes)",
  },
};

function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
}: {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: any;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Badge
            variant={trend === "up" ? "default" : "secondary"}
            className="flex items-center space-x-1"
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(change)}%</span>
          </Badge>
          <span>vs mes anterior</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default async function Dashboard() {
  const queryClient = new QueryClient();
  const supabase = await createSupabaseServer();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUser(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <Alert variant="warning">
          <HardHat className="h-4 w-4" />
          <AlertTitle className="font-bold">Datos de demostración</AlertTitle>
          <AlertDescription>
            Los datos mostrados son de demostración. Los datos reales estarán
            disponibles próximamente.
          </AlertDescription>
        </Alert>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de métricas y actividad de la plataforma
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Usuarios Registrados"
            value={kpiData.registeredUsers.total}
            change={kpiData.registeredUsers.change}
            trend={kpiData.registeredUsers.trend}
            icon={Users}
            description={kpiData.registeredUsers.description}
          />
          <KPICard
            title="Usuarios UNSAM"
            value={kpiData.unsamUsers.total}
            change={kpiData.unsamUsers.change}
            trend={kpiData.unsamUsers.trend}
            icon={GraduationCap}
            description={kpiData.unsamUsers.description}
          />
          <KPICard
            title="Respuestas Formularios"
            value={kpiData.formResponses.total}
            change={kpiData.formResponses.change}
            trend={kpiData.formResponses.trend}
            icon={FileText}
            description={kpiData.formResponses.description}
          />
          <KPICard
            title="Recursos Compartidos"
            value={kpiData.sharedResources.total}
            change={kpiData.sharedResources.change}
            trend={kpiData.sharedResources.trend}
            icon={Share2}
            description={kpiData.sharedResources.description}
          />
        </div>
      </div>
    </HydrationBoundary>
  );
}
