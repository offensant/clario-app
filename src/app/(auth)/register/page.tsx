"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClarioLogo } from "@/components/clario-logo";
import { PasswordInput } from "@/components/password-input";
import { GoogleButton } from "@/components/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      <ClarioLogo size="md" linked={false} />

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-foreground">Create your account</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Start understanding your business.</p>
      </div>

      <div className="mt-6 w-full bg-card border border-border rounded-2xl shadow-card p-8">
        <form noValidate onSubmit={(e) => { e.preventDefault(); router.push('/dashboard'); }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Thomas Mercier"
              className="h-11 rounded-[10px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 rounded-[10px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              className="h-11 rounded-[10px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              className="h-11 rounded-[10px]"
            />
          </div>

          <div className="flex items-start gap-3 pt-1">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I agree to the{" "}
              <span className="text-foreground hover:text-primary transition-colors">Terms of Service</span>
              {" "}and{" "}
              <span className="text-foreground hover:text-primary transition-colors">Privacy Policy</span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-[10px] bg-primary hover:bg-[#EA6C00] text-white font-medium"
          >
            Create account
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
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-[#EA6C00] font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
