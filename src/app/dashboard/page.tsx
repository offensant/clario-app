"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Zap, TrendingUp, ArrowUpRight, BarChart2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Today">
      <div className="max-w-4xl space-y-6">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Good morning, Thomas</h2>
          <p className="text-muted-foreground mt-1">Here&apos;s your business pulse for today.</p>
        </div>

        {/* Axo's Daily Action */}
        <div className="bg-card border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">A</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-foreground">Axo&apos;s Action for Today</p>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-md">Priority</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your lead response time increased by 34% this week. Focus on responding to the 3 high-value prospects in your pipeline within the next 2 hours. This could recover ~$12,400 in potential revenue.
              </p>
              <button className="mt-3 text-sm font-medium text-primary hover:text-[#EA6C00] transition-colors flex items-center gap-1">
                View details <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Business Pulse", value: "87", change: "+3.2%", icon: Zap, trend: "up" },
            { label: "Revenue Stability", value: "92", change: "+1.8%", icon: BarChart2, trend: "up" },
            { label: "Lead Leverage", value: "78", change: "-2.1%", icon: TrendingUp, trend: "down" },
          ].map((score) => (
            <div key={score.label} className="bg-card border border-border rounded-2xl shadow-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <score.icon size={16} className="text-primary" />
                </div>
                <span className={`text-xs font-medium ${score.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {score.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground tracking-tight">{score.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{score.label}</p>
              {/* Mini bar */}
              <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${score.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl shadow-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: "2 min ago", text: "New lead from Shopify integration — Acme Corp ($8,200 est.)", dot: "bg-success" },
              { time: "1 hour ago", text: "Revenue score updated — monthly recurring revenue up 4.2%", dot: "bg-primary" },
              { time: "3 hours ago", text: "Axo identified a churn risk — WidgetLab hasn't logged in for 12 days", dot: "bg-warning" },
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
