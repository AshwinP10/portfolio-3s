"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Html, Sky } from "@react-three/drei"
import * as THREE from "three"
import { Robot } from "./robot"
import { Sign } from "./sign"
import { SIGNS, ZONES } from "./world-data"
import { bannerTexture } from "./poster-texture"
import { input } from "./controls"

const ACTIVATE_RADIUS = 3.6
const CAM_OFFSET = new THREE.Vector3(0, 8.4, 14.5)

type Props = {
  activeId: string | null
  onProximity: (id: string | null) => void
  onSelect: (id: string) => void
  onInteract: () => void
}

function Lamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 3.4, 8]} />
        <meshStandardMaterial color="#3f2a1c" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.5, 0]}>
        <sphereGeometry args={[0.28, 14, 14]} />
        <meshStandardMaterial color="#ffe6b8" emissive="#ffcf87" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 3.5, 0]} color="#ffca8a" intensity={5} distance={9} decay={2} />
    </group>
  )
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.22, 1.6, 7]} />
        <meshStandardMaterial color="#6b4a30" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <coneGeometry args={[1.05, 1.9, 9]} />
        <meshStandardMaterial color="#d9713b" roughness={0.85} />
      </mesh>
      <mesh position={[0, 3.0, 0]} castShadow>
        <coneGeometry args={[0.8, 1.5, 9]} />
        <meshStandardMaterial color="#e89a45" roughness={0.85} />
      </mesh>
    </group>
  )
}

function Building({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  )
}

function EntranceBanner() {
  const tex = useMemo(() => bannerTexture(), [])
  return (
    <group position={[0, 0, 12.5]}>
      <mesh position={[-4.6, 2.6, 0]} castShadow>
        <boxGeometry args={[0.5, 5.2, 0.5]} />
        <meshStandardMaterial color="#5a3a24" roughness={0.9} />
      </mesh>
      <mesh position={[4.6, 2.6, 0]} castShadow>
        <boxGeometry args={[0.5, 5.2, 0.5]} />
        <meshStandardMaterial color="#5a3a24" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4.7, 0]}>
        <planeGeometry args={[9.4, 2]} />
        <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Plaza() {
  const spokes = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2)
  return (
    <group position={[0, 0, 1]}>
      <mesh rotation-x={-Math.PI / 2} position-y={0.02} receiveShadow>
        <circleGeometry args={[11, 48]} />
        <meshStandardMaterial color="#efdcb4" roughness={0.95} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.03}>
        <ringGeometry args={[10.3, 11, 48]} />
        <meshStandardMaterial color="#d98a4f" roughness={0.9} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.03}>
        <ringGeometry args={[5.2, 5.6, 40]} />
        <meshStandardMaterial color="#c9752f" roughness={0.9} />
      </mesh>
      {spokes.map((a, i) => (
        <group key={i} position={[Math.cos(a) * 8, 0.028, Math.sin(a) * 8]} rotation-y={-a}>
          <mesh rotation-x={-Math.PI / 2}>
            <planeGeometry args={[5, 0.35]} />
            <meshStandardMaterial color="#e0c48f" roughness={0.9} />
          </mesh>
        </group>
      ))}
      <mesh rotation-x={-Math.PI / 2} position-y={0.032}>
        <circleGeometry args={[1.6, 24]} />
        <meshStandardMaterial color="#d98a4f" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Path({ to }: { to: [number, number] }) {
  const dx = to[0]
  const dz = to[1] - 1
  const len = Math.hypot(dx, dz)
  const angle = Math.atan2(dx, dz)
  return (
    <group position={[dx / 2, 0.018, 1 + dz / 2]} rotation-y={angle}>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[3, len]} />
        <meshStandardMaterial color="#e7d2a4" roughness={0.95} />
      </mesh>
    </group>
  )
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
    camTarget.current.set(p.x + CAM_OFFSET.x, CAM_OFFSET.y, p.z + CAM_OFFSET.z)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, camTarget.current.x, 4, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, camTarget.current.y, 4, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, camTarget.current.z, 4, dt)
    lookTarget.current.x = THREE.MathUtils.damp(lookTarget.current.x, p.x, 6, dt)
    lookTarget.current.z = THREE.MathUtils.damp(lookTarget.current.z, p.z - 1.5, 6, dt)
    lookTarget.current.y = 1.7
    camera.lookAt(lookTarget.current)

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

    if (input.interactNonce !== lastNonce.current) {
      lastNonce.current = input.interactNonce
      onInteract()
    }
  })

  return (
    <>
      <Sky
        distance={450}
        sunPosition={[-40, 3.5, -80]}
        turbidity={11}
        rayleigh={3.4}
        mieCoefficient={0.02}
        mieDirectionalG={0.92}
      />
      <fog attach="fog" args={["#f7c9a0", 30, 96]} />

      <ambientLight intensity={0.4} color="#ffe6c9" />
      <hemisphereLight color="#ffdcae" groundColor="#6b4a33" intensity={0.65} />
      <directionalLight position={[16, 9, 15]} intensity={0.5} color="#9db8ff" />
      <directionalLight
        castShadow
        position={[-16, 18, -8]}
        intensity={2.3}
        color="#ffcf9e"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-46}
        shadow-camera-right={46}
        shadow-camera-top={46}
        shadow-camera-bottom={-46}
        shadow-bias={-0.0004}
      />

      {/* ground */}
      <mesh rotation-x={-Math.PI / 2} position-y={0} receiveShadow>
        <planeGeometry args={[240, 240]} />
        <meshStandardMaterial color="#e6cfa2" roughness={1} />
      </mesh>
      <gridHelper args={[120, 60, "#cdae7f", "#ddc7a0"]} position-y={0.012} />

      <Plaza />
      <Path to={[-13, -7]} />
      <Path to={[15, -8]} />
      <Path to={[0, -15]} />
      <EntranceBanner />

      {/* zone floor markers */}
      {ZONES.map((zone) => (
        <Html
          key={zone.label}
          position={[zone.position[0], 0.06, zone.position[2]]}
          center
          style={{ pointerEvents: "none", userSelect: "none" }}
          zIndexRange={[2, 0]}
        >
          <span className="text-[13px] font-black tracking-[0.32em] text-amber-900/40">{zone.label}</span>
        </Html>
      ))}

      {/* lamps around the plaza */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.4
        return <Lamp key={i} position={[Math.cos(a) * 12.5, 0, 1 + Math.sin(a) * 12.5]} />
      })}

      {/* trees */}
      {(
        [
          [-26, -16, 1.1],
          [24, -18, 1.2],
          [-28, 6, 1],
          [27, 8, 1.1],
          [-20, 10, 0.9],
          [18, 12, 0.95],
          [-14, -20, 1.05],
          [10, -22, 1],
          [30, -4, 1.15],
        ] as [number, number, number][]
      ).map(([px, pz, s], i) => (
        <Tree key={i} position={[px, 0, pz]} scale={s} />
      ))}

      {/* distant skyline */}
      {(
        [
          [-30, -30, 4, 12, 5, "#c8a074"],
          [-18, -32, 5, 18, 5, "#b98e63"],
          [-4, -34, 6, 10, 6, "#cda67c"],
          [12, -33, 5, 22, 5, "#bd956a"],
          [26, -31, 6, 14, 6, "#c8a074"],
          [-38, -20, 4, 9, 4, "#b98e63"],
          [37, -18, 4, 11, 4, "#cda67c"],
        ] as [number, number, number, number, number, string][]
      ).map(([px, pz, w, h, d, c], i) => (
        <Building key={i} position={[px, h / 2, pz]} size={[w, h, d]} color={c} />
      ))}

      {SIGNS.map((s) => (
        <Sign key={s.id} data={s} active={activeId === s.id} onSelect={onSelect} />
      ))}

      <Robot groupRef={robotRef} onMove={(p) => robotPos.current.copy(p)} />
    </>
  )
}
