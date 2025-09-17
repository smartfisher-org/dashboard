import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Camera,
  Video,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Circle,
  Square,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  AlertCircle,
  CheckCircle,
  Fish,
  Thermometer,
  Droplets,
  Activity,
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingUp,
  TrendingDown,
  Utensils
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { toast } from "sonner";

const CamView = () => {
  const [selectedTank, setSelectedTank] = useState("tank-a");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [zoom, setZoom] = useState([100]);
  const [volume, setVolume] = useState([50]);
  const [nightVision, setNightVision] = useState(false);
  const [motionDetection, setMotionDetection] = useState(true);

  const tanks = [
    {
      id: "tank-a",
      name: "Tank A",
      status: "active",
      fishCount: 10,
      healthScore: 92,
      avgKScore: 1.24,
      lastDetection: "2 mins ago",
      alerts: 0
    },
    {
      id: "tank-b", 
      name: "Tank B",
      status: "active",
      fishCount: 8,
      healthScore: 87,
      avgKScore: 1.18,
      lastDetection: "5 mins ago",
      alerts: 1
    },
    {
      id: "tank-c",
      name: "Tank C", 
      status: "maintenance",
      fishCount: 0,
      healthScore: 0,
      avgKScore: 0,
      lastDetection: "2 hours ago",
      alerts: 2
    },
    {
      id: "tank-d",
      name: "Tank D",
      status: "active", 
      fishCount: 12,
      healthScore: 95,
      avgKScore: 1.31,
      lastDetection: "1 min ago",
      alerts: 0
    }
  ];

  const currentTank = tanks.find(tank => tank.id === selectedTank);

  // Activity data for carousels
  const lessActivity = [
    { id: 1, timestamp: "2024-01-20 14:30", duration: "5 min", fishCount: 2, thumbnail: "low-activity-1.jpg" },
    { id: 2, timestamp: "2024-01-20 12:15", duration: "8 min", fishCount: 1, thumbnail: "low-activity-2.jpg" },
    { id: 3, timestamp: "2024-01-20 10:45", duration: "12 min", fishCount: 3, thumbnail: "low-activity-3.jpg" },
    { id: 4, timestamp: "2024-01-20 09:20", duration: "6 min", fishCount: 2, thumbnail: "low-activity-4.jpg" },
  ];

  const highActivity = [
    { id: 1, timestamp: "2024-01-20 16:45", duration: "3 min", fishCount: 8, intensity: "High", thumbnail: "high-activity-1.jpg" },
    { id: 2, timestamp: "2024-01-20 15:20", duration: "4 min", fishCount: 10, intensity: "Very High", thumbnail: "high-activity-2.jpg" },
    { id: 3, timestamp: "2024-01-20 13:10", duration: "2 min", fishCount: 7, intensity: "High", thumbnail: "high-activity-3.jpg" },
    { id: 4, timestamp: "2024-01-20 11:30", duration: "5 min", fishCount: 9, intensity: "High", thumbnail: "high-activity-4.jpg" },
  ];

  const feedingActivity = [
    { id: 1, timestamp: "2024-01-20 17:00", duration: "10 min", feedType: "Pellets", response: "Excellent", thumbnail: "feeding-1.jpg" },
    { id: 2, timestamp: "2024-01-20 08:00", duration: "8 min", feedType: "Flakes", response: "Good", thumbnail: "feeding-2.jpg" },
    { id: 3, timestamp: "2024-01-19 17:00", duration: "12 min", feedType: "Pellets", response: "Average", thumbnail: "feeding-3.jpg" },
    { id: 4, timestamp: "2024-01-19 08:00", duration: "9 min", feedType: "Live Feed", response: "Excellent", thumbnail: "feeding-4.jpg" },
  ];

  const generalActivity = [
    { id: 1, timestamp: "2024-01-20 16:20", type: "Swimming Pattern", status: "Normal", thumbnail: "general-1.jpg" },
    { id: 2, timestamp: "2024-01-20 14:50", type: "Group Behavior", status: "Active", thumbnail: "general-2.jpg" },
    { id: 3, timestamp: "2024-01-20 12:30", type: "Rest Period", status: "Normal", thumbnail: "general-3.jpg" },
    { id: 4, timestamp: "2024-01-20 10:15", type: "Exploration", status: "High", thumbnail: "general-4.jpg" },
  ];

  const getStatusBadge = (status: string, alerts: number) => {
    if (alerts > 0) {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100"><AlertCircle className="w-3 h-3 mr-1" />Alert ({alerts})</Badge>;
    }
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"><Settings className="w-3 h-3 mr-1" />Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? "Recording stopped" : "Recording started");
  };

  const handleZoomIn = () => {
    setZoom([Math.min(200, zoom[0] + 10)]);
  };

  const handleZoomOut = () => {
    setZoom([Math.max(50, zoom[0] - 10)]);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate some real-time data updates
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-4 space-y-4 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Camera View</h1>
            <p className="text-muted-foreground">Live monitoring of fish tank environments</p>
          </div>

          {/* Tank Selection and Status */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {tanks.map((tank) => (
              <Card 
                key={tank.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTank === tank.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTank(tank.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{tank.name}</CardTitle>
                    {getStatusBadge(tank.status, tank.alerts)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Fish className="w-3 h-3 text-blue-500" />
                      <span>{tank.fishCount} fish</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Health: {tank.healthScore}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-purple-500" />
                      <span>K-Score: {tank.avgKScore}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Last: {tank.lastDetection}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Camera Feed */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      {currentTank?.name} - Live Feed
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {isRecording && (
                        <div className="flex items-center gap-1 text-red-600">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium">REC</span>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {/* Handle fullscreen */}}
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Camera Feed Area */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                    {/* Live stream */}
                    <img 
                      src="/fish-detection-stream.png" 
                      alt="Fish Detection Live Stream" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Camera Controls */}
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline" onClick={handleZoomOut}>
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={isPlaying ? "default" : "outline"}
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={handleRecord}
                      >
                        {isRecording ? <Square className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCw className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleZoomIn}>
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Zoom Level</Label>
                        <Slider
                          value={zoom}
                          onValueChange={setZoom}
                          max={200}
                          min={50}
                          step={10}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              {/* Tank Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">{currentTank?.name} Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Fish className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Fish Count</span>
                      </div>
                      <span className="font-medium text-lg">{currentTank?.fishCount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Health Score</span>
                      </div>
                      <span className="font-medium text-lg text-green-600">{currentTank?.healthScore}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Average K-Score</span>
                      </div>
                      <span className="font-medium text-lg">{currentTank?.avgKScore}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <div>
                        <p className="font-medium">Fish detected in Tank A</p>
                        <p className="text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <div>
                        <p className="font-medium">Motion alert in Tank B</p>
                        <p className="text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                      <div>
                        <p className="font-medium">Temperature spike in Tank D</p>
                        <p className="text-muted-foreground">12 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                      <div>
                        <p className="font-medium">Maintenance required Tank C</p>
                        <p className="text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Activity Carousels */}
          <div className="space-y-6">
            {/* Less Recorded Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingDown className="w-5 h-5 text-blue-500" />
                  Anomaly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {lessActivity.map((activity) => (
                    <div key={activity.id} className="flex-shrink-0 w-64 bg-gray-50 rounded-lg p-4">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{activity.timestamp}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Duration: {activity.duration}</span>
                          <span>{activity.fishCount} fish</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest Highest Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  Highest Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {highActivity.map((activity) => (
                    <div key={activity.id} className="flex-shrink-0 w-64 bg-gray-50 rounded-lg p-4">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <Activity className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{activity.timestamp}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Duration: {activity.duration}</span>
                          <span>{activity.fishCount} fish</span>
                        </div>
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                          {activity.intensity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feeding Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="w-5 h-5 text-green-500" />
                  Feeding Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {feedingActivity.map((activity) => (
                    <div key={activity.id} className="flex-shrink-0 w-64 bg-gray-50 rounded-lg p-4">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <Utensils className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{activity.timestamp}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Duration: {activity.duration}</span>
                          <span>{activity.feedType}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          {activity.response}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CamView;