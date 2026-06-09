"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Play, SkipForward, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function TimelinePage() {
  const { workspace } = useWorkspace();
  const [actions, setActions] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchActions = async () => {
      if (!workspace) return;
      const { data } = await supabase
        .from("axo_actions")
        .select("*")
        .eq("workspace_id", workspace.id)
        .order("created_at", { ascending: false });
        
      if (data && data.length > 0) {
        setActions(data);
      } else {
        // Mock timeline
        setActions([
          { id: "1", action_text: "Launch the Q3 acquisition campaign", status: "pending", created_at: new Date().toISOString(), type: "proposed" },
          { id: "2", action_text: "Pause underperforming Meta Ads (AdSet #4)", status: "done", created_at: new Date(Date.now() - 86400000).toISOString(), type: "executed", impact: "+$450/mo saved" },
          { id: "3", action_text: "Send win-back email to churned segment", status: "done", created_at: new Date(Date.now() - 86400000 * 2).toISOString(), type: "executed", impact: "+2 clients recovered" },
          { id: "4", action_text: "Redesign pricing page tier 3", status: "skipped", created_at: new Date(Date.now() - 86400000 * 3).toISOString(), type: "skipped" }
        ]);
      }
    };
    fetchActions();
  }, [workspace]);

  const tabs = ["All", "Executed", "Proposed", "Skipped", "Impact"];

  const filtered = actions.filter(a => {
    if (filter === "All") return true;
    if (filter === "Executed") return a.status === "done";
    if (filter === "Proposed") return a.status === "pending";
    if (filter === "Skipped") return a.status === "skipped";
    if (filter === "Impact") return !!a.impact;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-6">Timeline</h1>

      <div className="flex gap-6 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`pb-3 text-sm font-semibold transition-colors relative ${
              filter === tab ? "text-[#0A0A0A] dark:text-white" : "text-[#6B7280] hover:text-[#374151] dark:hover:text-[#D1D5DB]"
            }`}
          >
            {tab}
            {filter === tab && (
              <motion.div layoutId="timelineTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F97316]" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 flex items-start gap-4 hover:border-l-2 hover:border-l-[rgba(0,0,0,0.2)] dark:hover:border-l-[rgba(255,255,255,0.2)] transition-all group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              item.status === "done" ? "bg-[rgba(34,197,94,0.1)] text-[#22C55E]" :
              item.status === "skipped" ? "bg-[rgba(107,114,128,0.1)] text-[#6B7280]" :
              "bg-[rgba(249,115,22,0.1)] text-[#F97316]"
            }`}>
              {item.status === "done" ? <Check size={14} /> :
               item.status === "skipped" ? <SkipForward size={14} /> :
               <Play size={14} />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                  item.status === "done" ? "bg-[rgba(34,197,94,0.1)] text-[#22C55E]" :
                  item.status === "skipped" ? "bg-[rgba(107,114,128,0.1)] text-[#6B7280]" :
                  "bg-[rgba(249,115,22,0.1)] text-[#F97316]"
                }`}>
                  {item.status}
                </span>
                <span className="text-xs text-[#9CA3AF]">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] dark:text-white mb-1">{item.action_text}</h3>
              
              {item.impact && (
                <div className="mt-3 flex items-center gap-2 text-sm text-[#22C55E] bg-[rgba(34,197,94,0.05)] px-3 py-2 rounded-lg inline-flex">
                  <ArrowRight size={14} />
                  <span className="font-semibold">Measured Impact: {item.impact}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#9CA3AF]">
            No actions found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
