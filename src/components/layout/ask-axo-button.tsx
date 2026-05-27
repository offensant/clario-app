"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function AskAxoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-[#EA6C00] rounded-full flex items-center justify-center shadow-elevated transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Ask Axo"
      >
        <MessageCircle size={22} className="text-white" />
      </button>

      {/* Chat modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[380px] h-[520px] bg-card border border-border rounded-2xl shadow-modal flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">A</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Axo</p>
                  <p className="text-xs text-muted-foreground">Strategic AI Cofounder</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto">
              <div className="bg-accent rounded-2xl rounded-tl-md p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Hey! I&apos;m Axo, your strategic AI cofounder. What business question is on your mind today?
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 bg-accent rounded-xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Ask Axo anything..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:bg-[#EA6C00] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
