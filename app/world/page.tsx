import type { Metadata } from "next"
import { WorldLoader } from "@/components/world/world-loader"

export const metadata: Metadata = {
  title: "The 3D World | Ashwin Prakash",
  description: "Explore Ashwin Prakash’s projects and experience in an interactive Austin-inspired plaza.",
  alternates: { canonical: "/world" },
}

export default function WorldPage() {
  return <><h1 className="sr-only">Ashwin Prakash’s interactive 3D portfolio</h1><WorldLoader /><noscript><p>JavaScript is needed for the 3D world. <a href="/cv">Read the complete portfolio</a> or <a href="/resume.pdf">download the résumé</a>.</p></noscript></>
}
