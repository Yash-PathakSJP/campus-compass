import { 
  TrendingUp, 
  Target, 
  Map, 
  Coins, 
  Trophy,
  ChevronRight,
  Zap,
  Brain,
  Code,
  BookOpen
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const skillGaps = [
  { skill: "Data Structures", level: 45, icon: Code },
  { skill: "System Design", level: 30, icon: Brain },
  { skill: "Algorithms", level: 65, icon: Zap },
];

const roadmapSteps = [
  { title: "Arrays & Strings", completed: true },
  { title: "Linked Lists", completed: true },
  { title: "Trees & Graphs", completed: false, current: true },
  { title: "Dynamic Programming", completed: false },
];

export function RightSidebar() {
  return (
    <aside className="w-72 bg-card/50 backdrop-blur-sm border-l border-border/50 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-bold text-sm flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          Personal Intelligence
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Skill Level */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">Current Level</span>
            <span className="badge-rank badge-gold">Level 12</span>
          </div>
          <div className="relative">
            <Progress value={72} className="h-3 bg-secondary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary-foreground drop-shadow">2,450 / 3,400 XP</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">950 XP to Level 13</p>
        </div>

        {/* Skill Gaps */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Target className="w-3 h-3" />
              Detected Skill Gaps
            </span>
          </div>
          <div className="space-y-3">
            {skillGaps.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.skill} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-muted-foreground" />
                      {skill.skill}
                    </span>
                    <span className={cn(
                      "text-xs font-semibold",
                      skill.level < 40 ? "text-destructive" : 
                      skill.level < 60 ? "text-warning" : "text-success"
                    )}>
                      {skill.level}%
                    </span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className={cn(
                      "h-1.5",
                      skill.level < 40 ? "[&>div]:bg-destructive" : 
                      skill.level < 60 ? "[&>div]:bg-warning" : "[&>div]:bg-success"
                    )}
                  />
                </div>
              );
            })}
          </div>
          <p className="text-xs text-primary mt-3 font-medium">
            "Strong in syntax, work on logical thinking"
          </p>
        </div>

        {/* Active Roadmap */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Map className="w-3 h-3" />
              Active Roadmap
            </span>
            <button className="text-xs text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {roadmapSteps.map((step, index) => (
              <div 
                key={step.title}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg transition-colors",
                  step.current && "bg-primary/10 border border-primary/30",
                  step.completed && "opacity-60"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                  step.completed ? "bg-success text-success-foreground" :
                  step.current ? "bg-primary text-primary-foreground" :
                  "bg-secondary text-muted-foreground"
                )}>
                  {step.completed ? "✓" : index + 1}
                </div>
                <span className={cn(
                  "text-xs font-medium flex-1",
                  step.completed && "line-through"
                )}>
                  {step.title}
                </span>
                {step.current && (
                  <span className="text-[10px] text-primary font-semibold animate-pulse">
                    IN PROGRESS
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Credits & Rank */}
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-card text-center">
            <Coins className="w-5 h-5 mx-auto mb-1 text-warning" />
            <p className="text-lg font-bold">1,240</p>
            <p className="text-[10px] text-muted-foreground">Credits Earned</p>
          </div>
          <div className="stat-card text-center">
            <Trophy className="w-5 h-5 mx-auto mb-1 text-accent" />
            <p className="text-lg font-bold">#7</p>
            <p className="text-[10px] text-muted-foreground">Class Rank</p>
          </div>
        </div>

        {/* Quick Action */}
        <button className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-info text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-primary">
          <BookOpen className="w-4 h-4" />
          Continue Learning
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
