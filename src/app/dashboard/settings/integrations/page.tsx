"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useState } from "react";

const StripeIcon = () => (
  <svg viewBox="0 0 32 32" width="40" height="40"><rect width="32" height="32" rx="6" fill="#635BFF"/><path d="M15.2 12.4c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5.2 1.4V8.3c-1.7-.7-3.5-1-5.2-1-4.3 0-7.1 2.2-7.1 6 0 5.8 8 4.9 8 7.4 0 1-.8 1.3-2 1.3-1.7 0-3.9-.7-5.7-1.7v4.5c1.9.8 3.9 1.2 5.7 1.2 4.4 0 7.4-2.2 7.4-6 0-6.3-8.1-5.2-8.1-7.6z" fill="white"/></svg>
);

const CalendlyIcon = () => (
  <svg viewBox="0 0 32 32" width="40" height="40"><rect width="32" height="32" rx="6" fill="#006BFF"/><path d="M21.5 10.5h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm-2 4h-2v-2h2v2z" fill="white"/></svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 32 32" width="40" height="40"><rect width="32" height="32" rx="6" fill="#FFFFFF" stroke="#E5E7EB"/><path d="M6 10l10 7 10-7v14H6z" fill="#F3F4F6" stroke="#EA4335" strokeWidth="1"/><path d="M6 10l10 7" stroke="#4285F4" strokeWidth="2" fill="none"/><path d="M26 10l-10 7" stroke="#34A853" strokeWidth="2" fill="none"/></svg>
);

const MetaIcon = () => (
  <svg viewBox="0 0 32 32" width="40" height="40"><rect width="32" height="32" rx="6" fill="#0081FB"/><path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3 11.5c-.8 0-1.5-.3-2.3-1.1l-1.2-1.5c-.3-.4-.5-.4-.8 0l-.7.9c-.8 1-1.5 1.7-2.5 1.7-1.7 0-3-1.8-3-4.5s1.3-4.5 3-4.5c1 0 1.7.7 2.5 1.7l.7.9c.3.4.5.4.8 0l1.2-1.5c.8-.8 1.5-1.1 2.3-1.1 1.7 0 3 1.8 3 4.5s-1.3 4.5-3 4.5z" fill="white"/></svg>
);

const ShopifyIcon = () => (
  <svg viewBox="0 0 32 32" width="40" height="40"><rect width="32" height="32" rx="6" fill="#95BF47"/><path d="M21 8.5l-.7.2s-.4-1-1-1.7c-.3-.3-.7-.5-1.1-.5h-.3c-.2-.2-.4-.3-.6-.3-1.6-.1-2.4 2-2.7 3l-2 .6c-.6.2-.6.2-.7.8l-1.5 11.4 11 2V8.5h-.4zm-3.6.5l-1.7.5c.3-1 .8-1.5 1.3-1.7.2.3.4.7.4 1.2zm-1.3-1.7c.1 0 .2.1.3.1-.8.4-1.5 1.3-1.8 2.5l-1.3.4c.4-1.3 1.3-3 2.8-3zm.5 6.8c-.1 0-1.1-.6-1.1-.6-.4-.2-.6.1-.7.4l-.3.8s1.5.7 1.6.7c.1.1 0 .3-.1.4l-.7 2c-.1.2 0 .3.2.4l.8.3c.1.1.3 0 .4-.2l.6-1.8c.2-.5.1-1.3-.7-2.4z" fill="white"/></svg>
);

const HubSpotIcon = () => (
  <svg viewBox="0 0 32 32" width="40" height="40"><rect width="32" height="32" rx="6" fill="#FF7A59"/><circle cx="16" cy="16" r="3" fill="white"/><circle cx="16" cy="9" r="1.5" fill="white"/><circle cx="16" cy="23" r="1.5" fill="white"/><circle cx="10" cy="12.5" r="1.5" fill="white"/><circle cx="22" cy="12.5" r="1.5" fill="white"/><circle cx="10" cy="19.5" r="1.5" fill="white"/><circle cx="22" cy="19.5" r="1.5" fill="white"/></svg>
);

export default function IntegrationsSettings() {
  const { businessType } = useWorkspace();
  const [showModal, setShowModal] = useState(false);

  const agencyIntegrations = [
    { name: "Stripe", icon: StripeIcon, desc: "Billing and revenue data", connected: true },
    { name: "Calendly", icon: CalendlyIcon, desc: "Meeting and pipeline events", connected: true },
    { name: "HubSpot CRM", icon: HubSpotIcon, desc: "Deal stages and pipeline value", connected: false },
    { name: "Gmail", icon: GmailIcon, desc: "Email activity and sentiment", connected: false },
    { name: "Meta Ads", icon: MetaIcon, desc: "Acquisition cost and return", connected: false },
  ];

  const ecomIntegrations = [
    { name: "Shopify", icon: ShopifyIcon, desc: "Store revenue and orders", connected: true },
    { name: "Stripe", icon: StripeIcon, desc: "Payment processing data", connected: true },
    { name: "Gmail", icon: GmailIcon, desc: "Support email sentiment", connected: false },
    { name: "Meta Ads", icon: MetaIcon, desc: "Ad spend and ROAS", connected: true },
    { name: "Calendly", icon: CalendlyIcon, desc: "Partner meeting events", connected: false },
    { name: "HubSpot CRM", icon: HubSpotIcon, desc: "B2B wholesale pipeline", connected: false },
  ];

  const integrations = businessType === "ecommerce" ? ecomIntegrations : agencyIntegrations;

  return (
    <div className="max-w-3xl mx-auto">
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full text-center p-8 bg-white dark:bg-[#141414]">
            <h3 className="text-xl font-bold mb-2 text-[#0A0A0A] dark:text-white">Coming Soon</h3>
            <p className="text-[#6B7280] mb-6">This integration is currently being finalized.</p>
            <button onClick={() => setShowModal(false)} className="w-full h-10 rounded-xl bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,0,0,0.08)] text-[#0A0A0A] dark:text-white font-semibold transition-colors">
              Got it
            </button>
          </div>
        </div>
      )}

      <Link href="/dashboard/settings" className="flex items-center gap-2 text-[#6B7280] hover:text-[#0A0A0A] dark:hover:text-white transition-colors mb-6 w-fit">
        <ChevronLeft size={16} /> Settings
      </Link>

      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-2">Integrations</h1>
      <p className="text-[#6B7280] mb-8">Connect your tools to feed data into Axo's analysis engine.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {integrations.map(integ => (
          <div key={integ.name} className="glass-card p-5 flex flex-col justify-between h-[140px]">
            <div className="flex items-start gap-4">
              <integ.icon />
              <div>
                <h3 className="font-semibold text-[#0A0A0A] dark:text-white text-[15px]">{integ.name}</h3>
                <p className="text-[13px] text-[#6B7280]">{integ.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              {integ.connected ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <span className="text-[13px] font-medium text-[#22C55E]">Connected</span>
                  </div>
                  <button className="text-[13px] font-medium text-[#EF4444] hover:text-red-600 transition-colors">Disconnect</button>
                </>
              ) : (
                <>
                  <div />
                  <button onClick={() => setShowModal(true)} className="h-8 px-4 rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[13px] font-medium hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                    Connect
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-4">Coming Soon</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 opacity-40 grayscale pointer-events-none">
        {["Google Ads", "Klaviyo", "Notion", "Slack", "WhatsApp", "TikTok Ads"].map(name => (
          <div key={name} className="glass-card p-4 flex items-center justify-between">
            <span className="font-medium text-sm text-[#0A0A0A] dark:text-white">{name}</span>
            <span className="text-[10px] font-bold bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.1)] px-2 py-0.5 rounded text-[#6B7280]">SOON</span>
          </div>
        ))}
      </div>
    </div>
  );
}
