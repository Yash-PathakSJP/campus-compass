import { useState } from "react";
import { 
  HelpCircle, 
  MessageSquare, 
  CheckCircle2, 
  Clock,
  ThumbsUp,
  Send,
  Filter,
  Search,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Doubt {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  subject: string;
  postedAt: string;
  replies: number;
  upvotes: number;
  isSolved: boolean;
  topContributor?: string;
}

const mockDoubts: Doubt[] = [
  {
    id: "1",
    title: "How does virtual memory work in Operating Systems?",
    description: "I'm confused about the concept of page tables and how the MMU translates virtual addresses to physical addresses.",
    author: "Sneha Patel",
    authorAvatar: "S",
    subject: "Operating Systems",
    postedAt: "30 mins ago",
    replies: 8,
    upvotes: 12,
    isSolved: true,
    topContributor: "Arjun Kumar",
  },
  {
    id: "2",
    title: "Difference between TCP and UDP?",
    description: "When should I use TCP vs UDP in real-world applications? Need practical examples.",
    author: "Karan Mehta",
    authorAvatar: "K",
    subject: "Computer Networks",
    postedAt: "2 hours ago",
    replies: 5,
    upvotes: 8,
    isSolved: false,
  },
  {
    id: "3",
    title: "Best approach for implementing Dijkstra's algorithm?",
    description: "Should I use priority queue or simple array? What's the time complexity trade-off?",
    author: "Neha Singh",
    authorAvatar: "N",
    subject: "Data Structures",
    postedAt: "4 hours ago",
    replies: 12,
    upvotes: 24,
    isSolved: true,
    topContributor: "Priya Sharma",
  },
];

export function DoubtsChannel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "solved" | "unsolved">("all");

  const filteredDoubts = mockDoubts.filter(doubt => {
    if (filter === "solved") return doubt.isSolved;
    if (filter === "unsolved") return !doubt.isSolved;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Doubts & Discussions
            </h1>
            <p className="text-sm text-muted-foreground">Get help from peers and top contributors</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Ask a Doubt
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search doubts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex rounded-lg bg-secondary/50 border border-border/50 p-0.5">
            {(["all", "solved", "unsolved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-2 rounded-md text-xs font-medium transition-colors capitalize",
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doubts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredDoubts.map((doubt, index) => (
          <div
            key={doubt.id}
            className={cn(
              "glass-card rounded-xl p-4 hover:border-primary/30 transition-all duration-300 cursor-pointer animate-slide-up",
              doubt.isSolved && "border-success/30"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-warning flex items-center justify-center text-sm font-bold text-accent-foreground flex-shrink-0">
                {doubt.authorAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{doubt.author}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {doubt.postedAt}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  {doubt.subject}
                </span>
              </div>
              {doubt.isSolved && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Solved
                </span>
              )}
            </div>

            {/* Content */}
            <h3 className="font-semibold mb-2">{doubt.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {doubt.description}
            </p>

            {/* Top Contributor */}
            {doubt.topContributor && (
              <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-primary/5 border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Best answer by</span>
                <span className="text-xs font-semibold text-primary">{doubt.topContributor}</span>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {doubt.replies} replies
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {doubt.upvotes} upvotes
                </span>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors flex items-center gap-1">
                <Send className="w-3 h-3" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
