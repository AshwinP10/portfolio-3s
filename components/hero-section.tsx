"use client"

import { Button } from "@/components/ui/button"
import { Github, Mail, ExternalLink, Cpu, Download } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = ["ECE Student", "Aspiring Software Engineer", "Student Researcher"]

  useEffect(() => {
    const currentRoleText = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRoleText.length) {
            setDisplayText(currentRoleText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles])

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4 tech-pattern pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Cpu className="h-8 w-8 text-primary" />
          <h1 className="text-5xl md:text-6xl font-bold gradient-text font-sans">Hi, my name is Ashwin Prakash</h1>
          <Cpu className="h-8 w-8 text-primary" />
        </div>

        <p className="text-xl md:text-2xl text-primary mb-2 font-semibold h-8">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Passionate about software development, AI, robotics, and computer vision. Building intelligent systems and
          exploring the intersection of technology and real-world applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium bg-transparent"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/15LvWrl5fyEyBbZVb_NuwJcotjk21vT3k/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>

        <div className="flex justify-center space-x-8">
          <a
            href="https://github.com/AshwinP10"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className="h-8 w-8" />
          </a>
          <a
            href="mailto:ashwinprakash@utexas.edu"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="h-8 w-8" />
          </a>
          <a
            href="https://ashw.vercel.app/"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ExternalLink className="h-8 w-8" />
          </a>
        </div>
      </div>
    </section>
  )
}
