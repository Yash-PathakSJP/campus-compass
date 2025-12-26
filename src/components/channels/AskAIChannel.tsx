import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Lightbulb,
  BookOpen,
  Code,
  Brain,
  ArrowRight,
  User,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { icon: Code, text: "Explain recursion with examples and free resources" },
  { icon: Brain, text: "Help me understand Big O notation with practice problems" },
  { icon: BookOpen, text: "Create a study roadmap for DBMS normalization" },
  { icon: Lightbulb, text: "Find free resources for system design interviews" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hey! I'm your **AI Skill Mentor** 🎯\n\nI'm here to help you learn, grow, and master your subjects. I can:\n\n• **Explain concepts** in simple terms\n• **Provide FREE learning resources** (YouTube, courses, docs)\n• **Identify knowledge gaps** and suggest improvements\n• **Create study roadmaps** for any topic\n\nWhat would you like to learn today?",
    timestamp: new Date(),
  },
];

export function AskAIChannel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const chatMessages = [...messages.filter(m => m.id !== "1"), userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/skill-mentor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: chatMessages, skillGaps: [] }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({ title: "Rate Limited", description: "Please wait a moment and try again.", variant: "destructive" });
          return;
        }
        if (response.status === 402) {
          toast({ title: "Credits Exhausted", description: "AI credits have been exhausted.", variant: "destructive" });
          return;
        }
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantContent = "";
      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message
      setMessages(prev => [...prev, {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      }]);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantId 
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error: any) {
      console.error("AI error:", error);
      toast({ title: "Error", description: "Failed to get AI response. Please try again.", variant: "destructive" });
      // Add fallback response
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment. In the meantime, you can explore free resources on:\n\n• **freeCodeCamp** - youtube.com/freecodecamp\n• **CS50** - cs50.harvard.edu\n• **Khan Academy** - khanacademy.org\n• **GeeksforGeeks** - geeksforgeeks.org",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center glow-primary">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              AI Skill Mentor
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </h1>
            <p className="text-sm text-muted-foreground">Personalized learning with free resources</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-slide-up",
              message.role === "user" && "flex-row-reverse"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              message.role === "assistant" 
                ? "bg-gradient-to-br from-primary to-info" 
                : "bg-gradient-to-br from-accent to-warning"
            )}>
              {message.role === "assistant" ? (
                <Bot className="w-4 h-4 text-primary-foreground" />
              ) : (
                <User className="w-4 h-4 text-accent-foreground" />
              )}
            </div>
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-3",
              message.role === "assistant" 
                ? "bg-card border border-border/50 rounded-tl-sm" 
                : "bg-primary text-primary-foreground rounded-tr-sm"
            )}>
              <div className={cn(
                "text-sm whitespace-pre-wrap",
                message.role === "assistant" && "[&_strong]:text-primary [&_strong]:font-semibold"
              )}>
                {message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedPrompts.map((prompt) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={prompt.text}
                  onClick={() => handlePromptClick(prompt.text)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border/50 text-left text-sm hover:bg-secondary hover:border-primary/30 transition-all group"
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
                    {prompt.text}
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about your studies..."
            className="flex-1 px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Powered by AI • Provides free learning resources tailored to your skill gaps
        </p>
      </div>
    </div>
  );
}
