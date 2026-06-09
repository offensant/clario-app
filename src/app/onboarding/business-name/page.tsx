"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function BusinessNamePage() {
  const router = useRouter();
  const { user } = useUser();
  const [name, setName] = useState("");
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
    if (!name.trim() || !workspaceId || !user) return;
    setLoading(true);

    try {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      await supabase.from("workspaces").update({ name: name.trim(), slug }).eq("id", workspaceId);
      await supabase.from("onboarding_state").update({ current_step: "mrr" }).eq("workspace_id", workspaceId);
      router.push("/onboarding/mrr");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <button onClick={() => router.push("/onboarding/business-type")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            What is the name of your business?
          </p>
        </div>
      </div>

      <div className="mb-10">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Acme Corp"
          className="onboarding-input"
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) {
              handleContinue();
            }
          }}
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!name.trim() || loading}
        className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
