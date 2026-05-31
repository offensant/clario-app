"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CheckCircle, XCircle, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";

type FilterType = "all" | "executed" | "proposed" | "skipped" | "impact";

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "executed", label: "Executed" },
  { key: "proposed", label: "Proposed" },
  { key: "skipped", label: "Skipped" },
  { key: "impact", label: "Impact" },
];

const timelineItems = [
  {
    date: "Today",
    items: [
      { type: "proposed" as const, title: "Follow up with TechFlow", description: "Sarah Chen hasn't responded in 48 hours. A quick follow-up could close this $12,400 deal.", time: "9:00 AM", icon: Lightbulb, iconColor: "#F97316" },
    ],
  },
  {
    date: "Yesterday",
    items: [
      { type: "executed" as const, title: "Sent proposal to DataPulse", description: "Completed the proposal. Estimated close value: $8,200.", time: "3:22 PM", icon: CheckCircle, iconColor: "#22C55E" },
      { type: "skipped" as const, title: "Review pricing strategy", description: "Axo suggested reviewing pricing tiers. Skipped — will revisit next week.", time: "11:00 AM", icon: XCircle, iconColor: "#6B7280" },
    ],
  },
  {
    date: "May 28, 2026",
    items: [
      { type: "impact" as const, title: "Revenue increased by 4.2%", description: "After implementing Axo's suggestion to upsell existing clients, MRR grew from $10,400 to $10,836.", time: "End of day", icon: TrendingUp, iconColor: "#22C55E" },
      { type: "executed" as const, title: "Called 3 high-value prospects", description: "Completed outreach to pipeline priorities. 2 out of 3 responded positively.", time: "2:15 PM", icon: CheckCircle, iconColor: "#22C55E" },
      { type: "proposed" as const, title: "Optimize onboarding flow", description: "Axo detected a drop-off in client activation. Consider simplifying the first 3 steps.", time: "10:00 AM", icon: Lightbulb, iconColor: "#F97316" },
    ],
  },
  {
    date: "May 27, 2026",
    items: [
      { type: "skipped" as const, title: "Reconnect with dormant leads", description: "6 leads haven't been contacted in 30+ days. Skipped due to time constraints.", time: "4:00 PM", icon: XCircle, iconColor: "#6B7280" },
      { type: "impact" as const, title: "Client churn risk detected", description: "WidgetLab usage dropped 73% this week. Axo flagged as high churn risk.", time: "9:30 AM", icon: AlertTriangle, iconColor: "#EF4444" },
    ],
  },
];

export default function TimelinePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredGroups = timelineItems
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => activeFilter === "all" || item.type === activeFilter),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <DashboardLayout title="Timeline">
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Timeline</h2>
          <p className="text-muted-foreground mt-1">Your action history and impact log.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-muted w-fit">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === f.key
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {filteredGroups.map((group) => (
            <div key={group.date}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 sticky top-14 bg-background/80 backdrop-blur-sm py-2 z-10">
                {group.date}
              </p>
              <div className="space-y-3 relative">
                {/* Connecting line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border" />

                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="glass-card p-4 pl-14 relative hover:border-l-2 hover:border-l-primary transition-all" style={{ borderRadius: "14px" }}>
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border z-10">
                        <Icon size={14} style={{ color: item.iconColor }} />
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
