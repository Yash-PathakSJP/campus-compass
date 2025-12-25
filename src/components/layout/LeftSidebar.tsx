import { useState } from "react";
import { 
  Hash, 
  Megaphone, 
  FileText, 
  ClipboardList, 
  HelpCircle, 
  FolderOpen, 
  Bot,
  ChevronDown,
  Plus,
  Settings,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  icon: React.ElementType;
  unread?: number;
}

const channels: Channel[] = [
  { id: "announcements", name: "announcements", icon: Megaphone, unread: 2 },
  { id: "notes-sharing", name: "notes-sharing", icon: FileText },
  { id: "assignments", name: "assignments", icon: ClipboardList, unread: 1 },
  { id: "doubts", name: "doubts", icon: HelpCircle },
  { id: "resources", name: "resources", icon: FolderOpen },
  { id: "ask-ai", name: "ask-ai", icon: Bot },
];

interface LeftSidebarProps {
  activeChannel: string;
  onChannelChange: (channel: string) => void;
}

export function LeftSidebar({ activeChannel, onChannelChange }: LeftSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className="w-60 bg-[hsl(var(--sidebar-bg))] flex flex-col h-full border-r border-border/50">
      {/* College Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-sm truncate">MIT Institute</h2>
            <p className="text-xs text-muted-foreground truncate">Computer Science</p>
          </div>
          <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Class Server */}
      <div className="flex-1 overflow-y-auto py-3">
        <div className="px-3 mb-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              !isExpanded && "-rotate-90"
            )} />
            CSE-5 CHANNELS
          </button>
        </div>

        {isExpanded && (
          <div className="px-2 space-y-0.5 animate-fade-in">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const isActive = activeChannel === channel.id;
              const isAI = channel.id === "ask-ai";
              
              return (
                <button
                  key={channel.id}
                  onClick={() => onChannelChange(channel.id)}
                  className={cn(
                    "channel-item w-full group",
                    isActive && "active",
                    isAI && "text-primary"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 flex-shrink-0",
                    isAI && "text-primary"
                  )} />
                  <span className="flex-1 text-left truncate">{channel.name}</span>
                  {channel.unread && (
                    <span className="px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-bold min-w-[20px] text-center">
                      {channel.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Add Channel */}
        <div className="px-2 mt-4">
          <button className="channel-item w-full opacity-60 hover:opacity-100">
            <Plus className="w-4 h-4" />
            <span>Add Channel</span>
          </button>
        </div>
      </div>

      {/* User Section */}
      <div className="p-3 border-t border-border/50 bg-[hsl(var(--sidebar-bg))]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-warning flex items-center justify-center text-sm font-bold text-accent-foreground">
              A
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-[hsl(var(--sidebar-bg))]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Arjun Kumar</p>
            <p className="text-xs text-muted-foreground">Level 12 • 2,450 XP</p>
          </div>
          <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
}
