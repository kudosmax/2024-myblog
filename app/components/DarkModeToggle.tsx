"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // 플레이스홀더
  }

  return (
    <button
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? "🔅" : "🌑"}
    </button>
  );
}
