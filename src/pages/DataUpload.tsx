import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Database, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const DataUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Files uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setSelectedFiles(files);
  };

  const downloadTemplate = () => {
    // Generate CSV template data
    const csvContent = [
      'timestamp,fish_id,weight_kg,length_cm,tank_id,species,notes',
      '2024-01-15 14:30:00,F001,1.23,32.1,A,Atlantic Salmon,Sample measurement',
      '2024-01-15 14:30:05,F002,1.45,34.2,A,Atlantic Salmon,Healthy specimen',
      '2024-01-15 14:30:10,F003,1.18,31.8,B,Atlantic Salmon,Normal behavior',
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'fish_measurements_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Template downloaded successfully!");
  };

  const uploadHistory = [
    {
      id: 1,
      filename: "fish_measurements_2024_01_15.csv",
      timestamp: "2024-01-15 14:32:15",
      status: "completed",
      records: 1247,
      source: "Tank A"
    },
    {
      id: 2,
      filename: "biomass_data_tank_b.xlsx",
      timestamp: "2024-01-15 13:45:32",
      status: "processing",
      records: 856,
      source: "Tank B"
    },
    {
      id: 3,
      filename: "manual_counts_tank_c.json",
      timestamp: "2024-01-15 12:15:20",
      status: "failed",
      records: 0,
      source: "Tank C"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-4 space-y-4 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Data Upload</h1>
            <p className="text-muted-foreground">Import fish measurement data and biomass information</p>
          </div>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">File Upload</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          {/* File Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Area */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Data Files
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file-input">Data Files</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Drop files here or click to browse</p>
                        <p className="text-xs text-muted-foreground">Supports CSV, Excel, JSON files up to 50MB</p>
                      </div>
                      <Input
                        id="file-input"
                        type="file"
                        multiple
                        accept=".csv,.xlsx,.xls,.json"
                        className="mt-4"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </div>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}

                  <Button className="w-full" disabled={isUploading}>
                    {isUploading ? "Processing..." : "Upload Files"}
                  </Button>
                </CardContent>
              </Card>

              {/* Template Download */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    CSV Template
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Download our CSV template to ensure your data is formatted correctly for upload.
                    </p>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Template includes:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <strong>timestamp</strong> - Measurement date and time</li>
                        <li>• <strong>fish_id</strong> - Individual fish identifier (optional)</li>
                        <li>• <strong>weight_kg</strong> - Fish weight in kilograms</li>
                        <li>• <strong>length_cm</strong> - Fish length in centimeters</li>
                        <li>• <strong>tank_id</strong> - Tank identifier (A, B, C, etc.)</li>
                        <li>• <strong>species</strong> - Fish species (optional)</li>
                        <li>• <strong>notes</strong> - Additional observations (optional)</li>
                      </ul>
                    </div>

                    <Button 
                      onClick={downloadTemplate}
                      className="w-full"
                      variant="outline"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV Template
                    </Button>

                    <div className="text-xs text-muted-foreground">
                      <p><strong>Required fields:</strong> timestamp, weight_kg, length_cm, tank_id</p>
                      <p><strong>Date format:</strong> YYYY-MM-DD HH:MM:SS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manual Entry Tab */}
          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Manual Data Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tank">Tank</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tank-a">Tank A</SelectItem>
                          <SelectItem value="tank-b">Tank B</SelectItem>
                          <SelectItem value="tank-c">Tank C</SelectItem>
                          <SelectItem value="tank-d">Tank D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fish-count">Fish Count</Label>
                      <Input id="fish-count" type="number" placeholder="Enter total fish count" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avg-weight">Average Weight (kg)</Label>
                      <Input id="avg-weight" type="number" step="0.01" placeholder="e.g., 1.25" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avg-length">Average Length (cm)</Label>
                      <Input id="avg-length" type="number" step="0.1" placeholder="e.g., 32.5" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="measurement-date">Measurement Date</Label>
                      <Input id="measurement-date" type="datetime-local" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="source">Data Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual Count</SelectItem>
                          <SelectItem value="camera">Camera System</SelectItem>
                          <SelectItem value="sensor">Sensor Network</SelectItem>
                          <SelectItem value="ml">ML Detection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Additional observations or comments..." />
                    </div>

                    <Button className="w-full">Save Measurement</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        {/* Upload History - Always Visible */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upload History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadHistory.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{upload.filename}</h4>
                      <p className="text-sm text-muted-foreground">
                        {upload.timestamp} • {upload.records} records • {upload.source}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(upload.status)}
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;