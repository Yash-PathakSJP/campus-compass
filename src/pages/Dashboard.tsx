import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { TopNav } from "@/components/layout/TopNav";
import { NotesChannel } from "@/components/channels/NotesChannel";
import { DoubtsChannel } from "@/components/channels/DoubtsChannel";
import { AskAIChannel } from "@/components/channels/AskAIChannel";
import { AnnouncementsChannel } from "@/components/channels/AnnouncementsChannel";
import { LeaderboardView } from "@/components/views/LeaderboardView";
import { RoadmapView } from "@/components/views/RoadmapView";
import { NotificationsView } from "@/components/views/NotificationsView";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  const [currentView, setCurrentView] = useState("channels");
  const [activeChannel, setActiveChannel] = useState("notes-sharing");

  const renderMainContent = () => {
    if (currentView === "leaderboard") return <LeaderboardView />;
    if (currentView === "roadmap") return <RoadmapView />;
    if (currentView === "notifications") return <NotificationsView />;

    // Channel views
    switch (activeChannel) {
      case "announcements":
        return <AnnouncementsChannel />;
      case "notes-sharing":
        return <NotesChannel />;
      case "doubts":
        return <DoubtsChannel />;
      case "ask-ai":
        return <AskAIChannel />;
      default:
        return <NotesChannel />;
    }
  };

  const showRightSidebar = currentView === "channels";

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopNav 
        currentView={currentView} 
        onViewChange={setCurrentView}
        notificationCount={3}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar 
          activeChannel={activeChannel}
          onChannelChange={(channel) => {
            setActiveChannel(channel);
            setCurrentView("channels");
          }}
        />
        
        <main className="flex-1 overflow-hidden">
          {renderMainContent()}
        </main>

        {showRightSidebar && <RightSidebar />}
      </div>
    </div>
  );
}
