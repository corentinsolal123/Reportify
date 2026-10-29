"use client";

import type { ReactNode } from "react";

import { Toast } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
      {children}
      <Toast.Provider placement="bottom end" />
    </ThemeProvider>
  );
}
