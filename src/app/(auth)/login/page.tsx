"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { supabase } from "@/lib/supabase";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginForm) => {
    setLoading(true);
    setServerError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setServerError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const { data: onb } = await supabase
          .from("onboarding_state")
          .select("is_complete")
          .eq("user_id", data.user.id)
          .single();

        if (onb?.is_complete) {
          window.location.href = "/clario-app/dashboard/";
        } else {
          window.location.href = "/clario-app/onboarding/welcome/";
        }
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/clario-app/dashboard/",
        },
      });
    } catch {
      setServerError("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-[24px] font-semibold text-foreground">
          Welcome back
        </h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          Sign in to your account to continue.
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
              <p className="text-[13px] text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-[14px] font-medium text-foreground"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[13px] text-[#6B7280] hover:text-foreground transition-colors duration-150"
              >
                Forgot password?
              </Link>
            </div>
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
            {errors.password && (
              <p className="text-[13px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] rounded-xl bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold text-[15px] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>

          {/* Server Error */}
          {serverError && (
            <p className="text-[13px] text-red-500 text-center">
              {serverError}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)]" />
          <span className="text-[13px] text-[#6B7280]">or</span>
          <div className="flex-1 h-px bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)]" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full h-[46px] rounded-xl border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] bg-transparent text-foreground font-medium text-[15px] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {googleLoading ? (
            <Loader2 size={18} className="animate-spin text-[#6B7280]" />
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>

      {/* Register Link */}
      <p className="mt-6 text-[14px] text-[#6B7280]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-foreground font-medium hover:underline transition-colors duration-150"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
