"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface CursorContextType {
  isHovering: boolean;
  setIsHovering: (value: boolean) => void;
  cursorText: string;
  setCursorText: (value: string) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovering, setIsHoveringState] = useState(false);
  const [cursorText, setCursorTextState] = useState("");

  const setIsHovering = useCallback((value: boolean) => setIsHoveringState(value), []);
  const setCursorText = useCallback((value: string) => setCursorTextState(value), []);

  return (
    <CursorContext.Provider
      value={{ isHovering, setIsHovering, cursorText, setCursorText }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return context;
}
