import { 
  Megaphone, 
  Pin, 
  Clock, 
  Bell,
  ExternalLink,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  postedAt: string;
  isPinned?: boolean;
  type: "info" | "warning" | "success";
  link?: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Mid-Semester Exam Schedule Released",
    content: "The mid-semester examination schedule for all CSE subjects has been released. Please check the academic portal for your individual timetable. Exams will commence from March 15th.",
    author: "Dr. Rajesh Kumar",
    authorRole: "HOD - Computer Science",
    postedAt: "Today at 10:30 AM",
    isPinned: true,
    type: "warning",
  },
  {
    id: "2",
    title: "New AI Lab Sessions Starting Next Week",
    content: "We're excited to announce the launch of hands-on AI/ML lab sessions. Registration is now open for all 5th semester students. Limited seats available!",
    author: "Prof. Anita Sharma",
    authorRole: "AI Lab Coordinator",
    postedAt: "Yesterday at 4:15 PM",
    type: "success",
    link: "Register Now",
  },
  {
    id: "3",
    title: "Library Access Extended Hours",
    content: "The central library will now remain open until 11 PM on weekdays during the examination period. Make the most of this extended facility.",
    author: "Administration",
    authorRole: "College Admin",
    postedAt: "2 days ago",
    type: "info",
  },
];

export function AnnouncementsChannel() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-primary" />
              Announcements
            </h1>
            <p className="text-sm text-muted-foreground">Important updates from faculty and administration</p>
          </div>
          <button className="p-2 rounded-lg bg-secondary border border-border/50 hover:bg-secondary/80 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockAnnouncements.map((announcement, index) => (
          <div
            key={announcement.id}
            className={cn(
              "glass-card rounded-xl p-5 transition-all duration-300 animate-slide-up",
              announcement.isPinned && "border-warning/30 bg-warning/5"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Pinned Badge */}
            {announcement.isPinned && (
              <div className="flex items-center gap-1 text-warning text-xs font-semibold mb-3">
                <Pin className="w-3 h-3" />
                PINNED
              </div>
            )}

            {/* Type Indicator */}
            <div className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-3",
              announcement.type === "warning" && "bg-warning/20 text-warning",
              announcement.type === "success" && "bg-success/20 text-success",
              announcement.type === "info" && "bg-info/20 text-info"
            )}>
              <Calendar className="w-3 h-3" />
              {announcement.type === "warning" ? "Important" : 
               announcement.type === "success" ? "New" : "Info"}
            </div>

            {/* Title & Content */}
            <h3 className="font-bold text-lg mb-2">{announcement.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {announcement.content}
            </p>

            {/* Link */}
            {announcement.link && (
              <button className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline mb-4">
                {announcement.link}
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div>
                <p className="text-sm font-medium">{announcement.author}</p>
                <p className="text-xs text-muted-foreground">{announcement.authorRole}</p>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {announcement.postedAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
