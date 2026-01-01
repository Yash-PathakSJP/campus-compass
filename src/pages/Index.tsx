import { useState, useEffect, useRef } from "react";
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
  ChevronRight,
  Play,
  Gauge,
  Zap as ZapIcon,
  TrendingUp,
  Star,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageSquare,
    title: "Structured Channels",
    description: "Transform chaotic WhatsApp groups into organized learning spaces",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "AI Skill Mentor",
    description: "Personalized guidance that adapts to your learning journey",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Smart Roadmaps",
    description: "AI-generated learning paths based on your skill gaps",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Trophy,
    title: "Gamified Growth",
    description: "Earn XP, climb leaderboards, and unlock achievements",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "Peer Knowledge",
    description: "Access quality notes verified by your classmates",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Campus Exclusive",
    description: "Verified college community for trusted collaboration",
    gradient: "from-indigo-500 to-blue-500",
  },
];

const stats = [
  { value: "50K+", label: "Active Students", icon: Users },
  { value: "200+", label: "Colleges", icon: GraduationCap },
  { value: "1M+", label: "Notes Shared", icon: BookOpen },
  { value: "95%", label: "Success Rate", icon: TrendingUp },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CS Student, MIT",
    avatar: "PS",
    content: "EduMesh transformed how our batch studies. The AI mentor is incredibly helpful!",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Engineering Major",
    avatar: "AP",
    content: "Finally, a platform where we can organize our notes and actually find what we need.",
    rating: 5,
  },
  {
    name: "Neha Singh",
    role: "Data Science Enthusiast",
    avatar: "NS",
    content: "The gamification keeps me motivated. I've never had more fun studying!",
    rating: 5,
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  
  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.2
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.4
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6 },
          0.5
        )
        .fromTo(
          ".hero-preview",
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.6
        );

      // Floating animation for orbs
      gsap.to(".orb-1", {
        y: 30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orb-2", {
        y: -30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }

    // Stats counter animation
    if (statsRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      const statElements = gsap.utils.toArray(".stat-value");
      
      statElements.forEach((element: any) => {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue);
        
        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              once: true,
            },
            onUpdate: function() {
              const currentValue = Math.ceil(this.targets()[0].textContent);
              element.textContent = currentValue + "+";
            },
          }
        );
      });
    }

    // Features staggered animation
    if (featuresRef.current) {
      const features = gsap.utils.toArray(".feature-card");
      features.forEach((feature: any, index: number) => {
        gsap.fromTo(
          feature,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: feature,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }

    // CTA section animation
    if (ctaRef.current) {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="orb-2 absolute top-20 right-1/4 w-80 h-80 bg-info/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 container mx-auto px-4 py-6 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <span className="text-xl font-black text-primary-foreground">E</span>
          </div>
          <span className="font-bold text-xl gradient-text">EduMesh</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-y-0.5">Features</a>
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
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="relative z-10 container mx-auto px-4 pt-12 pb-24">
        <div className="text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-info/20 border border-primary/30 text-sm font-medium text-primary mb-8">
            <Sparkles className="w-4 h-4 animate-spin" />
            Empower Your Learning Journey
          </div>
          
          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block text-foreground">Your Campus</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-info to-purple-500 animate-gradient">
              Learning Ecosystem
            </span>
          </h1>
          
          {/* Description */}
          <p className="hero-description text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform chaotic academic WhatsApp groups into a structured, intelligent platform. 
            Get AI mentorship, share knowledge with peers, and gamify your learning journey.
          </p>

          {/* CTA */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur border border-border/50 rounded-xl p-1.5 w-full sm:w-auto hover:border-primary/50 transition-colors">
              <input
                type="email"
                placeholder="Enter your college email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none w-full sm:w-72"
              />
              <button 
                onClick={() => navigate("/auth")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-info text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg"
              >
                Join Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center hover:scale-105 transition-transform">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-2 opacity-50" />
                  <p className="stat-value text-3xl md:text-4xl font-black gradient-text">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Dashboard Preview */}
          <div className="hero-preview relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 rounded-2xl" />
            <div className="relative mx-auto max-w-5xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-info opacity-20 rounded-2xl blur group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="h-8 bg-secondary/50 flex items-center gap-2 px-4 border-b border-border/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="aspect-video bg-gradient-to-br from-card/50 to-background/50 flex items-center justify-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-info/20 rounded-full blur-2xl animate-pulse" />
                  </div>
                  <div className="w-full sm:w-auto flex flex-col items-center gap-3 px-6">
                    <button
                      onClick={() => navigate("/demo")}
                      aria-label="Open demo dashboard (no login required)"
                      title="Open demo dashboard (no login required)"
                      className="w-full sm:w-auto max-w-md relative px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-info text-primary-foreground font-semibold flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      <Play className="w-5 h-5" />
                      <span>Explore Dashboard</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-center text-muted-foreground">Preview demo (no login required) — click to view a read-only demo of EduMesh.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="relative z-10 py-24 bg-gradient-to-b from-transparent via-card/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Everything you need to
              <span className="block gradient-text">Excel & Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete learning ecosystem designed specifically for college students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={cn(
                    "feature-card group relative rounded-2xl p-8 border border-border/30 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur hover:shadow-xl hover:-translate-y-1",
                  )}
                >
                  {/* Gradient background */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity",
                    `bg-gradient-to-br ${feature.gradient}`
                  )} />
                  
                  <div className="relative z-10">
                    <div className={cn(
                      "w-14 h-14 rounded-xl bg-gradient-to-br mb-5 flex items-center justify-center group-hover:scale-110 transition-transform",
                      `${feature.gradient}`
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:gradient-text transition-all">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Get started in <span className="gradient-text">30 seconds</span>
            </h2>
            <p className="text-lg text-muted-foreground">Simple onboarding, powerful results</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 1, title: "Sign up with college email", description: "Verify your campus identity for a trusted community", icon: GraduationCap },
              { step: 2, title: "Select your interests", description: "Tell us your year, branch, and learning goals", icon: Target },
              { step: 3, title: "Join your class server", description: "Connect with classmates in organized channels", icon: Users },
              { step: 4, title: "Start growing", description: "Get AI mentorship, share notes, climb the leaderboard", icon: Trophy },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="group relative rounded-2xl p-6 bg-card/50 border border-border/30 hover:border-primary/50 transition-all hover:bg-card/80 hover:shadow-lg"
                >
                  {/* Animated line connecting steps */}
                  {index < 3 && (
                    <div className="absolute left-7 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                  
                  <div className="flex items-start gap-6">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-xl font-black text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:gradient-text transition-all">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 bg-gradient-to-b from-card/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Loved by <span className="gradient-text">students worldwide</span>
            </h2>
            <p className="text-lg text-muted-foreground">See what our community says about EduMesh</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 bg-card/50 border border-border/30 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-card/80"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="relative z-10 py-24 bg-gradient-to-b from-transparent via-card/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="cta-content max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Flame className="w-4 h-4 animate-pulse" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Ready to transform your
              <span className="block gradient-text">learning journey?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Join thousands of students already using EduMesh to ace their academics, 
              build meaningful connections, and unlock their potential.
            </p>
            <button 
              onClick={() => navigate("/auth")}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-info text-primary-foreground font-semibold text-lg flex items-center gap-3 mx-auto hover:shadow-2xl hover:scale-105 transition-all shadow-lg group"
            >
              <GraduationCap className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-muted-foreground mt-6">No credit card required • Instant access • Free forever tier</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

