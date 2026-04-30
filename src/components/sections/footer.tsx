"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/fade-in"
import { resumeData } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"

export function FooterSection() {
  return (
    <footer id="contact" className="px-6 md:px-8 pt-24 md:pt-40 pb-12 max-w-[1100px] mx-auto border-t border-border">
      <FadeIn>
        <div className="mb-20 md:mb-32">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
            Available for opportunities
          </p>
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-foreground max-w-3xl mb-10">
            Let&apos;s build something meaningful together.
          </h2>
          <a
            href={`mailto:${resumeData.email}`}
            className="group inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-foreground hover:text-brand transition-colors"
          >
            <span className="relative">
              {resumeData.email}
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-foreground group-hover:bg-brand transition-colors" />
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pt-10 border-t border-border">
          <div className="flex flex-wrap gap-6">
            {[
              { label: "LinkedIn", href: `https://${resumeData.linkedin}` },
              { label: "GitHub", href: `https://${resumeData.github}` },
              { label: "Website", href: resumeData.website },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
                <ArrowUpRight
                  size={10}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Based in {resumeData.location}
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            &copy; {new Date().getFullYear()} {resumeData.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </FadeIn>
    </footer>
  )
}
