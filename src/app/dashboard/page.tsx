"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Play, Check, SkipForward, TrendingUp, AlertTriangle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useScores } from "@/hooks/useScores";
import { useActions } from "@/hooks/useActions";
import { useMetrics } from "@/hooks/useMetrics";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useLanguage } from "@/lib/language";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function DashboardToday() {
  const { workspace } = useWorkspace();
  const { scores } = useScores(workspace?.id);
  const { actions, markDone, markSkipped } = useActions(workspace?.id);
  const { metrics } = useMetrics(workspace?.id);
  const { t } = useLanguage();
  const [focusMode, setFocusMode] = useState(false);

  const pulse = scores?.business_pulse || 0;
  const pulseColor = pulse >= 7 ? "#22C55E" : pulse >= 4 ? "#F97316" : "#EF4444";
  const action = actions[0];

  const handleDone = async () => {
    if (!action) return;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    await markDone(action.id);
    setFocusMode(false);
  };

  const handleSkip = async () => {
    if (!action) return;
    await markSkipped(action.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Focus Mode Overlay */}
      {focusMode && action && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#141414] border border-[#F97316] rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F97316] to-[#EA6C00]" />
            <h2 className="text-3xl font-bold text-[#0A0A0A] dark:text-white mb-4">{action.action_text}</h2>
            <p className="text-[#6B7280] mb-8 text-lg">Focus purely on this task. Minimize all other windows. When you are done, click complete.</p>
            <div className="flex gap-4">
              <button onClick={handleDone} className="flex-1 h-14 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all">
                <Check size={20} /> Mark as Complete
              </button>
              <button onClick={() => setFocusMode(false)} className="px-6 h-14 rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] font-semibold transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Row 1: Pulse + Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pulse Card */}
        <div className="lg:col-span-1 glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] uppercase tracking-widest text-[#9CA3AF] mb-4 font-semibold">{t("dashboard.business_pulse")}</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-5xl font-bold tracking-tight" style={{ color: pulseColor }}>
                <CountUp end={pulse} decimals={1} duration={0.8} />
              </span>
              <span className="text-2xl text-[#9CA3AF] font-medium mb-1">/10</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.08)] text-[#22C55E]">
                +0.3
              </span>
              <span className="text-[13px] text-[#6B7280] italic">vs last week</span>
            </div>
          </div>
          <div className="h-16 w-full mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <Line type="monotone" dataKey="mrr" stroke="#F97316" strokeWidth={2} dot={false} fill="rgba(249,115,22,0.06)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" style={{ backgroundColor: pulseColor, transform: 'translate(50%, -50%)' }} />
          </div>
        </div>

        {/* Action Card */}
        <div className="lg:col-span-2 glass-card p-6 border-l-[3px] border-l-[#F97316] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#F97316] opacity-[0.03] rounded-full blur-3xl" />
          <h3 className="text-[11px] uppercase tracking-widest text-[#9CA3AF] mb-4 font-semibold">{t("dashboard.todays_action")}</h3>
          
          {action ? (
            <>
              <h2 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-2 pr-12">
                {action.action_text}
              </h2>
              <p className="text-[14px] text-[#6B7280] mb-6 max-w-xl">
                Axo identified this as the highest leverage move for your business today based on recent metrics.
              </p>
              
              <div className="flex gap-2 mb-8">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.08)] text-[#374151] dark:text-[#D1D5DB] flex items-center gap-1">
                  <TrendingUp size={12} className="text-[#6B7280]" /> HIGH IMPACT
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.08)] text-[#374151] dark:text-[#D1D5DB] flex items-center gap-1">
                  <AlertTriangle size={12} className="text-[#6B7280]" /> MODERATE RISK IF IGNORED
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setFocusMode(true)} className="h-[42px] px-6 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <Play size={16} fill="currentColor" /> {t("action.start")}
                </button>
                <button onClick={handleDone} className="h-[42px] px-5 rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] font-medium flex items-center gap-2 transition-colors">
                  <Check size={16} className="text-[#6B7280]" /> {t("action.done")}
                </button>
                <button onClick={handleSkip} className="h-[42px] px-5 rounded-xl hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] text-[#6B7280] font-medium flex items-center gap-2 transition-colors">
                  <SkipForward size={16} /> {t("action.skip")}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-[#9CA3AF] italic">All actions completed today. Axo is preparing tomorrow's priorities.</p>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Core Snapshot */}
      <div>
        <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-4">{t("dashboard.core_snapshot")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="glass-card p-4">
            <p className="text-[12px] text-[#9CA3AF] font-medium mb-1">Revenue 30d</p>
            <div className="text-xl font-bold text-[#0A0A0A] dark:text-white">
              $<CountUp end={12450} duration={1} separator="," />
            </div>
            <div className="h-8 mt-2"><ResponsiveContainer><LineChart data={metrics}><Line type="monotone" dataKey="mrr" stroke="#F97316" dot={false} strokeWidth={1.5} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="glass-card p-4">
            <p className="text-[12px] text-[#9CA3AF] font-medium mb-1">Active Clients</p>
            <div className="text-xl font-bold text-[#0A0A0A] dark:text-white">
              <CountUp end={28} duration={1} />
            </div>
            <div className="h-8 mt-2"><ResponsiveContainer><LineChart data={metrics}><Line type="monotone" dataKey="active_clients" stroke="#F97316" dot={false} strokeWidth={1.5} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="glass-card p-4">
            <p className="text-[12px] text-[#9CA3AF] font-medium mb-1">Calls Booked</p>
            <div className="text-xl font-bold text-[#0A0A0A] dark:text-white">
              <CountUp end={14} duration={1} />
            </div>
            <div className="h-8 mt-2"><ResponsiveContainer><LineChart data={metrics}><Line type="monotone" dataKey="calls_booked" stroke="#F97316" dot={false} strokeWidth={1.5} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="glass-card p-4">
            <p className="text-[12px] text-[#9CA3AF] font-medium mb-1">Conversion</p>
            <div className="text-xl font-bold text-[#0A0A0A] dark:text-white">
              <CountUp end={18.5} duration={1} decimals={1} />%
            </div>
            <div className="h-8 mt-2"><ResponsiveContainer><LineChart data={metrics}><Line type="monotone" dataKey="conversion_rate" stroke="#F97316" dot={false} strokeWidth={1.5} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="glass-card p-4">
            <p className="text-[12px] text-[#9CA3AF] font-medium mb-1">Cash Runway</p>
            <div className="text-xl font-bold text-[#0A0A0A] dark:text-white">
              <CountUp end={14.2} duration={1} decimals={1} /> mo
            </div>
            <div className="h-8 mt-2"><ResponsiveContainer><LineChart data={metrics}><Line type="monotone" dataKey="cash_runway" stroke="#F97316" dot={false} strokeWidth={1.5} /></LineChart></ResponsiveContainer></div>
          </div>
        </div>
      </div>

      {/* Row 3: Insights */}
      <div>
        <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-4">{t("dashboard.insights")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Churn Risk Detected", desc: "Client 'Alpha Co' engagement has dropped 40% this month.", color: "border-l-[#EF4444]" },
            { title: "Opportunity: Upsell", desc: "3 clients are nearing their retainer limits. Time to propose an upgrade.", color: "border-l-[#22C55E]" },
            { title: "Efficiency Warning", desc: "Delivery times are slipping slightly over the last 14 days.", color: "border-l-[#F59E0B]" }
          ].map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`glass-card p-5 border-l-[3px] ${insight.color}`}
            >
              <h4 className="font-semibold text-[14px] text-[#0A0A0A] dark:text-white mb-1">{insight.title}</h4>
              <p className="text-[13px] text-[#6B7280]">{insight.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
