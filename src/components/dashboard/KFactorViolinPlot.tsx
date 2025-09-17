import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ErrorBar } from "recharts";

// Time series data with mean K-factor and standard deviation
const kFactorData = [
  { date: "2023-03", mean: 2.4, sd: 1.1, lower: 1.3, upper: 3.5 },
  { date: "2023-04", mean: 2.1, sd: 1.0, lower: 1.1, upper: 3.1 },
  { date: "2023-05", mean: 2.0, sd: 1.0, lower: 1.0, upper: 3.0 },
  { date: "2023-06", mean: 2.5, sd: 1.4, lower: 1.1, upper: 3.9 },
  { date: "2023-07", mean: 2.5, sd: 1.6, lower: 0.9, upper: 4.1 },
  { date: "2023-08", mean: 2.4, sd: 1.4, lower: 1.0, upper: 3.8 },
  { date: "2023-09", mean: 2.2, sd: 1.6, lower: 0.6, upper: 3.8 },
  { date: "2023-10", mean: 2.1, sd: 1.0, lower: 1.1, upper: 3.1 },
  { date: "2023-11", mean: 2.2, sd: 1.2, lower: 1.0, upper: 3.4 },
  { date: "2023-12", mean: 1.8, sd: 0.9, lower: 0.9, upper: 2.7 },
  { date: "2024-01", mean: 3.4, sd: 0.0, lower: 3.4, upper: 3.4 },
];

// Custom error bar component
const CustomErrorBar = (props: any) => {
  const { payload, x, y } = props;
  if (!payload) return null;
  
  const errorBarWidth = 8;
  const upperY = y - ((payload.upper - payload.mean) * 50); // Scale factor for visualization
  const lowerY = y + ((payload.mean - payload.lower) * 50);
  
  return (
    <g>
      {/* Vertical line */}
      <line
        x1={x}
        y1={upperY}
        x2={x}
        y2={lowerY}
        stroke="rgba(59, 130, 246, 0.8)"
        strokeWidth={2}
      />
      {/* Upper cap */}
      <line
        x1={x - errorBarWidth/2}
        y1={upperY}
        x2={x + errorBarWidth/2}
        y2={upperY}
        stroke="rgba(59, 130, 246, 0.8)"
        strokeWidth={2}
      />
      {/* Lower cap */}
      <line
        x1={x - errorBarWidth/2}
        y1={lowerY}
        x2={x + errorBarWidth/2}
        y2={lowerY}
        stroke="rgba(59, 130, 246, 0.8)"
        strokeWidth={2}
      />
    </g>
  );
};

export function KFactorViolinPlot() {
  return (
    <TooltipProvider>
      <Card className="bg-background border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-foreground">Time Series of Mean K-factor with Variability (± SD)</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Time series showing mean K-factor values over time with error bars indicating standard deviation</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={kFactorData} 
                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date"
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: "hsl(var(--muted-foreground))" } }}
                />
                <YAxis
                  domain={[0.5, 4.5]}
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  label={{ value: 'Mean K-factor', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: "hsl(var(--muted-foreground))" } }}
                />
                
                <Line
                  type="monotone"
                  dataKey="mean"
                  stroke="rgba(59, 130, 246, 1)"
                  strokeWidth={2}
                  dot={{ fill: "rgba(59, 130, 246, 1)", strokeWidth: 2, r: 4 }}
                />
                
                {/* Error bars as custom SVG elements */}
                <Line
                  type="monotone"
                  dataKey="upper"
                  stroke="rgba(59, 130, 246, 0.8)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="0"
                />
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="rgba(59, 130, 246, 0.8)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="0"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}