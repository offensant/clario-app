"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useUser } from "@/context/UserContext";
import { useAxoResponse } from "@/hooks/useAxoResponse";
import { useScores } from "@/hooks/useScores";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "axo";
  content: string;
}

export default function AxoPage() {
  const { workspace, businessProfile } = useWorkspace();
  const { user } = useUser();
  const { scores } = useScores(workspace?.id);
  const { getResponse } = useAxoResponse();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || !workspace || !user) return;
    
    const userMsg = { id: Date.now().toString(), role: "user" as const, content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const context = { businessProfile, scores };
    const responseText = await getResponse(text, context);
    
    const axoMsg = { id: (Date.now() + 1).toString(), role: "axo" as const, content: responseText };
    setMessages(prev => [...prev, axoMsg]);
    setIsTyping(false);

    // Save to db
    await supabase.from("axo_conversations").insert({
      workspace_id: workspace.id,
      user_id: user.id,
      message: text,
      response: responseText,
      context_snapshot: context
    });
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F97316]/5 to-transparent pointer-events-none rounded-[32px] opacity-50 dark:opacity-20 blur-3xl" />
      
      <div className="glass-card flex-1 flex flex-col overflow-hidden relative z-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        
        {/* Header */}
        <div className="p-4 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] flex items-center justify-between bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div>
              <h2 className="font-semibold text-[#0A0A0A] dark:text-white leading-tight">Axo</h2>
              <p className="text-[11px] text-[#22C55E] font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Online
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center mb-6 opacity-80 mix-blend-screen dark:mix-blend-plus-lighter">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <p className="text-[#6B7280] mb-8 max-w-sm">I've analyzed your latest data. Ask me anything about your revenue, risks, or pipeline.</p>
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {["What's my biggest churn risk?", "Can I afford to hire?", "Summarize my pipeline", "How is my ROAS?"].map(s => (
                  <button key={s} onClick={() => handleSend(s)} className="text-sm text-[#374151] dark:text-[#D1D5DB] bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,0,0,0.06)] dark:hover:bg-[rgba(255,255,255,0.06)] p-3 rounded-xl transition-colors border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "axo" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                      <span className="text-[10px] font-bold text-white">A</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-[20px] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.08)] text-[#0A0A0A] dark:text-white rounded-tr-sm" 
                      : "bg-white dark:bg-[#141414] border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] text-[#374151] dark:text-[#D1D5DB] rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-[10px] font-bold text-white">A</span>
                  </div>
                  <div className="bg-white dark:bg-[#141414] border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] rounded-[20px] rounded-tl-sm px-5 py-4 flex gap-1.5 shadow-sm">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,0,0,0.2)] border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
              placeholder="Ask Axo anything..."
              className="w-full bg-white dark:bg-[rgba(255,255,255,0.04)] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10 transition-all shadow-sm text-[15px]"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className={`absolute right-2 w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                input.trim() && !isTyping ? "bg-[#F97316] text-white shadow-md hover:bg-[#EA6C00] scale-100" : "bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] text-[#9CA3AF] scale-95 cursor-not-allowed"
              }`}
            >
              <Send size={16} className={input.trim() && !isTyping ? "ml-0.5" : ""} />
            </button>
          </div>
          <p className="text-center text-[11px] text-[#9CA3AF] mt-3 pb-1">Axo can make mistakes. Consider verifying critical data points.</p>
        </div>
      </div>
    </div>
  );
}
