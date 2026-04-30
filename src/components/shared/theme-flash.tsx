"use client"

import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"

interface FlashState {
  active: boolean
  x: number
  y: number
  toDark: boolean
}

export function useThemeFlash() {
  const { resolvedTheme, setTheme } = useTheme()
  const [flash, setFlash] = useState<FlashState>({
    active: false,
    x: 0,
    y: 0,
    toDark: false,
  })

  const trigger = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const toDark = resolvedTheme !== "dark"

      setFlash({ active: true, x, y, toDark })

      // Switch theme halfway through the expansion
      setTimeout(() => {
        setTheme(toDark ? "dark" : "light")
      }, 350)

      // Clear flash after animation completes
      setTimeout(() => {
        setFlash({ active: false, x: 0, y: 0, toDark: false })
      }, 900)
    },
    [resolvedTheme, setTheme]
  )

  return { flash, trigger }
}

export function ThemeFlashOverlay({ flash }: { flash: FlashState }) {
  if (!flash.active) return null

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none theme-flash"
      style={
        {
          "--flash-x": `${flash.x}px`,
          "--flash-y": `${flash.y}px`,
          "--flash-bg": flash.toDark ? "#0d0d0d" : "#f7f5f2",
        } as React.CSSProperties
      }
    />
  )
}
