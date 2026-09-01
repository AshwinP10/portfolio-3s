import type { Metadata } from "next"
import { WorldExperience } from "@/components/world/world-experience"

export const metadata: Metadata = {
  title: "Ashwin Prakash — Interactive Portfolio",
  description:
    "Drive a robot around a small 3D world to explore Ashwin Prakash's experience and projects. Prefer text? See /cv.",
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
        This is an interactive 3D portfolio. <a href="/cv">View the text version</a> or{" "}
        <a href="/resume.pdf">download the résumé (PDF)</a>.
      </p>
      <WorldExperience />
    </>
  )
}
