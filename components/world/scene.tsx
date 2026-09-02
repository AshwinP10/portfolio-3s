"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Html, Sky } from "@react-three/drei"
import * as THREE from "three"
import { Robot } from "./robot"
import { Sign } from "./sign"
import { SIGNS, ZONES } from "./world-data"
import { bannerTexture } from "./poster-texture"
import { plazaTexture, fieldTexture } from "./ground-texture"
import { input } from "./controls"
import {
  Bench,
  Planter,
  PalmTree,
  Fountain,
  StringLights,
  PapelPicado,
  DisplayPillar,
  MarketStall,
  MangoBasket,
  TacoPlate,
  BasketballStand,
  Pennant,
  Bevo,
  Guitar,
  Armadillo,
  OrigamiFlock,
  GoldenGate,
  BrickRowhouse,
} from "./props"

const ACTIVATE_RADIUS = 3.6
const CAM_OFFSET = new THREE.Vector3(0, 8.4, 14.5)

const LAMPS: [number, number, number][] = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 + 0.3
  return [Math.cos(a) * 12.8, 0, 1 + Math.sin(a) * 12.8]
})

type Props = {
  activeId: string | null
  onProximity: (id: string | null) => void
  onSelect: (id: string) => void
  onInteract: () => void
}

function Lamp({ position, light = false }: { position: [number, number, number]; light?: boolean }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.3, 0.24, 10]} />
        <meshStandardMaterial color="#3f2a1c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.11, 3.5, 8]} />
        <meshStandardMaterial color="#3f2a1c" roughness={0.85} />
      </mesh>
      <mesh position={[0, 3.6, 0]}>
        <cylinderGeometry args={[0.22, 0.14, 0.4, 8]} />
        <meshStandardMaterial color="#2f2115" />
      </mesh>
      <mesh position={[0, 3.42, 0]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#ffe6b8" emissive="#ffcf87" emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
      {light && <pointLight position={[0, 3.4, 0]} color="#ffca8a" intensity={6} distance={12} decay={2} />}
    </group>
  )
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.24, 1.6, 8]} />
        <meshStandardMaterial color="#6b4a30" roughness={0.9} />
      </mesh>
      {[
        [0, 2.0, 1.05, "#d9713b"],
        [0.35, 2.5, 0.8, "#e89a45"],
        [-0.3, 2.4, 0.72, "#c8632f"],
        [0.05, 3.05, 0.6, "#e89a45"],
      ].map(([x, y, r, c], i) => (
        <mesh key={i} position={[x as number, y as number, 0]} castShadow>
          <icosahedronGeometry args={[r as number, 1]} />
          <meshStandardMaterial color={c as string} roughness={0.85} flatShading />
        </mesh>
      ))}
    </group>
  )
}

function Building({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.97} />
      </mesh>
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 3 }, (_, cc) => (
          <mesh key={`${r}-${cc}`} position={[(cc - 1) * size[0] * 0.28, (r - 1) * size[1] * 0.24 + size[1] * 0.1, size[2] / 2 + 0.02]}>
            <planeGeometry args={[size[0] * 0.14, size[1] * 0.1]} />
            <meshStandardMaterial color="#ffdca0" emissive="#ffb86b" emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        )),
      )}
    </group>
  )
}

function EntranceBanner() {
  const tex = useMemo(() => bannerTexture(), [])
  return (
    <group position={[0, 0, 12.5]}>
      {[-4.6, 4.6].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 2.6, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.3, 5.2, 10]} />
            <meshStandardMaterial color="#5a3a24" roughness={0.9} />
          </mesh>
          <mesh position={[0, 5.25, 0]} castShadow>
            <sphereGeometry args={[0.28, 12, 12]} />
            <meshStandardMaterial color="#e0651f" roughness={0.5} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 5.05, 0]} castShadow>
        <boxGeometry args={[10, 0.4, 0.5]} />
        <meshStandardMaterial color="#5a3a24" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4.5, 0.02]}>
        <planeGeometry args={[9.4, 2]} />
        <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Plaza() {
  const stone = useMemo(() => {
    const t = plazaTexture().clone()
    t.needsUpdate = true
    t.repeat.set(4, 4)
    return t
  }, [])
  const spokes = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2)
  return (
    <group position={[0, 0, 1]}>
      <mesh rotation-x={-Math.PI / 2} position-y={0.02} receiveShadow>
        <circleGeometry args={[12.5, 56]} />
        <meshStandardMaterial map={stone} roughness={0.95} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.03}>
        <ringGeometry args={[11.8, 12.5, 56]} />
        <meshStandardMaterial color="#c9752f" roughness={0.9} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.03}>
        <ringGeometry args={[5.2, 5.7, 44]} />
        <meshStandardMaterial color="#d98a4f" roughness={0.9} />
      </mesh>
      {spokes.map((a, i) => (
        <group key={i} position={[Math.cos(a) * 8.8, 0.028, Math.sin(a) * 8.8]} rotation-y={-a}>
          <mesh rotation-x={-Math.PI / 2}>
            <planeGeometry args={[6, 0.3]} />
            <meshStandardMaterial color="#b9884b" roughness={0.9} />
          </mesh>
        </group>
      ))}
      <mesh rotation-x={-Math.PI / 2} position-y={0.034}>
        <circleGeometry args={[1.7, 28]} />
        <meshStandardMaterial color="#d98a4f" roughness={0.9} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.036}>
        <ringGeometry args={[1.5, 1.7, 28]} />
        <meshStandardMaterial color="#8a4f22" roughness={0.9} />
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
        <planeGeometry args={[3.2, len]} />
        <meshStandardMaterial color="#c9752f" roughness={0.95} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export function Scene({ activeId, onProximity, onSelect, onInteract }: Props) {
  const robotRef = useRef<THREE.Group>(null)
  const robotPos = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3(0, 1.7, 0))
  const proxAccum = useRef(0)
  const nearestRef = useRef<string | null>(null)
  const lastNonce = useRef(input.interactNonce)
  const { camera } = useThree()

  const field = useMemo(() => fieldTexture(), [])

  useFrame((_, dt) => {
    const p = robotPos.current
    camera.position.x = THREE.MathUtils.damp(camera.position.x, p.x + CAM_OFFSET.x, 4, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, CAM_OFFSET.y, 4, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, p.z + CAM_OFFSET.z, 4, dt)
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
      <Sky distance={450} sunPosition={[-40, 3.5, -80]} turbidity={11} rayleigh={3.4} mieCoefficient={0.02} mieDirectionalG={0.92} />
      <fog attach="fog" args={["#f7c9a0", 34, 110]} />

      <ambientLight intensity={0.4} color="#ffe6c9" />
      <hemisphereLight color="#ffdcae" groundColor="#6b4a33" intensity={0.65} />
      <directionalLight position={[16, 9, 15]} intensity={0.5} color="#9db8ff" />
      <directionalLight
        castShadow
        position={[-16, 18, -8]}
        intensity={2.3}
        color="#ffcf9e"
        shadow-mapSize-width={1536}
        shadow-mapSize-height={1536}
        shadow-camera-near={0.5}
        shadow-camera-far={90}
        shadow-camera-left={-48}
        shadow-camera-right={48}
        shadow-camera-top={48}
        shadow-camera-bottom={-48}
        shadow-bias={-0.0004}
      />

      {/* ground */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.01} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial map={field} color="#e6cfa2" roughness={1} />
      </mesh>

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

      {LAMPS.map((pos, i) => (
        <Lamp key={i} position={pos} light={i % 2 === 0} />
      ))}
      <StringLights spans={LAMPS.map((p, i) => [[p[0], 3.3, p[2]], [LAMPS[(i + 1) % LAMPS.length][0], 3.3, LAMPS[(i + 1) % LAMPS.length][2]]] as [[number, number, number], [number, number, number]])} />
      <PapelPicado a={[-4.6, 4.8, 12.5]} b={[-6, 3.6, 6]} />
      <PapelPicado a={[4.6, 4.8, 12.5]} b={[6, 3.6, 6]} />
      <PapelPicado a={[-8, 3.4, 2]} b={[8, 3.4, 2]} colors={["#ff5d8f", "#ffd23f", "#2ec4b6", "#ff6b4a"]} />

      {/* --- plaza furniture --- */}
      <Fountain position={[8.5, 0, 6]} />
      <Bench position={[-8.5, 0, 6]} rotation={-0.6} />
      <Bench position={[0, 0, 10.5]} rotation={Math.PI} />
      <Bench position={[-10, 0, -3]} rotation={1.1} />
      <Bench position={[10.5, 0, -1]} rotation={-1.2} />
      <Bench position={[6, 0, 9]} rotation={2.5} />

      <Planter position={[-6, 0, 10]} />
      <Planter position={[6.5, 0, 11]} palm />
      <Planter position={[-12, 0, 5]} />
      <Planter position={[12.5, 0, 4]} palm />
      <Planter position={[-3, 0, 8]} />
      <Planter position={[3.5, 0, 6.5]} />

      <Tree position={[-26, 0, -16]} scale={1.1} />
      <Tree position={[24, 0, -18]} scale={1.2} />
      <Tree position={[-14, 0, -20]} scale={1.05} />
      <Tree position={[10, 0, -22]} />
      <Tree position={[30, 0, -4]} scale={1.15} />
      <Tree position={[18, 0, 13]} />

      {/* distant skyline */}
      {(
        [
          [-30, -32, 4, 12, 5, "#c8a074"],
          [-16, -34, 5, 18, 5, "#b98e63"],
          [0, -36, 6, 10, 6, "#cda67c"],
          [14, -35, 5, 22, 5, "#bd956a"],
          [28, -33, 6, 14, 6, "#c8a074"],
          [-40, -22, 4, 9, 4, "#b98e63"],
          [39, -20, 4, 11, 4, "#cda67c"],
        ] as [number, number, number, number, number, string][]
      ).map(([px, pz, w, h, d, c], i) => (
        <Building key={i} position={[px, h / 2, pz]} size={[w, h, d]} color={c} />
      ))}

      {/* ===== personal-life props (unlabeled) ===== */}

      {/* Austin / live music */}
      <DisplayPillar position={[-4, 0, 7.5]} height={1.3}>
        <Guitar position={[0, 0, 0]} rotation={0.5} lean={-0.28} />
      </DisplayPillar>
      <Armadillo position={[-3, 0, 8.6]} rotation={-1} />

      {/* food market: mangos + tacos */}
      <MarketStall position={[9.5, 0, 8.5]} rotation={-2.4} awning={["#e14b4b", "#f4e3c1"]}>
        <MangoBasket position={[-0.7, 0, 0]} />
        <TacoPlate position={[0.7, 0.1, 0.1]} />
        <MangoBasket position={[0.2, 0, -0.35]} />
      </MarketStall>

      {/* sports: basketball + Celtics */}
      <MarketStall position={[-9.5, 0, 9] as [number, number, number]} rotation={2.5} awning={["#007a33", "#f4f4f4"]}>
        <BasketballStand position={[-0.6, 0.05, 0]} />
      </MarketStall>
      <Pennant position={[-11.5, 0, 8]} color="#007a33" emblem="shamrock" rotation={0.6} />

      {/* UT Longhorns */}
      <Pennant position={[4.5, 0, -10.5]} color="#bf5700" emblem="horns" rotation={-0.3} />
      <Bevo position={[6.5, 0, -11.5]} rotation={-2.2} />

      {/* origami */}
      <OrigamiFlock position={[-2.5, 0, -11]} count={8} />

      {/* California */}
      <GoldenGate position={[-22, 0, 12]} rotation={0.5} />
      <PalmTree position={[-25, 0, 9]} scale={1.15} lean={0.14} />
      <PalmTree position={[-19, 0, 15]} scale={1} lean={-0.1} />
      <PalmTree position={[-27, 0, 14]} scale={0.9} lean={0.2} />

      {/* Boston */}
      <BrickRowhouse position={[21, 0, 11]} rotation={-0.5} />
      <Pennant position={[17, 0, 12]} color="#007a33" emblem="shamrock" rotation={-0.8} />

      {SIGNS.map((s) => (
        <Sign key={s.id} data={s} active={activeId === s.id} onSelect={onSelect} />
      ))}

      <Robot groupRef={robotRef} onMove={(p) => robotPos.current.copy(p)} />
    </>
  )
}
