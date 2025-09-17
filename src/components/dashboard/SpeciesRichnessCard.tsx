"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts"
import { Info } from "lucide-react"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const data = [
  { date: "May 2019", richness: 82, label: "May 2019" },
  { date: "Feb 2020", richness: 85, label: "Feb 2020" },
  { date: "Nov 2020", richness: 78, label: "Nov 2020" },
  { date: "Aug 2021", richness: 88, label: "Aug 2021" },
  { date: "May 2022", richness: 82, label: "May 2022" },
  { date: "Feb 2023", richness: 105, label: "Feb 2023" },
  { date: "May 2023", richness: 108, label: "May 2023" },
]

export function SpeciesRichnessCard() {
  return (
    <TooltipProvider>
      <Card className="bg-white border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-foreground">Species Richness</h2>
            <UITooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Number of different species identified in samples over time</p>
              </TooltipContent>
            </UITooltip>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-bold text-foreground">118.30</div>
            <div className="text-sm text-muted-foreground">Average per sample Q4 2023</div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-1 text-green-600 border-green-200 bg-green-50">
                +45%
              </Badge>
              <span className="text-sm text-muted-foreground">vs Mean of first 12 months of samples</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="label"
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  domain={[75, 115]}
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickCount={6}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="richness"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 5, fill: "#22c55e" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}