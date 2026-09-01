import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ResumePdfSection } from "@/components/resume-pdf-section"
import { ContactSection } from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Ashwin Prakash — Résumé",
  description:
    "Ashwin Prakash — senior in Electrical & Computer Engineering at UT Austin. Experience, projects, skills, and résumé.",
}

export default function CvPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ResumePdfSection />
      <ContactSection />
    </main>
  )
}
