"use client";

import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/lib/language";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <LanguageProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
