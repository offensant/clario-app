"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const steps = [
  "/onboarding/welcome",
  "/onboarding/business-type",
  "/onboarding/business-name",
  "/onboarding/mrr",
  "/onboarding/clients",
  "/onboarding/pipeline-info",
  "/onboarding/goal",
  "/onboarding/connect",
  "/onboarding/recap",
  "/onboarding/complete",
];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const index = steps.findIndex((step) => pathname?.includes(step));
    if (index !== -1) {
      setProgress(Math.max(0, Math.min(100, (index / (steps.length - 1)) * 100)));
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans relative overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-[rgba(255,255,255,0.06)] z-50">
        <div
          className="h-full bg-[#F97316] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-16 pb-24">
        {children}
      </div>
    </div>
  );
}
