import { useState, useEffect } from "react";
import { 
  Download, 
  ThumbsUp, 
  FileText, 
  Clock, 
  Coins,
  Search,
  Filter,
  TrendingUp,
  Star,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { UploadNotesDialog } from "@/components/dialogs/UploadNotesDialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Note {
  id: string;
  title: string;
  subject: string;
  uploader: string;
  uploaderAvatar: string;
  credits: number;
  upvotes: number;
  downloads: number;
  uploadedAt: string;
  fileUrl: string;
  isVerified?: boolean;
  isTrending?: boolean;
}

export function NotesChannel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [upvotedNotes, setUpvotedNotes] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          id,
          title,
          subject,
          upvotes,
          downloads,
          credits_earned,
          file_url,
          created_at,
          profiles:user_id (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedNotes: Note[] = (data || []).map((note: any) => ({
        id: note.id,
        title: note.title,
        subject: note.subject,
        uploader: note.profiles?.full_name || 'Anonymous',
        uploaderAvatar: (note.profiles?.full_name?.[0] || 'A').toUpperCase(),
        credits: note.credits_earned,
        upvotes: note.upvotes,
        downloads: note.downloads,
        uploadedAt: getRelativeTime(note.created_at),
        fileUrl: note.file_url,
        isTrending: note.upvotes > 50,
        isVerified: note.upvotes > 20,
      }));

      setNotes(formattedNotes);
    } catch (error: any) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const getRelativeTime = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const handleUpvote = async (noteId: string) => {
    if (!user) {
      toast({ title: "Login Required", description: "Please login to upvote notes", variant: "destructive" });
      return;
    }

    setUpvotedNotes(prev => {
      const next = new Set(prev);
      if (next.has(noteId)) {
        next.delete(noteId);
      } else {
        next.add(noteId);
      }
      return next;
    });

    // Update in database
    const note = notes.find(n => n.id === noteId);
    if (note) {
      await supabase
        .from('notes')
        .update({ upvotes: note.upvotes + (upvotedNotes.has(noteId) ? -1 : 1) })
        .eq('id', noteId);
    }
  };

  const handleDownload = async (note: Note) => {
    window.open(note.fileUrl, '_blank');
    
    // Increment download count
    await supabase
      .from('notes')
      .update({ downloads: note.downloads + 1 })
      .eq('id', note.id);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.uploader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Notes Sharing
            </h1>
            <p className="text-sm text-muted-foreground">Share and discover quality study materials</p>
          </div>
          <UploadNotesDialog onSuccess={fetchNotes}>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Upload Notes
            </button>
          </UploadNotesDialog>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes by title, subject, or uploader..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button className="px-4 py-2.5 rounded-lg bg-secondary border border-border/50 text-sm font-medium flex items-center gap-2 hover:bg-secondary/80 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share your study materials!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredNotes.map((note, index) => (
              <div
                key={note.id}
                className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {note.isTrending && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                      {note.isVerified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-medium">
                          <Star className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm truncate">{note.title}</h3>
                    <p className="text-xs text-muted-foreground">{note.subject}</p>
                  </div>
                </div>

                {/* Uploader Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {note.uploaderAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{note.uploader}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.uploadedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-warning">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm font-bold">+{note.credits}</span>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {note.upvotes + (upvotedNotes.has(note.id) ? 1 : 0)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {note.downloads}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpvote(note.id)}
                      className={cn(
                        "p-2 rounded-lg transition-all duration-200",
                        upvotedNotes.has(note.id)
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <ThumbsUp className={cn(
                        "w-4 h-4",
                        upvotedNotes.has(note.id) && "fill-current"
                      )} />
                    </button>
                    <button 
                      onClick={() => handleDownload(note)}
                      className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
