"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ArrowUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "axo";
  text: string;
  time: string;
};

const suggestions = [
  "Why is my revenue dropping?",
  "What is my biggest risk today?",
  "Should I hire right now?",
  "How is my pipeline performing?",
];

const axoResponses: Record<string, string> = {
  "Why is my revenue dropping?":
    "Your revenue dropped 3.2% this week, primarily driven by two churned clients — WidgetLab and NovaTech. WidgetLab had been inactive for 12 days before churning. I recommend setting up automated engagement alerts for clients who go silent for more than 7 days.",
  "What is my biggest risk today?":
    "Your biggest risk is client concentration. 42% of your revenue comes from a single client (ScaleUp Inc). If they churn, your MRR would drop from $12,800 to $7,400. I recommend diversifying your revenue base by focusing on closing 2-3 new mid-tier clients this month.",
  "Should I hire right now?":
    "Based on your current runway of 14 months and MRR growth of 4.2%, hiring is feasible but risky. I'd recommend waiting until your MRR consistently exceeds $15,000 for at least 2 months. That gives you a safer buffer to absorb a new salary.",
  "How is my pipeline performing?":
    "Your pipeline has 6 active prospects worth a total of $85,500. Two are at high probability of closing ($20,600 combined), but James Wilson at WidgetLab has gone cold — 12 days since last contact. I'd prioritize reaching out to him today before the deal goes stale.",
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AxoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      time: getTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate Axo response
    setTimeout(() => {
      const response = axoResponses[text.trim()] ||
        "That's an interesting question. Based on your current data, I'd recommend reviewing your pipeline metrics and client engagement scores. Let me analyze this further and I'll have a detailed recommendation for you shortly.";

      const axoMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "axo",
        text: response,
        time: getTime(),
      };
      setMessages((prev) => [...prev, axoMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <DashboardLayout title="Axo">
      <div className="flex flex-col h-[calc(100vh-7rem)]">
        {/* Chat header */}
        <div className="glass-card p-4 px-6 flex items-center justify-between mb-4" style={{ borderRadius: "16px" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#EA6C00] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Axo</p>
              <p className="text-xs text-muted-foreground">Strategic AI Cofounder</p>
            </div>
          </div>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Analyzing real data
          </span>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-1 space-y-4">
          {messages.length === 0 && !isTyping ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#EA6C00] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-4">Ask Axo</p>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-4 py-2.5 rounded-full border border-primary/30 text-primary text-xs font-medium hover:bg-primary/8 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.role === "axo" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[#EA6C00] flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xs font-bold text-white">A</span>
                    </div>
                  )}
                  <div className={`max-w-[70%] ${msg.role === "user" ? "order-first" : ""}`}>
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white font-medium rounded-[16px_16px_4px_16px]"
                          : "glass-card text-foreground rounded-[16px_16px_16px_4px]"
                      }`}
                      style={msg.role === "axo" ? { borderRadius: "16px 16px 16px 4px" } : { borderRadius: "16px 16px 4px 16px" }}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-[11px] mt-1 ${msg.role === "user" ? "text-right text-muted-foreground" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[#EA6C00] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">A</span>
                  </div>
                  <div className="glass-card px-4 py-3 flex gap-1.5 items-center" style={{ borderRadius: "16px 16px 16px 4px" }}>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input bar */}
        <div className="glass-card p-4 px-6 mt-4" style={{ borderRadius: "16px" }}>
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Axo..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none max-h-[120px]"
              style={{ minHeight: "24px" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                input.trim()
                  ? "bg-primary text-white hover:bg-[#EA6C00] shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ArrowUp size={18} />
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 hidden md:block">Press Enter to send</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
