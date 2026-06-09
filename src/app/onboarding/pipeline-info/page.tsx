"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function PipelineInfoPage() {
  const router = useRouter();
  const { user } = useUser();
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [loading, setLoading] = useState(false);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState<string>("agency");

  useEffect(() => {
    const fetchWs = async () => {
      if (!user) return;
      const { data: mem } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", user.id)
        .single();
      if (mem) {
        setWorkspaceId(mem.workspace_id);
        const { data: bp } = await supabase
          .from("business_profiles")
          .select("business_type")
          .eq("workspace_id", mem.workspace_id)
          .single();
        if (bp) setBusinessType(bp.business_type);
      }
    };
    fetchWs();
  }, [user]);

  const handleContinue = async () => {
    if (!val1 || !val2 || !workspaceId) return;
    setLoading(true);

    try {
      const v1 = parseFloat(val1);
      const v2 = parseFloat(val2);

      // Get latest metrics row to update
      const { data: metrics } = await supabase
        .from("metrics_daily")
        .select("id")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (metrics && metrics.length > 0) {
        const payload: any = {};
        if (businessType === "agency") {
          payload.active_pipeline = v1;
          payload.clients_lost_60d = v2;
        } else {
          payload.cac = v1;
          payload.roas = v2;
        }
        await supabase.from("metrics_daily").update(payload).eq("id", metrics[0].id);
      }

      await supabase.from("onboarding_state").update({ current_step: "goal" }).eq("workspace_id", workspaceId);
      router.push("/onboarding/goal");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <button onClick={() => router.push("/onboarding/clients")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            {businessType === "ecommerce"
              ? "Let's talk acquisition. What is your average CAC and your ROAS?"
              : "Let's talk pipeline. How many deals are active, and how many clients have you lost in the last 60 days?"}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">
            {businessType === "ecommerce" ? "Customer Acquisition Cost (CAC)" : "Active deals in pipeline"}
          </label>
          <div className="relative">
            {businessType === "ecommerce" && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">$</span>}
            <input
              autoFocus
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              placeholder="0"
              className={`onboarding-input ${businessType === "ecommerce" ? "pl-8" : ""}`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">
            {businessType === "ecommerce" ? "Return on Ad Spend (ROAS)" : "Clients lost (last 60 days)"}
          </label>
          <input
            type="number"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            placeholder="0"
            className="onboarding-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && val1 && val2) {
                handleContinue();
              }
            }}
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!val1 || !val2 || loading}
        className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
