import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-6 md:px-8 py-24 md:py-32 max-w-[1100px] mx-auto"
    >
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
        <div className="md:col-span-9 md:col-start-4 space-y-10">
          <FadeIn delay={0.1}>
            <p className="font-sans text-xl md:text-2xl leading-relaxed md:leading-relaxed text-foreground max-w-2xl">
              My background is not a typical engineering path. I earned a B.S. in
              Philosophy from University of Indonesia — learning to question
              assumptions, map systems, and argue with clarity. Now I am pursuing
              an M.S. in Information Systems at Telkom University while shipping
              production code at SLTR Group.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.08}>
            <StaggerItem>
              <p className="text-base leading-relaxed text-foreground/70 max-w-2xl">
                That interdisciplinary lens shapes how I build. I do not just write
                components — I design the space where complex technology becomes
                intuitive for real people. Whether it is a Web3 wallet connection, an
                AI agent training interface, or a payment gateway onboarding flow,
                every screen is an argument. And I aim for clarity.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="pt-6 border-t border-border max-w-md">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Core stack
                </p>
                <p className="text-base leading-relaxed text-foreground/70">
                  Next.js, TypeScript, Tailwind CSS — with deep experience in
                  blockchain integration (Wagmi, Viem, EVM chains), AI
                  microservices, and payment systems.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
