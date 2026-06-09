"use client";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 24 | 28 | 32 | 36 | 40 | 48 | 80;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ src, name = "", size = 32, className = "" }: AvatarProps) {
  const sizeStyle = { width: size, height: size, minWidth: size, minHeight: size };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${className}`}
        style={sizeStyle}
      />
    );
  }

  const fontSize = size <= 28 ? 10 : size <= 36 ? 12 : size <= 48 ? 14 : 20;

  return (
    <div
      className={`rounded-full flex items-center justify-center bg-[#E5E7EB] dark:bg-[#374151] ${className}`}
      style={sizeStyle}
    >
      <span
        className="font-semibold text-[#374151] dark:text-[#D1D5DB]"
        style={{ fontSize }}
      >
        {getInitials(name || "U")}
      </span>
    </div>
  );
}
