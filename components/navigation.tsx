"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react"

const sections = ["projects", "experience", "about", "contact"]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: "-15% 0px -55% 0px" })
    for (const id of sections) { const element = document.getElementById(id); if (element) observer.observe(element) }
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])
  const isLight = mounted && resolvedTheme === "light"
  return (
    <header className="site-header"><nav className="section-shell nav-inner" aria-label="Main navigation">
      <a className="wordmark" href="#home" aria-label="Ashwin Prakash, home" onClick={() => setOpen(false)}>ap<span>.</span></a>
      <div id="nav-links" className={open ? "nav-links is-open" : "nav-links"}>{sections.map((section) => <a key={section} href={"#" + section} aria-current={active === section ? "location" : undefined} onClick={() => setOpen(false)}>{section === "projects" ? "Work" : section[0].toUpperCase() + section.slice(1)}</a>)}</div>
      <div className="nav-actions"><button className="icon-button" aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"} onClick={() => setTheme(isLight ? "dark" : "light")}>{isLight ? <Moon size={18} /> : <Sun size={18} />}</button><a className="nav-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={16} /></a><button className="icon-button menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
    </nav></header>
  )
}
