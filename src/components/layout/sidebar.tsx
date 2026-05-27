"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  TrendingUp,
  Users,
  BarChart2,
  Clock,
  MessageCircle,
  Crown,
} from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";

const navItems = [
  { label: "Today", href: "/dashboard", icon: Zap },
  { label: "Intelligence", href: "/dashboard/intelligence", icon: TrendingUp },
  { label: "Pipeline", href: "/dashboard/pipeline", icon: Users },
  { label: "Revenue", href: "/dashboard/revenue", icon: BarChart2 },
  { label: "Timeline", href: "/dashboard/timeline", icon: Clock },
  { label: "Axo", href: "/dashboard/axo", icon: MessageCircle },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-60 bg-background border-r border-border
          flex flex-col transition-transform duration-200 ease-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-border">
          <ClarioLogo size="md" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-colors duration-150
                      ${
                        isActive
                          ? "text-primary bg-primary/5 border-l-2 border-primary -ml-px"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }
                    `}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-border space-y-3">
          {/* Pro Plan Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown size={14} className="text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Free Plan</span>
            </div>
            <button className="text-xs font-medium text-primary hover:text-[#EA6C00] transition-colors">
              Upgrade
            </button>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">TM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Thomas Mercier</p>
              <p className="text-xs text-muted-foreground truncate">thomas@clario.co</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
