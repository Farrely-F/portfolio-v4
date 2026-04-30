import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { resumeData } from "@/lib/data"

export function EducationSection() {
  return (
    <section id="education" className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Section Label */}
        <FadeIn className="md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              06
            </span>
            <span className="h-px flex-1 bg-border max-w-[40px]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Education
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="md:col-span-9 md:col-start-4">
          <StaggerContainer staggerDelay={0.1}>
            {resumeData.education.map((edu) => (
              <StaggerItem key={edu.institution}>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 pb-10 border-b border-border last:border-0">
                  <div>
                    <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-1">
                      {edu.institution}
                    </h3>
                    <p className="text-base text-foreground/70">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block">
                      {edu.period}
                    </span>
                    {edu.gpa && (
                      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mt-1 block">
                        GPA {edu.gpa}
                      </span>
                    )}
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
