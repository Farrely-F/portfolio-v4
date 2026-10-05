"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { race } from "@/lib/race-state"

const RaceWorld = dynamic(() => import("./race-world"), { ssr: false })

/** One fixed 3D world behind the whole page (all screen sizes; lighter on phones). A scrim keeps sections readable and lifts during race beats. */
export function RaceWorldMount() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const scrim = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const enabled = !reduceMotion

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (scrim.current) scrim.current.style.opacity = String(0.9 * (1 - race.reveal))
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <RaceWorld active={visible} />
      </div>
      <div ref={scrim} aria-hidden className="pointer-events-none fixed inset-0 z-[1] bg-background" style={{ opacity: 0 }} />
    </>
  )
}
