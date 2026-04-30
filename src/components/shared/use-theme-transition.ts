"use client"

import { useCallback, useRef } from "react"
import { useTheme } from "next-themes"

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggle = useCallback(() => {
    const html = document.documentElement

    // Clear any previous timeout to avoid class removal race conditions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Add transition class so colors interpolate smoothly
    html.classList.add("theme-transition")

    // Switch theme
    setTheme(resolvedTheme === "dark" ? "light" : "dark")

    // Remove transition class after colors have settled
    // This keeps hover/focus states snappy when not switching themes
    timeoutRef.current = setTimeout(() => {
      html.classList.remove("theme-transition")
    }, 400)
  }, [resolvedTheme, setTheme])

  return { toggle, resolvedTheme }
}
