import { FadeIn } from "@/components/motion/fade-in"
import { resumeData } from "@/lib/data"

export function AboutSection() {
  return (
    <section id="about" className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Section Label */}
        <FadeIn className="md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              01
            </span>
            <span className="h-px flex-1 bg-border max-w-[40px]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              About
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.1} className="md:col-span-9 md:col-start-4">
          <p className="font-sans text-xl md:text-2xl leading-relaxed md:leading-relaxed text-foreground max-w-2xl">
            {resumeData.about}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
