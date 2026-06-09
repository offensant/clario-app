"use client";

import { Search, Bell, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/lib/language";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { profile } = useUser();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[248px] z-30 h-[60px] glass-topbar">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            <Menu size={18} className="text-[#6B7280]" />
          </button>
          <h1 className="text-lg font-semibold text-[#0A0A0A] dark:text-white">
            {t(title)}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors">
            <Search size={18} className="text-[#6B7280]" />
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={18} className="text-[#6B7280]" />
              ) : (
                <Moon size={18} className="text-[#6B7280]" />
              )}
            </button>
          )}

          {/* Notifications */}
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors relative">
            <Bell size={18} className="text-[#6B7280]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>

          {/* User avatar */}
          <Avatar
            src={profile?.avatar_url}
            name={profile?.full_name || ""}
            size={32}
          />
        </div>
      </div>
    </header>
  );
}
