import Link from "next/link";
import { Zap } from "lucide-react";

interface ClarioLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
  linked?: boolean;
}

export function ClarioLogo({ size = "md", variant = "default", linked = true }: ClarioLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const textColor = variant === "white" ? "text-white" : "text-foreground";

  const content = (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
        <Zap size={iconSizes[size]} className="text-white fill-white" />
      </div>
      <span className={`font-semibold tracking-tight ${sizeClasses[size]} ${textColor}`}>
        Clario
      </span>
    </div>
  );

  if (linked) {
    return (
      <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
