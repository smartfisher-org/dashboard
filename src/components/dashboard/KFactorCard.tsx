"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Info } from "lucide-react"

const data = [
  { name: "Expected", value: 85, label: "Expected" },
  { name: "Actual", value: 92, label: "Actual" },
  { name: "Variance", value: 7, label: "Variance" },
]

export function KFactorCard() {
  return (
    <Card className="w-full bg-white shadow-sm border-l-4 border-l-biomass-primary">
      <CardHeader className="pb-4 bg-biomass-light/50">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-biomass-primary">K-Factor</h2>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">The K-factor indicates fish condition and health. Values around 1.0 are optimal, while lower values may indicate poor condition or health issues.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-5xl font-bold text-gray-900">1.23</div>
            <div className="text-sm text-gray-500 mt-1">Weight vs length ratio Q4 2023</div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
              +8%
            </Badge>
            <span className="text-sm text-gray-600">vs expected baseline</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <XAxis
                dataKey="label"
                name="Date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                interval={0}
                tickMargin={10}
                height={40}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickCount={5}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--biomass-primary))"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">K-Factor indicates healthy fish condition</span> with actual measurements
            exceeding expected values by 8%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}