"use client"

import Link from "next/link"

export function WorldFallback({ failed = false }: { failed?: boolean }) {
  return <div className="world-fallback"><p className="eyebrow">ASHWIN PRAKASH / INTERACTIVE WORLD</p><h2>{failed ? "Let’s take another route." : "A small world of big ideas."}</h2><p role="status">{failed ? "The 3D world couldn’t start on this device. All of the projects and experience are available in the portfolio." : "Preparing the plaza…"}</p><Link className="action action-primary" href="/cv">Read the portfolio</Link><a href="/resume.pdf">Open résumé PDF</a>{failed && <button className="action action-outline" onClick={() => window.location.reload()}>Try the world again</button>}</div>
}
