"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function MrrPage() {
  const router = useRouter();
  const { user } = useUser();
  const [mrr, setMrr] = useState("");
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
    const value = parseFloat(mrr.replace(/[^0-9.]/g, ""));
    if (isNaN(value) || !workspaceId) return;
    setLoading(true);

    try {
      await supabase.from("business_profiles").update({ mrr: value }).eq("workspace_id", workspaceId);
      await supabase.from("onboarding_state").update({ current_step: "clients" }).eq("workspace_id", workspaceId);
      router.push("/onboarding/clients");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <button onClick={() => router.push("/onboarding/business-name")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            {businessType === "ecommerce"
              ? "Your monthly revenue is my baseline. Everything I tell you will be relative to this number."
              : "Your MRR is my baseline. Everything I tell you will be relative to this number."}
          </p>
        </div>
      </div>

      <div className="mb-10 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-lg">$</span>
        <input
          autoFocus
          type="text"
          inputMode="numeric"
          value={mrr}
          onChange={(e) => setMrr(e.target.value)}
          placeholder="0"
          className="onboarding-input pl-8"
          onKeyDown={(e) => {
            if (e.key === "Enter" && mrr) {
              handleContinue();
            }
          }}
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!mrr || loading}
        className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
