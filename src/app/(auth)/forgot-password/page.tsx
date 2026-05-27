"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotForm = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = async (data: ForgotForm) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSentEmail(data.email);
    setSent(true);
    setCooldown(60);
  };

  const handleResend = useCallback(() => {
    if (cooldown > 0) return;
    setCooldown(60);
  }, [cooldown]);

  if (sent) {
    return (
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <ClarioLogo size="md" linked={false} />

        <div className="mt-8 w-full bg-card border border-border rounded-2xl shadow-card p-8 text-center">
          <div className="animate-in fade-in zoom-in duration-300">
            <CheckCircle size={48} className="text-success mx-auto" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Check your inbox</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We sent a reset link to <strong className="text-foreground">{sentEmail}</strong>. Check your spam folder if you don&apos;t see it.
          </p>

          <Button
            variant="outline"
            className="mt-6 w-full h-11 rounded-[10px]"
            onClick={handleResend}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Resend email (${cooldown}s)` : "Resend email"}
          </Button>
        </div>

        <Link
          href="/login"
          className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-foreground">Forgot your password?</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter your email and we will send you a reset link.
        </p>
      </div>

      <div className="mt-6 w-full bg-card border border-border rounded-2xl shadow-card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 rounded-[10px]"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-[10px] bg-primary hover:bg-[#EA6C00] text-white font-medium"
            disabled={loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Send reset link"}
          </Button>
        </form>
      </div>

      <Link
        href="/login"
        className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to sign in
      </Link>
    </div>
  );
}
