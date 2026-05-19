"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-transparent" aria-hidden="true" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun
        size={16}
        className="absolute transition-all duration-300 text-amber-500 dark:opacity-0 dark:scale-50 opacity-100 scale-100"
      />
      <Moon
        size={16}
        className="absolute transition-all duration-300 text-violet-300 opacity-0 scale-50 dark:opacity-100 dark:scale-100"
      />
    </button>
  );
}
