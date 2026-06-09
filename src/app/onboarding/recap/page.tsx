"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function RecapPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAll = async () => {
      if (!user) return;
      const { data: mem } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", user.id)
        .single();
      if (mem) {
        setWorkspaceId(mem.workspace_id);
        const { data: ws } = await supabase.from("workspaces").select("name").eq("id", mem.workspace_id).single();
        const { data: bp } = await supabase.from("business_profiles").select("*").eq("workspace_id", mem.workspace_id).single();
        setData({ ...ws, ...bp });
      }
    };
    fetchAll();
  }, [user]);

  const handleContinue = async () => {
    if (!workspaceId) return;
    setLoading(true);
    await supabase.from("onboarding_state").update({ current_step: "complete" }).eq("workspace_id", workspaceId);
    router.push("/onboarding/complete");
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <button onClick={() => router.push("/onboarding/connect")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            Got it. Before we launch, let's verify your profile. Everything looks correct?
          </p>
        </div>
      </div>

      <div className="onboarding-card p-6 mb-10 space-y-4">
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-[#9CA3AF]">Business Type</span>
          <span className="text-white capitalize">{data?.business_type || "..."}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-[#9CA3AF]">Business Name</span>
          <span className="text-white font-semibold">{data?.name || "..."}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-[#9CA3AF]">Baseline Revenue</span>
          <span className="text-white">${data?.mrr?.toLocaleString() || "0"}</span>
        </div>
        <div className="flex justify-between pb-1">
          <span className="text-[#9CA3AF]">90-Day Goal</span>
          <span className="text-white">${data?.goal_90d?.toLocaleString() || "0"}</span>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={loading || !data}
        className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all mt-auto"
      >
        {loading ? "Launching..." : "Launch Clario"}
      </button>
    </div>
  );
}
