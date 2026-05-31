"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { User, Building2, Plug, CreditCard, Shield, Users, ChevronRight } from "lucide-react";

const settingsCards = [
  { label: "Profile", description: "Manage your personal information and avatar", icon: User, href: "/dashboard/settings/profile" },
  { label: "Workspace", description: "Configure your workspace name and business profile", icon: Building2, href: "/dashboard/settings/workspace" },
  { label: "Integrations", description: "Connect your tools and data sources", icon: Plug, href: "/dashboard/settings/integrations" },
  { label: "Billing", description: "Manage your plan and payment details", icon: CreditCard, href: "/dashboard/settings/billing" },
  { label: "Security", description: "Password, sessions, and two-factor authentication", icon: Shield, href: "/dashboard/settings/security" },
  { label: "Members", description: "Invite and manage your team members", icon: Users, href: "/dashboard/settings/members" },
];

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
          <p className="text-muted-foreground mt-1">Manage your workspace and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settingsCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="glass-card p-5 flex items-start gap-4 group hover:border-l-2 hover:border-l-primary transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{card.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{card.description}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
