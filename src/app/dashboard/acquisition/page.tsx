"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useWorkspace } from "@/context/WorkspaceContext";
import { motion } from "framer-motion";

export default function AcquisitionPage() {
  const router = useRouter();
  const { businessType } = useWorkspace();

  useEffect(() => {
    if (businessType === "agency") {
      router.push("/dashboard/pipeline");
    }
  }, [businessType, router]);

  const MetaIcon = () => (
    <svg viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" rx="6" fill="#0081FB"/><path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3 11.5c-.8 0-1.5-.3-2.3-1.1l-1.2-1.5c-.3-.4-.5-.4-.8 0l-.7.9c-.8 1-1.5 1.7-2.5 1.7-1.7 0-3-1.8-3-4.5s1.3-4.5 3-4.5c1 0 1.7.7 2.5 1.7l.7.9c.3.4.5.4.8 0l1.2-1.5c.8-.8 1.5-1.1 2.3-1.1 1.7 0 3 1.8 3 4.5s-1.3 4.5-3 4.5z" fill="white"/></svg>
  );

  const channels = [
    { name: "Meta Ads", icon: MetaIcon, spend: 4500, roas: 3.2, cac: 45, trend: "+12%" },
    { name: "Google Ads", icon: () => <div className="w-8 h-8 rounded-md bg-white border flex items-center justify-center text-xs font-bold text-blue-500">G</div>, spend: 2800, roas: 4.1, cac: 38, trend: "+5%" },
    { name: "Email (Klaviyo)", icon: () => <div className="w-8 h-8 rounded-md bg-[#24C6A2] flex items-center justify-center text-xs font-bold text-white">K</div>, spend: 500, roas: 12.4, cac: 8, trend: "-2%" },
    { name: "Organic Search", icon: () => <div className="w-8 h-8 rounded-md bg-[#6B7280] flex items-center justify-center text-xs font-bold text-white">SEO</div>, spend: 0, roas: 0, cac: 0, trend: "+18%" }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-6">Acquisition</h1>

      <div className="glass-card p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white">Channel Performance (ROAS)</h3>
          <div className="flex gap-2">
            {["All", "Meta", "Google", "Email", "Organic"].map((tab, i) => (
              <button key={tab} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${i===0 ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-black" : "bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] text-[#6B7280]"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.from({length:30}).map((_,i)=>({val: 2 + Math.random()*3}))}>
              <Line type="monotone" dataKey="val" stroke="#F97316" strokeWidth={2} dot={false} fill="rgba(249,115,22,0.06)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((ch, i) => (
          <motion.div
            key={ch.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <ch.icon />
                <h3 className="font-semibold text-[#0A0A0A] dark:text-white">{ch.name}</h3>
              </div>
              <span className={`text-xs font-semibold ${ch.trend.startsWith("+") ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                {ch.trend}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] pt-4">
              <div>
                <p className="text-[11px] text-[#9CA3AF] mb-1 uppercase tracking-wider">Spend</p>
                <p className="font-semibold text-[#374151] dark:text-[#D1D5DB]">${ch.spend.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#9CA3AF] mb-1 uppercase tracking-wider">ROAS</p>
                <p className="font-semibold text-[#374151] dark:text-[#D1D5DB]">{ch.roas > 0 ? ch.roas.toFixed(1) + "x" : "—"}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#9CA3AF] mb-1 uppercase tracking-wider">CAC</p>
                <p className="font-semibold text-[#374151] dark:text-[#D1D5DB]">{ch.cac > 0 ? "$" + ch.cac : "—"}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
