"use client";

import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function WorkspaceSettings() {
  const { lang, setLang, t } = useLanguage();
  const { workspace, businessProfile } = useWorkspace();

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/dashboard/settings" className="flex items-center gap-2 text-[#6B7280] hover:text-[#0A0A0A] dark:hover:text-white transition-colors mb-6 w-fit">
        <ChevronLeft size={16} /> {t("nav.settings")}
      </Link>

      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-8">{t("settings.workspace")}</h1>

      <div className="space-y-6">
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold block mb-1">Workspace Name</label>
            <p className="text-[15px] font-medium text-[#0A0A0A] dark:text-white">{workspace?.name || "..."}</p>
          </div>
          <div className="p-4">
            <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold block mb-1">Workspace ID</label>
            <p className="text-[13px] font-mono text-[#6B7280]">{workspace?.id || "..."}</p>
          </div>
        </div>

        {/* Language Section - The ONLY place to change language */}
        <div className="glass-card p-6">
          <h3 className="text-[11px] uppercase tracking-widest text-[#9CA3AF] font-semibold mb-4">LANGUAGE / LANGUE</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setLang("EN")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                lang === "EN" ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-black shadow-md" : "bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] text-[#6B7280] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("FR")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                lang === "FR" ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-black shadow-md" : "bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] text-[#6B7280] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)]"
              }`}
            >
              Français
            </button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-2">Strategic Profile</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="capitalize font-medium text-[#374151] dark:text-[#D1D5DB]">{businessProfile?.business_type || "..."}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#9CA3AF]">
            <Lock size={12} />
            <span className="text-xs">Cannot be changed after setup.</span>
          </div>
        </div>

        <div className="glass-card p-6 border-red-500/20">
          <h3 className="text-sm font-semibold text-[#EF4444] mb-2">Danger Zone</h3>
          <p className="text-sm text-[#6B7280] mb-4">Permanently delete this workspace and all associated data.</p>
          <button className="h-9 px-4 rounded-lg border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/5 text-sm font-medium transition-colors">
            Delete workspace
          </button>
        </div>
      </div>
    </div>
  );
}
