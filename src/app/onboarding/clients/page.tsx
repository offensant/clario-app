"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function ClientsPage() {
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
      const activeClients = parseInt(val1, 10);
      const secondaryVal = parseFloat(val2);

      await supabase.from("business_profiles").update({ active_clients: activeClients }).eq("workspace_id", workspaceId);
      
      const payload: any = { workspace_id: workspaceId, active_clients: activeClients };
      if (businessType === "agency") {
        payload.top_client_share = secondaryVal;
      } else {
        payload.repeat_purchase_rate = secondaryVal;
      }

      await supabase.from("metrics_daily").insert(payload);
      await supabase.from("onboarding_state").update({ current_step: "pipeline-info" }).eq("workspace_id", workspaceId);
      
      router.push("/onboarding/pipeline-info");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <button onClick={() => router.push("/onboarding/mrr")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            {businessType === "ecommerce"
              ? "How many active customers do you have, and what is your repeat purchase rate?"
              : "How many active clients do you have, and what percentage of revenue comes from your largest client?"}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">
            {businessType === "ecommerce" ? "Monthly active customers" : "Active clients"}
          </label>
          <input
            autoFocus
            type="number"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            placeholder="0"
            className="onboarding-input"
          />
        </div>
        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">
            {businessType === "ecommerce" ? "Repeat purchase rate (%)" : "Top client share (%)"}
          </label>
          <div className="relative">
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
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]">%</span>
          </div>
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
