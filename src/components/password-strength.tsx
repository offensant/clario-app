"use client";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): { level: number; label: string; color: string } {
  if (!password) return { level: 0, label: "", color: "" };
  
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 1, label: "Weak", color: "bg-destructive" };
  if (score <= 3) return { level: 2, label: "Medium", color: "bg-warning" };
  return { level: 3, label: "Strong", color: "bg-success" };
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { level, label, color } = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              i <= level ? color : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        level === 1 ? "text-destructive" : level === 2 ? "text-warning" : "text-success"
      }`}>
        {label}
      </p>
    </div>
  );
}
