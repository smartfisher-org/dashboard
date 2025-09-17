import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const getHealthScoreColor = (score: number) => {
  if (score > 79) return "text-green-600";
  if (score > 49) return "text-orange-500";
  return "text-red-500";
};

export function SwimmingPatternsCard() {
  const healthScore = 92;
  
  return (
    <TooltipProvider>
      <Card className="bg-background border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium text-foreground">Swimming Patterns</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Analysis of fish movement patterns and behavioral indicators for health monitoring</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Health Score */}
          <div className="pt-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-sm text-muted-foreground">Health Score</div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Overall health assessment based on swimming patterns, activity levels, and behavioral indicators</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className={`text-3xl font-bold ${getHealthScoreColor(healthScore)}`}>{healthScore}/100</div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3 pt-0">
          {/* Swimming Activity Patterns */}
          <div className="space-y-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Normal Activity</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Percentage of fish showing healthy swimming patterns and active behavior</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-sm font-semibold text-foreground">87%</span>
              </div>
              <Progress value={87} className="h-2 bg-muted [&>div]:bg-green-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sluggish Movement</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Fish showing reduced activity levels, potentially indicating stress or health issues</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-sm font-semibold text-foreground">11%</span>
              </div>
              <Progress value={11} className="h-2 bg-muted [&>div]:bg-orange-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Erratic Behavior</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Abnormal swimming patterns that may indicate disease, stress, or environmental issues</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-sm font-semibold text-foreground">2%</span>
              </div>
              <Progress value={2} className="h-2 bg-muted [&>div]:bg-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}