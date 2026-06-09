"use client";

import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

export default function BillingSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/dashboard/settings" className="flex items-center gap-2 text-[#6B7280] hover:text-[#0A0A0A] dark:hover:text-white transition-colors mb-6 w-fit">
        <ChevronLeft size={16} /> Settings
      </Link>

      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-8">Billing & Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 border-l-[3px] border-l-[rgba(249,115,22,0.4)] flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0A0A0A] dark:text-white mb-1">Free Plan</h3>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold text-[#0A0A0A] dark:text-white">$0</span>
              <span className="text-[#6B7280] mb-1">/mo</span>
            </div>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-8">You are currently on the free beta plan. Limited to 1 workspace and basic integrations.</p>
          <button className="w-full h-10 mt-auto rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all">
            Upgrade to Pro
          </button>
        </div>

        <div className="glass-card p-6 flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-4">Pro Features</h3>
          <ul className="space-y-3">
            {[
              "Unlimited workspaces",
              "Advanced custom integrations",
              "Priority Axo response engine",
              "Custom P&L exports",
              "Role-based access control"
            ].map(f => (
              <li key={f} className="flex items-center gap-2 text-[13px] text-[#374151] dark:text-[#D1D5DB]">
                <CheckCircle2 size={16} className="text-[#22C55E]" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
          <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white">Billing History</h3>
        </div>
        <div className="p-8 text-center text-[#9CA3AF] text-sm">
          No invoices found. You are on the free plan.
        </div>
      </div>
    </div>
  );
}
