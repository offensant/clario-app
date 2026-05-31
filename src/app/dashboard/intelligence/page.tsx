"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useState } from "react";

const scores = [
  {
    label: "Business Pulse",
    value: 87,
    change: "+3.2",
    trend: "up" as const,
    color: "#22C55E",
    description: "Overall health of your business based on revenue, pipeline, and operational metrics.",
    data: [40, 45, 42, 55, 60, 58, 72, 75, 80, 87],
  },
  {
    label: "Revenue Stability",
    value: 92,
    change: "+1.8",
    trend: "up" as const,
    color: "#22C55E",
    description: "How predictable and stable your revenue streams are over time.",
    data: [60, 65, 70, 72, 78, 82, 85, 88, 90, 92],
  },
  {
    label: "Lead Leverage",
    value: 78,
    change: "-2.1",
    trend: "down" as const,
    color: "#22C55E",
    description: "Efficiency of converting leads into paying customers.",
    data: [50, 55, 60, 65, 70, 82, 85, 80, 79, 78],
  },
  {
    label: "Client Dependency",
    value: 45,
    change: "-5.4",
    trend: "down" as const,
    color: "#F97316",
    description: "Risk level based on revenue concentration across your client base.",
    data: [70, 65, 60, 55, 50, 52, 48, 46, 44, 45],
  },
];

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 50;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`)
    .join(" ");

  return (
    <svg width={width} height={height} className="mt-3">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function IntelligencePage() {
  const [tooltip, setTooltip] = useState<number | null>(null);

  return (
    <DashboardLayout title="Intelligence">
      <div className="max-w-5xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Strategic Scores</h2>
          <p className="text-muted-foreground mt-1">AI-powered metrics that reveal the true state of your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scores.map((score, i) => {
            const borderColor =
              score.value > 70 ? "#22C55E" : score.value >= 40 ? "#F97316" : "#EF4444";

            return (
              <div
                key={score.label}
                className="glass-card p-6 relative"
                style={{ borderLeft: `3px solid ${borderColor}` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{score.label}</p>
                    <p className="text-4xl font-bold text-foreground mt-1 tracking-tight">{score.value}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                        score.trend === "up"
                          ? "bg-[rgba(34,197,94,0.12)] text-[#22C55E]"
                          : "bg-[rgba(239,68,68,0.12)] text-[#EF4444]"
                      }`}
                    >
                      {score.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {score.change}%
                    </span>
                    <button
                      onClick={() => setTooltip(tooltip === i ? null : i)}
                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Info size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {tooltip === i && (
                  <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10 text-sm text-muted-foreground">
                    {score.description}
                  </div>
                )}

                <MiniChart data={score.data} color={borderColor} />

                <p className="mt-3 text-xs text-muted-foreground italic">
                  Axo: {score.value > 70
                    ? "This metric is in a healthy range. Keep maintaining your current strategy."
                    : "This area needs attention. Consider reviewing your approach."}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
