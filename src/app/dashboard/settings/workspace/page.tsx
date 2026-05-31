"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock, Trash2 } from "lucide-react";
import { useState } from "react";

export default function WorkspacePage() {
  const [showDelete, setShowDelete] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  return (
    <DashboardLayout title="Workspace">
      <div className="max-w-2xl space-y-6">
        <Link href="/dashboard/settings" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={16} /> Settings
        </Link>
        <h2 className="text-2xl font-semibold text-foreground">Workspace</h2>

        {/* General */}
        <div className="glass-card overflow-hidden">
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">General</p>
          {[
            { label: "Workspace name", value: "Clario HQ", editable: true },
            { label: "Owner", value: "thomas@clario.co", editable: false },
            { label: "Language", value: "EN", editable: true },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-center justify-between px-5 py-3.5 hover:bg-[rgba(249,115,22,0.04)] transition-colors ${row.editable ? "cursor-pointer" : ""} ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
              <span className="text-sm text-foreground">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{row.value}</span>
                {row.editable && <ChevronRight size={14} className="text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Profile */}
        <div className="glass-card overflow-hidden">
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Strategic Profile</p>
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50">
            <span className="text-sm text-foreground">Business type</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Agency</span>
              <Lock size={12} className="text-primary" />
              <span className="text-[11px] text-primary">Cannot be changed</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 hover:bg-[rgba(249,115,22,0.04)] transition-colors cursor-pointer">
            <span className="text-sm text-foreground">Main services</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Web Dev, Branding, SEO</span>
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card overflow-hidden" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-destructive uppercase tracking-wider">Danger Zone</p>
          <button onClick={() => setShowDelete(true)} className="flex items-center gap-3 w-full px-5 py-3.5 hover:bg-destructive/5 transition-colors">
            <Trash2 size={16} className="text-destructive" />
            <div className="text-left">
              <p className="text-sm font-medium text-destructive">Delete workspace</p>
              <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
        </div>

        {/* Delete modal */}
        {showDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowDelete(false)}>
            <div className="glass-card p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-destructive">Delete workspace?</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Type the workspace name to confirm. This will permanently delete all your data, scores, and history.</p>
              <input value={confirmName} onChange={(e) => setConfirmName(e.target.value)} placeholder="Clario HQ" className="w-full h-11 px-4 mt-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30" />
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowDelete(false)} className="flex-1 h-11 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
                <button disabled={confirmName !== "Clario HQ"} className="flex-1 h-11 rounded-xl bg-destructive hover:bg-destructive/90 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Delete permanently</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
