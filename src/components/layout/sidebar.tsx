"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Zap, TrendingUp, Users, BarChart2, Clock, MessageCircle, Settings, Target, Crown, ChevronDown, User, LogOut,
} from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/context/UserContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useLanguage } from "@/lib/language";

const agencyNav = [
  { key: "nav.today", href: "/dashboard", icon: Zap },
  { key: "nav.intelligence", href: "/dashboard/intelligence", icon: TrendingUp },
  { key: "nav.pipeline", href: "/dashboard/pipeline", icon: Users },
  { key: "nav.revenue", href: "/dashboard/revenue", icon: BarChart2 },
  { key: "nav.timeline", href: "/dashboard/timeline", icon: Clock },
  { key: "nav.axo", href: "/dashboard/axo", icon: MessageCircle },
];

const ecomNav = [
  { key: "nav.today", href: "/dashboard", icon: Zap },
  { key: "nav.intelligence", href: "/dashboard/intelligence", icon: TrendingUp },
  { key: "nav.acquisition", href: "/dashboard/acquisition", icon: Target },
  { key: "nav.revenue", href: "/dashboard/revenue", icon: BarChart2 },
  { key: "nav.timeline", href: "/dashboard/timeline", icon: Clock },
  { key: "nav.axo", href: "/dashboard/axo", icon: MessageCircle },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { profile, signOut } = useUser();
  const { businessType } = useWorkspace();
  const { t } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = businessType === "ecommerce" ? ecomNav : agencyNav;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/clario-app/login/";
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[248px]
          flex flex-col glass-sidebar
          transition-transform duration-200 ease-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo — no bg, no border, no shadow */}
        <div className="pt-5 pl-4 pb-6">
          <ClarioLogo size="md" showText={true} />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard" || pathname === "/dashboard/"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-[10px] px-3 py-[10px] rounded-[10px] text-sm font-semibold
                      transition-all duration-150
                      ${isActive
                        ? "text-[#F97316] bg-[rgba(249,115,22,0.08)] border-l-2 border-[#F97316]"
                        : "text-[#6B7280] hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] hover:text-[#374151] dark:hover:text-[#D1D5DB]"
                      }
                    `}
                  >
                    <Icon size={20} className={isActive ? "text-[#F97316]" : "text-[#6B7280]"} />
                    <span>{t(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Settings */}
          <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <Link
              href="/dashboard/settings"
              onClick={onClose}
              className={`
                flex items-center gap-[10px] px-3 py-[10px] rounded-[10px] text-sm font-semibold
                transition-all duration-150
                ${pathname.startsWith("/dashboard/settings")
                  ? "text-[#F97316] bg-[rgba(249,115,22,0.08)] border-l-2 border-[#F97316]"
                  : "text-[#6B7280] hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] hover:text-[#374151] dark:hover:text-[#D1D5DB]"
                }
              `}
            >
              <Settings size={20} className={pathname.startsWith("/dashboard/settings") ? "text-[#F97316]" : "text-[#6B7280]"} />
              <span>{t("nav.settings")}</span>
            </Link>
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] space-y-3">
          {/* Plan */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown size={14} className="text-[#6B7280]" />
              <span className="text-xs font-medium text-[#6B7280]">{t("settings.free_plan")}</span>
            </div>
            <button className="text-xs font-semibold text-[#F97316] hover:text-[#EA6C00] transition-colors">
              {t("action.upgrade")}
            </button>
          </div>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 w-full hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] rounded-xl p-1.5 -mx-1.5 transition-colors"
            >
              <Avatar
                src={profile?.avatar_url}
                name={profile?.full_name || ""}
                size={40}
              />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-[#0A0A0A] dark:text-white truncate">
                  {profile?.full_name || "User"}
                </p>
                <p className="text-xs text-[#6B7280] truncate">
                  {profile?.email || ""}
                </p>
              </div>
              <ChevronDown size={14} className="text-[#6B7280] shrink-0" />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <div className="absolute bottom-full left-0 mb-2 w-full glass-card p-1 z-50" style={{ borderRadius: 12 }}>
                  <Link
                    href="/dashboard/settings/profile"
                    onClick={() => { setShowDropdown(false); onClose(); }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#374151] dark:text-[#D1D5DB] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                  >
                    <User size={16} className="text-[#6B7280]" />
                    {t("settings.profile")}
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => { setShowDropdown(false); onClose(); }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#374151] dark:text-[#D1D5DB] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                  >
                    <Settings size={16} className="text-[#6B7280]" />
                    {t("nav.settings")}
                  </Link>
                  <div className="border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] my-1" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#EF4444] hover:bg-[rgba(239,68,68,0.05)] transition-colors w-full"
                  >
                    <LogOut size={16} className="text-[#EF4444]" />
                    {t("action.sign_out")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
