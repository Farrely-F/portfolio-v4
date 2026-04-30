"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { resumeData } from "@/lib/data"

function TechGroup({
  label,
  items,
  size = "md",
}: {
  label: string
  items: string[]
  size?: "sm" | "md" | "lg"
}) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
  }

  return (
    <div className="space-y-4">
      <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </h4>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {items.map((item) => (
          <motion.span
            key={item}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className={`${sizeClasses[size]} font-medium text-foreground cursor-default hover:text-brand transition-colors duration-200`}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export function TechStackSection() {
  const allTech = [
    ...resumeData.technologies.languages,
    ...resumeData.technologies.toolsAndFrameworks,
    ...resumeData.technologies.databaseAndInfrastructure,
  ]

  return (
    <section className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Section Label */}
        <FadeIn className="md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              07
            </span>
            <span className="h-px flex-1 bg-border max-w-[40px]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Stack
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="md:col-span-9 md:col-start-4 space-y-14">
          <StaggerContainer staggerDelay={0.08}>
            <StaggerItem>
              <TechGroup
                label="Languages"
                items={resumeData.technologies.languages}
                size="lg"
              />
            </StaggerItem>
            <StaggerItem>
              <div className="pt-10 border-t border-border">
                <TechGroup
                  label="Tools & Frameworks"
                  items={resumeData.technologies.toolsAndFrameworks}
                  size="md"
                />
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="pt-10 border-t border-border">
                <TechGroup
                  label="Database & Infrastructure"
                  items={resumeData.technologies.databaseAndInfrastructure}
                  size="sm"
                />
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Visual density wall */}
          <FadeIn delay={0.3}>
            <div className="pt-10 border-t border-border">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                All Technologies
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {allTech.map((tech, i) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-default"
                    style={{
                      opacity: 0.5 + (i % 3) * 0.2,
                    }}
                  >
                    {tech}
                    {i < allTech.length - 1 && (
                      <span className="ml-3 text-border">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
