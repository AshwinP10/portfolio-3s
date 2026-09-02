import type { Metadata } from "next"
import { WorldExperience } from "@/components/world/world-experience"

export const metadata: Metadata = {
  title: "Ashwin Prakash's Résumé",
  description:
    "The résumé of Ashwin Prakash — ECE senior at UT Austin working in machine learning, computer vision, and robotics. Text version at /cv.",
}

export default function Home() {
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/cv" />
      </noscript>
      <h1 className="sr-only">
        Ashwin Prakash — senior in Electrical &amp; Computer Engineering at UT Austin, working in machine learning,
        computer vision, and robotics
      </h1>
      <p className="sr-only">
        Ashwin Prakash&apos;s résumé, presented as a 3D plaza. <a href="/cv">View the text version</a> or{" "}
        <a href="/resume.pdf">download the résumé (PDF)</a>.
      </p>
      <WorldExperience />
    </>
  )
}
