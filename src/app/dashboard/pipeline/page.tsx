"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/context/WorkspaceContext";
import { motion } from "framer-motion";

export default function PipelinePage() {
  const router = useRouter();
  const { workspace, businessType } = useWorkspace();
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    if (businessType === "ecommerce") {
      router.push("/dashboard/acquisition");
      return;
    }

    const fetchContacts = async () => {
      if (!workspace) return;
      const { data } = await supabase.from("pipeline_contacts").select("*").eq("workspace_id", workspace.id);
      if (data && data.length > 0) setContacts(data);
      else {
        setContacts([
          { id: "1", company_name: "Acme Corp", contact_name: "John Doe", deal_value: 12000, close_probability: 80, stage: "high_probability", last_contact_date: "2024-05-20" },
          { id: "2", company_name: "Globex", contact_name: "Jane Smith", deal_value: 45000, close_probability: 60, stage: "high_value", last_contact_date: "2024-05-18" },
          { id: "3", company_name: "Initech", contact_name: "Bill L.", deal_value: 8000, close_probability: 20, stage: "at_risk", last_contact_date: "2024-04-10" }
        ]);
      }
    };
    fetchContacts();
  }, [businessType, router, workspace]);

  const stages = [
    { id: "high_probability", title: "High Probability", color: "#22C55E" },
    { id: "high_value", title: "High Value", color: "#3B82F6" },
    { id: "at_risk", title: "At Risk", color: "#EF4444" },
    { id: "stagnant", title: "Stagnant", color: "#6B7280" }
  ];

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white">Pipeline</h1>
        <button className="h-9 px-4 rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] font-medium flex items-center gap-2 transition-colors">
          <Plus size={16} /> Add prospect
        </button>
      </div>

      <div className="glass-card p-6 mb-8 shrink-0 h-48">
        <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-4">Pipeline Evolution (30d)</h3>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.from({length:30}).map((_,i)=>({val: Math.random()*100}))}>
              <Line type="monotone" dataKey="val" stroke="#F97316" strokeWidth={2} dot={false} fill="rgba(249,115,22,0.06)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex gap-4 flex-1 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-1 min-w-[280px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
              <h3 className="text-sm font-semibold text-[#6B7280]">{stage.title}</h3>
              <span className="ml-auto text-xs font-semibold bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.08)] px-2 py-0.5 rounded-full text-[#6B7280]">
                {contacts.filter(c => c.stage === stage.id).length}
              </span>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto">
              {contacts.filter(c => c.stage === stage.id).map((contact, i) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 hover:border-l-2 hover:border-l-[#F97316] transition-all cursor-pointer group relative"
                >
                  <button className="absolute top-4 right-4 text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={16} />
                  </button>
                  <h4 className="font-semibold text-[#0A0A0A] dark:text-white mb-1">{contact.company_name}</h4>
                  <p className="text-sm text-[#6B7280] mb-3">{contact.contact_name}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-semibold text-[#374151] dark:text-[#D1D5DB]">${contact.deal_value.toLocaleString()}</span>
                    <span className="text-xs font-medium bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.08)] px-2 py-1 rounded-md text-[#6B7280]">
                      {contact.close_probability}%
                    </span>
                  </div>
                </motion.div>
              ))}
              {contacts.filter(c => c.stage === stage.id).length === 0 && (
                <div className="h-24 border-2 border-dashed border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] rounded-xl flex items-center justify-center">
                  <span className="text-sm text-[#9CA3AF]">Empty</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
