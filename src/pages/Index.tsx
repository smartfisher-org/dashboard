import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { BiomassMonitoringSection } from "@/components/dashboard/BiomassMonitoringSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { WeightLengthHistogram } from "@/components/dashboard/WeightLengthHistogram";
import { WeightDistribution } from "@/components/dashboard/WeightDistribution";
import { LengthDistribution } from "@/components/dashboard/LengthDistribution";
import { KFactorTimeSeries } from "@/components/dashboard/KFactorTimeSeries";
import { RecentMeasurements } from "@/components/dashboard/RecentMeasurements";
import { DashboardProvider } from "@/contexts/DashboardContext";

const Index = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="p-4 space-y-4 max-w-7xl mx-auto">
            <ControlPanel />

            <BiomassMonitoringSection />
            
            <AnalyticsSection />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <WeightLengthHistogram />
              <KFactorTimeSeries />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <WeightDistribution />
              <LengthDistribution />
            </div>
            
            <RecentMeasurements />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Index;
