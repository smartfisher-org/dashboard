import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500">Manage your account and application preferences</p>
              </div>
            </div>

            <Tabs defaultValue="account" className="space-y-4">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              {/* Account Settings */}
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your account details and personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="SmartFISHER" />
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <h4 className="font-medium">System Notifications</h4>
                        <p className="text-sm text-gray-500">Show desktop notifications</p>
                      </div>
                      <Switch id="system-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <h4 className="font-medium">Alerts</h4>
                        <p className="text-sm text-gray-500">Receive alert notifications</p>
                      </div>
                      <Switch id="alerts" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <select
                        id="theme"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="system"
                      >
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Density</Label>
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1">Compact</Button>
                        <Button variant="outline" className="flex-1">Comfortable</Button>
                        <Button variant="outline" className="flex-1">Spacious</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Settings */}
              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Configure advanced application settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex space-x-2">
                        <Input id="api-key" type="password" defaultValue="sk_1234567890abcdef" readOnly />
                        <Button variant="outline" size="sm">Copy</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                      <p className="text-sm text-gray-500">Keep your API key secure and don't share it with others</p>
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="destructive">Delete Account</Button>
                      <p className="mt-2 text-sm text-gray-500">This action cannot be undone. All your data will be permanently deleted.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Settings;
