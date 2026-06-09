"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/clario-app/login/";
        return;
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen page-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] border-t-[#F97316] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <WorkspaceProvider>
      <div className="min-h-screen page-bg">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Topbar title="nav.today" onMenuClick={() => setSidebarOpen(true)} />

        <main className="lg:pl-[248px] pt-[60px]">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </WorkspaceProvider>
  );
}
