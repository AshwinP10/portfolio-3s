import type { Metadata } from "next"
import { WorldLoader } from "@/components/world/world-loader"

export const metadata: Metadata = {
  title: "3D Résumé | Ashwin Prakash",
  description: "Ashwin Prakash’s projects and experience, laid out as a small 3D plaza.",
  alternates: { canonical: "/world" },
}

export default function WorldPage() {
  return <><h1 className="sr-only">Ashwin Prakash — résumé, 3D version</h1><WorldLoader /><noscript><p>JavaScript is needed for the 3D version. <a href="/cv">Read the résumé</a> or <a href="/resume.pdf">download the PDF</a>.</p></noscript></>
}
