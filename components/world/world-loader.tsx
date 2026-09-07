"use client"

import { Component, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { WorldFallback } from "./world-fallback"


class WorldBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <WorldFallback failed /> : this.props.children }
}

const World = dynamic(() => import("./world-experience").then((module) => module.WorldExperience), {
  ssr: false,
  loading: () => <WorldFallback />,
})

export function WorldLoader() {
  return <WorldBoundary><World /></WorldBoundary>
}
