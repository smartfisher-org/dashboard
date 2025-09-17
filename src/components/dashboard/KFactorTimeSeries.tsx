import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ErrorBar, ReferenceLine } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { useEffect, useState } from "react";

// Generate time-based K-factor data
const generateKFactorData = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  const data = [];
  const baseK = 1.0; // Target K-factor
  
  for (let i = 0; i <= days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    
    // Add some natural variation (±0.2) with slight trends
    const trend = Math.sin(i / 3) * 0.05; // Gentle up/down trend
    const randomVariation = (Math.random() - 0.5) * 0.1; // Small random variation
    const mean = baseK + trend + randomVariation;
    
    // Standard deviation (slightly higher on weekends for demo purposes)
    const isWeekend = [0, 6].includes(currentDate.getDay());
    const sd = isWeekend ? 0.12 : 0.08;
    
    data.push({
      date: currentDate,
      formattedDate: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mean: parseFloat(mean.toFixed(3)),
      sd: parseFloat(sd.toFixed(3)),
      errorY: parseFloat((mean + sd).toFixed(3)),
      errorYNeg: parseFloat((mean - sd).toFixed(3))
    });
  }
  
  return data;
};

export function KFactorTimeSeries() {
  const { filters } = useDashboard();
  const [kFactorData, setKFactorData] = useState<Array<{
    date: string;
    mean: number;
    sd: number;
    errorY: number;
    errorYNeg: number;
  }>>([]);

  useEffect(() => {
    // Generate data based on the selected date range
    const data = generateKFactorData(filters.startDate, filters.endDate);
    setKFactorData(data);
  }, [filters.startDate, filters.endDate]);
  
  return (
    <TooltipProvider>
      <Card className="h-full flex flex-col bg-background border border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">K-Factor Time Series</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] text-sm">
                  <p>Shows the K-factor over time, indicating fish condition. Values around 1.0 indicate healthy fish.</p>
                  <p className="mt-2 text-muted-foreground">The green dashed line shows the ideal K-factor of 1.0.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 pr-4 pb-4">
          <div className="w-full h-full min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={400}>
              <LineChart 
                data={kFactorData} 
                margin={{ top: 20, right: 40, left: 40, bottom: 40 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.3}
                />
                <XAxis 
                  dataKey="date"
                  name="Date"
                  tickCount={Math.min(10, kFactorData.length)}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  label={{ 
                    value: 'Date', 
                    position: 'insideBottom', 
                    offset: -10,
                    style: { fill: '#666', textAnchor: 'middle' }
                  }}
                  height={50}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  domain={[0.7, 1.3]}
                  tickCount={7}
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: 'K-factor', 
                    angle: -90, 
                    position: 'left', 
                    offset: 10,
                    style: { fill: '#666', textAnchor: 'middle' }
                  }}
                />
                
                {/* Reference line at K=1.0 */}
                <ReferenceLine 
                  y={1.0} 
                  stroke="#10b981" 
                  strokeDasharray="3 3"
                  strokeWidth={1.5}
                  strokeOpacity={0.7}
                  label={{
                    value: 'Ideal',
                    position: 'right',
                    fill: '#10b981',
                    fontSize: 12,
                    offset: 5
                  }}
                />
                
                <Line
                  type="monotone"
                  dataKey="mean"
                  name="Mean K-factor"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ 
                    r: 6, 
                    strokeWidth: 2, 
                    fill: '#3B82F6', 
                    stroke: '#fff' 
                  }}
                >
                  <ErrorBar 
                    dataKey="sd"
                    width={4}
                    stroke="#3B82F6"
                    strokeWidth={1}
                    opacity={0.7}
                  />
                </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </TooltipProvider>
  );
}