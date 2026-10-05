"use client"

import { useEffect, useState } from "react"
import { motion, useScroll } from "framer-motion"

const rows = [
  { id: "top", code: "GRD", label: "Grid", color: "var(--sector-purple)" },
  { id: "experience", code: "EXP", label: "Experience", color: "var(--sector-green)" },
  { id: "projects", code: "PRJ", label: "Projects", color: "var(--sector-yellow)" },
  { id: "education", code: "EDU", label: "Education", color: "var(--sector-green)" },
  { id: "contact", code: "CON", label: "Contact", color: "var(--sector-purple)" },
]

// Original closed circuit outline; pathLength is scrubbed by page scroll.
const TRACK =
  "M8 34 C8 20 18 14 30 14 L52 14 C62 14 66 22 60 30 C54 38 40 38 40 46 C40 54 54 54 60 48 L64 44"

export function TimingTower() {
  const [active, setActive] = useState("top")
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    rows.forEach((r) => {
      const el = document.getElementById(r.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="space-y-px border border-border bg-background/80 backdrop-blur-sm">
        {rows.map((row, i) => {
          const isActive = active === row.id
          return (
            <li key={row.id}>
              <a
                href={`#${row.id}`}
                aria-current={isActive ? "location" : undefined}
                title={row.label}
                className={`group flex items-center gap-2 py-1.5 pl-1 pr-2.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="w-3 text-center tabular-nums opacity-70">{i + 1}</span>
                <span className="h-3 w-0.5" style={{ background: row.color }} />
                {row.code}
              </a>
            </li>
          )
        })}
      </ol>
      <svg viewBox="0 0 72 56" className="mt-3 w-[72px]" fill="none" aria-hidden>
        <path d={TRACK} stroke="currentColor" strokeWidth="2" className="text-border" strokeLinecap="round" />
        <motion.path
          d={TRACK}
          stroke="var(--sector-yellow)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </nav>
  )
}
