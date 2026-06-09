"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { supabase } from "@/lib/supabase";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetForm = z.infer<typeof resetSchema>;

function getPasswordStrength(password: string): {
  level: number;
  label: string;
  color: string;
} {
  if (password.length < 3)
    return { level: 0, label: "", color: "" };
  if (password.length < 6)
    return { level: 1, label: "Weak", color: "#EF4444" };
  if (password.length < 8)
    return { level: 2, label: "Medium", color: "#F59E0B" };
  return { level: 3, label: "Strong", color: "#22C55E" };
}

function ResetPasswordContent() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const passwordValue = watch("password", "");
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (formData: ResetForm) => {
    setLoading(true);
    setServerError("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        setServerError(error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  /* ── Success State ── */
  if (success) {
    return (
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <ClarioLogo size="md" linked={false} />

        <div className="glass-card mt-8 w-full p-8 text-center">
          <div className="flex justify-center">
            <CheckCircle size={48} className="text-[#22C55E]" />
          </div>
          <h2 className="mt-4 text-[20px] font-semibold text-foreground">
            Password updated
          </h2>
          <p className="mt-2 text-[14px] text-[#6B7280] leading-relaxed">
            Your password has been successfully updated.
          </p>

          <Link href="/login">
            <button
              type="button"
              className="mt-6 w-full h-[46px] rounded-xl border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] bg-transparent text-foreground font-medium text-[15px] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)]"
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>
    );
  }

  /* ── Default Form State ── */
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-[24px] font-semibold text-foreground">
          Set a new password
        </h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          Choose a strong password for your account.
        </p>
      </div>

      <div className="glass-card mt-6 w-full p-8">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* New Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-[14px] font-medium text-foreground"
            >
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="glass-input"
                style={{ paddingRight: 44 }}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-foreground transition-colors duration-150"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength Bar — 4 segments */}
            {passwordValue.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((segment) => {
                    let segmentColor = "bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)]";
                    if (strength.level >= 1 && segment === 1) {
                      segmentColor =
                        strength.level === 1
                          ? "bg-[#EF4444]"
                          : strength.level === 2
                          ? "bg-[#F59E0B]"
                          : "bg-[#22C55E]";
                    }
                    if (strength.level >= 2 && segment === 2) {
                      segmentColor =
                        strength.level === 2
                          ? "bg-[#F59E0B]"
                          : "bg-[#22C55E]";
                    }
                    if (strength.level >= 3 && segment <= 4) {
                      segmentColor = "bg-[#22C55E]";
                    }
                    if (
                      (strength.level === 1 && segment > 1) ||
                      (strength.level === 2 && segment > 2)
                    ) {
                      segmentColor = "bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)]";
                    }
                    return (
                      <div
                        key={segment}
                        className={`h-1 flex-1 rounded-full transition-colors duration-200 ${segmentColor}`}
                      />
                    );
                  })}
                </div>
                {strength.label && (
                  <p
                    className="text-[12px]"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </p>
                )}
              </div>
            )}

            {errors.password && (
              <p className="text-[13px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-[14px] font-medium text-foreground"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="glass-input"
                style={{ paddingRight: 44 }}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-foreground transition-colors duration-150"
                tabIndex={-1}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[13px] text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold text-[15px] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Reset password"
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
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[400px] flex flex-col items-center">
          <ClarioLogo size="md" linked={false} />
          <div className="glass-card mt-8 w-full p-8 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-[#6B7280]" />
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
