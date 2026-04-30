import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { resumeData } from "@/lib/data"

export function AwardsSection() {
  return (
    <section id="awards" className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Section Label */}
        <FadeIn className="md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              04
            </span>
            <span className="h-px flex-1 bg-border max-w-[40px]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Awards
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="md:col-span-9 md:col-start-4">
          <StaggerContainer staggerDelay={0.1}>
            {resumeData.awards.map((award) => (
              <StaggerItem key={award.title}>
                <div className="pb-10 border-b border-border last:border-0">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                    <h3 className="font-sans text-lg md:text-xl font-semibold tracking-tight text-foreground">
                      {award.title}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground shrink-0">
                      {award.period}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {award.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/70"
                      >
                        <span className="mt-2 h-px w-4 min-w-[16px] bg-border" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {award.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
