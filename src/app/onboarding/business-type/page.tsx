"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Briefcase, ShoppingBag, Lock, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function BusinessTypePage() {
  const router = useRouter();
  const { user } = useUser();
  const [selected, setSelected] = useState<"agency" | "ecommerce" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected || !user) return;
    setLoading(true);

    try {
      // Create workspace placeholder for now
      const { data: ws } = await supabase
        .from("workspaces")
        .insert({ name: "My Workspace", slug: `workspace-${Date.now()}` })
        .select()
        .single();

      if (ws) {
        await supabase.from("workspace_members").insert({
          workspace_id: ws.id,
          user_id: user.id,
          role: "owner"
        });

        await supabase.from("business_profiles").insert({
          workspace_id: ws.id,
          business_type: selected
        });

        await supabase.from("onboarding_state").upsert({
          user_id: user.id,
          workspace_id: ws.id,
          current_step: "business-name"
        });
      }

      router.push("/onboarding/business-name");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <button onClick={() => router.push("/onboarding/welcome")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            What kind of business are you running? This determines everything about how I analyze your data.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSelected("agency")}
          className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
            selected === "agency"
              ? "border-[#F97316] bg-[rgba(249,115,22,0.08)] shadow-[0_0_20px_rgba(249,115,22,0.15)] scale-[1.02]"
              : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)]"
          }`}
        >
          <Briefcase size={32} className="text-[#F97316] mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Agency</h3>
          <p className="text-[14px] text-[#9CA3AF]">You sell services and expertise to clients.</p>
        </button>

        <button
          onClick={() => setSelected("ecommerce")}
          className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
            selected === "ecommerce"
              ? "border-[#F97316] bg-[rgba(249,115,22,0.08)] shadow-[0_0_20px_rgba(249,115,22,0.15)] scale-[1.02]"
              : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)]"
          }`}
        >
          <ShoppingBag size={32} className="text-[#F97316] mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Ecommerce</h3>
          <p className="text-[14px] text-[#9CA3AF]">You sell products online at scale.</p>
        </button>
      </div>

      <div className="flex items-center gap-2 mb-10 text-[#52525B]">
        <Lock size={12} />
        <span className="text-[12px]">This cannot be changed after setup.</span>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected || loading}
        className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
