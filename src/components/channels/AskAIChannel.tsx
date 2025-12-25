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
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { icon: Code, text: "Explain recursion with examples" },
  { icon: Brain, text: "Help me understand Big O notation" },
  { icon: BookOpen, text: "Summarize DBMS normalization" },
  { icon: Lightbulb, text: "Tips for system design interviews" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hey! I'm your **AI Skill Mentor** 🎯\n\nI'm here to help you learn, grow, and master your subjects. I can:\n\n• **Explain concepts** in simple terms\n• **Generate practice problems** tailored to your level\n• **Identify knowledge gaps** and suggest improvements\n• **Provide study roadmaps** for any topic\n\nWhat would you like to learn today?",
    timestamp: new Date(),
  },
];

export function AskAIChannel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
            <p className="text-sm text-muted-foreground">Personalized learning assistant</p>
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
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          AI responses are personalized based on your skill level and learning goals
        </p>
      </div>
    </div>
  );
}

function generateMockResponse(input: string): string {
  const responses: Record<string, string> = {
    recursion: "**Recursion** is a technique where a function calls itself to solve smaller subproblems.\n\n**Key Components:**\n• **Base Case** - The condition that stops recursion\n• **Recursive Case** - Where the function calls itself\n\n**Example - Factorial:**\n```\nfunction factorial(n) {\n  if (n <= 1) return 1;  // Base case\n  return n * factorial(n-1);  // Recursive case\n}\n```\n\n**Practice Problem:** Try implementing Fibonacci using recursion!\n\n🎯 Based on your current level, I recommend starting with simple problems like sum of array elements before moving to tree traversals.",
    "big o": "**Big O Notation** measures algorithm efficiency as input grows.\n\n**Common Complexities:**\n• **O(1)** - Constant (array access)\n• **O(log n)** - Logarithmic (binary search)\n• **O(n)** - Linear (simple loop)\n• **O(n log n)** - Linearithmic (merge sort)\n• **O(n²)** - Quadratic (nested loops)\n\n**Quick Tip:** Focus on the dominant term. O(n² + n) simplifies to O(n²)\n\n📊 Your current gap in algorithms suggests practicing sorting comparisons. Would you like practice problems?",
  };

  const lowerInput = input.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerInput.includes(key)) return response;
  }

  return "Great question! Let me break this down for you.\n\nBased on your learning profile and the topic you've asked about, here's a structured explanation:\n\n**Key Concepts:**\n• Start with the fundamentals\n• Build upon prerequisite knowledge\n• Practice with real examples\n\n**Next Steps:**\n1. Review the basic theory\n2. Work through guided examples\n3. Attempt practice problems\n\n💡 **Personalized Tip:** Given your current progress in the roadmap, I'd suggest focusing on understanding the core principles before diving into advanced applications.\n\nWould you like me to generate some practice problems tailored to your level?";
}
