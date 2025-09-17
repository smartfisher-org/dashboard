import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Database, 
  Fish, 
  Home, 
  Map, 
  Settings, 
  TrendingUp,
  Camera
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Camera View', icon: Camera, href: '/cam-view' },
  { name: 'Data Upload', icon: Database, href: '/data-upload' },
];

const bottomNavigation = [
  { name: 'Settings', icon: Settings, href: '/settings' },
];


export function DashboardSidebar({ className }: SidebarProps) {
  const location = useLocation();
  return (
    <div className={cn("bg-background border-r border-border w-64 h-screen sticky top-0 flex flex-col", className)}>
      {/* Logo/Header */}
      <div className="p-4 border-b border-border flex flex-col items-center">
        <div className="w-40">
          <img 
            src="/smartfisherlogo.png" 
            alt="SmartFISHER Logo" 
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-xl font-bold text-foreground mt-2">SmartFISHER</h1>
      </div>

      {/* Main Navigation */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 pt-0">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}