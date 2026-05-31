"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Camera, Monitor, Smartphone } from "lucide-react";

export default function ProfilePage() {
  return (
    <DashboardLayout title="Profile">
      <div className="max-w-2xl space-y-6">
        <Link href="/dashboard/settings" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={16} /> Settings
        </Link>

        <h2 className="text-2xl font-semibold text-foreground">Profile</h2>

        {/* Avatar */}
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-white">TM</span>
          </div>
          <button className="mt-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Camera size={14} /> Change photo
          </button>
        </div>

        {/* Personal Info */}
        <div className="glass-card overflow-hidden">
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Personal Information</p>
          {[
            { label: "Full name", value: "Thomas Mercier" },
            { label: "Email", value: "thomas@clario.co" },
            { label: "Language", value: "EN" },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-center justify-between px-5 py-3.5 hover:bg-[rgba(249,115,22,0.04)] transition-colors cursor-pointer ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
              <span className="text-sm text-foreground">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{row.value}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="glass-card overflow-hidden">
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Security</p>
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-[rgba(249,115,22,0.04)] transition-colors cursor-pointer border-b border-border/50">
            <span className="text-sm text-foreground">Password</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">••••••••</span>
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-[rgba(249,115,22,0.04)] transition-colors cursor-pointer">
            <span className="text-sm text-foreground">Two-Factor Auth</span>
            <div className="w-10 h-6 rounded-full bg-muted relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-muted-foreground transition-transform" />
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Active Sessions</p>
            <button className="text-xs text-destructive font-medium">Revoke all</button>
          </div>
          {[
            { device: "MacBook Pro", browser: "Chrome 124 · 192.168.1.***", time: "Now", current: true, icon: Monitor },
            { device: "iPhone 15 Pro", browser: "Safari · 10.0.0.***", time: "2 hours ago", current: false, icon: Smartphone },
          ].map((s, i, arr) => (
            <div key={s.device} className={`flex items-center gap-4 px-5 py-3.5 ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
              <s.icon size={18} className="text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{s.device}</p>
                  {s.current && <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Current</span>}
                </div>
                <p className="text-xs text-muted-foreground">{s.browser} · {s.time}</p>
              </div>
              {!s.current && <button className="text-xs text-destructive font-medium">Revoke</button>}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
