"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { ClarioLogo } from "@/components/clario-logo";
import { PasswordInput } from "@/components/password-input";
import { GoogleButton } from "@/components/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().min(1, "Type anything"),
  password: z.string().min(1, "Type anything"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    setLoading(true);
    // Mock auth delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    // Demo: accept any valid input
    if (data.email && data.password) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Sign in to your account</p>
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              className="h-11 rounded-[10px]"
              error={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive text-center animate-in fade-in duration-200">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-11 rounded-[10px] bg-primary hover:bg-[#EA6C00] text-white font-medium"
            disabled={loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign in"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <GoogleButton />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:text-[#EA6C00] font-medium transition-colors">
          Register
        </Link>
      </p>
    </div>
  );
}
