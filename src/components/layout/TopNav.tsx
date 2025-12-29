import { 
  Search, 
  Bell, 
  Trophy, 
  Map,
  LayoutGrid,
  LogOut,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TopNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
  notificationCount: number;
}

export function TopNav({ currentView, onViewChange, notificationCount }: TopNavProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: "channels", label: "Channels", icon: LayoutGrid },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "roadmap", label: "Roadmap", icon: Map },
    { id: "notifications", label: "Notifications", icon: Bell, count: notificationCount },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="h-16 border-b border-border/40 bg-card/80 backdrop-blur-xl flex items-center px-5 gap-5">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-lg">
          <span className="text-lg font-black text-primary-foreground">E</span>
        </div>
        <span className="font-bold text-xl gradient-text tracking-tight">EduMesh</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search channels, notes, doubts..."
            className="w-full pl-11 pr-16 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 focus:bg-secondary/80 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center gap-1 rounded-md border border-border bg-muted/60 px-2 font-mono text-[11px] font-medium text-muted-foreground">
            <Command className="w-3 h-3" />K
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
                "relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="hidden lg:inline">{item.label}</span>
              {item.count && item.count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/60 border border-border/40">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-primary-foreground font-semibold">
                {(() => {
                  const name = (user.user_metadata as any)?.full_name || (user.user_metadata as any)?.name || user.email || "U";
                  const parts = (name as string).split(" ").filter(Boolean);
                  const initials = parts.length === 0 ? "U" : parts.length === 1 ? parts[0].slice(0,1).toUpperCase() : (parts[0][0]+parts[parts.length-1][0]).toUpperCase();
                  return initials;
                })()}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium">{(user.user_metadata as any)?.full_name || (user.user_metadata as any)?.name || user.email}</span>
                <span className="text-xs text-muted-foreground">Student</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSignOut}
              className="w-9 h-9 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
