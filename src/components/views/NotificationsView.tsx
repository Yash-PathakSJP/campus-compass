import { 
  Bell, 
  Trophy, 
  TrendingUp, 
  Heart, 
  Map,
  Zap,
  Gift,
  Users,
  CheckCircle2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Notification {
  id: string;
  type: "achievement" | "social" | "roadmap" | "leaderboard" | "reward";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionText?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "leaderboard",
    title: "You're close to the Top 3! 👀",
    message: "Just 200 XP more and you'll surpass Neha to claim the 4th position!",
    time: "2 mins ago",
    isRead: false,
    actionText: "View Leaderboard",
  },
  {
    id: "2",
    type: "social",
    title: "Your notes helped 3 classmates 👏",
    message: "Your 'DBMS Normalization' notes were downloaded by 3 people today. Keep contributing!",
    time: "1 hour ago",
    isRead: false,
    actionText: "See Impact",
  },
  {
    id: "3",
    type: "roadmap",
    title: "Roadmap updated based on activity",
    message: "We noticed you're crushing array problems! New graph challenges unlocked.",
    time: "3 hours ago",
    isRead: false,
    actionText: "View Roadmap",
  },
  {
    id: "4",
    type: "achievement",
    title: "New Badge Unlocked! 🧠",
    message: "You've earned the 'Skill Master' badge for completing 5 roadmap milestones.",
    time: "Yesterday",
    isRead: true,
    actionText: "View Badge",
  },
  {
    id: "5",
    type: "reward",
    title: "Weekly reward available 🎁",
    message: "You've earned 150 bonus credits for your 7-day streak. Claim now!",
    time: "Yesterday",
    isRead: true,
    actionText: "Claim Reward",
  },
  {
    id: "6",
    type: "social",
    title: "Priya answered your doubt",
    message: "Your question about 'Virtual Memory' received a detailed response.",
    time: "2 days ago",
    isRead: true,
    actionText: "View Answer",
  },
];

const iconMap = {
  achievement: Trophy,
  social: Heart,
  roadmap: Map,
  leaderboard: TrendingUp,
  reward: Gift,
};

const colorMap = {
  achievement: "from-warning to-accent",
  social: "from-pink-500 to-rose-500",
  roadmap: "from-primary to-info",
  leaderboard: "from-accent to-warning",
  reward: "from-success to-emerald-400",
};

export function NotificationsView() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground">Stay updated with your progress and community</p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {notifications.map((notification, index) => {
          const Icon = iconMap[notification.type];
          const gradientColor = colorMap[notification.type];

          return (
            <div
              key={notification.id}
              className={cn(
                "relative glass-card rounded-xl p-4 transition-all duration-300 animate-slide-up group",
                !notification.isRead && "border-primary/30 bg-primary/5"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => markAsRead(notification.id)}
            >
              {/* Unread Indicator */}
              {!notification.isRead && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}

              {/* Dismiss Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissNotification(notification.id);
                }}
                className="absolute top-3 right-3 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex gap-4">
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                  gradientColor
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                    {notification.actionText && (
                      <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                        {notification.actionText}
                        <Zap className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">All caught up!</h3>
            <p className="text-sm text-muted-foreground">No new notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
