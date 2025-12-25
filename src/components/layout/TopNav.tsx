import { 
  Search, 
  Bell, 
  Trophy, 
  Map,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
  notificationCount: number;
}

export function TopNav({ currentView, onViewChange, notificationCount }: TopNavProps) {
  const navItems = [
    { id: "channels", label: "Channels", icon: Menu },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "roadmap", label: "Roadmap", icon: Map },
    { id: "notifications", label: "Notifications", icon: Bell, count: notificationCount },
  ];

  return (
    <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center px-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
          <span className="text-lg font-black text-primary-foreground">E</span>
        </div>
        <span className="font-bold text-lg gradient-text">EduMesh</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search channels, notes, doubts..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
              {item.count && item.count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
