import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeedActivityCard } from "./SpeedActivityCard";
import { Button } from "@/components/ui/button";
import { Play, Camera, Radio } from "lucide-react";

export function HealthBehaviourSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SpeedActivityCard />

      {/* Image / Live Stream */}
      <Card className="w-full bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-gray-600">Image / Live Stream</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center space-y-2">
              <Camera className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600 font-medium">Live Camera Feed</p>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Radio className="w-3 h-3" />
                <span>LIVE</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between gap-2">
            <Button size="sm" variant="outline" className="flex-1 gap-2">
              <Play className="w-3 h-3" />
              Play
            </Button>
            <Button size="sm" variant="outline" className="flex-1 gap-2">
              <Camera className="w-3 h-3" />
              Capture
            </Button>
          </div>
          
          <div className="text-xs text-center text-gray-500">
            Last updated: 2 minutes ago
          </div>
        </CardContent>
      </Card>
    </div>
  );
}