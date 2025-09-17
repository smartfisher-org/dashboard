"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Info } from "lucide-react"

const data = [
  { time: "00:00", speed: 15, food: 20, label: "00:00" },
  { time: "04:00", speed: 18, food: 22, label: "04:00" },
  { time: "08:00", speed: 12, food: 18, label: "08:00" },
  { time: "12:00", speed: 22, food: 25, label: "12:00" },
  { time: "16:00", speed: 20, food: 23, label: "16:00" },
  { time: "20:00", speed: 25, food: 28, label: "20:00" },
]

export function SpeedActivityCard() {
  return (
    <Card className="w-full bg-white shadow-sm border-l-4 border-l-health-primary">
      <CardHeader className="pb-4 bg-health-light/50">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-health-primary">Speed Activity</h2>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Tracks fish swimming speed patterns over time. Variations can indicate changes in health, feeding behavior, or water conditions.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-5xl font-bold text-gray-900">Active</div>
            <div className="text-sm text-gray-500 mt-1">Current behavior status</div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
              +8%
            </Badge>
            <span className="text-sm text-gray-600">vs previous hour</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Speed Activity</span>
            <span className="font-medium text-health-primary">High</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  interval={0}
                />
                <YAxis
                  domain={[0, 30]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickCount={4}
                />
                <Line
                  type="monotone"
                  dataKey="speed"
                  stroke="hsl(var(--health-primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--health-primary))", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--health-primary))" }}
                />
                <Line
                  type="monotone"
                  dataKey="food"
                  stroke="hsl(var(--health-secondary))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--health-secondary))", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--health-secondary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Food Delivery</span>
            <span className="font-medium text-health-primary">Optimal</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Activity levels increased by 8%</span> compared to previous hour
            with optimal food delivery timing
          </p>
        </div>
      </CardContent>
    </Card>
  )
}