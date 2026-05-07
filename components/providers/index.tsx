"use client";

import type { ReactNode } from "react";
import { LenisProvider } from "./lenis-provider";
import { CursorProvider } from "./cursor-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <CursorProvider>{children}</CursorProvider>
    </LenisProvider>
  );
}
