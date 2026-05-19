"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { LenisProvider } from "./lenis-provider";
import { CursorProvider } from "./cursor-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <CursorProvider>{children}</CursorProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}
