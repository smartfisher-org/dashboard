import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer, CartesianGrid, Cell, Tooltip as RechartsTooltip, Legend, ReferenceLine } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { generateWeightData } from "@/utils/dataService";

interface WeightLengthData {
  length: number;
  weight: number;
}
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Custom tooltip for the scatter plot
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // Calculate K-factor: K = (weight / length^3) * 100
    const kFactor = (data.weight / Math.pow(data.length, 3)) * 100;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg text-sm">
        <p className="font-medium mb-2">Fish Measurement</p>
        <div className="space-y-1">
          <p>Length: <span className="font-mono font-medium">{data.length} cm</span></p>
          <p>Weight: <span className="font-mono font-medium">{data.weight} g</span></p>
          <p>K-factor: <span className="font-mono font-medium">{kFactor.toFixed(2)}</span></p>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {kFactor > 1.05 ? 'Above ideal weight' : kFactor < 0.95 ? 'Below ideal weight' : 'Ideal weight'}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function WeightLengthHistogram() {
  const { filters } = useDashboard();
  const [scatterData, setScatterData] = useState<WeightLengthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate realistic weight-length data points within specified ranges
  const generateWeightLengthData = (count: number): WeightLengthData[] => {
    const data: WeightLengthData[] = [];
    // Adjusted parameters to fit within the specified ranges
    const minLength = 20;
    const maxLength = 38;
    const minWeight = 50;
    const maxWeight = 110;
    
    // Generate data points with a linear relationship
    for (let i = 0; i < count; i++) {
      // Generate length within the specified range
      const length = minLength + Math.random() * (maxLength - minLength);
      
      // Calculate a base weight with a linear relationship (y = mx + b)
      const slope = (maxWeight - minWeight) / (maxLength - minLength);
      const intercept = minWeight - (slope * minLength);
      let weight = (slope * length) + intercept;
      
      // Add some natural variation (±15%)
      weight = weight * (0.85 + Math.random() * 0.3);
      
      // Ensure weight stays within bounds
      weight = Math.max(minWeight, Math.min(maxWeight, weight));
      
      data.push({
        length: parseFloat(length.toFixed(1)),
        weight: parseFloat(weight.toFixed(1))
      });
    }
    
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Generate realistic weight-length data
        const data = generateWeightLengthData(100); // Generate 100 data points
        setScatterData(data);
      } catch (error) {
        console.error('Error fetching weight-length data:', error);
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
            <CardTitle className="text-sm font-medium">Weight-Length Relationship</CardTitle>
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

  return (
    <TooltipProvider>
      <Card className="bg-background border border-border h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Weight-Length Relationship</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] text-sm">
                  <p>Shows the relationship between fish length and weight. Each dot represents an individual fish measurement.</p>
                  <p className="mt-2 text-muted-foreground">The healthy weight range is shown by the green dashed line.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 pr-4 pb-4">
          <div className="w-full h-full min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={400}>
              <ScatterChart data={scatterData} margin={{ top: 20, right: 40, left: 40, bottom: 40 }}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb"
                  strokeOpacity={0.8}
                  horizontal={true}
                  vertical={true}
                />
                <XAxis 
                  type="number" 
                  dataKey="length" 
                  name="Length" 
                  unit="cm" 
                  domain={[20, 38]}
                  tickCount={10}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ 
                    value: 'Length (cm)', 
                    position: 'insideBottom', 
                    offset: -10,
                    style: { fill: '#666', textAnchor: 'middle' }
                  }}
                />
                <YAxis 
                  yAxisId="left"
                  type="number" 
                  dataKey="weight" 
                  name="Weight" 
                  unit="g" 
                  domain={[50, 110]}
                  tickCount={7}
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: 'Weight (g)', 
                    angle: -90, 
                    position: 'left', 
                    offset: 10,
                    style: { fill: '#666', textAnchor: 'middle' }
                  }}
                />
                <ZAxis type="number" range={[50, 200]} />
                
                <RechartsTooltip 
                  content={<CustomTooltip />}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend />
                
                <Scatter data={scatterData} yAxisId="left">
                  {scatterData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="#3B82F6"
                      fillOpacity={0.7}
                      stroke="#fff"
                      strokeWidth={1}
                      r={5}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}