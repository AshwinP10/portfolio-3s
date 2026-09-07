"use client"

import Link from "next/link"

export function WorldFallback({ failed = false }: { failed?: boolean }) {
  return <div className="world-fallback"><p className="eyebrow">ASHWIN PRAKASH</p><h2>{failed ? "Couldn’t load the 3D world" : "Loading the plaza…"}</h2><p role="status">{failed ? "The 3D world couldn’t start here. Everything’s also in the résumé." : "Preparing the plaza…"}</p><Link className="action action-primary" href="/cv">Read the résumé</Link><a href="/resume.pdf">Open résumé PDF</a>{failed && <button className="action action-outline" onClick={() => window.location.reload()}>Try again</button>}</div>
}
