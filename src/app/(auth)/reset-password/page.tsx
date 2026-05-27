"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { PasswordInput } from "@/components/password-input";
import { PasswordStrength } from "@/components/password-strength";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Suspense } from "react";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetForm = z.infer<typeof schema>;

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const isExpired = token === "expired";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  // Expired token state
  if (isExpired) {
    return (
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <ClarioLogo size="md" linked={false} />
        <div className="mt-8 w-full bg-card border border-border rounded-2xl shadow-card p-8 text-center">
          <div className="animate-in fade-in zoom-in duration-300">
            <AlertTriangle size={48} className="text-warning mx-auto" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Link expired</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            This reset link has expired or is invalid.
          </p>
          <Link href="/forgot-password">
            <Button className="mt-6 w-full h-11 rounded-[10px] bg-primary hover:bg-[#EA6C00] text-white font-medium">
              Request a new link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <ClarioLogo size="md" linked={false} />
        <div className="mt-8 w-full bg-card border border-border rounded-2xl shadow-card p-8 text-center">
          <div className="animate-in fade-in zoom-in duration-300">
            <CheckCircle size={48} className="text-success mx-auto" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Password updated</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Your password has been successfully updated.
          </p>
          <Link href="/login">
            <Button className="mt-6 w-full h-11 rounded-[10px] bg-primary hover:bg-[#EA6C00] text-white font-medium">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Default form
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-foreground">Set a new password</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Choose a strong password for your account.
        </p>
      </div>

      <div className="mt-6 w-full bg-card border border-border rounded-2xl shadow-card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              className="h-11 rounded-[10px]"
              error={!!errors.password}
              {...register("password")}
            />
            <PasswordStrength password={passwordValue} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              className="h-11 rounded-[10px]"
              error={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-[10px] bg-primary hover:bg-[#EA6C00] text-white font-medium"
            disabled={loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Reset password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-[400px] flex flex-col items-center"><ClarioLogo size="md" linked={false} /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
