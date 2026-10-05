import { Navbar } from "@/components/shared/navbar"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { AwardsSection } from "@/components/sections/awards"
import { CourseworkSection } from "@/components/sections/coursework"
import { EducationSection } from "@/components/sections/education"
import { TechStackSection } from "@/components/sections/tech-stack"
import { FooterSection } from "@/components/sections/footer"
import { Interlude } from "@/components/sections/interlude"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <Interlude beat="a" />
        <AboutSection />
        <ExperienceSection />
        <Interlude beat="b" />
        <ProjectsSection />
        <AwardsSection />
        <CourseworkSection />
        <EducationSection />
        <TechStackSection />
        <Interlude beat="c" mobile="150svh" desktop="190svh" />
        <FooterSection />
      </main>
    </>
  )
}
