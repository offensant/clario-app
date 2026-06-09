"use client";

import { Info } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useScores } from "@/hooks/useScores";
import { useMetrics } from "@/hooks/useMetrics";
import { useWorkspace } from "@/context/WorkspaceContext";
import { motion } from "framer-motion";

export default function IntelligencePage() {
  const { workspace, businessType } = useWorkspace();
  const { scores } = useScores(workspace?.id);
  const { metrics } = useMetrics(workspace?.id);

  const getColor = (val: number | string) => {
    if (typeof val === "string") {
      return val === "HEALTHY" ? "#22C55E" : val === "MODERATE" ? "#F59E0B" : "#EF4444";
    }
    return val >= 7 ? "#22C55E" : val >= 4 ? "#F97316" : "#EF4444";
  };

  const cards = businessType === "agency" 
    ? [
        { title: "Lead Leverage", val: scores?.lead_leverage || 0, sub1: "Active Pipeline", val1: "4 deals", sub2: "Win Rate", val2: "22%", rec: "Focus on top-of-funnel outbound." },
        { title: "Revenue Stability", val: scores?.revenue_stability || 0, sub1: "MRR Retention", val1: "98%", sub2: "Churn (60d)", val2: "1 client", rec: "Excellent retention. Safe to hire." },
        { title: "Client Dependency", val: scores?.client_dependency || "MODERATE", sub1: "Top Client", val1: "15% of MRR", sub2: "Avg Retainer", val2: "$3,200", rec: "Diversify. One client holds too much power." },
        { title: "Execution Score", val: scores?.execution_score || 0, sub1: "Actions Completed", val1: "12/15", sub2: "Avg Time", val2: "2.4 days", rec: "Pace is slowing down. Timeblock tomorrow." }
      ]
    : [
        { title: "Acquisition Engine", val: scores?.lead_leverage || 0, sub1: "Avg ROAS", val1: "3.8", sub2: "Blended CAC", val2: "$42", rec: "Ad engine is efficient. Scale Meta spend." },
        { title: "Revenue Velocity", val: scores?.revenue_stability || 0, sub1: "Daily Rev", val1: "$1.2k", sub2: "Growth MoM", val2: "+12%", rec: "Strong momentum heading into Q4." },
        { title: "LTV / Retention", val: scores?.client_dependency || "MODERATE", sub1: "Repeat Rate", val1: "24%", sub2: "Avg Order", val2: "$85", rec: "Repeat rate is dipping. Launch email win-back." },
        { title: "Execution Score", val: scores?.execution_score || 0, sub1: "Actions Completed", val1: "12/15", sub2: "Avg Time", val2: "2.4 days", rec: "Pace is slowing down. Timeblock tomorrow." }
      ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-6">Intelligence</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-l-[3px]"
            style={{ borderLeftColor: getColor(card.val) }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 group relative">
                <h3 className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB]">{card.title}</h3>
                <Info size={14} className="text-[#6B7280] cursor-pointer" />
                <div className="hidden group-hover:block absolute top-6 left-0 bg-[#141414] text-white text-xs p-2 rounded-lg w-48 z-10 shadow-xl">
                  Measures {card.title.toLowerCase()} health based on recent metrics.
                </div>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getColor(card.val) }} />
            </div>

            <div className="flex items-end gap-1 mb-8">
              <span className="text-5xl font-bold tracking-tight" style={{ color: getColor(card.val) }}>
                {card.val}
              </span>
              {typeof card.val === "number" && <span className="text-2xl text-[#9CA3AF] mb-1">/10</span>}
            </div>

            <div className="h-16 w-full mb-8 opacity-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <Line type="monotone" dataKey={i % 2 === 0 ? "active_clients" : "mrr"} stroke="#F97316" strokeWidth={1.5} dot={false} fill="rgba(249,115,22,0.06)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <div>
                <p className="text-xs text-[#9CA3AF] mb-1">{card.sub1}</p>
                <p className="text-[13px] font-semibold text-[#374151] dark:text-[#D1D5DB]">{card.val1}</p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF] mb-1">{card.sub2}</p>
                <p className="text-[13px] font-semibold text-[#374151] dark:text-[#D1D5DB]">{card.val2}</p>
              </div>
            </div>

            <div className="flex gap-2 items-start bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] p-3 rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-1.5 shrink-0" />
              <p className="text-[13px] text-[#9CA3AF] italic leading-relaxed">Axo: {card.rec}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
