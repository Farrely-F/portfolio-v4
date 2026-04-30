import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { resumeData } from "@/lib/data"

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Section Label */}
        <FadeIn className="md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              02
            </span>
            <span className="h-px flex-1 bg-border max-w-[40px]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Experience
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="md:col-span-9 md:col-start-4">
          <StaggerContainer staggerDelay={0.1}>
            {resumeData.experience.map((exp) => (
              <StaggerItem key={exp.company}>
                <div className="pb-12 md:pb-16 border-b border-border last:border-0">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6">
                    <h3 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                      {exp.company}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
                    {exp.role}
                  </p>
                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex gap-4 text-base leading-relaxed text-foreground/80"
                      >
                        <span className="mt-2 h-px w-6 min-w-[24px] bg-border" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
