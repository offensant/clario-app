"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ClarioLogoProps {
  size?: "sm" | "md" | "lg";
  linked?: boolean;
  showText?: boolean;
}

const basePath = "/clario-app";

function ClarioIcon({ size = 32 }: { size?: number }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: size, height: size }} />;

  const src = resolvedTheme === "dark"
    ? `${basePath}/logo-dark.jpeg`
    : `${basePath}/logo-light.jpeg`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Clario"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain", borderRadius: 6 }}
    />
  );
}

export function ClarioLogo({ size = "md", linked = true, showText = true }: ClarioLogoProps) {
  const iconSizes = { sm: 24, md: 28, lg: 40 };
  const textSizes = { sm: "text-lg", md: "text-[22px]", lg: "text-2xl" };

  const content = (
    <div className="flex items-center gap-[10px]">
      <ClarioIcon size={iconSizes[size]} />
      {showText && (
        <span
          className={`font-bold tracking-[-0.3px] leading-none text-[#0A0A0A] dark:text-white ${textSizes[size]}`}
          style={{ transition: "color 200ms ease" }}
        >
          Clario
        </span>
      )}
    </div>
  );

  if (linked) {
    return (
      <Link href="/dashboard" className="flex items-center no-underline hover:opacity-90 transition-opacity duration-150">
        {content}
      </Link>
    );
  }

  return content;
}

export { ClarioIcon };
