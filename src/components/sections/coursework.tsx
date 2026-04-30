import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { resumeData } from "@/lib/data"

export function CourseworkSection() {
  return (
    <section className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Section Label */}
        <FadeIn className="md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              05
            </span>
            <span className="h-px flex-1 bg-border max-w-[40px]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Coursework
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="md:col-span-9 md:col-start-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border hidden md:block" />

            <StaggerContainer staggerDelay={0.08}>
              {resumeData.coursework.map((course) => (
                <StaggerItem key={course.title}>
                  <div className="relative pb-10 pl-0 md:pl-8 border-b border-border last:border-0 last:pb-0">
                    {/* Timeline dot */}
                    <div className="absolute left-[-3px] top-2.5 w-[7px] h-[7px] bg-muted-foreground hidden md:block" />

                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                      <h3 className="font-sans text-lg md:text-xl font-semibold tracking-tight text-foreground">
                        {course.title}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground shrink-0">
                        {course.period}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                      {course.organization}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {course.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm leading-relaxed text-foreground/70"
                        >
                          <span className="mt-2 h-px w-3 min-w-[12px] bg-border" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {course.tools.map((tool) => (
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
      </div>
    </section>
  )
}
