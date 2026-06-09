"use client";

import Link from "next/link";
import { User, Briefcase, Link as LinkIcon, CreditCard, Shield, Users, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function SettingsHub() {
  const { t } = useLanguage();

  const menu = [
    { href: "/dashboard/settings/profile", icon: User, title: t("settings.profile"), desc: "Manage your avatar, name, and email" },
    { href: "/dashboard/settings/workspace", icon: Briefcase, title: t("settings.workspace"), desc: "Update workspace name and set platform language" },
    { href: "/dashboard/settings/integrations", icon: LinkIcon, title: t("settings.integrations"), desc: "Connect data sources and APIs" },
    { href: "/dashboard/settings/billing", icon: CreditCard, title: t("settings.billing"), desc: "Manage plan, view invoices and usage" },
    { href: "/dashboard/settings/security", icon: Shield, title: t("settings.security"), desc: "Change password and review active sessions" },
    { href: "/dashboard/settings/members", icon: Users, title: t("settings.members"), desc: "Invite team members and manage roles" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-8">{t("nav.settings")}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="glass-card p-5 flex items-center justify-between hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] flex items-center justify-center shrink-0">
                <item.icon size={20} className="text-[#6B7280]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0A] dark:text-white mb-1">{item.title}</h3>
                <p className="text-[13px] text-[#6B7280]">{item.desc}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#9CA3AF] group-hover:text-[#0A0A0A] dark:group-hover:text-white transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
