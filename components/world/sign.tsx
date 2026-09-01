"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { COLORS, type SignData } from "./world-data"

type Props = { data: SignData; active: boolean; onSelect: (id: string) => void }

export function Sign({ data, active, onSelect }: Props) {
  const [x, z] = data.position
  const panelMat = useRef<THREE.MeshStandardMaterial>(null)
  const group = useRef<THREE.Group>(null)
  const color = COLORS[data.kind]
  const tall = data.kind === "about" || data.kind === "contact"
  const isPillar = data.kind === "resume"

  useFrame((_, dt) => {
    if (panelMat.current) {
      const target = active ? 1.6 : 0.35
      panelMat.current.emissiveIntensity += (target - panelMat.current.emissiveIntensity) * Math.min(1, dt * 8)
    }
    if (group.current) {
      const targetY = active ? 0.12 : 0
      group.current.position.y += (targetY - group.current.position.y) * Math.min(1, dt * 8)
    }
  })

  return (
    <group ref={group} position={[x, 0, z]} rotation-y={Math.atan2(-x, -z)}>
      {isPillar ? (
        <mesh
          position={[0, 1.1, 0]}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(data.id)
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "")}
        >
          <cylinderGeometry args={[0.28, 0.34, 2.2, 12]} />
          <meshStandardMaterial
            ref={panelMat}
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            metalness={0.3}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>
      ) : (
        <>
          {/* posts */}
          <mesh position={[-0.9, tall ? 1.2 : 1, 0]}>
            <boxGeometry args={[0.16, tall ? 2.4 : 2, 0.16]} />
            <meshStandardMaterial color="#64748b" metalness={0.4} roughness={0.6} />
          </mesh>
          <mesh position={[0.9, tall ? 1.2 : 1, 0]}>
            <boxGeometry args={[0.16, tall ? 2.4 : 2, 0.16]} />
            <meshStandardMaterial color="#64748b" metalness={0.4} roughness={0.6} />
          </mesh>
          {/* panel */}
          <mesh
            position={[0, tall ? 2.9 : 2.35, 0]}
            castShadow
            onClick={(e) => {
              e.stopPropagation()
              onSelect(data.id)
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "")}
          >
            <boxGeometry args={[2.5, tall ? 1.7 : 1.4, 0.14]} />
            <meshStandardMaterial
              ref={panelMat}
              color={color}
              emissive={color}
              emissiveIntensity={0.35}
              metalness={0.2}
              roughness={0.5}
              toneMapped={false}
            />
          </mesh>
        </>
      )}

      <Html
        position={[0, isPillar ? 2.7 : tall ? 3.9 : 3.35, 0]}
        center
        style={{ pointerEvents: "none", userSelect: "none" }}
        zIndexRange={[8, 0]}
      >
        <div
          onClick={() => onSelect(data.id)}
          style={{ pointerEvents: "auto", cursor: "pointer", opacity: active ? 1 : 0.92 }}
          className={`w-max max-w-[150px] -translate-y-1 rounded-md border border-slate-200 bg-white/85 px-2 py-1 text-center shadow-md backdrop-blur-sm transition-transform ${
            active ? "scale-110" : "scale-100"
          }`}
        >
          <span
            className="block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-tight text-white"
            style={{ background: color }}
          >
            {data.title}
          </span>
          {data.subtitle && (
            <span className="mt-0.5 block text-[8px] font-medium leading-tight text-slate-600">{data.subtitle}</span>
          )}
          {active && <span className="mt-0.5 block text-[8px] font-bold text-slate-500">press E to pin ▸</span>}
        </div>
      </Html>
    </group>
  )
}
