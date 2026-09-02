"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { COLORS, SIGN_EMOJI, posterColor, type SignData } from "./world-data"
import { posterTexture } from "./poster-texture"

type Props = { data: SignData; active: boolean; onSelect: (id: string) => void }

const POSTER_W = 2.4
const POSTER_H = 3.1

export function Sign({ data, active, onSelect }: Props) {
  const [x, z] = data.position
  const group = useRef<THREE.Group>(null)
  const glow = useRef<THREE.Mesh>(null)

  const color =
    data.kind === "about" || data.kind === "contact" || data.kind === "resume"
      ? COLORS[data.kind]
      : posterColor(data.id)

  const tex = useMemo(
    () =>
      posterTexture({
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        emoji: SIGN_EMOJI[data.id] ?? "📍",
        color,
      }),
    [data.id, data.title, data.subtitle, color],
  )

  useFrame((state, dt) => {
    if (group.current) {
      const targetY = active ? 0.14 : 0
      group.current.position.y += (targetY - group.current.position.y) * Math.min(1, dt * 8)
    }
    if (glow.current) {
      const m = glow.current.material as THREE.MeshBasicMaterial
      const target = active ? 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.12 : 0
      m.opacity += (target - m.opacity) * Math.min(1, dt * 6)
      glow.current.visible = m.opacity > 0.02
    }
  })

  const select = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    onSelect(data.id)
  }
  const hoverIn = () => (document.body.style.cursor = "pointer")
  const hoverOut = () => (document.body.style.cursor = "")

  const renderPoster = (y: number, tilt = 0, scale = 1) => (
    <group position={[0, y, 0]} rotation-x={tilt} scale={scale}>
      <mesh ref={glow} position={[0, 0, -0.08]}>
        <planeGeometry args={[POSTER_W + 0.7, POSTER_H + 0.7]} />
        <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh castShadow>
        <boxGeometry args={[POSTER_W + 0.24, POSTER_H + 0.24, 0.16]} />
        <meshStandardMaterial color="#7a5230" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0, 0.1]} onClick={select} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        <planeGeometry args={[POSTER_W, POSTER_H]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  )

  const renderPost = (px: number, h: number) => (
    <mesh position={[px, h / 2, 0]} castShadow>
      <boxGeometry args={[0.16, h, 0.16]} />
      <meshStandardMaterial color="#6b4326" roughness={0.85} />
    </mesh>
  )

  let body: React.ReactNode
  if (data.kind === "about") {
    body = (
      <>
        <mesh position={[0, 0.45, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.9, 1.6]} />
          <meshStandardMaterial color="#dcc39a" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.9, -0.4]} castShadow>
          <boxGeometry args={[3.1, 4.4, 0.7]} />
          <meshStandardMaterial color="#efe0c2" roughness={0.9} />
        </mesh>
        <mesh position={[0, 5.35, -0.4]}>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
        {renderPoster(3.15, 0, 1.16)}
      </>
    )
  } else if (data.kind === "contact") {
    body = (
      <>
        <mesh position={[-2, 2.3, 0]} castShadow>
          <boxGeometry args={[0.34, 4.6, 0.34]} />
          <meshStandardMaterial color="#e7d4b0" roughness={0.9} />
        </mesh>
        <mesh position={[2, 2.3, 0]} castShadow>
          <boxGeometry args={[0.34, 4.6, 0.34]} />
          <meshStandardMaterial color="#e7d4b0" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.5, 0]} castShadow>
          <boxGeometry args={[4.5, 0.36, 0.36]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
        {renderPoster(2.4, 0, 0.86)}
      </>
    )
  } else if (data.kind === "resume") {
    body = (
      <>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 1.1, 1.3]} />
          <meshStandardMaterial color="#caa36b" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <boxGeometry args={[2.1, 0.12, 1.4]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
        {renderPoster(2.0, -0.5, 0.8)}
      </>
    )
  } else if (data.kind === "project") {
    body = (
      <>
        {/* easel legs */}
        <mesh position={[-0.9, 1.4, -0.25]} rotation-z={0.12} rotation-x={0.16} castShadow>
          <boxGeometry args={[0.12, 3.2, 0.12]} />
          <meshStandardMaterial color="#6b4326" roughness={0.85} />
        </mesh>
        <mesh position={[0.9, 1.4, -0.25]} rotation-z={-0.12} rotation-x={0.16} castShadow>
          <boxGeometry args={[0.12, 3.2, 0.12]} />
          <meshStandardMaterial color="#6b4326" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.5, 0.05]}>
          <boxGeometry args={[2.2, 0.12, 0.12]} />
          <meshStandardMaterial color="#6b4326" roughness={0.85} />
        </mesh>
        {renderPoster(2.75, -0.1)}
      </>
    )
  } else {
    // experience — billboard
    body = (
      <>
        {renderPost(-1.15, 1.7)}
        {renderPost(1.15, 1.7)}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[3, 0.12, 1.4]} />
          <meshStandardMaterial color="#5a3a24" roughness={0.9} />
        </mesh>
        {renderPoster(3.35)}
      </>
    )
  }

  return (
    <group ref={group} position={[x, 0, z]} rotation-y={Math.atan2(-x, -z)}>
      {body}

      <Html
        position={[0, data.kind === "resume" ? 3.1 : data.kind === "about" ? 5.4 : 5.1, 0]}
        center
        style={{ pointerEvents: "none", userSelect: "none" }}
        zIndexRange={[8, 0]}
      >
        <div
          onClick={() => onSelect(data.id)}
          style={{ pointerEvents: "auto", cursor: "pointer", opacity: active ? 1 : 0.9 }}
          className={`w-max max-w-[160px] rounded-xl px-2 py-1 text-center shadow-lg ring-1 ring-black/10 transition-transform ${
            active ? "scale-110 bg-white/90 backdrop-blur-sm" : "scale-100"
          }`}
        >
          <span
            className="block rounded-full px-2 py-0.5 text-[10px] font-bold leading-tight text-white"
            style={{ background: color }}
          >
            {data.title}
          </span>
          {active && data.subtitle && (
            <span className="mt-0.5 block px-1 text-[8px] font-semibold leading-tight text-slate-700">
              {data.subtitle}
            </span>
          )}
          {active && <span className="mt-0.5 block text-[8px] font-bold text-slate-500">press E to pin ▸</span>}
        </div>
      </Html>
    </group>
  )
}
