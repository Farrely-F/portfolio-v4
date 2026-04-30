"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { useThemeTransition } from "@/components/shared/use-theme-transition"

export function ThemeToggle() {
  const { toggle, resolvedTheme } = useThemeTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 -mr-2 text-muted-foreground"
      >
        <span className="block w-[18px] h-[18px]" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative p-2 -mr-2 text-muted-foreground hover:text-foreground"
    >
      <Sun
        size={18}
        className={`transition-transform duration-500 ease-out ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        size={18}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  )
}
