"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SecuritySettings() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const getStrength = () => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    return 3;
  };
  const strength = getStrength();

  const handleUpdate = async () => {
    if (password !== confirm || strength < 3) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMsg(error.message);
    else {
      setMsg("Password updated successfully.");
      setPassword("");
      setConfirm("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/dashboard/settings" className="flex items-center gap-2 text-[#6B7280] hover:text-[#0A0A0A] dark:hover:text-white transition-colors mb-6 w-fit">
        <ChevronLeft size={16} /> Settings
      </Link>

      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-8">Security</h1>

      <div className="space-y-6">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-4">Change Password</h3>
          <div className="space-y-4 mb-6">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="glass-input"
            />
            <div className="flex gap-1 h-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`flex-1 rounded-full ${
                    strength >= level
                      ? level === 1 ? "bg-[#EF4444]" : level === 2 ? "bg-[#F97316]" : "bg-[#22C55E]"
                      : "bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)]"
                  }`}
                />
              ))}
            </div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="glass-input"
            />
          </div>
          <button
            onClick={handleUpdate}
            disabled={!password || password !== confirm || strength < 3 || loading}
            className="h-10 px-6 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
          {msg && <p className="mt-4 text-sm text-[#22C55E]">{msg}</p>}
        </div>

        <div className="glass-card p-6 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white mb-1">Two-Factor Authentication</h3>
            <p className="text-[13px] text-[#6B7280]">Add an extra layer of security to your account.</p>
          </div>
          <button className="h-9 px-4 rounded-lg bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] text-[13px] font-medium transition-colors">
            Enable 2FA
          </button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <h3 className="text-sm font-semibold text-[#0A0A0A] dark:text-white">Active Sessions</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#0A0A0A] dark:text-white mb-0.5">Windows • Chrome</p>
              <p className="text-xs text-[#6B7280]">Current session • Paris, France</p>
            </div>
            <span className="text-xs font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-md">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
