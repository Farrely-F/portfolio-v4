"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { resumeData } from "@/lib/data"
import { HeroFallback } from "@/components/hero/hero-fallback"

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "5", label: "Projects" },
  { value: "2", label: "Awards" },
]

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col">
      {/* Readability scrim: solid behind copy, clear over the car */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-background/90 via-background/60 to-transparent [mask-image:linear-gradient(to_bottom,#000_85%,transparent)] lg:bg-gradient-to-r lg:from-background lg:via-background/75 lg:to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 items-start px-6 pb-[42svh] pt-24 md:px-8 md:pt-32 lg:items-center lg:pb-24 lg:pt-44">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="max-w-xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="font-display text-[clamp(3.2rem,9.5vw,7.5rem)] font-semibold leading-[0.9] tracking-tight text-foreground"
          >
            {resumeData.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="font-sans text-lg font-medium leading-relaxed text-foreground md:text-xl"
          >
            Philosophy-trained. Engineering-obsessed. I build front-end experiences where
            users meet emerging tech, from Web3 payment rails to AI agent dashboards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-background transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              View projects
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="font-mono text-[11px] uppercase tracking-widest text-foreground underline underline-offset-4 transition-colors hover:text-brand"
            >
              Get in Touch
            </a>
            <a
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`https://${resumeData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex gap-8 border-t border-border pt-5"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-semibold tracking-tight text-foreground">{s.value}</dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <HeroFallback />
    </section>
  )
}
