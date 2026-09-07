import { SIGNS, type SignData } from "../components/world/world-data"

export const categories = ["All work", "Machine learning", "Robotics", "Applications", "Hardware"] as const
export type ProjectCategory = typeof categories[number]
export type Project = SignData & { category: Exclude<ProjectCategory, "All work">; summary: string; highlight: string; highlightLabel: string }

const presentation: Record<string, Pick<Project, "category" | "summary" | "highlight" | "highlightLabel">> = {
  "vqa-disagree": { category: "Machine learning", summary: "Using disagreement between vision-language models to measure what makes a question difficult.", highlight: "1,500", highlightLabel: "VQA items · zero human annotation" },
  davatar: { category: "Robotics", summary: "Teaching robots to manipulate objects across the air–water interface with vision, touch, and depth.", highlight: "28 → 71%", highlightLabel: "mean real-world task success" },
  "silicon-prairie": { category: "Machine learning", summary: "Forecasting the Austin–San Antonio corridor through a decade of satellite imagery.", highlight: "43,264", highlightLabel: "satellite tiles · 10 years of imagery" },
  secondlens: { category: "Applications", summary: "Turning everyday interactions into a searchable memory graph with smart glasses.", highlight: "SecondLens", highlightLabel: "HackMIT · computer vision × memory" },
  arcade: { category: "Hardware", summary: "A hand-soldered game controller and Asteroids, built from PCB to embedded firmware.", highlight: "40+", highlightLabel: "components · one handheld arcade" },
  stock: { category: "Machine learning", summary: "An interactive forecasting dashboard with market data pipelines and technical indicators.", highlight: "5", highlightLabel: "technical indicators · Streamlit dashboard" },
  "plate-em": { category: "Applications", summary: "Personalized meal planning built around menus from UT Austin’s dining halls.", highlight: "3", highlightLabel: "dining halls · personalized meal plans" },
  steamboard: { category: "Applications", summary: "A React dashboard for exploring Steam game and player statistics.", highlight: "Steamboard", highlightLabel: "games · players · data visualization" },
  sat3dgs: { category: "Machine learning", summary: "Exploring 3D reconstruction from satellite imagery with Gaussian Splatting.", highlight: "Sat3DGS", highlightLabel: "satellite imagery → 3D reconstruction" },
  "this-site": { category: "Applications", summary: "The 3D version of this résumé — a small plaza you walk around with a robot.", highlight: "Explore in 3D", highlightLabel: "Next.js · React Three Fiber" },
}

export const projects: Project[] = SIGNS.filter((sign) => sign.kind === "project").map((sign) => ({ ...sign, ...presentation[sign.id] }))

export function filterProjects(category: ProjectCategory, query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return projects.filter((project) => {
    const text = [project.title, project.subtitle, project.summary, ...project.bullets, ...(project.tags ?? [])].join(" ").toLowerCase()
    return (category === "All work" || project.category === category) && terms.every((term) => text.includes(term))
  })
}
