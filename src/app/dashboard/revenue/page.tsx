"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useState } from "react";

const chartData7d = [8200, 9100, 8800, 9500, 10200, 9800, 10800];
const chartData30d = [6000, 6500, 7200, 7800, 8200, 8500, 8800, 9000, 9200, 9100, 9500, 9800, 10200, 10500, 10200, 9800, 10000, 10400, 10800, 11200, 11000, 10800, 11200, 11500, 11800, 12000, 12200, 12100, 12400, 12800];
const chartData90d = [4000, 4500, 5000, 5200, 5800, 6200, 6500, 7000, 7200, 7800, 8000, 8200, 8500, 8800, 9000, 9200, 9500, 9800, 10000, 10200, 10500, 10800, 11000, 11200, 11500, 11800, 12000, 12200, 12400, 12800];

function RevenueChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 600;
  const h = 160;
  const actualPts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  const projected = data.slice(-5).map((v, i) => v + (i + 1) * 200);
  const projStart = ((data.length - 1) / (data.length - 1)) * w;
  const projPts = projected.map((v, i) => `${projStart + ((i + 1) / projected.length) * 100},${h - ((v - min) / range) * h}`).join(" ");
  const lastActualPt = `${projStart},${h - ((data[data.length - 1] - min) / range) * h}`;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w + 100} ${h}`} preserveAspectRatio="none">
      {/* Fill */}
      <polygon
        points={`0,${h} ${actualPts} ${projStart},${h}`}
        fill="rgba(249,115,22,0.06)"
      />
      {/* Actual line */}
      <polyline points={actualPts} fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Projected line */}
      <polyline points={`${lastActualPt} ${projPts}`} fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
    </svg>
  );
}

export default function RevenuePage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const chartMap = { "7d": chartData7d, "30d": chartData30d, "90d": chartData90d };
  const currentData = chartMap[period];
  const currentRevenue = currentData[currentData.length - 1];
  const previousRevenue = currentData[0];
  const growth = (((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1);

  return (
    <DashboardLayout title="Revenue">
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Revenue</h2>
            <p className="text-muted-foreground mt-1">Track your revenue growth and forecasts.</p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted">
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  period === p
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue Growth Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">Revenue Growth</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary rounded-full inline-block" /> Actual</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary rounded-full inline-block border-dashed" style={{ borderTop: "2px dashed #F97316", height: 0 }} /> Projected</span>
            </div>
          </div>
          <RevenueChart data={currentData} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-5">
            <p className="text-xs text-muted-foreground">Current MRR</p>
            <p className="text-2xl font-bold text-foreground mt-1">${(currentRevenue).toLocaleString()}</p>
            <p className={`text-xs font-semibold mt-1 ${Number(growth) >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
              {Number(growth) >= 0 ? "+" : ""}{growth}%
            </p>
          </div>
          <div className="glass-card p-5">
            <p className="text-xs text-muted-foreground">Annual Run Rate</p>
            <p className="text-2xl font-bold text-foreground mt-1">${(currentRevenue * 12).toLocaleString()}</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-xs text-muted-foreground">Cash Runway</p>
            <p className="text-2xl font-bold text-foreground mt-1">14 months</p>
            <p className="text-xs text-muted-foreground mt-1">At current burn rate</p>
          </div>
        </div>

        {/* Axo Insight */}
        <div className="glass-card p-5" style={{ borderLeft: "3px solid #F97316" }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">A</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Axo Insight</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Your revenue grew {growth}% this period. If you maintain this trajectory, you&apos;ll hit $15,000 MRR within 3 months. Focus on reducing client churn to accelerate growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
