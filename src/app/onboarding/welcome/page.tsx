"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center mt-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(249,115,22,0.3)] axo-pulse"
      >
        <span className="text-2xl font-bold text-white">A</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-5xl font-bold text-white tracking-tight mb-2"
      >
        Meet Axo.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="text-xl text-[#6B7280] mb-12"
      >
        Your strategic AI cofounder.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="onboarding-card text-left mb-8 w-full"
      >
        <p className="text-[15px] leading-relaxed text-[#D1D5DB]">
          I am going to ask you a few questions about your business. This takes less than 3 minutes. Every answer you give me helps me understand your business better — so I can give you sharper scores, smarter actions, and one clear priority every day.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full flex flex-col items-center gap-3"
      >
        <button
          onClick={() => router.push("/onboarding/business-type")}
          className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Let&apos;s go
        </button>
        <p className="text-[11px] text-[#52525B]">No credit card required.</p>
      </motion.div>
    </div>
  );
}
