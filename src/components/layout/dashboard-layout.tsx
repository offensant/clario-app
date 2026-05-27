"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { AskAxoButton } from "./ask-axo-button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />

      <main className="lg:ml-60 pt-14 min-h-screen">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>

      <AskAxoButton />
    </div>
  );
}
