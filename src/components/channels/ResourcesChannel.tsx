import { useState, useEffect, useRef } from "react";
import {
  FolderOpen,
  BookOpen,
  FileText,
  Download,
  Eye,
  Star,
  Search,
  Filter,
  Loader2,
  Plus,
  Video,
  Code,
  Lightbulb,
  Award,
  Clock,
  User,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface Resource {
  id: string;
  title: string;
  type: "video" | "pdf" | "code" | "article" | "tutorial";
  subject: string;
  description: string;
  author: string;
  views: number;
  downloads: number;
  rating: number;
  uploadedAt: string;
  size: string;
  isFavorite: boolean;
  url?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Complete Guide to Data Structures",
    type: "pdf",
    subject: "Data Structures",
    description: "Comprehensive guide covering arrays, linked lists, trees, graphs, and hash tables with examples and complexity analysis.",
    author: "Dr. Rajesh Kumar",
    views: 2453,
    downloads: 1250,
    rating: 4.8,
    uploadedAt: "2025-12-20",
    size: "15.4 MB",
    isFavorite: false,
    difficulty: "intermediate",
  },
  {
    id: "2",
    title: "DBMS Normalization Tutorial",
    type: "video",
    subject: "Database Management",
    description: "Video tutorial explaining database normalization forms (1NF to 3NF) with real-world examples and practical applications.",
    author: "Prof. Anita Sharma",
    views: 3821,
    downloads: 892,
    rating: 4.9,
    uploadedAt: "2025-12-18",
    size: "520 MB",
    isFavorite: true,
    difficulty: "intermediate",
  },
  {
    id: "3",
    title: "Algorithm Implementation Repository",
    type: "code",
    subject: "Algorithms",
    description: "GitHub repository with implementations of 50+ algorithms in Python and C++ with test cases and explanations.",
    author: "Priya Singh",
    views: 5642,
    downloads: 2134,
    rating: 4.7,
    uploadedAt: "2025-12-15",
    size: "45.2 MB",
    isFavorite: true,
    difficulty: "advanced",
  },
  {
    id: "4",
    title: "Operating Systems Concepts",
    type: "pdf",
    subject: "Operating Systems",
    description: "Detailed study material covering processes, threads, memory management, file systems, and I/O operations.",
    author: "Dr. Vikram Patel",
    views: 1876,
    downloads: 756,
    rating: 4.6,
    uploadedAt: "2025-12-22",
    size: "8.9 MB",
    isFavorite: false,
    difficulty: "advanced",
  },
  {
    id: "5",
    title: "Web Development Best Practices",
    type: "article",
    subject: "Web Development",
    description: "Article series on responsive design, performance optimization, security, and modern web development frameworks.",
    author: "Arjun Kumar",
    views: 4256,
    downloads: 1523,
    rating: 4.9,
    uploadedAt: "2025-12-19",
    size: "2.3 MB",
    isFavorite: false,
    difficulty: "beginner",
  },
  {
    id: "6",
    title: "Python Advanced Concepts",
    type: "tutorial",
    subject: "Programming",
    description: "Interactive tutorial covering decorators, generators, context managers, and metaprogramming in Python.",
    author: "Neha Desai",
    views: 2987,
    downloads: 1104,
    rating: 4.8,
    uploadedAt: "2025-12-17",
    size: "12.5 MB",
    isFavorite: false,
    difficulty: "advanced",
  },
  {
    id: "7",
    title: "Network Protocols Explained",
    type: "video",
    subject: "Computer Networks",
    description: "Video series explaining TCP/IP, DNS, HTTP, HTTPS, and other essential network protocols with packet analysis.",
    author: "Prof. Suresh Iyer",
    views: 3456,
    downloads: 1287,
    rating: 4.7,
    uploadedAt: "2025-12-21",
    size: "780 MB",
    isFavorite: false,
    difficulty: "intermediate",
  },
  {
    id: "8",
    title: "System Design Interview Guide",
    type: "pdf",
    subject: "System Design",
    description: "Complete guide for system design interviews with real-world case studies and architectural patterns.",
    author: "Karan Mehta",
    views: 6234,
    downloads: 2856,
    rating: 4.9,
    uploadedAt: "2025-12-16",
    size: "18.7 MB",
    isFavorite: true,
    difficulty: "advanced",
  },
];

export function ResourcesChannel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "pdf" | "video" | "code" | "article" | "tutorial">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [loading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockResources.filter(r => r.isFavorite).map(r => r.id))
  );
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate resource cards on mount
    const cards = gsap.utils.toArray(".resource-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      }
    );
  }, [typeFilter, difficultyFilter]);

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || resource.type === typeFilter;
    const matchesDifficulty = difficultyFilter === "all" || resource.difficulty === difficultyFilter;

    return matchesSearch && matchesType && matchesDifficulty;
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "pdf":
        return <FileText className="w-5 h-5" />;
      case "code":
        return <Code className="w-5 h-5" />;
      case "article":
        return <BookOpen className="w-5 h-5" />;
      case "tutorial":
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "from-red-500 to-pink-500";
      case "pdf":
        return "from-blue-500 to-cyan-500";
      case "code":
        return "from-green-500 to-emerald-500";
      case "article":
        return "from-purple-500 to-blue-500";
      case "tutorial":
        return "from-orange-500 to-yellow-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-600 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "advanced":
        return "bg-red-500/10 text-red-600 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-card/50 to-card/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              Learning Resources
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Curated study materials and learning resources
            </p>
          </div>
          <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-info text-primary-foreground font-medium text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Upload Resource
          </button>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Type Filter */}
            <div className="flex gap-2">
              {(["all", "pdf", "video", "code", "article", "tutorial"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize flex items-center gap-1.5",
                    typeFilter === type
                      ? "bg-primary text-primary-foreground shadow"
                      : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {type !== "all" && getTypeIcon(type)}
                  {type}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2 ml-auto">
              {(["all", "beginner", "intermediate", "advanced"] as const).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setDifficultyFilter(difficulty)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                    difficultyFilter === difficulty
                      ? "bg-primary text-primary-foreground shadow"
                      : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div
              key={resource.id}
              className={cn(
                "resource-card group rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 backdrop-blur p-5 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-0.5"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Type Icon */}
                <div className={cn("w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", `${getTypeColor(resource.type)}`)}>
                  <span className="text-white">{getTypeIcon(resource.type)}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{resource.subject}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(resource.id)}
                      className="flex-shrink-0"
                    >
                      <Star
                        className={cn(
                          "w-5 h-5 transition-all",
                          favorites.has(resource.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground hover:text-yellow-400"
                        )}
                      />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    {resource.difficulty && (
                      <div className={cn("px-2.5 py-1 rounded-lg border text-xs font-medium", getDifficultyColor(resource.difficulty))}>
                        {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                      </div>
                    )}
                  </div>

                  {/* Stats & Author */}
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {resource.author}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      {resource.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-primary" />
                      {resource.downloads.toLocaleString()} downloads
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-yellow-400" />
                      {resource.rating.toFixed(1)}/5.0
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {new Date(resource.uploadedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Size */}
                  <div className="text-xs text-muted-foreground">
                    File size: <span className="font-medium text-foreground">{resource.size}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                <button className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-all flex items-center justify-center gap-2 border border-primary/50">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <FolderOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No resources found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
