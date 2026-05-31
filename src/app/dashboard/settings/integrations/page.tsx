"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";

const connected = [
  { name: "Stripe", description: "Payment processing and revenue data", connected: true },
  { name: "Calendly", description: "Meeting scheduling and calendar sync", connected: true },
  { name: "Gmail", description: "Email communication tracking", connected: false },
];

const comingSoon = [
  { name: "Meta Ads", description: "Facebook and Instagram ad performance" },
  { name: "Google Ads", description: "Google search and display ad data" },
  { name: "HubSpot", description: "CRM and sales pipeline" },
  { name: "Notion", description: "Documentation and knowledge base" },
  { name: "Slack", description: "Team communication and alerts" },
];

export default function IntegrationsPage() {
  return (
    <DashboardLayout title="Integrations">
      <div className="max-w-3xl space-y-6">
        <Link href="/dashboard/settings" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={16} /> Settings
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Integrations</h2>
          <p className="text-muted-foreground mt-1">Connect your tools. Axo learns from your data.</p>
        </div>

        {/* Connected tools */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Connected Tools</p>
          {connected.map((tool) => (
            <div key={tool.name} className="glass-card p-4 px-5 flex items-center gap-4" style={tool.connected ? { borderLeft: "2px solid #22C55E" } : {}}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{tool.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </div>
              {tool.connected ? (
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <span className="text-xs font-medium text-[#22C55E]">Connected</span>
                  </div>
                  <button className="text-[11px] text-destructive mt-0.5">Disconnect</button>
                </div>
              ) : (
                <button className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#EA6C00] text-white text-xs font-medium rounded-xl transition-colors">
                  Connect <ExternalLink size={12} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Coming Soon</p>
          {comingSoon.map((tool) => (
            <div key={tool.name} className="glass-card p-4 px-5 flex items-center gap-4 opacity-50 cursor-not-allowed relative">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-muted-foreground">{tool.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-muted text-[11px] font-medium text-muted-foreground">Soon</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
