"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import type { ProgressByYearDatum } from "../_lib/admin-types"

type ProgressChartProps = {
  data: ProgressByYearDatum[]
}

export function ProgressChart({ data }: ProgressChartProps) {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Progreso por Año
        </CardTitle>
        <CardDescription>Materias aprobadas y tasa de aprobación por año académico</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            approvedCount: {
              label: "Aprobadas",
              color: "var(--chart-1)",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="yearLabel" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="approvedCount" fill="var(--color-approvedCount)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <div key={item.yearLabel} className="text-xs text-muted-foreground flex items-center justify-between">
              <span>{item.yearLabel}</span>
              <span className="font-medium text-foreground">
                {item.approvedCount} aprobadas / {item.attemptedCount} intentadas ({item.approvalRate.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
