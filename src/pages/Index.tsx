import { useState } from "react";
import { 
  GraduationCap, 
  Users, 
  Brain, 
  Trophy, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Target,
  MessageSquare,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: MessageSquare,
    title: "Structured Channels",
    description: "Transform chaotic WhatsApp groups into organized learning spaces",
  },
  {
    icon: Brain,
    title: "AI Skill Mentor",
    description: "Personalized guidance that adapts to your learning journey",
  },
  {
    icon: Target,
    title: "Smart Roadmaps",
    description: "AI-generated learning paths based on your skill gaps",
  },
  {
    icon: Trophy,
    title: "Gamified Growth",
    description: "Earn XP, climb leaderboards, and unlock achievements",
  },
  {
    icon: BookOpen,
    title: "Peer Knowledge",
    description: "Access quality notes verified by your classmates",
  },
  {
    icon: Shield,
    title: "Campus Exclusive",
    description: "Verified college community for trusted collaboration",
  },
];

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "200+", label: "Colleges" },
  { value: "1M+", label: "Notes Shared" },
  { value: "95%", label: "Exam Success" },
];

export default function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-info/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        {/* Nav */}
        <nav className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center glow-primary">
              <span className="text-xl font-black text-primary-foreground">E</span>
            </div>
            <span className="font-bold text-xl gradient-text">EduMesh</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/auth")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate("/auth")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-16 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning for Campus Communities
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight animate-slide-up">
            Your Campus
            <br />
            <span className="gradient-text">Learning Ecosystem</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Transform chaotic academic WhatsApp groups into a structured, 
            intelligent platform that accelerates your growth with AI mentorship, 
            peer collaboration, and gamified learning.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 bg-secondary rounded-xl p-1.5 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your college email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none w-full sm:w-64"
              />
              <button 
                onClick={() => navigate("/auth")}
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
              >
                Join Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-black gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="h-8 bg-secondary/50 flex items-center gap-2 px-4 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>
              <div className="aspect-video bg-gradient-to-br from-card to-background flex items-center justify-center">
                <button 
                  onClick={() => navigate("/auth")}
                  className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-3 hover:opacity-90 transition-opacity glow-primary"
                >
                  <Zap className="w-5 h-5" />
                  Explore Dashboard
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Everything you need to <span className="gradient-text">excel</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete learning ecosystem designed specifically for college students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Get started in <span className="gradient-accent-text">30 seconds</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple onboarding, powerful results
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 1, title: "Sign up with college email", description: "Verify your campus identity for a trusted community" },
              { step: 2, title: "Select your interests", description: "Tell us your year, branch, and learning goals" },
              { step: 3, title: "Join your class server", description: "Connect with classmates in organized channels" },
              { step: 4, title: "Start growing", description: "Get AI mentorship, share notes, climb the leaderboard" },
            ].map((item, index) => (
              <div
                key={item.step}
                className="flex items-center gap-6 glass-card rounded-2xl p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-2xl font-black text-primary-foreground flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-success ml-auto flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Ready to transform your <span className="gradient-text">learning journey</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join thousands of students already using EduMesh to ace their academics.
            </p>
            <button 
              onClick={() => navigate("/auth")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-info text-primary-foreground font-semibold text-lg flex items-center gap-3 mx-auto hover:opacity-90 transition-opacity glow-primary"
            >
              <GraduationCap className="w-6 h-6" />
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <span className="text-lg font-black text-primary-foreground">E</span>
              </div>
              <span className="font-bold gradient-text">EduMesh</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 EduMesh. Built for students, by students.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
