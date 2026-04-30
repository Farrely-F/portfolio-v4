"use client"

import { motion } from "framer-motion"
import { resumeData } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-8 pt-32 pb-16 md:pb-24 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        {/* Name */}
        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            {resumeData.location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-foreground"
          >
            {resumeData.name}
          </motion.h1>
        </div>

        {/* Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl space-y-4"
        >
          <p className="font-sans text-lg md:text-xl font-medium leading-relaxed text-foreground">
            {resumeData.title} — {resumeData.about.slice(0, 80)}...
          </p>
        </motion.div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-6 pt-4"
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
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={resumeData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
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
    </section>
  )
}
