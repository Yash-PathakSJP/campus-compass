import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Lock,
  ExternalLink,
  Play,
  BookOpen,
  Code,
  Brain,
  Zap,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  status: "completed" | "current" | "locked";
  resources: { type: "video" | "article" | "practice"; title: string }[];
  xpReward: number;
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: "1",
    title: "Arrays & Strings Fundamentals",
    description: "Master basic array operations, string manipulation, and common patterns.",
    whyItMatters: "Foundation for 80% of coding interviews. Essential for understanding complex data structures.",
    status: "completed",
    resources: [
      { type: "video", title: "Array Basics Crash Course" },
      { type: "article", title: "String Manipulation Patterns" },
      { type: "practice", title: "10 Easy Array Problems" },
    ],
    xpReward: 200,
  },
  {
    id: "2",
    title: "Linked Lists Deep Dive",
    description: "Understand pointers, node manipulation, and common linked list algorithms.",
    whyItMatters: "Critical for understanding memory management and building more complex structures.",
    status: "completed",
    resources: [
      { type: "video", title: "Linked Lists Visualized" },
      { type: "practice", title: "Reverse Linked List Variations" },
    ],
    xpReward: 250,
  },
  {
    id: "3",
    title: "Trees & Graphs Mastery",
    description: "Learn traversals, BFS/DFS, and common tree problems.",
    whyItMatters: "Key to solving pathfinding, hierarchy, and network problems in interviews.",
    status: "current",
    resources: [
      { type: "video", title: "Tree Traversals Explained" },
      { type: "article", title: "BFS vs DFS: When to Use" },
      { type: "practice", title: "15 Tree Problems" },
    ],
    xpReward: 350,
  },
  {
    id: "4",
    title: "Dynamic Programming",
    description: "Master memoization, tabulation, and common DP patterns.",
    whyItMatters: "The most asked interview topic. Understanding DP separates good from great engineers.",
    status: "locked",
    resources: [
      { type: "video", title: "DP Fundamentals" },
      { type: "article", title: "5 DP Patterns You Must Know" },
      { type: "practice", title: "Classic DP Problems" },
    ],
    xpReward: 500,
  },
  {
    id: "5",
    title: "System Design Basics",
    description: "Learn scalability, load balancing, and distributed systems concepts.",
    whyItMatters: "Essential for senior roles. Shows you can think beyond just code.",
    status: "locked",
    resources: [
      { type: "video", title: "System Design Interview Prep" },
      { type: "article", title: "Designing Twitter" },
    ],
    xpReward: 600,
  },
];

const completedSteps = roadmapSteps.filter(s => s.status === "completed").length;
const totalSteps = roadmapSteps.length;
const progress = (completedSteps / totalSteps) * 100;

export function RoadmapView() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Map className="w-6 h-6 text-primary" />
              Your Learning Roadmap
            </h1>
            <p className="text-sm text-muted-foreground">Personalized path to mastery based on your skill gaps</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <p className="text-2xl font-bold text-primary">{completedSteps}/{totalSteps} Complete</p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Roadmap Steps */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {roadmapSteps.map((step, index) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";
              const isLocked = step.status === "locked";

              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative pl-16 animate-slide-up",
                    isLocked && "opacity-60"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Indicator */}
                  <div className={cn(
                    "absolute left-3 w-7 h-7 rounded-full flex items-center justify-center z-10",
                    isCompleted && "bg-success text-success-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/30 animate-pulse",
                    isLocked && "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                    {isCurrent && <Circle className="w-4 h-4 fill-current" />}
                    {isLocked && <Lock className="w-4 h-4" />}
                  </div>

                  {/* Step Card */}
                  <div className={cn(
                    "glass-card rounded-xl p-5 transition-all duration-300",
                    isCurrent && "border-primary/50 bg-primary/5 glow-primary",
                    isCompleted && "border-success/30"
                  )}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-muted-foreground">
                            STEP {index + 1}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                              IN PROGRESS
                            </span>
                          )}
                          {isCompleted && (
                            <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-semibold">
                              COMPLETED
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold">{step.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-warning/20 text-warning">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-bold">+{step.xpReward} XP</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                    {/* Why It Matters */}
                    <div className="p-3 rounded-lg bg-secondary/50 mb-4">
                      <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        Why it matters
                      </p>
                      <p className="text-sm text-muted-foreground">{step.whyItMatters}</p>
                    </div>

                    {/* Resources */}
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-muted-foreground">FREE RESOURCES</p>
                      {step.resources.map((resource, i) => (
                        <button
                          key={i}
                          disabled={isLocked}
                          className="w-full flex items-center gap-3 p-2 rounded-lg bg-card hover:bg-secondary transition-colors text-left disabled:cursor-not-allowed"
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            resource.type === "video" && "bg-destructive/20 text-destructive",
                            resource.type === "article" && "bg-info/20 text-info",
                            resource.type === "practice" && "bg-success/20 text-success"
                          )}>
                            {resource.type === "video" && <Play className="w-4 h-4" />}
                            {resource.type === "article" && <BookOpen className="w-4 h-4" />}
                            {resource.type === "practice" && <Code className="w-4 h-4" />}
                          </div>
                          <span className="text-sm flex-1">{resource.title}</span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>

                    {/* Action Button */}
                    {isCurrent && (
                      <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        Continue Learning
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
