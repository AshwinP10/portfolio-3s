"use client"

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { Scene } from "./scene"
import { SIGNS, TRAVEL, COLORS } from "./world-data"
import { input, useKeyboardControls } from "./controls"

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

  const [proximityId, setProximityId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [dismissedId, setDismissedId] = useState<string | null>(null)

  useKeyboardControls()

  useEffect(() => {
    setMounted(true)
    setWebgl(hasWebGL())
    setCoarse(window.matchMedia?.("(pointer: coarse)").matches ?? false)
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
  }, [])

  const closePanel = useCallback(() => {
    if (pinnedId) setPinnedId(null)
    else setDismissedId(proximityId)
  }, [pinnedId, proximityId])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel()
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [closePanel])

  if (!mounted) {
    return <div className="fixed inset-0 grid place-items-center bg-[#dbe4f3] text-slate-500">Loading world…</div>
  }

  if (!webgl) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-[#dbe4f3] px-6 text-center">
        <div>
          <p className="mb-3 text-slate-700">This 3D portfolio needs WebGL, which isn&apos;t available here.</p>
          <Link href="/cv" className="font-semibold text-blue-700 underline">
            View the text version →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#dbe4f3]">
      <Canvas
        dpr={[1, 1.75]}
        shadows={false}
        gl={{ antialias: true, powerPreference: "default" }}
        camera={{ fov: 50, near: 0.1, far: 220, position: [0, 13, 17] }}
      >
        <Suspense fallback={null}>
          <Scene
            activeId={activeId}
            onProximity={handleProximity}
            onSelect={handleSelect}
            onInteract={handleInteract}
          />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: "#dbe4f3" }}
        barStyles={{ background: "#1e40af" }}
        dataStyles={{ color: "#1e293b", fontSize: "12px" }}
      />

      {/* ---------------- HUD ---------------- */}
      <div className="pointer-events-none absolute inset-0 z-40 select-none">
        {/* name card */}
        <div className="pointer-events-auto absolute left-3 top-3 rounded-lg border border-white/60 bg-white/80 px-3 py-2 shadow-md backdrop-blur">
          <p className="text-sm font-bold text-slate-900">Ashwin Prakash</p>
          <p className="text-[11px] text-slate-600">ECE Senior · UT Austin · ML / CV / Robotics</p>
        </div>

        {/* top-right actions */}
        <div className="pointer-events-auto absolute right-3 top-3 flex gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-blue-700 px-3 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-800"
          >
            Résumé PDF
          </a>
          <Link
            href="/cv"
            className="rounded-md border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-md backdrop-blur hover:bg-white"
          >
            Text version
          </Link>
        </div>

        {/* fast-travel chips */}
        <div className="pointer-events-auto absolute left-1/2 top-3 flex -translate-x-1/2 gap-1.5">
          {TRAVEL.map((t) => (
            <button
              key={t.label}
              onClick={() => {
                input.travelTarget = t.position
              }}
              className="rounded-full border border-slate-300 bg-white/75 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur hover:bg-white"
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* controls hint / joystick */}
        {coarse ? (
          <TouchJoystick />
        ) : (
          <div className="absolute bottom-3 left-3 rounded-md border border-white/60 bg-white/70 px-3 py-2 text-[11px] text-slate-600 shadow-sm backdrop-blur">
            <span className="font-semibold text-slate-800">WASD / arrows</span> to move ·{" "}
            <span className="font-semibold text-slate-800">Shift</span> to run ·{" "}
            <span className="font-semibold text-slate-800">E</span> to pin a sign · walk up to any sign
          </div>
        )}

        {/* info panel */}
        {sign && (
          <div className="pointer-events-auto absolute bottom-0 left-1/2 z-50 w-[min(560px,94vw)] -translate-x-1/2 rounded-t-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:bottom-4 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: COLORS[sign.kind] }}
                  />
                  <h2 className="text-base font-bold text-slate-900">{sign.title}</h2>
                </div>
                {sign.subtitle && <p className="text-xs font-medium text-blue-700">{sign.subtitle}</p>}
                {sign.meta && <p className="text-[11px] text-slate-500">{sign.meta}</p>}
              </div>
              <button
                onClick={closePanel}
                aria-label="Close"
                className="rounded-md px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <ul className="mt-2 max-h-[28vh] space-y-1.5 overflow-y-auto pr-1">
              {sign.bullets.map((b, i) => (
                <li key={i} className="text-[13px] leading-snug text-slate-700">
                  • {b}
                </li>
              ))}
            </ul>

            {sign.tags && sign.tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {sign.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700"
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
                    className="rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
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
        className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 rounded-full border border-white bg-blue-600/80 shadow-md"
        style={{ transform: `translate(-50%,-50%) translate(${knob.x}px, ${knob.y}px)` }}
      />
    </div>
  )
}
