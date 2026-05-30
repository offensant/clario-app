"use client";

import Link from "next/link";

interface ClarioLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
  linked?: boolean;
  showText?: boolean;
}

function ClarioIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top arc — dark in light mode, white in dark mode */}
      <path
        d="M55 10 C25 10, 15 35, 35 50 C45 57, 55 50, 50 42 C44 33, 30 35, 35 45"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        className="text-[#0A0A0A] dark:text-white transition-colors duration-200"
      />
      {/* Bottom arc — always orange */}
      <path
        d="M45 90 C75 90, 85 65, 65 50 C55 43, 45 50, 50 58 C56 67, 70 65, 65 55"
        stroke="#F97316"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function ClarioLogo({
  size = "md",
  variant = "default",
  linked = true,
  showText = true,
}: ClarioLogoProps) {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-[22px]",
    lg: "text-2xl",
  };

  const textColor =
    variant === "white"
      ? "text-white"
      : "text-[#0A0A0A] dark:text-white transition-colors duration-200";

  const content = (
    <div className="flex items-center gap-[10px]">
      <ClarioIcon size={iconSizes[size]} />
      {showText && (
        <span
          className={`font-bold tracking-[-0.3px] leading-none ${textSizes[size]} ${textColor}`}
        >
          Clario
        </span>
      )}
    </div>
  );

  if (linked) {
    return (
      <Link
        href="/dashboard"
        className="flex items-center no-underline hover:opacity-90 transition-opacity duration-150"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export { ClarioIcon };
