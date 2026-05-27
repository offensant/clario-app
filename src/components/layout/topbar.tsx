"use client";

import { Search, Bell, Menu, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const [lang, setLang] = useState<"EN" | "FR">("EN");

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 z-30 h-14 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
          >
            <Menu size={18} />
          </button>
          <h1 className="text-base font-semibold text-foreground">{title}</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors duration-150">
            <Search size={18} className="text-foreground/70" />
          </button>

          <button
            onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
            className="h-9 px-2 flex items-center gap-1.5 rounded-lg hover:bg-accent transition-colors duration-150 text-sm font-medium text-foreground/70"
          >
            <Globe size={14} />
            {lang}
          </button>

          <ThemeToggle />

          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors duration-150 relative">
            <Bell size={18} className="text-foreground/70" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ml-1">
            <span className="text-xs font-semibold text-primary">TM</span>
          </button>
        </div>
      </div>
    </header>
  );
}
