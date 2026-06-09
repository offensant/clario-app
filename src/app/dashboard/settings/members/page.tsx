"use client";

import Link from "next/link";
import { ChevronLeft, MoreHorizontal, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Avatar } from "@/components/Avatar";

export default function MembersSettings() {
  const { workspace, role: currentUserRole } = useWorkspace();
  const [members, setMembers] = useState<any[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("analyst");

  useEffect(() => {
    const fetchMembers = async () => {
      if (!workspace) return;
      const { data } = await supabase
        .from("workspace_members")
        .select(`
          id,
          role,
          user_id,
          users (
            full_name,
            email,
            avatar_url
          )
        `)
        .eq("workspace_id", workspace.id);
        
      if (data) setMembers(data);
    };
    fetchMembers();
  }, [workspace]);

  const canInvite = currentUserRole === "owner" || currentUserRole === "admin";

  const handleInvite = () => {
    // Mock invite logic
    setShowInvite(false);
    setInviteEmail("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {showInvite && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 bg-white dark:bg-[#141414]">
            <h3 className="text-xl font-bold mb-6 text-[#0A0A0A] dark:text-white">Invite Member</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold block mb-2">Email</label>
                <input
                  autoFocus
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="glass-input"
                />
              </div>
              <div>
                <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold block mb-2">Role</label>
                <div className="flex gap-2">
                  {["admin", "analyst", "viewer"].map(r => (
                    <button
                      key={r}
                      onClick={() => setInviteRole(r)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                        inviteRole === r ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-black shadow-md" : "bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] text-[#6B7280] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowInvite(false)} className="flex-1 h-10 rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] font-medium">
                Cancel
              </button>
              <button onClick={handleInvite} disabled={!inviteEmail} className="flex-1 h-10 rounded-xl bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.15)] font-semibold transition-colors disabled:opacity-50">
                Send invite
              </button>
            </div>
          </div>
        </div>
      )}

      <Link href="/dashboard/settings" className="flex items-center gap-2 text-[#6B7280] hover:text-[#0A0A0A] dark:hover:text-white transition-colors mb-6 w-fit">
        <ChevronLeft size={16} /> Settings
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white">Members</h1>
        {canInvite && (
          <button onClick={() => setShowInvite(true)} className="h-9 px-4 rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] font-medium flex items-center gap-2 transition-colors text-sm">
            <UserPlus size={16} /> Invite member
          </button>
        )}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white">Team Members</h3>
          <span className="text-xs font-semibold bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.08)] px-2 py-0.5 rounded-full">{members.length}</span>
        </div>
        
        <div className="divide-y divide-[rgba(0,0,0,0.06)] dark:divide-[rgba(255,255,255,0.06)]">
          {members.map(m => (
            <div key={m.id} className="p-4 flex items-center justify-between hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <div className="flex items-center gap-4">
                <Avatar src={m.users?.avatar_url} name={m.users?.full_name || ""} size={36} />
                <div>
                  <p className="font-semibold text-[15px] text-[#0A0A0A] dark:text-white">{m.users?.full_name || "Unknown User"}</p>
                  <p className="text-[13px] text-[#6B7280]">{m.users?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.08)] text-[#6B7280] px-2.5 py-1 rounded-md capitalize">
                  {m.role}
                </span>
                {currentUserRole === "owner" && (
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[rgba(0,0,0,0.06)] dark:hover:bg-[rgba(255,255,255,0.06)] text-[#6B7280] transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
