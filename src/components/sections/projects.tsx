"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { resumeData } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Section Label */}
        <FadeIn className="md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              03
            </span>
            <span className="h-px flex-1 bg-border max-w-[40px]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Projects
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="md:col-span-9 md:col-start-4">
          <StaggerContainer staggerDelay={0.08}>
            {resumeData.projects.map((project) => (
              <StaggerItem key={project.name}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="group border-b border-border py-8 md:py-10 cursor-default"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-foreground group-hover:text-brand transition-colors duration-300">
                        {project.name}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-brand"
                      />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground shrink-0">
                      {project.period}
                    </span>
                  </div>

                  <p className="text-base leading-relaxed text-foreground/70 mb-4 max-w-xl">
                    {project.description}
                  </p>

                  {project.bullets.length > 0 && (
                    <ul className="mb-4 space-y-1">
                      {project.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-2 h-px w-4 min-w-[16px] bg-border" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-secondary text-secondary-foreground"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
