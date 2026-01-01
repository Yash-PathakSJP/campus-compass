import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto bg-card/60 border border-border/30 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">EduMesh — Demo View</h1>
              <p className="text-muted-foreground mb-6">This read-only demo simulates the student dashboard so judges can explore features without signing in.</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-info/5 border border-border/20">
                  <h3 className="font-semibold">AI Skill Mentor</h3>
                  <p className="text-sm text-muted-foreground">Personalized suggestions, recommended tasks, and practice prompts.</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-5 to-emerald-10 border border-border/20">
                  <h3 className="font-semibold">Smart Roadmaps</h3>
                  <p className="text-sm text-muted-foreground">Progress indicators and suggested next steps for internships.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground flex items-center gap-2">Back to top</button>
                <button onClick={() => navigate('/')} className="px-4 py-2 rounded-lg border">Return to landing</button>
              </div>
            </div>

            <div className="hidden md:block w-80">
              <div className="rounded-xl bg-gradient-to-br from-card/50 to-background/50 p-4 border border-border/30">
                <div className="h-40 rounded-md bg-gradient-to-br from-primary/10 to-info/10 flex items-center justify-center text-sm text-muted-foreground">Dashboard preview</div>
                <div className="mt-4 grid gap-3">
                  <div className="p-3 rounded-md bg-background/50 border">Announcements • Recent</div>
                  <div className="p-3 rounded-md bg-background/50 border">Top Roadmaps • Recommended</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
