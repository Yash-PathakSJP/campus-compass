import { 
  Target, 
  Map, 
  Coins, 
  Trophy,
  ChevronRight,
  Zap,
  Brain,
  Code,
  BookOpen,
  Sparkles
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
    <aside className="w-[280px] bg-card/50 backdrop-blur-xl border-l border-border/40 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border/40">
        <h2 className="font-bold text-sm flex items-center gap-2 text-foreground">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          Personal Intelligence
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Skill Level */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Current Level</span>
            <span className="badge-rank badge-gold">Level 12</span>
          </div>
          <div className="relative">
            <Progress value={72} className="h-3.5 bg-secondary rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary-foreground drop-shadow-sm">2,450 / 3,400 XP</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            950 XP to Level 13
          </p>
        </div>

        {/* Skill Gaps */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <Target className="w-3.5 h-3.5" />
              Skill Gaps
            </span>
          </div>
          <div className="space-y-4">
            {skillGaps.map((skill) => {
              const Icon = skill.icon;
              const colorClass = skill.level < 40 
                ? "text-destructive [&>div]:bg-destructive" 
                : skill.level < 60 
                  ? "text-[hsl(var(--warning))] [&>div]:bg-[hsl(var(--warning))]" 
                  : "text-[hsl(var(--success))] [&>div]:bg-[hsl(var(--success))]";
              
              return (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2 text-foreground">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {skill.skill}
                    </span>
                    <span className={cn("text-xs font-bold", colorClass)}>
                      {skill.level}%
                    </span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className={cn("h-2 bg-secondary rounded-full", colorClass)}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary font-medium leading-relaxed">
              "Strong in syntax, work on logical thinking"
            </p>
          </div>
        </div>

        {/* Active Roadmap */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <Map className="w-3.5 h-3.5" />
              Roadmap
            </span>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="space-y-2">
            {roadmapSteps.map((step, index) => (
              <div 
                key={step.title}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-xl transition-all",
                  step.current && "bg-primary/10 border border-primary/20",
                  step.completed && "opacity-60"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold",
                  step.completed ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]" :
                  step.current ? "bg-primary text-primary-foreground" :
                  "bg-secondary text-muted-foreground"
                )}>
                  {step.completed ? "✓" : index + 1}
                </div>
                <span className={cn(
                  "text-sm font-medium flex-1 text-foreground",
                  step.completed && "line-through text-muted-foreground"
                )}>
                  {step.title}
                </span>
                {step.current && (
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wide animate-pulse">
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Credits & Rank */}
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-card text-center py-5">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[hsl(var(--warning))]/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-[hsl(var(--warning))]" />
            </div>
            <p className="text-xl font-bold text-foreground">1,240</p>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Credits</p>
          </div>
          <div className="stat-card text-center py-5">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent" />
            </div>
            <p className="text-xl font-bold text-foreground">#7</p>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Rank</p>
          </div>
        </div>

        {/* Quick Action */}
        <button className="btn-gradient w-full flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          Continue Learning
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
