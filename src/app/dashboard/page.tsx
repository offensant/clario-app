"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Zap, TrendingUp, BarChart2, Play, Check, SkipForward } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [actionDone, setActionDone] = useState(false);
  const [actionSkipped, setActionSkipped] = useState(false);

  return (
    <DashboardLayout title="Today">
      <div className="max-w-4xl space-y-6 relative">
        {/* Orange ambient glow — dark mode only */}
        <div className="ambient-glow hidden dark:block" />

        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Good morning, Thomas</h2>
          <p className="text-muted-foreground mt-1">Here&apos;s your business pulse for today.</p>
        </div>

        {/* Business Pulse */}
        <div className="glass-card p-6" style={{ boxShadow: "0 0 40px rgba(249,115,22,0.15)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#EA6C00] flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Business Pulse</p>
                <p className="text-4xl font-bold text-foreground tracking-tight">87</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-[rgba(34,197,94,0.12)] text-[#22C55E] text-xs font-semibold flex items-center gap-1">
              <TrendingUp size={12} /> +3.2%
            </span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "87%" }} />
          </div>
        </div>

        {/* Today Action Card */}
        {!actionDone && !actionSkipped ? (
          <div className="glass-card p-6" style={{ borderLeft: "3px solid #F97316" }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#EA6C00] flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-foreground">Today&apos;s Highest Leverage Action</p>
                </div>
                <p className="text-base font-semibold text-foreground mb-2">Follow up with 3 high-value prospects</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Your lead response time increased by 34% this week. Focus on responding to the 3 high-value prospects in your pipeline within the next 2 hours. This could recover ~$12,400 in potential revenue.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[rgba(34,197,94,0.12)] text-[#22C55E] text-[11px] font-semibold">IMPACT: HIGH</span>
                  <span className="px-2.5 py-1 rounded-full bg-[rgba(239,68,68,0.12)] text-[#EF4444] text-[11px] font-semibold">RISK: MEDIUM</span>
                  <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[11px] font-semibold">TIME: 30 MIN</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-[#EA6C00] text-white text-sm font-medium rounded-xl transition-colors">
                    <Play size={14} /> Start
                  </button>
                  <button
                    onClick={() => setActionDone(true)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium rounded-xl hover:bg-accent transition-colors text-foreground"
                  >
                    <Check size={14} /> Done
                  </button>
                  <button
                    onClick={() => setActionSkipped(true)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium rounded-xl hover:bg-accent transition-colors text-muted-foreground"
                  >
                    <SkipForward size={14} /> Skip
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[rgba(34,197,94,0.12)] flex items-center justify-center mx-auto mb-3">
              <Check size={24} className="text-[#22C55E]" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {actionDone ? "Action completed! Great work." : "Action skipped. Axo will suggest a new one tomorrow."}
            </p>
          </div>
        )}

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Business Pulse", value: "87", change: "+3.2%", icon: Zap, trend: "up" },
            { label: "Revenue Stability", value: "92", change: "+1.8%", icon: BarChart2, trend: "up" },
            { label: "Lead Leverage", value: "78", change: "-2.1%", icon: TrendingUp, trend: "down" },
          ].map((score) => (
            <div key={score.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <score.icon size={16} className="text-primary" />
                </div>
                <span className={`text-xs font-semibold ${score.trend === "up" ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                  {score.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground tracking-tight">{score.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{score.label}</p>
              <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${score.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: "2 min ago", text: "New lead from Shopify integration — Acme Corp ($8,200 est.)", dot: "bg-[#22C55E]" },
              { time: "1 hour ago", text: "Revenue score updated — monthly recurring revenue up 4.2%", dot: "bg-primary" },
              { time: "3 hours ago", text: "Axo identified a churn risk — WidgetLab hasn't logged in for 12 days", dot: "bg-[#F59E0B]" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.dot}`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
