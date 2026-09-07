"use client"

import { useMemo, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, ArrowRight, Search, X } from "lucide-react"
import { categories, filterProjects, projects, type ProjectCategory } from "@/lib/projects"

export function ProjectsSection() {
  const [category, setCategory] = useState<ProjectCategory>("All work")
  const [query, setQuery] = useState("")
  const visible = useMemo(() => filterProjects(category, query), [category, query])
  return (
    <section className="section-shell section-pad projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading"><div><p className="eyebrow">01 / PROJECTS</p><h2 id="projects-title">Projects</h2></div><p>Research, internships,<br />and side projects.</p></div>
      <div className="project-toolbar"><div className="filter-list" role="group" aria-label="Filter projects by field">{categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="project-search"><Search size={17} aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search work or tools…" aria-label="Search projects by name or technology" />{query && <button aria-label="Clear project search" onClick={() => setQuery("")}><X size={16} /></button>}</div></div>
      <p className="project-count" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}{query.trim() ? " matching “" + query.trim() + "”" : " to explore"}</p>
      <div className="project-grid">
        {visible.map((project) => (
          <Dialog.Root key={project.id}>
            <article className={"project-card project-" + project.id}>
              <div className="project-card-top"><span>{project.category}</span><span>{String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, "0")}</span></div>
              <div className="project-highlight"><strong>{project.highlight}</strong><span>{project.highlightLabel}</span></div>
              <div className="project-card-body"><p className="project-subtitle">{project.subtitle}</p><h3>{project.title}</h3><p className="project-description">{project.summary}</p><div className="tag-list">{project.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><Dialog.Trigger asChild><button className="project-detail-button">Explore project <ArrowUpRight size={20} /><span className="sr-only">: {project.title}</span></button></Dialog.Trigger></div>
            </article>
            <Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="project-dialog"><Dialog.Close className="icon-button dialog-close" aria-label="Close project details"><X size={22} /></Dialog.Close><p className="eyebrow">{project.category}</p><Dialog.Title>{project.title}</Dialog.Title><Dialog.Description>{project.subtitle}</Dialog.Description><div className="dialog-metric"><strong>{project.highlight}</strong><span>{project.highlightLabel}</span></div><h4>Details</h4><ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="tag-list">{project.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="dialog-actions">{project.links?.map((link) => <a key={link.href} className="action action-outline" href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={16} /></a>)}<a href={"/world?project=" + project.id} className="action action-primary">Visit in 3D <ArrowRight size={16} /></a></div></Dialog.Content></Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
      {visible.length === 0 && <div className="project-empty"><Search size={26} /><h3>No projects found</h3><p>Try another field or search for a tool like Python, React, or ROS.</p><button className="action action-outline" onClick={() => { setCategory("All work"); setQuery("") }}>Clear filters</button></div>}
    </section>
  )
}
