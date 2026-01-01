import { useState } from "react";
import { 
  Megaphone, 
  FileText, 
  ClipboardList, 
  HelpCircle, 
  FolderOpen, 
  Bot,
  ChevronDown,
  Plus,
  Settings,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  icon: React.ElementType;
  unread?: number;
}

const channels: Channel[] = [
  { id: "announcements", name: "Announcements", icon: Megaphone, unread: 2 },
  { id: "notes-sharing", name: "Notes", icon: FileText },
  { id: "assignments", name: "Assignments", icon: ClipboardList, unread: 1 },
  { id: "doubts", name: "Doubts", icon: HelpCircle },
  { id: "resources", name: "Resources", icon: FolderOpen },
  { id: "ask-ai", name: "AI Mentor", icon: Bot },
];

interface LeftSidebarProps {
  activeChannel: string;
  onChannelChange: (channel: string) => void;
}

export function LeftSidebar({ activeChannel, onChannelChange }: LeftSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className="w-64 bg-[hsl(var(--sidebar-bg))] flex flex-col h-full border-r border-border/40">
      {/* College Header */}
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-lg">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-[15px] text-foreground truncate tracking-tight">AITR Indore</h2>
            <p className="text-xs text-muted-foreground truncate">Computer Science</p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-secondary/70 transition-colors">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-3">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors w-full uppercase tracking-wider"
          >
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              !isExpanded && "-rotate-90"
            )} />
            CSE Channels
          </button>
        </div>

        {isExpanded && (
          <div className="px-2.5 space-y-0.5 animate-fade-in">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const isActive = activeChannel === channel.id;
              const isAI = channel.id === "ask-ai";
              
              return (
                <button
                  key={channel.id}
                  onClick={() => onChannelChange(channel.id)}
                  className={cn(
                    "channel-item w-full group relative",
                    isActive && "active",
                    isAI && !isActive && "text-primary/80"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
                  )}
                  <Icon className={cn(
                    "w-[18px] h-[18px] flex-shrink-0 transition-colors",
                    isAI && "text-primary"
                  )} />
                  <span className="flex-1 text-left truncate">{channel.name}</span>
                  {isAI && (
                    <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  )}
                  {channel.unread && (
                    <span className="px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold min-w-[18px] text-center">
                      {channel.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Add Channel */}
        <div className="px-2.5 mt-5">
          <button className="channel-item w-full opacity-50 hover:opacity-100 border border-dashed border-border/50 hover:border-primary/30">
            <Plus className="w-4 h-4" />
            <span>Add Channel</span>
          </button>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-border/40">
      </div>
    </aside>
  );
}
