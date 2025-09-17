import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  children?: React.ReactNode;
}

export function MetricCard({ title, value, subtitle, trend, children }: MetricCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg border-0 shadow-[var(--shadow-card)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {title}
          <div className="w-3 h-3 rounded-full bg-muted flex-shrink-0" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {trend && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend.isPositive 
                ? 'bg-nature-secondary/20 text-nature-success' 
                : 'bg-destructive/20 text-destructive'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.value > 0 ? '+' : ''}{trend.value}%
            </div>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}