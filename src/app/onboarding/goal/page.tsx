"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function GoalPage() {
  const router = useRouter();
  const { user } = useUser();
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchWs = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", user.id)
        .single();
      if (data) setWorkspaceId(data.workspace_id);
    };
    fetchWs();
  }, [user]);

  const handleContinue = async () => {
    const value = parseFloat(goal.replace(/[^0-9.]/g, ""));
    if (isNaN(value) || !workspaceId) return;
    setLoading(true);

    try {
      await supabase.from("business_profiles").update({ goal_90d: value }).eq("workspace_id", workspaceId);
      await supabase.from("onboarding_state").update({ current_step: "connect" }).eq("workspace_id", workspaceId);
      router.push("/onboarding/connect");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <button onClick={() => router.push("/onboarding/pipeline-info")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            What is your revenue goal for the next 90 days? I will map our daily actions to hitting this target.
          </p>
        </div>
      </div>

      <div className="mb-10 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-lg">$</span>
        <input
          autoFocus
          type="text"
          inputMode="numeric"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="0"
          className="onboarding-input pl-8"
          onKeyDown={(e) => {
            if (e.key === "Enter" && goal) {
              handleContinue();
            }
          }}
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!goal || loading}
        className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
