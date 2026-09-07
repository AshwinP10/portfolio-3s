"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { Canvas } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, HelpCircle, Pause, Play, X } from "lucide-react"
import { Scene } from "./scene"
import { SIGNS, TRAVEL } from "./world-data"
import { input, resetInput, useKeyboardControls } from "./controls"
import { parseQuality, renderingBudget, TOUR, type Quality } from "@/lib/world-settings"
import { WorldFallback } from "./world-fallback"

function hasWebGL2() {
  try {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("webgl2")
    if (!context) return false
    context.getExtension("WEBGL_lose_context")?.loseContext()
    return true
  } catch { return false }
}

export function WorldExperience() {
  const [mounted, setMounted] = useState(false)
  const [webgl, setWebgl] = useState(true)
  const [coarse, setCoarse] = useState(false)
  const [lowPower, setLowPower] = useState(false)
  const [quality, setQuality] = useState<Quality>("auto")
  const [help, setHelp] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [ready, setReady] = useState(false)
  const [proximityId, setProximityId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [dismissedId, setDismissedId] = useState<string | null>(null)
  const [tourIndex, setTourIndex] = useState<number | null>(null)
  const panelRef = useRef<HTMLElement>(null)
  const contextCleanup = useRef<(() => void) | null>(null)
  const budget = renderingBudget(quality, lowPower)
  const running = !paused && !help && !hidden
  useKeyboardControls(running)

  const select = useCallback((id: string) => {
    const sign = SIGNS.find((item) => item.id === id)
    if (!sign) return
    setPinnedId(id)
    setDismissedId(null)
    const [x, z] = sign.position
    const rotation = Math.atan2(-x, -z)
    input.travelTarget = [x + Math.sin(rotation) * 3.3, z + Math.cos(rotation) * 3.3]
  }, [])

  useEffect(() => {
    setWebgl(hasWebGL2())
    setMounted(true)
    const touch = window.matchMedia("(pointer: coarse)")
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const preferences = () => {
      setCoarse(touch.matches)
      setLowPower(touch.matches || motion.matches || navigator.hardwareConcurrency <= 4)
    }
    preferences()
    setPaused(motion.matches)
    touch.addEventListener("change", preferences)
    motion.addEventListener("change", preferences)
    try { setQuality(parseQuality(localStorage.getItem("ap-world-quality"))) } catch { /* Storage is optional. */ }
    const project = new URLSearchParams(window.location.search).get("project")
    if (project) select(project)
    const visibility = () => { setHidden(document.hidden); if (document.hidden) resetInput() }
    visibility()
    document.addEventListener("visibilitychange", visibility)
    return () => {
      touch.removeEventListener("change", preferences)
      motion.removeEventListener("change", preferences)
      document.removeEventListener("visibilitychange", visibility)
      contextCleanup.current?.()
      resetInput()
    }
  }, [select])

  const activeId = pinnedId ?? (proximityId !== dismissedId ? proximityId : null)
  const sign = SIGNS.find((item) => item.id === activeId)
  const closePanel = useCallback(() => {
    setPinnedId(null)
    setDismissedId(proximityId)
    setTourIndex(null)
    input.travelTarget = null
  }, [proximityId])
  const interact = useCallback(() => {
    if (pinnedId) closePanel()
    else if (proximityId) select(proximityId)
  }, [closePanel, pinnedId, proximityId, select])
  const proximity = useCallback((id: string | null) => { setProximityId(id); setDismissedId(null) }, [])
  const releaseFocus = useCallback(() => { setPinnedId(null); setTourIndex(null) }, [])

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !help) closePanel()
    }
    window.addEventListener("keydown", escape)
    return () => window.removeEventListener("keydown", escape)
  }, [closePanel, help])

  const travel = (index: number) => {
    setTourIndex(index)
    setPaused(false)
    select(TOUR[index])
  }
  const updateQuality = (value: string) => {
    const next = parseQuality(value)
    setQuality(next)
    try { localStorage.setItem("ap-world-quality", next) } catch { /* Storage is optional. */ }
  }

  if (!mounted) return <WorldFallback />
  if (!webgl) return <WorldFallback failed />

  return (
    <div className="world-screen">
      <div className="world-canvas" aria-hidden="true">
        <Canvas
          shadows={budget.shadows}
          dpr={budget.dpr}
          frameloop={running ? "always" : "demand"}
          gl={{ antialias: false, powerPreference: "default" }}
          camera={{ fov: 52, near: 0.1, far: 120, position: [0, 8, 12] }}
          fallback={<WorldFallback failed />}
          onCreated={({ gl }) => {
            const lost = (event: Event) => { event.preventDefault(); setWebgl(false) }
            gl.domElement.addEventListener("webglcontextlost", lost)
            contextCleanup.current = () => gl.domElement.removeEventListener("webglcontextlost", lost)
            setReady(true)
          }}
        >
          <Suspense fallback={null}>
            {quality === "auto" && <PerformanceMonitor onDecline={() => setLowPower(true)} />}
            <Scene activeId={activeId} focusId={pinnedId} onProximity={proximity} onSelect={select} onInteract={interact} onReleaseFocus={releaseFocus} quality={budget.mode} shadowSize={budget.shadowSize} />
          </Suspense>
        </Canvas>
      </div>
      {!ready && <p className="world-loading" role="status">Preparing the plaza…</p>}
      <header className="world-header">
        <Link className="world-home" href="/"><ArrowLeft size={18} /><span>Ashwin Prakash<small>The interactive portfolio</small></span></Link>
        <div className="world-header-actions">
          <label className="quality-control"><span>Graphics</span><select aria-label="Graphics quality" value={quality} onChange={(event) => updateQuality(event.target.value)}><option value="auto">Auto</option><option value="high">High</option><option value="battery">Battery saver</option></select></label>
          <button className="world-icon" aria-label={paused ? "Resume world" : "Pause world"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={18} /> : <Pause size={18} />}</button>
          <button className="world-icon" aria-label="World controls and help" onClick={() => setHelp(true)}><HelpCircle size={19} /></button>
          <Link href="/cv" className="world-text-link"><BookOpen size={17} /><span>Read portfolio</span></Link>
        </div>
      </header>
      <nav className="world-toolbar" aria-label="Explore the world">
        <div className="world-travel">{TRAVEL.map((destination) => <button key={destination.label} onClick={() => { closePanel(); setPaused(false); input.travelTarget = destination.position }}>{destination.label}</button>)}</div>
        <label className="world-directory"><span className="sr-only">Jump to any project or experience</span><select value={pinnedId ?? ""} onChange={(event) => { if (event.target.value) { setPaused(false); setTourIndex(null); select(event.target.value) } }}><option value="">Jump to a story…</option>{(["experience", "project", "about", "contact", "resume"] as const).map((kind) => <optgroup label={kind === "project" ? "Projects" : kind[0].toUpperCase() + kind.slice(1)} key={kind}>{SIGNS.filter((item) => item.kind === kind).map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</optgroup>)}</select></label>
        <button className="world-tour-button" onClick={() => tourIndex === null ? travel(0) : closePanel()}>{tourIndex === null ? "Take a guided tour" : "End tour"} <ArrowRight size={16} /></button>
      </nav>
      {paused && <div className="world-paused"><p>Take your time.</p><button onClick={() => setPaused(false)}><Play size={17} /> Resume exploring</button></div>}
      {sign && <aside className="world-panel" ref={panelRef} aria-labelledby="world-panel-title">
        {tourIndex !== null && <div className="tour-progress"><span>GUIDED TOUR</span><span>{tourIndex + 1} / {TOUR.length}</span><progress value={tourIndex + 1} max={TOUR.length} aria-label="Guided tour progress" /></div>}
        <button className="world-icon world-panel-close" onClick={closePanel} aria-label="Close story"><X size={19} /></button>
        <p className="eyebrow">{sign.kind}</p><h2 id="world-panel-title">{sign.title}</h2>
        <p className="world-panel-subtitle">{sign.subtitle}</p>{sign.meta && <p className="world-panel-meta">{sign.meta}</p>}
        <ul>{sign.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        <div className="tag-list">{sign.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="world-panel-links">{sign.links?.map((link) => <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{link.label} <ArrowUpRight size={15} /></a>)}</div>
        {tourIndex !== null && <div className="tour-navigation"><button disabled={tourIndex === 0} onClick={() => travel(tourIndex - 1)}><ArrowLeft size={17} /> Previous</button><button onClick={() => tourIndex === TOUR.length - 1 ? closePanel() : travel(tourIndex + 1)}>{tourIndex === TOUR.length - 1 ? "Finish tour" : "Next stop"} <ArrowRight size={17} /></button></div>}
      </aside>}
      {coarse && running ? <TouchJoystick /> : <div className="world-control-hint"><span><kbd>WASD</kbd> / <kbd>↑↓←→</kbd> Move</span><span><kbd>Shift</kbd> Run</span><span><kbd>E</kbd> Read</span><span><kbd>Esc</kbd> Close</span></div>}
      <Dialog.Root open={help} onOpenChange={setHelp}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="project-dialog world-help"><Dialog.Close className="icon-button dialog-close" aria-label="Close help"><X size={21} /></Dialog.Close><p className="eyebrow">WELCOME TO THE PLAZA</p><Dialog.Title>Follow your curiosity.</Dialog.Title><Dialog.Description>Meet the projects and experiences behind my work, one stop at a time.</Dialog.Description><ul><li>Use WASD or arrow keys to walk. Hold Shift to run.</li><li>Click a board or press E nearby to read its story.</li><li>On touch screens, drag the joystick to move.</li><li>Use “Jump to a story” for direct access, or take the guided tour.</li><li>Press Escape to close a story. Pause anytime; Battery saver lowers the graphics workload.</li></ul><div className="dialog-actions"><Dialog.Close className="action action-primary">Let’s explore <ArrowRight size={17} /></Dialog.Close><Link className="action action-outline" href="/cv">Read portfolio</Link><a className="action action-outline" href="/resume.pdf">Résumé PDF</a></div></Dialog.Content></Dialog.Portal></Dialog.Root>
    </div>
  )
}

function TouchJoystick() {
  const base = useRef<HTMLDivElement>(null)
  const pointer = useRef<number | null>(null)
  const [knob, setKnob] = useState({ x: 0, y: 0 })
  const move = (clientX: number, clientY: number) => {
    const element = base.current
    if (!element) return
    const bounds = element.getBoundingClientRect()
    const max = bounds.width / 2
    let x = clientX - bounds.left - max
    let y = clientY - bounds.top - max
    const distance = Math.hypot(x, y)
    if (distance > max) { x *= max / distance; y *= max / distance }
    setKnob({ x, y })
    input.touchActive = true
    input.touchX = x / max
    input.touchY = y / max
    input.travelTarget = null
  }
  const end = () => { pointer.current = null; setKnob({ x: 0, y: 0 }); input.touchActive = false; input.touchX = 0; input.touchY = 0 }
  useEffect(() => () => { input.touchActive = false; input.touchX = 0; input.touchY = 0 }, [])
  return <div ref={base} className="world-joystick" role="group" aria-label="Drag to move the robot. You can also use the story selector."
    onPointerDown={(event) => { if (pointer.current !== null) return; pointer.current = event.pointerId; event.currentTarget.setPointerCapture(event.pointerId); move(event.clientX, event.clientY) }}
    onPointerMove={(event) => { if (pointer.current === event.pointerId) move(event.clientX, event.clientY) }}
    onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}><span style={{ transform: "translate(-50%,-50%) translate(" + knob.x + "px," + knob.y + "px)" }} /></div>
}
