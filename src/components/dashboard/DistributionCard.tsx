"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Info } from "lucide-react"

const data = [
  { range: "0-10g", value: 8, label: "0-10g" },
  { range: "10-20g", value: 15, label: "10-20g" },
  { range: "20-30g", value: 28, label: "20-30g" },
  { range: "30-40g", value: 35, label: "30-40g" },
  { range: "40-50g", value: 42, label: "40-50g" },
  { range: "50-60g", value: 28, label: "50-60g" },
  { range: "60-70g", value: 18, label: "60-70g" },
  { range: "70-80g", value: 12, label: "70-80g" },
  { range: "80-90g", value: 6, label: "80-90g" },
  { range: "90-100g", value: 3, label: "90-100g" },
]

export function DistributionCard() {
  return (
    <Card className="w-full bg-white shadow-sm border-l-4 border-l-biomass-primary">
      <CardHeader className="pb-4 bg-biomass-light/50">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-biomass-primary">Weight Distribution</h2>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Shows the distribution of fish weights in the population. A normal distribution indicates healthy growth patterns.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-5xl font-bold text-gray-900">Normal</div>
            <div className="text-sm text-gray-500 mt-1">Distribution pattern observed</div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              Healthy
            </Badge>
            <span className="text-sm text-gray-600">Min/Max on tails of the bell curve</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6B7280" }}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickCount={5}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--biomass-primary))"
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Weight distribution follows normal pattern</span> with peak around 40-50g
            indicating healthy population structure
          </p>
        </div>
      </CardContent>
    </Card>
  )
}