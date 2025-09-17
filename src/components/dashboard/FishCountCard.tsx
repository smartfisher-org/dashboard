"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts"
import { Info } from "lucide-react"
import { useDashboard } from "@/contexts/DashboardContext"
import { generateFishCountData } from "@/utils/dataService"
import { useEffect, useState } from "react"

export function FishCountCard() {
  const { filters } = useDashboard();
  const [data, setData] = useState([{ date: "#N/A", value: 0, label: "#N/A" }]);

  useEffect(() => {
    const fetchData = async () => {
      const fishData = await generateFishCountData(filters);
      setData(fishData);
    };
    fetchData();
  }, [filters]);

  const firstYearMean = 1000;
  const currentValue = data[data.length - 1]?.value || 0;
  return (
    <Card className="w-full bg-white shadow-sm border-l-4 border-l-biomass-primary">
      <CardHeader className="pb-4 bg-biomass-light/50">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-biomass-primary">Fish Count</h2>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Tracks the total number of fish in the system. The dashed line represents the baseline average for comparison.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-5xl font-bold text-gray-900">
              {typeof currentValue === 'number' ? currentValue.toLocaleString() : currentValue}
            </div>
            <div className="text-sm text-gray-500 mt-1">Average per sample - {filters.location.replace('-', ' ')}</div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
              +12%
            </Badge>
            <span className="text-sm text-gray-600">vs last sampling event</span>
            <div className="flex items-center gap-2 ml-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 cursor-help">
                    <div className="w-3 h-0.5 border-t-2 border-dashed border-gray-400"></div>
                    <span className="text-xs text-gray-500">baseline mean</span>
                    <Info className="h-3 w-3 text-gray-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The baseline mean represents the average fish count from the first year of data collection, used as a reference point for comparison.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-64 w-full">
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
                domain={[950, 1300]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickCount={5}
              />
              <ReferenceLine y={firstYearMean} stroke="#9CA3AF" strokeDasharray="4 4" strokeWidth={1} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--biomass-primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--biomass-primary))", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "hsl(var(--biomass-primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Fish count increased by 12%</span> in the most recent sampling event
            compared to the baseline average
          </p>
        </div>
      </CardContent>
    </Card>
  )
}