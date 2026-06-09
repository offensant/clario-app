"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

const StripeIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" rx="6" fill="#635BFF"/><path d="M15.2 12.4c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5.2 1.4V8.3c-1.7-.7-3.5-1-5.2-1-4.3 0-7.1 2.2-7.1 6 0 5.8 8 4.9 8 7.4 0 1-.8 1.3-2 1.3-1.7 0-3.9-.7-5.7-1.7v4.5c1.9.8 3.9 1.2 5.7 1.2 4.4 0 7.4-2.2 7.4-6 0-6.3-8.1-5.2-8.1-7.6z" fill="white"/></svg>
);

const CalendlyIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" rx="6" fill="#006BFF"/><path d="M21.5 10.5h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm-2 4h-2v-2h2v2z" fill="white"/></svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" rx="6" fill="#FFFFFF" stroke="#E5E7EB"/><path d="M6 10l10 7 10-7v14H6z" fill="#F3F4F6" stroke="#EA4335" strokeWidth="1"/><path d="M6 10l10 7" stroke="#4285F4" strokeWidth="2" fill="none"/><path d="M26 10l-10 7" stroke="#34A853" strokeWidth="2" fill="none"/></svg>
);

const ShopifyIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" rx="6" fill="#95BF47"/><path d="M21 8.5l-.7.2s-.4-1-1-1.7c-.3-.3-.7-.5-1.1-.5h-.3c-.2-.2-.4-.3-.6-.3-1.6-.1-2.4 2-2.7 3l-2 .6c-.6.2-.6.2-.7.8l-1.5 11.4 11 2V8.5h-.4zm-3.6.5l-1.7.5c.3-1 .8-1.5 1.3-1.7.2.3.4.7.4 1.2zm-1.3-1.7c.1 0 .2.1.3.1-.8.4-1.5 1.3-1.8 2.5l-1.3.4c.4-1.3 1.3-3 2.8-3zm.5 6.8c-.1 0-1.1-.6-1.1-.6-.4-.2-.6.1-.7.4l-.3.8s1.5.7 1.6.7c.1.1 0 .3-.1.4l-.7 2c-.1.2 0 .3.2.4l.8.3c.1.1.3 0 .4-.2l.6-1.8c.2-.5.1-1.3-.7-2.4z" fill="white"/></svg>
);

export default function ConnectPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    if (!workspaceId) return;
    setLoading(true);
    await supabase.from("onboarding_state").update({ current_step: "recap" }).eq("workspace_id", workspaceId);
    router.push("/onboarding/recap");
  };

  const agencyIntegrations = [
    { name: "Stripe", icon: StripeIcon },
    { name: "Calendly", icon: CalendlyIcon },
    { name: "Gmail", icon: GmailIcon },
  ];

  const ecomIntegrations = [
    { name: "Shopify", icon: ShopifyIcon },
    { name: "Stripe", icon: StripeIcon },
    { name: "Gmail", icon: GmailIcon },
  ];

  const integrations = businessType === "ecommerce" ? ecomIntegrations : agencyIntegrations;

  return (
    <div className="flex flex-col h-full mt-4">
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="onboarding-card max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-[#9CA3AF] mb-6">This integration is being finalized and will be available shortly.</p>
            <button onClick={() => setShowModal(false)} className="w-full h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
              Got it
            </button>
          </div>
        </div>
      )}

      <button onClick={() => router.push("/onboarding/goal")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)] text-white/50 transition-colors mb-6">
        <ArrowLeft size={16} />
      </button>

      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center shrink-0 axo-pulse">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div className="onboarding-card flex-1 py-3 px-4 rounded-[16px_16px_16px_4px]">
          <p className="text-[15px] leading-relaxed text-white">
            Connect your core tools so I can start analyzing your data automatically.
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-10">
        {integrations.map((Integration, idx) => (
          <div key={idx} className="onboarding-card flex items-center justify-between py-4 px-5">
            <div className="flex items-center gap-3">
              <Integration.icon />
              <span className="font-semibold text-white">{Integration.name}</span>
            </div>
            <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors">
              Connect
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
        <button onClick={handleContinue} className="text-sm text-[#9CA3AF] hover:text-white transition-colors">
          Skip for now
        </button>
      </div>
    </div>
  );
}
