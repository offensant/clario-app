"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { ChevronLeft, CheckCircle, Download } from "lucide-react";

export default function BillingPage() {
  return (
    <DashboardLayout title="Billing">
      <div className="max-w-2xl space-y-6">
        <Link href="/dashboard/settings" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={16} /> Settings
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Billing</h2>
          <p className="text-muted-foreground mt-1">Manage your plan and payment details.</p>
        </div>

        {/* Current plan */}
        <div className="glass-card p-6 flex items-center justify-between" style={{ borderLeft: "3px solid #F97316" }}>
          <div>
            <p className="text-lg font-bold text-foreground">Free Plan</p>
            <p className="text-2xl font-bold text-primary mt-1">$0<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            <p className="text-xs text-muted-foreground mt-1">No renewal — upgrade anytime</p>
          </div>
          <button className="px-5 py-2.5 bg-primary hover:bg-[#EA6C00] text-white text-sm font-medium rounded-xl transition-colors">Upgrade</button>
        </div>

        {/* Features */}
        <div className="glass-card overflow-hidden">
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Included in your plan</p>
          {["3 connected integrations", "Daily Axo action", "Basic strategic scores", "Email support", "1 workspace"].map((f, i, arr) => (
            <div key={f} className={`flex items-center gap-3 px-5 py-3 ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
              <CheckCircle size={16} className="text-[#22C55E] shrink-0" />
              <span className="text-sm text-foreground">{f}</span>
            </div>
          ))}
        </div>

        {/* Billing history */}
        <div className="glass-card overflow-hidden">
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Billing History</p>
          <div className="px-5 py-2.5 flex items-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50">
            <span className="flex-1">Date</span>
            <span className="w-24 text-right">Amount</span>
            <span className="w-20 text-center">Status</span>
            <span className="w-12" />
          </div>
          {[
            { date: "May 1, 2026", amount: "$0.00", status: "Paid" },
            { date: "Apr 1, 2026", amount: "$0.00", status: "Paid" },
          ].map((row, i, arr) => (
            <div key={row.date} className={`px-5 py-3 flex items-center ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
              <span className="flex-1 text-sm text-foreground">{row.date}</span>
              <span className="w-24 text-right text-sm text-foreground">{row.amount}</span>
              <span className="w-20 text-center"><span className="text-[11px] font-medium text-[#22C55E] bg-[rgba(34,197,94,0.12)] px-2 py-0.5 rounded-full">{row.status}</span></span>
              <span className="w-12 flex justify-end"><button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"><Download size={13} className="text-muted-foreground" /></button></span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
