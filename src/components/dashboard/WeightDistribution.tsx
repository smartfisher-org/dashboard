import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  Line,
  ComposedChart,
} from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { generateWeightData } from "@/utils/dataService";
import { useEffect, useState } from "react";

function createHistogramData(data: number[], binSize: number = 10) {
  if (data.length === 0) return [];

  const min = 50;
  const max = 110;
  const binCount = Math.ceil((max - min) / binSize);

  const histogramData = Array.from({ length: binCount }, (_, i) => {
    const binStart = min + i * binSize;
    const binEnd = binStart + binSize;
    const midpoint = binStart + binSize / 2;

    const frequency = data.filter((value) =>
      i === binCount - 1
        ? value >= binStart && value <= binEnd
        : value >= binStart && value < binEnd
    ).length;

    return {
      weight: midpoint,
      range: `${Math.round(binStart)}-${Math.round(binEnd)}g`,
      frequency,
    };
  });

  return histogramData;
}

function createDensityCurve(data: number[], points: number = 60) {
  if (data.length === 0) return [];
  
  const min = 50;
  const max = 110;
  const step = (max - min) / (points - 1);
  
  // Calculate mean and standard deviation
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);
  
  // Create smooth density curve using normal distribution approximation
  const curve = Array.from({ length: points }, (_, i) => {
    const x = min + i * step;
    const density = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
                   Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
    
    // Scale density to match frequency scale
    const scaledDensity = density * data.length * 10;
    
    return {
      weight: x,
      density: scaledDensity,
    };
  });
  
  return curve;
}

function calculateStatsWithBins(data: number[], bins: any[]) {
  if (data.length === 0)
    return { mean: 0, min: 0, max: 0, range: 0, q1: 0, q3: 0 };

  const sorted = [...data].sort((a, b) => a - b);
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];

  return {
    mean: Math.round(mean * 10) / 10,
    min,
    max,
    range,
    q1,
    q3,
  };
}

export function WeightDistribution() {
  const { filters } = useDashboard();
  const [weightData, setWeightData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await generateWeightData(filters);
        const weights = data.map(
          (weight) => Math.round((weight * 1000) / 10) * 10
        );
        setWeightData(weights);
      } catch (error) {
        console.error("Error fetching weight distribution data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col bg-background border border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Weight Distribution
            </CardTitle>
            <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 pr-4 pb-4">
          <div className="w-full h-full min-h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const binSize = 10;
  const histogramData = createHistogramData(weightData, binSize);
  const densityCurve = createDensityCurve(weightData);
  const stats = calculateStatsWithBins(weightData, histogramData);

  // Combine histogram and density data for the chart
  const chartData = histogramData.map(bin => {
    const curvePoint = densityCurve.find(point => 
      Math.abs(point.weight - bin.weight) < 5
    );
    return {
      ...bin,
      density: curvePoint?.density || 0
    };
  });

  return (
    <TooltipProvider>
      <Card className="bg-background border border-border hover-scale transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                Weight Distribution - {filters.location.replace("-", " ")}
              </CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Density chart showing the probability distribution of fish weights
                    in the population
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="range"
                  axisLine
                  tickLine
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Weight (g)",
                    position: "insideBottom",
                    offset: -10,
                    style: {
                      textAnchor: "middle",
                      fill: "hsl(var(--muted-foreground))",
                    },
                  }}
                />
                <YAxis
                  axisLine
                  tickLine
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Frequency",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      textAnchor: "middle",
                      fill: "hsl(var(--muted-foreground))",
                    },
                  }}
                />

                <Bar
                  dataKey="frequency"
                  fill="rgba(59, 130, 246, 0.6)"
                  stroke="rgba(59, 130, 246, 0.8)"
                  strokeWidth={0}
                />
                <Line
                  type="monotone"
                  dataKey="density"
                  stroke="rgba(59, 130, 246, 1)"
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Stats table */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mean:</span>
                  <span className="font-medium text-foreground">
                    {stats.mean}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q1:</span>
                  <span className="font-medium text-foreground">
                    {stats.q1}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q3:</span>
                  <span className="font-medium text-foreground">
                    {stats.q3}g
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min:</span>
                  <span className="font-medium text-foreground">
                    {stats.min}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max:</span>
                  <span className="font-medium text-foreground">
                    {stats.max}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Range:</span>
                  <span className="font-medium text-foreground">
                    {stats.range}g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
