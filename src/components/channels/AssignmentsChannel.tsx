import { useState, useEffect, useRef } from "react";
import {
  ClipboardList,
  Calendar,
  FileUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Loader2,
  Plus,
  Download,
  Paperclip,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  marks?: number;
  totalMarks?: number;
  attachment?: {
    name: string;
    size: string;
  };
  submittedAt?: string;
  feedBack?: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Data Structures - Linked List Implementation",
    subject: "Data Structures",
    description: "Implement doubly linked list with all operations (insert, delete, search, display).",
    dueDate: "2025-12-30",
    status: "pending",
    attachment: {
      name: "LinkedList.pdf",
      size: "2.4 MB",
    },
  },
  {
    id: "2",
    title: "DBMS - SQL Query Optimization",
    subject: "Database Management",
    description: "Write optimized SQL queries for the given dataset and provide execution plans.",
    dueDate: "2025-12-29",
    status: "submitted",
    submittedAt: "2025-12-27 10:30 AM",
    attachment: {
      name: "queries.sql",
      size: "1.2 MB",
    },
  },
  {
    id: "3",
    title: "Algorithm Analysis - Big O Notation",
    subject: "Algorithms",
    description: "Analyze the time and space complexity of 5 algorithms and provide detailed reports.",
    dueDate: "2025-12-28",
    status: "graded",
    marks: 19,
    totalMarks: 20,
    submittedAt: "2025-12-26 02:15 PM",
    feedBack: "Excellent analysis! Your understanding of Big O notation is perfect. Well-structured report.",
  },
  {
    id: "4",
    title: "Web Development - Responsive Design",
    subject: "Web Development",
    description: "Create a responsive website that works on mobile, tablet, and desktop screens.",
    dueDate: "2025-12-31",
    status: "pending",
    attachment: {
      name: "project_details.pdf",
      size: "3.1 MB",
    },
  },
  {
    id: "5",
    title: "Operating Systems - Process Scheduling",
    subject: "Operating Systems",
    description: "Implement CPU scheduling algorithms (FCFS, SJF, Round Robin) with comparison.",
    dueDate: "2025-12-27",
    status: "graded",
    marks: 17,
    totalMarks: 20,
    submittedAt: "2025-12-25 05:45 PM",
    feedBack: "Good implementation, but the Round Robin algorithm could be more efficient.",
  },
];

export function AssignmentsChannel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "submitted" | "graded">("all");
  const [loading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate assignment cards on mount
    const cards = gsap.utils.toArray(".assignment-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [filter]);

  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && assignment.status === filter;
  });

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const days = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "submitted":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "graded":
        return "bg-green-500/10 text-green-600 border-green-500/30";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "graded":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-card/50 to-card/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              Assignments
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your assignments and submissions
            </p>
          </div>
          <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-info text-primary-foreground font-medium text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Submit Assignment
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "submitted", "graded"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm font-medium transition-all capitalize",
                  filter === status
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => {
            const daysLeft = getDaysUntilDue(assignment.dueDate);
            const isOverdue = daysLeft < 0 && assignment.status === "pending";

            return (
              <div
                key={assignment.id}
                className="assignment-card group rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 backdrop-blur p-5 transition-all hover:shadow-lg hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Title and Subject */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {assignment.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <div className={cn("px-3 py-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-medium whitespace-nowrap", getStatusColor(assignment.status))}>
                        {getStatusIcon(assignment.status)}
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {assignment.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {assignment.status === "pending" && (
                        <div className={cn("flex items-center gap-1.5 font-medium", isOverdue ? "text-destructive" : "text-warning")}>
                          <Clock className="w-3.5 h-3.5" />
                          {isOverdue ? "Overdue" : `${daysLeft} days left`}
                        </div>
                      )}
                      {assignment.submittedAt && (
                        <div className="flex items-center gap-1.5">
                          <FileUp className="w-3.5 h-3.5 text-success" />
                          Submitted: {new Date(assignment.submittedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </div>

                    {/* Marks Display */}
                    {assignment.status === "graded" && (
                      <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-success/10 to-info/10 border border-success/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-foreground">Your Marks</span>
                          <span className="text-lg font-black text-success">
                            {assignment.marks}/{assignment.totalMarks}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "{assignment.feedBack}"
                        </p>
                      </div>
                    )}

                    {/* Attachment */}
                    {assignment.attachment && (
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50 border border-border/30 w-fit">
                        <Paperclip className="w-4 h-4 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {assignment.attachment.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {assignment.attachment.size}
                          </p>
                        </div>
                        <Download className="w-4 h-4 text-primary hover:scale-110 transition-transform cursor-pointer" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                  {assignment.status === "pending" && (
                    <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <FileUp className="w-4 h-4" />
                      Submit Now
                    </button>
                  )}
                  {assignment.status === "submitted" && (
                    <button className="flex-1 px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-all flex items-center justify-center gap-2 border border-primary/50">
                      <Clock className="w-4 h-4" />
                      Awaiting Evaluation
                    </button>
                  )}
                  {assignment.status === "graded" && (
                    <button className="flex-1 px-4 py-2 rounded-lg bg-success/20 text-success text-sm font-medium hover:bg-success/30 transition-all flex items-center justify-center gap-2 border border-success/50">
                      <CheckCircle2 className="w-4 h-4" />
                      Graded
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <ClipboardList className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No {filter !== "all" ? filter : ""} assignments</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
