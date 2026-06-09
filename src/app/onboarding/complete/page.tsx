"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

const steps = [
  "Analyzing your revenue...",
  "Calculating your scores...",
  "Detecting critical signals...",
  "Preparing your action plan...",
];

export default function CompletePage() {
  const router = useRouter();
  const { user } = useUser();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const runComplete = async () => {
      if (!user) return;
      
      const { data: mem } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", user.id)
        .single();
      
      if (mem) {
        const wsId = mem.workspace_id;

        // Mock data insertion
        await supabase.from("axo_scores").insert({
          workspace_id: wsId,
          business_pulse: 7.2,
          revenue_stability: 8.4,
          client_dependency: "MODERATE",
          lead_leverage: 5.8,
          execution_score: 6.1
        });

        await supabase.from("axo_actions").insert([
          { workspace_id: wsId, action_text: "Launch the Q3 acquisition campaign", priority_score: 9.5, status: "pending" },
          { workspace_id: wsId, action_text: "Review the pricing model for Top Tier clients", priority_score: 8.2, status: "pending" },
          { workspace_id: wsId, action_text: "Hire a dedicated account manager", priority_score: 7.4, status: "pending" }
        ]);

        await supabase.from("onboarding_state").update({ is_complete: true, current_step: "complete" }).eq("workspace_id", wsId);
      }

      // Step animations
      const interval = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              window.location.href = "/clario-app/dashboard/";
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 800);

      return () => clearInterval(interval);
    };

    runComplete();
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA6C00] flex items-center justify-center mb-12 shadow-[0_0_40px_rgba(249,115,22,0.4)] axo-pulse"
      >
        <span className="text-4xl font-bold text-white">A</span>
      </motion.div>

      <div className="w-full max-w-[480px] h-1 bg-[rgba(255,255,255,0.06)] rounded-full mb-8 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#F97316]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.2, ease: "linear" }}
        />
      </div>

      <div className="h-8 relative w-full text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 text-[#9CA3AF] text-lg font-medium"
          >
            {steps[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
