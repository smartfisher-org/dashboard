"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts"
import { Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDashboard } from "@/contexts/DashboardContext"
import { generateBiomassData } from "@/utils/dataService"
import { useEffect, useState } from "react"

export function BiomassCard() {
  const { filters } = useDashboard();
  const [data, setData] = useState([{ date: "#N/A", value: 0, label: "#N/A" }]);

  useEffect(() => {
    const fetchData = async () => {
      const biomassData = await generateBiomassData(filters);
      setData(biomassData);
    };
    fetchData();
  }, [filters]);

  const totalData = data.map(item => ({ ...item, value: item.value * 40 })); // Scale for total
  const firstYearMean = 2.2;
  const currentValue = data[data.length - 1]?.value || 0;

  return (
    <Card className="w-full bg-white shadow-sm border-l-4 border-l-biomass-primary">
      <CardHeader className="pb-4 bg-biomass-light/50">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-biomass-primary">Total Biomass</h2>
          <Info className="h-4 w-4 text-gray-400" />
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-5xl font-bold text-gray-900">{currentValue} kg</div>
            <div className="text-sm text-gray-500 mt-1">Average per sample - {filters.location.replace('-', ' ')}</div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
              +27%
            </Badge>
            <span className="text-sm text-gray-600">vs first year average</span>
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 border-t-2 border-dashed border-gray-400"></div>
                <span className="text-xs text-gray-500">first year mean</span>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Tabs defaultValue="average" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="average" className="text-xs">Average</TabsTrigger>
            <TabsTrigger value="total" className="text-xs">Total</TabsTrigger>
          </TabsList>
          
          <TabsContent value="average">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    interval={0}
                  />
                  <YAxis
                    domain={[1.8, 3.0]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickCount={5}
                  />
                  <ReferenceLine y={firstYearMean} stroke="#9CA3AF" strokeDasharray="4 4" strokeWidth={1} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--biomass-primary))"
                    fill="hsl(var(--biomass-primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="total">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={totalData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    interval={0}
                  />
                  <YAxis
                    domain={[75, 110]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickCount={5}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--biomass-primary))"
                    fill="hsl(var(--biomass-primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Biomass increased by 27%</span> in the most recent sampling event
            compared to the first year baseline
          </p>
        </div>
      </CardContent>
    </Card>
  )
}