"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { supabase } from "@/lib/supabase";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = async (formData: ForgotForm) => {
    setLoading(true);
    setServerError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo:
            window.location.origin + "/clario-app/reset-password/",
        }
      );

      if (error) {
        setServerError(error.message);
        setLoading(false);
        return;
      }

      setSentEmail(formData.email);
      setSent(true);
      setCooldown(60);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(sentEmail, {
        redirectTo:
          window.location.origin + "/clario-app/reset-password/",
      });

      if (error) {
        setServerError(error.message);
        return;
      }

      setCooldown(60);
    } catch {
      setServerError("Failed to resend email. Please try again.");
    }
  }, [cooldown, sentEmail]);

  /* ── Success State ── */
  if (sent) {
    return (
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <ClarioLogo size="md" linked={false} />

        <div className="glass-card mt-8 w-full p-8 text-center">
          <div className="flex justify-center">
            <CheckCircle size={48} className="text-[#22C55E]" />
          </div>
          <h2 className="mt-4 text-[20px] font-semibold text-foreground">
            Check your inbox
          </h2>
          <p className="mt-2 text-[14px] text-[#6B7280] leading-relaxed">
            We sent a reset link to{" "}
            <strong className="text-foreground">{sentEmail}</strong>. Check your
            spam folder if you don&apos;t see it.
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="mt-6 w-full h-[46px] rounded-xl border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] bg-transparent text-foreground font-medium text-[15px] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cooldown > 0 ? `Resend email (${cooldown}s)` : "Resend email"}
          </button>

          {serverError && (
            <p className="mt-3 text-[13px] text-red-500">{serverError}</p>
          )}
        </div>

        <Link
          href="/login"
          className="mt-6 text-[14px] text-[#6B7280] hover:text-foreground transition-colors duration-150"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  /* ── Default Form State ── */
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-[24px] font-semibold text-foreground">
          Forgot your password?
        </h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <div className="glass-card mt-6 w-full p-8">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[14px] font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="glass-input"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-[13px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Send Reset Link Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold text-[15px] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Send reset link"
            )}
          </button>

          {/* Server Error */}
          {serverError && (
            <p className="text-[13px] text-red-500 text-center">
              {serverError}
            </p>
          )}
        </form>
      </div>

      <Link
        href="/login"
        className="mt-6 text-[14px] text-[#6B7280] hover:text-foreground transition-colors duration-150"
      >
        ← Back to sign in
      </Link>
    </div>
  );
}
