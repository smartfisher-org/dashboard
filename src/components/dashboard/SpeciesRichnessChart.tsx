"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ComposedChart, Line, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { Info } from "lucide-react"

// Sample data showing fish activity and food delivery throughout the day
const data = [
  { time: "06:00", speed: 12, foodDelivery: 0, label: "06:00" },
  { time: "07:00", speed: 18, foodDelivery: 0, label: "07:00" },
  { time: "08:00", speed: 22, foodDelivery: 0, label: "08:00" },
  { time: "09:00", speed: 25, foodDelivery: 0, label: "09:00" },
  { time: "10:00", speed: 28, foodDelivery: 0, label: "10:00" },
  { time: "11:00", speed: 24, foodDelivery: 0, label: "11:00" },
  { time: "12:00", speed: 32, foodDelivery: 15, label: "12:00" },
  { time: "12:10", speed: 45, foodDelivery: 30, label: "12:10" },
  { time: "12:20", speed: 52, foodDelivery: 30, label: "12:20" },
  { time: "12:30", speed: 48, foodDelivery: 25, label: "12:30" },
  { time: "12:40", speed: 35, foodDelivery: 8, label: "12:40" },
  { time: "13:00", speed: 28, foodDelivery: 0, label: "13:00" },
  { time: "14:00", speed: 22, foodDelivery: 0, label: "14:00" },
  { time: "15:00", speed: 19, foodDelivery: 0, label: "15:00" },
  { time: "16:00", speed: 18, foodDelivery: 0, label: "16:00" },
  { time: "17:00", speed: 20, foodDelivery: 0, label: "17:00" },
  { time: "18:00", speed: 24, foodDelivery: 0, label: "18:00" },
  { time: "19:00", speed: 26, foodDelivery: 0, label: "19:00" },
  { time: "20:00", speed: 22, foodDelivery: 0, label: "20:00" },
  { time: "21:00", speed: 18, foodDelivery: 0, label: "21:00" },
]

export function SpeciesRichnessChart() {
  return (
    <Card className="w-full max-w-4xl bg-background border border-border hover-scale transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-foreground">Speed Activity & Food Delivery Timeline</h2>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-5xl font-bold text-foreground">28.4</div>
            <div className="text-sm text-muted-foreground mt-1">Average speed (cm/s) today</div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400">
              +12%
            </Badge>
            <span className="text-sm text-muted-foreground">vs yesterday's activity</span>
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Speed Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Food Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                interval={2}
              />
              <YAxis
                yAxisId="speed"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                label={{ value: 'Speed (cm/s)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: "hsl(var(--muted-foreground))" } }}
              />
              <YAxis
                yAxisId="food"
                orientation="right"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                label={{ value: 'Food (g/min)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: "hsl(var(--muted-foreground))" } }}
              />
              <Area
                yAxisId="food"
                type="monotone"
                dataKey="foodDelivery"
                fill="rgba(249, 115, 22, 0.3)"
                stroke="rgba(249, 115, 22, 0.8)"
                strokeWidth={2}
                fillOpacity={0.6}
              />
              <Line
                yAxisId="speed"
                type="monotone"
                dataKey="speed"
                stroke="rgba(59, 130, 246, 0.9)"
                strokeWidth={3}
                dot={{ fill: "rgba(59, 130, 246, 0.9)", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, fill: "rgba(59, 130, 246, 0.9)" }}
                connectNulls={true}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}