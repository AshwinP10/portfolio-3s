"use client"

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { Scene } from "./scene"
import { SIGNS, TRAVEL, COLORS } from "./world-data"
import { input, useKeyboardControls } from "./controls"

const SKY = "#f6c9a0"

function hasWebGL() {
  try {
    const c = document.createElement("canvas")
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")))
  } catch {
    return false
  }
}

export function WorldExperience() {
  const [mounted, setMounted] = useState(false)
  const [webgl, setWebgl] = useState(true)
  const [coarse, setCoarse] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const [proximityId, setProximityId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [dismissedId, setDismissedId] = useState<string | null>(null)

  useKeyboardControls()

  useEffect(() => {
    setMounted(true)
    setWebgl(hasWebGL())
    setCoarse(window.matchMedia?.("(pointer: coarse)").matches ?? false)
    try {
      if (sessionStorage.getItem("ap-intro-seen") === "1") setShowIntro(false)
    } catch {
      /* ignore */
    }
  }, [])

  const closeIntro = useCallback(() => {
    setShowIntro(false)
    try {
      sessionStorage.setItem("ap-intro-seen", "1")
    } catch {
      /* ignore */
    }
  }, [])

  const activeId = pinnedId ?? (proximityId && proximityId !== dismissedId ? proximityId : null)
  const sign = useMemo(() => SIGNS.find((s) => s.id === activeId) ?? null, [activeId])

  const handleProximity = useCallback((id: string | null) => {
    setProximityId(id)
    setDismissedId(null)
  }, [])

  const handleInteract = useCallback(() => {
    setProximityId((pid) => {
      setPinnedId((cur) => (cur ? null : pid))
      return pid
    })
  }, [])

  const handleSelect = useCallback((id: string) => {
    setPinnedId(id)
    setDismissedId(null)
    // walk the robot over to stand in front of that board
    const s = SIGNS.find((x) => x.id === id)
    if (s) {
      const [sx, sz] = s.position
      const rotY = Math.atan2(-sx, -sz)
      input.travelTarget = [sx + Math.sin(rotY) * 3.3, sz + Math.cos(rotY) * 3.3]
    }
  }, [])

  const closePanel = useCallback(() => {
    if (pinnedId) setPinnedId(null)
    else setDismissedId(proximityId)
  }, [pinnedId, proximityId])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (showIntro) closeIntro()
      else closePanel()
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [closePanel, closeIntro, showIntro])

  if (!mounted) {
    return (
      <div className="fixed inset-0 grid place-items-center text-stone-600" style={{ background: SKY }}>
        Loading world…
      </div>
    )
  }

  if (!webgl) {
    return (
      <div className="fixed inset-0 grid place-items-center px-6 text-center" style={{ background: SKY }}>
        <div>
          <p className="mb-3 text-stone-800">This 3D portfolio needs WebGL, which isn&apos;t available here.</p>
          <Link href="/cv" className="font-semibold text-orange-800 underline">
            View the text version →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: SKY }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "default" }}
        camera={{ fov: 52, near: 0.1, far: 200, position: [0, 8, 12] }}
      >
        <Suspense fallback={null}>
          <Scene
            activeId={activeId}
            focusId={pinnedId}
            onProximity={handleProximity}
            onSelect={handleSelect}
            onInteract={handleInteract}
            onReleaseFocus={() => setPinnedId(null)}
          />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: SKY }}
        barStyles={{ background: "#e0651f" }}
        dataStyles={{ color: "#44290f", fontSize: "12px" }}
      />

      {/* ---------------- HUD ---------------- */}
      <div className="pointer-events-none absolute inset-0 z-40 select-none">
        {/* name card */}
        <div className="pointer-events-auto absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-amber-200/70 bg-white/85 px-3 py-2 shadow-md backdrop-blur">
          <div>
            <p className="text-sm font-bold text-stone-900">Ashwin Prakash</p>
            <p className="text-[11px] text-stone-600">ECE Senior · UT Austin · ML / CV / Robotics</p>
          </div>
          <button
            onClick={() => setShowIntro(true)}
            className="ml-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 hover:bg-amber-100"
            title="About Ashwin"
          >
            ⓘ
          </button>
        </div>

        {/* top-right actions */}
        <div className="pointer-events-auto absolute right-3 top-3 flex gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-orange-600 px-3 py-2 text-xs font-semibold text-white shadow-md hover:bg-orange-700"
          >
            Résumé PDF
          </a>
          <Link
            href="/cv"
            className="rounded-md border border-stone-300 bg-white/85 px-3 py-2 text-xs font-semibold text-stone-700 shadow-md backdrop-blur hover:bg-white"
          >
            Text version
          </Link>
        </div>

        {/* fast-travel chips */}
        <div className="pointer-events-auto absolute left-1/2 top-3 flex -translate-x-1/2 flex-wrap justify-center gap-1.5">
          {TRAVEL.map((t) => (
            <button
              key={t.label}
              onClick={() => {
                input.travelTarget = t.position
              }}
              className="rounded-full border border-stone-300 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-stone-700 shadow-sm backdrop-blur hover:bg-white"
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* controls hint / joystick */}
        {coarse ? (
          <TouchJoystick />
        ) : (
          <div className="absolute bottom-3 left-3 rounded-md border border-amber-200/70 bg-white/75 px-3 py-2 text-[11px] text-stone-600 shadow-sm backdrop-blur">
            <span className="font-semibold text-stone-900">WASD / arrows</span> move ·{" "}
            <span className="font-semibold text-stone-900">Shift</span> run ·{" "}
            <span className="font-semibold text-stone-900">E</span> focus on a board ·{" "}
            <span className="font-semibold text-stone-900">Esc</span> step back
          </div>
        )}

        {/* info panel */}
        {sign && (
          <div className="pointer-events-auto absolute bottom-0 left-1/2 z-50 w-[min(560px,94vw)] -translate-x-1/2 rounded-t-2xl border border-stone-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:bottom-4 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS[sign.kind] }} />
                  <h2 className="text-base font-bold text-stone-900">{sign.title}</h2>
                </div>
                {sign.subtitle && <p className="text-xs font-medium text-orange-700">{sign.subtitle}</p>}
                {sign.meta && <p className="text-[11px] text-stone-500">{sign.meta}</p>}
              </div>
              <button
                onClick={closePanel}
                aria-label="Close"
                className="rounded-md px-2 py-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <ul className="mt-2 max-h-[28vh] space-y-1.5 overflow-y-auto pr-1">
              {sign.bullets.map((b, i) => (
                <li key={i} className="text-[13px] leading-snug text-stone-700">
                  • {b}
                </li>
              ))}
            </ul>

            {sign.tags && sign.tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {sign.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {sign.links && sign.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {sign.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("/") || l.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="rounded-md bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-700"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showIntro && <IntroOverlay onClose={closeIntro} />}
    </div>
  )
}

function IntroOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="pointer-events-auto absolute inset-0 z-[100] grid place-items-center bg-stone-900/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[min(680px,96vw)] overflow-hidden rounded-2xl border border-amber-200 bg-[#fff8ef] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 w-full bg-gradient-to-r from-orange-400 via-rose-400 to-violet-500" />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-4 rounded-md px-2 py-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
        >
          ✕
        </button>

        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:p-7">
          <img
            src="/images/ashwin-headshot.jpg"
            alt="Ashwin Prakash"
            className="h-28 w-28 shrink-0 self-center rounded-2xl object-cover object-[center_20%] shadow-md ring-2 ring-amber-200 sm:h-40 sm:w-40 sm:self-start"
          />
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-stone-900">Ashwin Prakash</h2>
            <p className="text-sm font-semibold text-orange-700">
              ECE Senior · UT Austin · Machine Learning, Computer Vision &amp; Robotics
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-stone-700">
              Hey — I&apos;m a senior in Electrical &amp; Computer Engineering at UT Austin (Robotics minor, GPA 3.7,
              graduating May 2027). I work across machine learning, computer vision, and robotics: computer-vision
              pipelines and serverless infrastructure at Amazon, an NVIDIA Isaac Sim boat simulator at Saronic, sensor
              fusion &amp; SLAM in a robotics lab, and research submitted to CoRL 2026 and a CVPR 2026 workshop.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-stone-700">
              This résumé is laid out as a small plaza. Walk the robot up to a board to read each point — or skip it
              and grab the text version.
            </p>

            <div className="mt-3 rounded-lg border border-amber-200 bg-white/70 p-3 text-[12.5px] text-stone-700">
              <p className="mb-1 font-bold text-stone-900">How to move around</p>
              <ul className="space-y-0.5">
                <li>
                  <b>W A S D</b> or <b>arrow keys</b> — walk · hold <b>Shift</b> to run
                </li>
                <li>
                  Walk up to a board and press <b>E</b> (or click it) — the camera turns to face the poster so you can
                  read it
                </li>
                <li>
                  Press <b>E</b> again, hit <b>Esc</b>, or walk away to step back
                </li>
                <li>On a phone: drag the on-screen stick, tap a board</li>
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={onClose}
                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
              >
                Enter →
              </button>
              <Link
                href="/cv"
                className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
              >
                Text résumé
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
              >
                Résumé PDF ↗
              </a>
            </div>
            <p className="mt-3 text-[11px] text-stone-500">You can reopen this anytime with the ⓘ button.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TouchJoystick() {
  const base = useRef<HTMLDivElement>(null)
  const [knob, setKnob] = useState({ x: 0, y: 0 })

  const move = (clientX: number, clientY: number) => {
    const el = base.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const max = r.width / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const d = Math.hypot(dx, dy)
    if (d > max) {
      dx = (dx / d) * max
      dy = (dy / d) * max
    }
    setKnob({ x: dx, y: dy })
    input.touchActive = true
    input.touchX = dx / max
    input.touchY = dy / max
    input.travelTarget = null
  }

  const end = () => {
    setKnob({ x: 0, y: 0 })
    input.touchActive = false
    input.touchX = 0
    input.touchY = 0
  }

  return (
    <div
      ref={base}
      className="pointer-events-auto absolute bottom-6 left-6 h-32 w-32 touch-none rounded-full border border-white/70 bg-white/40 shadow-lg backdrop-blur"
      onPointerDown={(e) => {
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        move(e.clientX, e.clientY)
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0 || (e as unknown as PointerEvent).pressure > 0) move(e.clientX, e.clientY)
      }}
      onPointerUp={end}
      onPointerCancel={end}
      onLostPointerCapture={end}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 rounded-full border border-white bg-orange-500/80 shadow-md"
        style={{ transform: `translate(-50%,-50%) translate(${knob.x}px, ${knob.y}px)` }}
      />
    </div>
  )
}
