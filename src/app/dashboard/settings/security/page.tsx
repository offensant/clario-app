"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { ChevronLeft, Shield, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

export default function SecurityPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <DashboardLayout title="Security">
      <div className="max-w-2xl space-y-6">
        <Link href="/dashboard/settings" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={16} /> Settings
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Security</h2>
          <p className="text-muted-foreground mt-1">Keep your account secure.</p>
        </div>

        {/* Password */}
        <div className="glass-card p-6">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">Password</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Current password</label>
              <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">New password</label>
              <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <div className="flex gap-1 mt-2">
                <div className="flex-1 h-1 rounded-full bg-[#22C55E]" />
                <div className="flex-1 h-1 rounded-full bg-[#22C55E]" />
                <div className="flex-1 h-1 rounded-full bg-muted" />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Medium strength</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Confirm new password</label>
              <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <button
            onClick={() => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
            className="w-full h-11 mt-6 rounded-xl bg-primary hover:bg-[#EA6C00] text-white text-sm font-medium transition-colors"
          >
            Update password
          </button>
          {showSuccess && (
            <p className="text-sm text-[#22C55E] text-center mt-3 animate-in fade-in">✓ Password updated successfully</p>
          )}
        </div>

        {/* 2FA */}
        <div className="glass-card p-6">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">Two-Factor Authentication</p>
          <div className="flex items-center gap-4">
            <Shield size={20} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
            </div>
            <div className="w-10 h-6 rounded-full bg-muted relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-muted-foreground transition-transform" />
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Active Sessions</p>
            <button className="text-xs text-destructive font-medium">Revoke all sessions</button>
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
