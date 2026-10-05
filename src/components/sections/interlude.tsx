import type { CSSProperties } from "react"

/**
 * A stretch of scroll where the page content steps aside and the race takes over.
 * Hidden only for reduced motion (no 3D world there). Shorter on phones.
 */
export function Interlude({ beat, mobile = "130svh", desktop = "170svh" }: { beat: "a" | "b" | "c"; mobile?: string; desktop?: string }) {
  return (
    <div
      aria-hidden
      data-beat={beat}
      className="h-[var(--h-m)] motion-reduce:hidden lg:h-[var(--h-d)]"
      style={{ "--h-m": mobile, "--h-d": desktop } as CSSProperties}
    />
  )
}
