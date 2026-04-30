"use client"

import { motion } from "framer-motion"
import { resumeData } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"
import { GenerativeGrid } from "@/components/shared/generative-grid"

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden">
      {/* Generative Grid Background */}
      <div className="absolute inset-0 z-0">
        <GenerativeGrid />
      </div>

      {/* Left vertical hairline */}
      <div className="absolute left-6 md:left-8 top-32 bottom-16 w-px bg-border z-10 hidden md:block" />

      {/* Large watermark year */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 z-0 pointer-events-none select-none"
      >
        <span className="font-sans text-[20rem] md:text-[28rem] font-bold leading-none tracking-tighter text-foreground/[0.02]">
          26
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-8 pt-32 pb-16 md:pb-24 max-w-[1100px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          {/* Top row: Location */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            {resumeData.location}
          </motion.p>

          {/* Name */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-sans text-[clamp(2.8rem,9vw,7rem)] font-semibold leading-[0.92] tracking-tight text-foreground"
            >
              {resumeData.name}
            </motion.h1>
          </div>

          {/* Horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-px bg-border origin-left max-w-md"
          />

          {/* Hook line — the story thesis */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl space-y-4"
          >
            <p className="font-sans text-lg md:text-xl font-medium leading-relaxed text-foreground">
              Philosophy-trained. Engineering-obsessed. I build front-end
              experiences where users meet emerging tech — from Web3 payment
              rails to AI agent dashboards.
            </p>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap items-center gap-6 pt-2"
          >
            <a
              href={`mailto:${resumeData.email}`}
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground hover:text-brand transition-colors"
            >
              <span className="relative">
                Get in Touch
                <span className="absolute -bottom-0.5 left-0 h-px w-full bg-foreground group-hover:bg-brand transition-colors" />
              </span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <span className="hidden sm:inline-block h-4 w-px bg-border" />
            <a
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://${resumeData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </motion.div>

          {/* Bottom row: Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex items-center gap-8 md:gap-12 pt-6 border-t border-border max-w-md"
          >
            <div>
              <span className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                3+
              </span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                Years Exp.
              </p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                5
              </span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                Projects
              </p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                2
              </span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                Awards
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-6 md:left-8"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Scroll
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
