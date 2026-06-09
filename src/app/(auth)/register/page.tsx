"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { supabase } from "@/lib/supabase";

const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

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

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false,
    },
  });

  const passwordValue = watch("password", "");
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (formData: RegisterForm) => {
    setLoading(true);
    setServerError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setServerError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from("users").insert({
          id: data.user.id,
          email: formData.email,
          full_name: formData.name,
        });

        window.location.href = "/clario-app/onboarding/welcome/";
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-[24px] font-semibold text-foreground">
          Create your account
        </h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          Start understanding your business.
        </p>
      </div>

      <div className="glass-card mt-6 w-full p-8">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-[14px] font-medium text-foreground"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Thomas Mercier"
              className="glass-input"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-[13px] text-red-500">{errors.name.message}</p>
            )}
          </div>

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

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-[14px] font-medium text-foreground"
            >
              Password
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
                    // For segments beyond the level, keep gray
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

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 rounded border-[rgba(0,0,0,0.15)] dark:border-[rgba(255,255,255,0.15)] accent-[#F97316] cursor-pointer"
              {...register("terms")}
            />
            <label
              htmlFor="terms"
              className="text-[13px] text-[#6B7280] leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-foreground hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-foreground hover:underline">
                Privacy Policy
              </span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-[13px] text-red-500">{errors.terms.message}</p>
          )}

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold text-[15px] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Create account"
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

      {/* Sign In Link */}
      <p className="mt-6 text-[14px] text-[#6B7280]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-foreground font-medium hover:underline transition-colors duration-150"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
