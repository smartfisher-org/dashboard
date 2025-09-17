import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboard } from "@/contexts/DashboardContext";

const measurementData = [
  {
    timestamp: "2024-01-15 14:32:15",
    tank: "Tank A",
    fishCount: 4,
    avgWeight: "88 g",
    avgLength: "32.1 cm",
    source: "ML Detection"
  },
  {
    timestamp: "2024-01-15 14:31:15",
    tank: "Tank A",
    fishCount: 1,
    avgWeight: "60 g",
    avgLength: "25.0 cm",
    source: "ML Detection"
  },
  {
    timestamp: "2024-01-15 14:30:15",
    tank: "Tank A",
    fishCount: 6,
    avgWeight: "73 g",
    avgLength: "31.4 cm",
    source: "ML Detection"
  },
  {
    timestamp: "2024-01-15 13:45:32",
    tank: "Tank A",
    fishCount: 6,
    avgWeight: "71 g",
    avgLength: "30.2 cm",
    source: "ML Detection"
  }
];

export function RecentMeasurements() {
  const { filters } = useDashboard();

  const getSourceBadge = (source: string) => {
    return source === "ML Detection" ? (
      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
        ML Detection
      </Badge>
    ) : (
      <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">
        Manual
      </Badge>
    );
  };

  return (
    <Card className="bg-background border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Recent Measurements</CardTitle>

        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-muted-foreground">TIMESTAMP</TableHead>
                <TableHead className="font-medium text-muted-foreground">TANK</TableHead>
                <TableHead className="font-medium text-muted-foreground">FISH COUNT</TableHead>
                <TableHead className="font-medium text-muted-foreground">AVG WEIGHT</TableHead>
                <TableHead className="font-medium text-muted-foreground">AVG LENGTH</TableHead>
                <TableHead className="font-medium text-muted-foreground">SOURCE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {measurementData.map((measurement, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm text-foreground">
                    {measurement.timestamp}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {measurement.tank}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {measurement.fishCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {measurement.avgWeight}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {measurement.avgLength}
                  </TableCell>
                  <TableCell>
                    {getSourceBadge(measurement.source)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}