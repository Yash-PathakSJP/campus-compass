import { useState } from "react";
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Star,
  Zap,
  Users,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  change: "up" | "down" | "same";
  badges: string[];
  streak: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Sharma", avatar: "P", xp: 4250, level: 18, change: "same", badges: ["🥇", "🧠", "🤝"], streak: 15 },
  { rank: 2, name: "Arjun Kumar", avatar: "A", xp: 3890, level: 16, change: "up", badges: ["🥈", "🧠"], streak: 12 },
  { rank: 3, name: "Vikram Singh", avatar: "V", xp: 3650, level: 15, change: "up", badges: ["🥉", "🤝"], streak: 8 },
  { rank: 4, name: "Neha Patel", avatar: "N", xp: 3420, level: 14, change: "down", badges: ["🧠"], streak: 5 },
  { rank: 5, name: "Rahul Verma", avatar: "R", xp: 3180, level: 13, change: "same", badges: [], streak: 3 },
  { rank: 6, name: "Ananya Gupta", avatar: "A", xp: 2950, level: 12, change: "up", badges: ["🤝"], streak: 7 },
  { rank: 7, name: "Karan Mehta", avatar: "K", xp: 2800, level: 12, change: "down", badges: [], streak: 2 },
  { rank: 8, name: "Sneha Singh", avatar: "S", xp: 2650, level: 11, change: "same", badges: [], streak: 4 },
];

const badgeDescriptions: Record<string, string> = {
  "🥇": "Top Contributor",
  "🥈": "Rising Star",
  "🥉": "Consistent Performer",
  "🧠": "Skill Master",
  "🤝": "Peer Mentor",
};

export function LeaderboardView() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "all-time">("weekly");

  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6 text-warning" />
              Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground">Compete, contribute, and climb the ranks</p>
          </div>
          <div className="flex rounded-lg bg-secondary/50 border border-border/50 p-0.5">
            {(["weekly", "monthly", "all-time"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize",
                  timeframe === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Badge Legend */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(badgeDescriptions).map(([badge, desc]) => (
            <span key={badge} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-base">{badge}</span>
              {desc}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-2xl font-bold text-slate-800 ring-4 ring-slate-300/50">
                {top3[1].avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
                <Medal className="w-5 h-5 text-slate-700" />
              </div>
            </div>
            <p className="font-bold text-sm">{top3[1].name}</p>
            <p className="text-xs text-muted-foreground">{top3[1].xp.toLocaleString()} XP</p>
            <div className="h-24 w-28 bg-gradient-to-t from-slate-600 to-slate-500 rounded-t-lg mt-2 flex items-end justify-center pb-2">
              <span className="text-3xl font-black text-slate-300">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center animate-slide-up">
            <div className="relative mb-2">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl font-bold text-amber-900 ring-4 ring-yellow-400/50 animate-pulse-slow">
                {top3[0].avatar}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <Crown className="w-8 h-8 text-yellow-400 animate-bounce-subtle" />
              </div>
            </div>
            <p className="font-bold">{top3[0].name}</p>
            <p className="text-sm text-muted-foreground">{top3[0].xp.toLocaleString()} XP</p>
            <div className="flex gap-1 my-1">
              {top3[0].badges.map((b, i) => <span key={i} className="text-lg">{b}</span>)}
            </div>
            <div className="h-32 w-32 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg mt-2 flex items-end justify-center pb-2">
              <span className="text-4xl font-black text-yellow-300">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-2xl font-bold text-amber-100 ring-4 ring-amber-600/50">
                {top3[2].avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-200" />
              </div>
            </div>
            <p className="font-bold text-sm">{top3[2].name}</p>
            <p className="text-xs text-muted-foreground">{top3[2].xp.toLocaleString()} XP</p>
            <div className="h-20 w-28 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg mt-2 flex items-end justify-center pb-2">
              <span className="text-3xl font-black text-amber-400">3</span>
            </div>
          </div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="space-y-2">
          {rest.map((entry, index) => (
            <div
              key={entry.rank}
              className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-all animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              {/* Rank */}
              <div className="w-10 text-center">
                <span className="text-lg font-bold text-muted-foreground">#{entry.rank}</span>
              </div>

              {/* Change Indicator */}
              <div className="w-6">
                {entry.change === "up" && <TrendingUp className="w-4 h-4 text-success" />}
                {entry.change === "down" && <TrendingDown className="w-4 h-4 text-destructive" />}
                {entry.change === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-info/50 flex items-center justify-center text-lg font-bold">
                {entry.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold">{entry.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Level {entry.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-warning" />
                    {entry.streak} day streak
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-1">
                {entry.badges.map((b, i) => <span key={i} className="text-lg">{b}</span>)}
              </div>

              {/* XP */}
              <div className="text-right">
                <p className="font-bold text-primary">{entry.xp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
