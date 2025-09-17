import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDashboard } from "@/contexts/DashboardContext";
import { generateCurrentMetrics, generateWeightData } from "@/utils/dataService";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type MetricsType = {
  fishCount: number | string;
  totalBiomass: number | string;
  averageWeight: number | string;
  averageLength: number | string;
  kFactor: number | string;
  healthScore: number | string;
};

export function BiomassMonitoringSection() {
  const { filters } = useDashboard();
  const [metrics, setMetrics] = useState<MetricsType>({
    fishCount: "#N/A",
    totalBiomass: "#N/A", 
    averageWeight: "#N/A",
    averageLength: "#N/A",
    kFactor: "#N/A",
    healthScore: "#N/A"
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [weightsLoading, setWeightsLoading] = useState<boolean>(true);
  const [dist, setDist] = useState<{ bin1: number; bin2: number; bin3: number }>({ bin1: 0, bin2: 0, bin3: 0 });

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setWeightsLoading(true);
      try {
        const [m, weightsKg] = await Promise.all([
          generateCurrentMetrics(filters),
          generateWeightData(filters), // returns weights in kg
        ]);
        setMetrics(m);
        // Compute distribution bins
        const w = (weightsKg as number[]).filter((v) => typeof v === 'number' && isFinite(v));
        const wG = w.map((x) => x * 1000); // convert to grams
        const total = wG.length;
        if (total === 0) {
          setDist({ bin1: 0, bin2: 0, bin3: 0 });
        } else {
          const bin1Count = wG.filter((x) => x >= 0 && x < 50).length;     // 0–50 g
          const bin2Count = wG.filter((x) => x >= 50 && x < 100).length;    // 50–100 g
          const bin3Count = wG.filter((x) => x >= 100).length;              // 100+ g
          setDist({
            bin1: Math.round((bin1Count / total) * 100),
            bin2: Math.round((bin2Count / total) * 100),
            bin3: Math.round((bin3Count / total) * 100),
          });
        }
      } finally {
        setLoading(false);
        setWeightsLoading(false);
      }
    };
    fetchAll();
  }, [filters]);

  const getLocationName = (location: string) => {
    const names = {
      'north-atlantic': 'North Atlantic',
      'pacific-coast': 'Pacific Coast',
      'mediterranean': 'Mediterranean',
      'arctic-waters': 'Arctic Waters'
    };
    return names[location as keyof typeof names] || location;
  };
  const formatGrams = (v: number) => `${Math.round(v).toLocaleString()} g`;
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-foreground">Biomass Monitoring</h2>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Real-time monitoring of fish population, weight distribution, and biomass growth metrics</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Fish Count Card */}
          <Card className="bg-background border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Fish Count</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Total number of fish currently monitored in the system</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                {loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  typeof metrics.fishCount === 'number' ? metrics.fishCount.toLocaleString() : `${metrics.fishCount}`
                )}
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                Location: {getLocationName(filters.location)}
              </div>
            </CardContent>
          </Card>

          {/* Total Biomass Card */}
          <Card className="bg-background border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Biomass</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Combined weight of all fish in the monitoring system</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                {loading ? (
                  <Skeleton className="h-8 w-36" />
                ) : (
                  typeof metrics.totalBiomass === 'number'
                    ? formatGrams(metrics.totalBiomass * 1000)
                    : `${metrics.totalBiomass}`
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-1 text-green-600 border-green-200 bg-green-50">
                  +4.7%
                </Badge>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                Period: {filters.startDate} to {filters.endDate}
              </div>
            </CardContent>
          </Card>

          {/* Average Weight Card */}
          <Card className="bg-background border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Weight</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Mean weight per fish with size distribution breakdown</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                {loading ? (
                  <Skeleton className="h-8 w-28" />
                ) : (
                  typeof metrics.averageWeight === 'number'
                    ? formatGrams(metrics.averageWeight as number)
                    : `${metrics.averageWeight}`
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-1 text-green-600 border-green-200 bg-green-50">
                  +1.8%
                </Badge>
                <span className="text-xs text-muted-foreground">day on day growth</span>
              </div>
              
              {/* Weight Distribution */}
              <div className="space-y-1.5 pt-1">
                {/* Bin 1 */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">0–50 g</span>
                  {weightsLoading ? (
                    <Skeleton className="h-3 w-10" />
                  ) : (
                    <span className="text-xs font-medium">{dist.bin1}%</span>
                  )}
                </div>
                {weightsLoading ? (
                  <Skeleton className="h-1.5 w-full" />
                ) : (
                  <Progress value={dist.bin1} className="h-1.5" />
                )}

                {/* Bin 2 */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">50–100 g</span>
                  {weightsLoading ? (
                    <Skeleton className="h-3 w-10" />
                  ) : (
                    <span className="text-xs font-medium">{dist.bin2}%</span>
                  )}
                </div>
                {weightsLoading ? (
                  <Skeleton className="h-1.5 w-full" />
                ) : (
                  <Progress value={dist.bin2} className="h-1.5" />
                )}

                {/* Bin 3 */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">100+ g</span>
                  {weightsLoading ? (
                    <Skeleton className="h-3 w-10" />
                  ) : (
                    <span className="text-xs font-medium">{dist.bin3}%</span>
                  )}
                </div>
                {weightsLoading ? (
                  <Skeleton className="h-1.5 w-full" />
                ) : (
                  <Progress value={dist.bin3} className="h-1.5" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}