"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { ChevronLeft, UserPlus, MoreHorizontal, Mail } from "lucide-react";
import { useState } from "react";

const members = [
  { name: "Thomas Mercier", email: "thomas@clario.co", role: "Owner", roleColor: "bg-primary text-white", initials: "TM", current: true },
  { name: "Sophie Laurent", email: "sophie@clario.co", role: "Admin", roleColor: "bg-blue-500 text-white", initials: "SL", current: false },
  { name: "Marc Dupont", email: "marc@clario.co", role: "Analyst", roleColor: "bg-purple-500 text-white", initials: "MD", current: false },
];

const pendingInvites = [
  { email: "alex@startup.io", role: "Viewer", sent: "May 28, 2026" },
];

export default function MembersPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Analyst");

  return (
    <DashboardLayout title="Team Members">
      <div className="max-w-2xl space-y-6">
        <Link href="/dashboard/settings" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={16} /> Settings
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Team Members</h2>
            <p className="text-muted-foreground mt-1">Invite and manage your team.</p>
          </div>
          <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-[#EA6C00] text-white text-sm font-medium rounded-xl transition-colors">
            <UserPlus size={16} /> Invite member
          </button>
        </div>

        {/* Members */}
        <div className="glass-card overflow-hidden">
          <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Members</p>
          {members.map((m, i, arr) => (
            <div key={m.email} className={`flex items-center gap-4 px-5 py-3.5 ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-primary">{m.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${m.roleColor}`}>{m.role}</span>
              {!m.current && (
                <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                  <MoreHorizontal size={14} className="text-muted-foreground" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Pending */}
        {pendingInvites.length > 0 && (
          <div className="glass-card overflow-hidden">
            <p className="px-5 pt-5 pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Pending Invitations</p>
            {pendingInvites.map((inv) => (
              <div key={inv.email} className="flex items-center gap-4 px-5 py-3.5">
                <Mail size={16} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{inv.email}</p>
                  <p className="text-xs text-muted-foreground">Sent {inv.sent}</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{inv.role}</span>
                <button className="text-xs text-destructive font-medium">Cancel</button>
              </div>
            ))}
          </div>
        )}

        {/* Invite modal */}
        {showInvite && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowInvite(false)}>
            <div className="glass-card p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-foreground mb-6">Invite a team member</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Email address</label>
                  <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@company.com" className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Role</label>
                  <div className="flex gap-2">
                    {["Admin", "Analyst", "Viewer"].map((r) => (
                      <button key={r} onClick={() => setInviteRole(r)} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${inviteRole === r ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    {inviteRole === "Admin" ? "Full access except billing" : inviteRole === "Analyst" ? "Can view all data" : "Read-only access"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <button className="w-full h-11 rounded-xl bg-primary hover:bg-[#EA6C00] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Mail size={16} /> Send invite
                </button>
                <button onClick={() => setShowInvite(false)} className="w-full h-11 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
