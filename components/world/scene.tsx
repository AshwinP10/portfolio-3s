"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { Robot } from "./robot"
import { Sign } from "./sign"
import { SIGNS, ZONES } from "./world-data"
import { input } from "./controls"

const ACTIVATE_RADIUS = 3.6
const CAM_OFFSET = new THREE.Vector3(0, 9.5, 13)

type Props = {
  activeId: string | null
  onProximity: (id: string | null) => void
  onSelect: (id: string) => void
  onInteract: () => void
}

export function Scene({ activeId, onProximity, onSelect, onInteract }: Props) {
  const robotRef = useRef<THREE.Group>(null)
  const robotPos = useRef(new THREE.Vector3())
  const camTarget = useRef(new THREE.Vector3(0, 9.5, 13))
  const lookTarget = useRef(new THREE.Vector3(0, 1.2, 0))
  const proxAccum = useRef(0)
  const nearestRef = useRef<string | null>(null)
  const lastNonce = useRef(input.interactNonce)
  const { camera } = useThree()

  useFrame((_, dt) => {
    const p = robotPos.current

    // camera follow
    camTarget.current.set(p.x + CAM_OFFSET.x, CAM_OFFSET.y, p.z + CAM_OFFSET.z)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, camTarget.current.x, 4, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, camTarget.current.y, 4, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, camTarget.current.z, 4, dt)
    lookTarget.current.x = THREE.MathUtils.damp(lookTarget.current.x, p.x, 6, dt)
    lookTarget.current.z = THREE.MathUtils.damp(lookTarget.current.z, p.z, 6, dt)
    camera.lookAt(lookTarget.current)

    // proximity check (throttled)
    proxAccum.current += dt
    if (proxAccum.current > 0.12) {
      proxAccum.current = 0
      let nearest: string | null = null
      let best = ACTIVATE_RADIUS
      for (const s of SIGNS) {
        const d = Math.hypot(s.position[0] - p.x, s.position[1] - p.z)
        if (d < best) {
          best = d
          nearest = s.id
        }
      }
      if (nearest !== nearestRef.current) {
        nearestRef.current = nearest
        onProximity(nearest)
      }
    }

    // interact key
    if (input.interactNonce !== lastNonce.current) {
      lastNonce.current = input.interactNonce
      onInteract()
    }
  })

  return (
    <>
      <hemisphereLight args={["#ffffff", "#b8c4da", 1.15]} />
      <directionalLight position={[10, 16, 8]} intensity={1.15} />
      <fog attach="fog" args={["#dbe4f3", 40, 78]} />
      <color attach="background" args={["#dbe4f3"]} />

      {/* ground */}
      <mesh rotation-x={-Math.PI / 2} position-y={0} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#dde5f2" />
      </mesh>
      <gridHelper args={[100, 50, "#8aa0c6", "#aebbd6"]} position-y={0.011} />

      {/* zone floor markers */}
      {ZONES.map((zone) => (
        <group key={zone.label} position={zone.position}>
          <mesh rotation-x={-Math.PI / 2} position-y={0.012}>
            <circleGeometry args={[7.5, 40]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.35} depthWrite={false} />
          </mesh>
          <Html
            position={[0, 0.05, 0]}
            center
            style={{ pointerEvents: "none", userSelect: "none" }}
            zIndexRange={[2, 0]}
          >
            <span className="text-[13px] font-black tracking-[0.3em] text-slate-400/70">{zone.label}</span>
          </Html>
        </group>
      ))}

      {/* corner pillars for depth */}
      {[
        [-30, -18],
        [30, -18],
        [-30, 12],
        [30, 12],
      ].map(([px, pz], i) => (
        <mesh key={i} position={[px, 1.5, pz]}>
          <boxGeometry args={[1.2, 3, 1.2]} />
          <meshStandardMaterial color="#c7d3e6" metalness={0.2} roughness={0.7} />
        </mesh>
      ))}

      {SIGNS.map((s) => (
        <Sign key={s.id} data={s} active={activeId === s.id} onSelect={onSelect} />
      ))}

      <Robot groupRef={robotRef} onMove={(p) => robotPos.current.copy(p)} />
    </>
  )
}
