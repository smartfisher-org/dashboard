import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Line, ComposedChart, ReferenceLine } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { generateWeightData } from "@/utils/dataService";
import { useEffect, useState } from "react";

function createHistogramData(data: number[], binSize: number = 2) {
  if (data.length === 0) return [];
  
  // Fixed range from 10cm to 38cm to match the reference image
  const min = 10;
  const max = 38;
  const binWidth = binSize;
  const binCount = Math.ceil((max - min) / binWidth);
  
  const bins = Array.from({ length: binCount }, (_, i) => {
    const binStart = min + i * binWidth;
    const binEnd = min + (i + 1) * binWidth;
    const frequency = data.filter(value => 
      i === binCount - 1 ? value >= binStart && value <= binEnd : value >= binStart && value < binEnd
    ).length;
    
    return {
      range: `${Math.round(binStart)}-${Math.round(binEnd)}`,
      frequency,
      midpoint: (binStart + binEnd) / 2,
      binStart,
      binEnd
    };
  });
  
  return bins;
}

function calculateStatsWithBins(data: number[], bins: any[]) {
  if (data.length === 0) return { mean: 0, min: 0, max: 0, range: 0, q1: 0, q3: 0, meanBin: 0, q1Bin: 0, q3Bin: 0 };
  
  const sorted = [...data].sort((a, b) => a - b);
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  
  // Find which bin each statistic falls into
  const findBin = (value: number) => {
    return bins.findIndex(bin => value >= bin.binStart && value <= bin.binEnd);
  };
  
  return {
    mean: Math.round(mean * 10) / 10, min, max, range, q1, q3,
    meanBin: findBin(mean),
    q1Bin: findBin(q1),
    q3Bin: findBin(q3),
  };
}

export function LengthHistogram() {
  const { filters } = useDashboard();
  const [lengthData, setLengthData] = useState([0]);

  useEffect(() => {
    const fetchData = async () => {
      const weightData = await generateWeightData(filters);
      // Generate length data based on weight data (approximate conversion)
      const lengths = weightData.map(weight => Math.round(weight * 25 + 5)); // Convert kg to cm approximation
      setLengthData(lengths);
    };
    fetchData();
  }, [filters]);

  const histogramData = createHistogramData(lengthData, 2); // Use 2cm bin size
  const stats = calculateStatsWithBins(lengthData, histogramData);
  
  return (
    <TooltipProvider>
      <Card className="bg-background border border-border hover-scale transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                Length Distribution - {filters.location.replace('-', ' ')}
              </CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Histogram showing the frequency distribution of fish lengths in the population</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }} barCategoryGap={0}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="range"
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  label={{ value: 'Length (cm)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: "hsl(var(--muted-foreground))" } }}
                />
                <YAxis
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: "hsl(var(--muted-foreground))" } }}
                />
                <ReferenceLine x={stats.q1Bin} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" strokeWidth={1} label={{ value: "Q1", position: "top" }} />
                <ReferenceLine x={stats.meanBin} stroke="hsl(var(--primary))" strokeDasharray="4 4" strokeWidth={2} label={{ value: "Mean", position: "top" }} />
                <ReferenceLine x={stats.q3Bin} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" strokeWidth={1} label={{ value: "Q3", position: "top" }} />
                <Bar
                  dataKey="frequency"
                  fill="rgba(222, 85, 78, 0.5)"
                  stroke="rgba(222, 85, 78, 0.7)"
                  strokeWidth={1}
                  className="transition-all duration-200 hover:fill-opacity-90"
                />
                <Line
                  type="monotone"
                  dataKey="frequency"
                  stroke="rgba(222, 85, 78, 0.8)"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mean:</span>
                  <span className="font-medium text-foreground">{stats.mean}cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q1:</span>
                  <span className="font-medium text-foreground">{stats.q1}cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q3:</span>
                  <span className="font-medium text-foreground">{stats.q3}cm</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min:</span>
                  <span className="font-medium text-foreground">{stats.min}cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max:</span>
                  <span className="font-medium text-foreground">{stats.max}cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Range:</span>
                  <span className="font-medium text-foreground">{stats.range}cm</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}