"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function OnboardingWelcomePage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),   // Logo
      setTimeout(() => setStep(2), 500),   // Avatar
      setTimeout(() => setStep(3), 800),   // Title
      setTimeout(() => setStep(4), 1000),  // Subtitle
      setTimeout(() => setStep(5), 1200),  // Card
      setTimeout(() => setStep(6), 1400),  // Button
      setTimeout(() => setStep(7), 1600),  // Fine print
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Progress bar */}
      <div className="h-0.5 bg-white/5 w-full">
        <div className="h-full bg-[#F97316] w-0 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="w-7 h-7 bg-[#F97316] rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white fill-white" />
          </div>
          <span className="text-white font-semibold text-lg">Clario</span>
        </div>

        {/* Axo Avatar */}
        <div
          className={`mt-12 transition-all duration-300 ${
            step >= 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#F97316]/20 rounded-full blur-xl scale-150" />
            <div className="relative w-20 h-20 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-[#F97316]">A</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          className={`mt-8 text-5xl font-bold text-white tracking-tight transition-all duration-300 ${
            step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Meet Axo.
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-3 text-xl font-medium text-[#9CA3AF] transition-all duration-300 ${
            step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Your strategic AI cofounder.
        </p>

        {/* Message card */}
        <div
          className={`mt-8 max-w-lg w-full transition-all duration-300 ${
            step >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="bg-[#141414] border border-[rgba(249,115,22,0.2)] rounded-2xl p-6">
            <p className="text-[15px] text-[#9CA3AF] leading-relaxed">
              Before I can help you, I need to learn about your business. 10 questions. 3 minutes. Then I will tell you exactly where you are and what to do next.
            </p>
          </div>
        </div>

        {/* Button */}
        <div
          className={`mt-8 transition-all duration-300 ${
            step >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <Link
            href="/onboarding/business-type"
            className="inline-flex items-center justify-center h-12 px-10 bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold rounded-[10px] transition-colors duration-150"
          >
            Let&apos;s go
          </Link>
        </div>

        {/* Fine print */}
        <p
          className={`mt-4 text-xs text-[#52525B] transition-all duration-300 ${
            step >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          No credit card required.
        </p>
      </div>
    </div>
  );
}
