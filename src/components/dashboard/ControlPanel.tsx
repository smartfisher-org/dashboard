import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, RefreshCw, Download } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export function ControlPanel() {
  const { filters, updateFilters, refreshData, isLoading } = useDashboard();
  
  const dateRange: DateRange | undefined = {
    from: filters.startDate ? new Date(filters.startDate) : undefined,
    to: filters.endDate ? new Date(filters.endDate) : undefined,
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      updateFilters({
        startDate: format(range.from, "yyyy-MM-dd"),
        endDate: format(range.to, "yyyy-MM-dd")
      });
    } else if (range?.from) {
      updateFilters({
        startDate: format(range.from, "yyyy-MM-dd"),
        endDate: format(range.from, "yyyy-MM-dd")
      });
    }
  };
  return (
    <Card className="border-0 shadow-[var(--shadow-card)]">
      <CardHeader className="pb-0 pt-4">
        {/* Title removed as requested */}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Location</label>
            <Select value={filters.location} onValueChange={(value) => updateFilters({ location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange?.from && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateRangeSelect}
                  numberOfMonths={2}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Time Period</label>
            <Select value={filters.timePeriod} onValueChange={(value) => updateFilters({ timePeriod: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 1 Day</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="18d">All Data (18 Days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              See results
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="gap-2" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}