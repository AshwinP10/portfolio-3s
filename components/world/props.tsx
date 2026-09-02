"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Instances, Instance } from "@react-three/drei"
import * as THREE from "three"

/* ------------------------------------------------------------------ helpers */

const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function Foliage({ y = 0, scale = 1, tone = "#3f7d3a" }: { y?: number; scale?: number; tone?: string }) {
  return (
    <group position={[0, y, 0]} scale={scale}>
      {[
        [0, 0.2, 0, 0.8],
        [0.5, 0, 0.2, 0.62],
        [-0.45, 0.05, 0.1, 0.6],
        [0.1, 0.05, -0.5, 0.58],
        [0.05, 0.55, 0.05, 0.55],
      ].map(([x, yy, z, r], i) => (
        <mesh key={i} position={[x, yy, z]} castShadow>
          <icosahedronGeometry args={[r as number, 1]} />
          <meshStandardMaterial color={i % 2 ? tone : "#4c9243"} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ street furniture */

export function Bench({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation-y={rotation}>
      {[-0.7, 0.7].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.22, 0]} castShadow>
            <boxGeometry args={[0.12, 0.44, 0.5]} />
            <meshStandardMaterial color="#5b4632" roughness={0.85} />
          </mesh>
          <mesh position={[x, 0.62, -0.18]} castShadow>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#5b4632" roughness={0.85} />
          </mesh>
        </group>
      ))}
      {[-0.16, 0, 0.16].map((z) => (
        <RoundedBox key={z} args={[1.9, 0.09, 0.14]} radius={0.03} smoothness={2} position={[0, 0.46, z]} castShadow>
          <meshStandardMaterial color="#a9773f" roughness={0.7} />
        </RoundedBox>
      ))}
      {[0.05, 0.3, 0.55].map((y, i) => (
        <RoundedBox key={i} args={[1.9, 0.09, 0.12]} radius={0.03} smoothness={2} position={[0, 0.7 + y, -0.22]} rotation-x={-0.18} castShadow>
          <meshStandardMaterial color="#a9773f" roughness={0.7} />
        </RoundedBox>
      ))}
    </group>
  )
}

export function Planter({ position, palm = false }: { position: [number, number, number]; palm?: boolean }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.04, 20]} />
        <meshStandardMaterial color="#7a5636" />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.95, 0.8, 0.8, 18]} />
        <meshStandardMaterial color="#c98a4e" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.99, 0.99, 0.1, 18]} />
        <meshStandardMaterial color="#a9773f" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.12, 16]} />
        <meshStandardMaterial color="#5c3d24" roughness={1} />
      </mesh>
      {palm ? (
        <PalmTop y={0.9} />
      ) : (
        <>
          <Foliage y={1.25} scale={0.95} />
          {[
            ["#ff8fab", 0.55, 0.3],
            ["#ffd23f", -0.4, 0.5],
            ["#f15bb5", 0.1, -0.45],
            ["#ff6b4a", -0.15, 0.15],
          ].map(([c, x, z], i) => (
            <mesh key={i} position={[x as number, 1.55, z as number]} castShadow>
              <icosahedronGeometry args={[0.13, 0]} />
              <meshStandardMaterial color={c as string} emissive={c as string} emissiveIntensity={0.25} roughness={0.6} />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}

function PalmTop({ y }: { y: number }) {
  const fronds = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2)
  return (
    <group position={[0, y, 0]}>
      {fronds.map((a, i) => (
        <mesh key={i} rotation={[0.5, a, 0]} position={[0, 0.1, 0]} castShadow>
          <coneGeometry args={[0.22, 2.4, 5]} />
          <meshStandardMaterial color={i % 2 ? "#5aa63f" : "#6fbf4c"} roughness={0.85} flatShading side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#7a5636" />
      </mesh>
    </group>
  )
}

export function PalmTree({ position, scale = 1, lean = 0.12 }: { position: [number, number, number]; scale?: number; lean?: number }) {
  return (
    <group position={position} scale={scale} rotation-z={lean}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[i * 0.12, 0.5 + i * 0.95, 0]} rotation-z={-i * 0.05} castShadow>
          <cylinderGeometry args={[0.16 - i * 0.02, 0.2 - i * 0.02, 1, 8]} />
          <meshStandardMaterial color="#8a6239" roughness={0.95} />
        </mesh>
      ))}
      <group position={[0.4, 4, 0]}>
        <PalmTop y={0} />
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[(rand(i) - 0.5) * 0.3, -0.15 - i * 0.12, (rand(i + 9) - 0.5) * 0.3]}>
            <icosahedronGeometry args={[0.09, 0]} />
            <meshStandardMaterial color="#c98a3a" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ fountain */

export function Fountain({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const water = useRef<THREE.Mesh>(null)
  const jet = useRef<THREE.Points>(null)

  const drops = useMemo(() => {
    const n = 120
    const arr = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    for (let i = 0; i < n; i++) seed[i] = Math.random()
    return { arr, seed, n }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (water.current) {
      const m = water.current.material as THREE.MeshStandardMaterial
      m.opacity = 0.5 + Math.sin(t * 2) * 0.06
      water.current.scale.setScalar(1 + Math.sin(t * 3) * 0.01)
    }
    if (jet.current) {
      const pos = jet.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < drops.n; i++) {
        const life = (t * 0.9 + drops.seed[i]) % 1
        const ang = drops.seed[i] * Math.PI * 2
        const spread = life * 0.9
        pos.setXYZ(
          i,
          Math.cos(ang) * spread,
          2.4 * life - 4.9 * life * life + 1.9,
          Math.sin(ang) * spread,
        )
      }
      pos.needsUpdate = true
    }
  })

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.22, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.6, 2.9, 0.44, 32]} />
        <meshStandardMaterial color="#cbb083" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <torusGeometry args={[2.55, 0.14, 10, 32]} />
        <meshStandardMaterial color="#b08a55" roughness={0.8} />
      </mesh>
      <mesh ref={water} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[2.45, 2.45, 0.12, 32]} />
        <meshStandardMaterial color="#7fd4e6" transparent opacity={0.55} roughness={0.15} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.8, 1, 20]} />
        <meshStandardMaterial color="#cbb083" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.16, 24]} />
        <meshStandardMaterial color="#b08a55" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[1, 1, 0.06, 24]} />
        <meshStandardMaterial color="#7fd4e6" transparent opacity={0.6} roughness={0.15} />
      </mesh>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.28, 1, 12]} />
        <meshStandardMaterial color="#cbb083" />
      </mesh>
      <points ref={jet} position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[drops.arr, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#bfeaf3" size={0.09} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
      </points>
    </group>
  )
}

/* ------------------------------------------------------------------ lights & garlands */

function catenary(a: THREE.Vector3, b: THREE.Vector3, t: number, sag: number) {
  const p = a.clone().lerp(b, t)
  p.y -= sag * 4 * t * (1 - t)
  return p
}

export function StringLights({ spans }: { spans: [[number, number, number], [number, number, number]][] }) {
  const perSpan = 12
  const points: THREE.Vector3[] = []
  const curves: THREE.Vector3[][] = []
  spans.forEach(([a, b]) => {
    const A = new THREE.Vector3(...a)
    const B = new THREE.Vector3(...b)
    const line: THREE.Vector3[] = []
    for (let i = 0; i <= perSpan; i++) {
      const p = catenary(A, B, i / perSpan, 1.1)
      line.push(p)
      if (i < perSpan) points.push(p)
    }
    curves.push(line)
  })

  return (
    <group>
      {curves.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(line.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3a2a1c" />
        </line>
      ))}
      <Instances limit={points.length} castShadow={false}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#ffe4a8" emissive="#ffca70" emissiveIntensity={2.6} toneMapped={false} />
        {points.map((p, i) => (
          <Instance key={i} position={[p.x, p.y - 0.12, p.z]} />
        ))}
      </Instances>
    </group>
  )
}

export function PapelPicado({ a, b, colors }: { a: [number, number, number]; b: [number, number, number]; colors?: string[] }) {
  const cols = colors ?? ["#ff5d8f", "#ffd23f", "#2ec4b6", "#ff6b4a", "#9b5de5", "#4d7cff"]
  const n = 14
  const A = new THREE.Vector3(...a)
  const B = new THREE.Vector3(...b)
  const line = Array.from({ length: n + 1 }, (_, i) => catenary(A, B, i / n, 0.9))
  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(line.flatMap((p) => [p.x, p.y, p.z])), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5b4226" />
      </line>
      {line.slice(0, n).map((p, i) => (
        <mesh key={i} position={[p.x, p.y - 0.28, p.z]} rotation-y={Math.atan2(B.z - A.z, B.x - A.x)}>
          <planeGeometry args={[0.34, 0.44]} />
          <meshStandardMaterial
            color={cols[i % cols.length]}
            side={THREE.DoubleSide}
            transparent
            opacity={0.92}
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ display pillar & stall */

export function DisplayPillar({
  position,
  height = 1.2,
  children,
}: {
  position: [number, number, number]
  height?: number
  children?: React.ReactNode
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.2, 1.1]} />
        <meshStandardMaterial color="#c9b083" roughness={0.9} />
      </mesh>
      <mesh position={[0, height / 2 + 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.4, height, 16]} />
        <meshStandardMaterial color="#e4d2ac" roughness={0.85} />
      </mesh>
      <mesh position={[0, height + 0.22, 0]} castShadow>
        <boxGeometry args={[0.95, 0.14, 0.95]} />
        <meshStandardMaterial color="#d8c39a" roughness={0.85} />
      </mesh>
      <mesh position={[0, height + 0.34, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#efe0c2" roughness={0.85} />
      </mesh>
      <group position={[0, height + 0.4, 0]}>{children}</group>
    </group>
  )
}

export function MarketStall({
  position,
  rotation = 0,
  awning = ["#e14b4b", "#f4e3c1"],
  children,
}: {
  position: [number, number, number]
  rotation?: number
  awning?: [string, string]
  children?: React.ReactNode
}) {
  return (
    <group position={position} rotation-y={rotation}>
      {[
        [-1.5, -0.9],
        [1.5, -0.9],
        [-1.5, 0.9],
        [1.5, 0.9],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.1, z]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2.2, 8]} />
          <meshStandardMaterial color="#5b4226" roughness={0.9} />
        </mesh>
      ))}
      {/* counter */}
      <mesh position={[0, 0.9, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.16, 0.9]} />
        <meshStandardMaterial color="#a9773f" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.45, 0.95]}>
        <boxGeometry args={[3.2, 0.9, 0.12]} />
        <meshStandardMaterial color="#8a5a34" roughness={0.85} />
      </mesh>
      {/* awning */}
      <group position={[0, 2.25, 0]}>
        <mesh rotation-x={-0.35} position={[0, 0.1, -0.55]} castShadow>
          <boxGeometry args={[3.5, 0.06, 1.5]} />
          <meshStandardMaterial color={awning[0]} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
        {[-1.2, -0.4, 0.4, 1.2].map((x) => (
          <mesh key={x} rotation-x={-0.35} position={[x, 0.1, -0.55]}>
            <boxGeometry args={[0.34, 0.07, 1.52]} />
            <meshStandardMaterial color={awning[1]} roughness={0.85} side={THREE.DoubleSide} />
          </mesh>
        ))}
        {/* scalloped valance */}
        {[-1.4, -1, -0.6, -0.2, 0.2, 0.6, 1, 1.4].map((x, i) => (
          <mesh key={i} position={[x, -0.35, 0.15]}>
            <coneGeometry args={[0.22, 0.4, 3]} />
            <meshStandardMaterial color={i % 2 ? awning[0] : awning[1]} roughness={0.85} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      <group position={[0, 1.0, 0.35]}>{children}</group>
    </group>
  )
}

/* ------------------------------------------------------------------ personal props */

export function MangoBasket({ position = [0, 0, 0] as [number, number, number] }) {
  const mangos = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const a = rand(i) * Math.PI * 2
        const r = rand(i + 5) * 0.24
        return [Math.cos(a) * r, 0.16 + (i % 3) * 0.12, Math.sin(a) * r] as [number, number, number]
      }),
    [],
  )
  return (
    <group position={position}>
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.3, 0.32, 16]} />
        <meshStandardMaterial color="#b9884b" roughness={1} />
      </mesh>
      {[0.06, 0.16, 0.26].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.36 + y * 0.15, 0.03, 6, 16]} />
          <meshStandardMaterial color="#8a5a2f" roughness={1} />
        </mesh>
      ))}
      <Instances limit={mangos.length}>
        <sphereGeometry args={[0.13, 12, 10]} />
        <meshStandardMaterial color="#ffb020" roughness={0.5} />
        {mangos.map((p, i) => (
          <Instance key={i} position={p} scale={[1.35, 1, 1]} rotation={[rand(i) * 3, rand(i + 2) * 3, rand(i + 3) * 3]} />
        ))}
      </Instances>
      {mangos.slice(0, 4).map((p, i) => (
        <mesh key={i} position={[p[0], p[1] + 0.12, p[2]]}>
          <coneGeometry args={[0.02, 0.06, 4]} />
          <meshStandardMaterial color="#4c9243" />
        </mesh>
      ))}
    </group>
  )
}

export function TacoPlate({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.5, 0.06, 20]} />
        <meshStandardMaterial color="#e9e2d2" roughness={0.4} />
      </mesh>
      {[-0.18, 0.18].map((x, k) => (
        <group key={k} position={[x, 0.16, 0]} rotation-z={k ? -0.15 : 0.15}>
          <mesh castShadow rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.2, 0.2, 0.34, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#e8b866" roughness={0.85} side={THREE.DoubleSide} />
          </mesh>
          {[
            ["#8f3b2f", 0, 0.05, 0],
            ["#4c9243", 0.06, 0.1, 0.05],
            ["#f2c14e", -0.06, 0.09, -0.04],
            ["#e9e2d2", 0.02, 0.13, 0.03],
          ].map(([c, dx, dy, dz], i) => (
            <mesh key={i} position={[dx as number, dy as number, dz as number]}>
              <boxGeometry args={[0.07, 0.05, 0.24]} />
              <meshStandardMaterial color={c as string} roughness={0.8} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export function BasketballStand({ position = [0, 0, 0] as [number, number, number] }) {
  const seams = [0, Math.PI / 2]
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.24, 0.28, 0.1, 16]} />
        <meshStandardMaterial color="#3a2a1c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <torusGeometry args={[0.16, 0.03, 8, 16]} />
        <meshStandardMaterial color="#6b4a30" />
      </mesh>
      <group position={[0, 0.32, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 24, 20]} />
          <meshStandardMaterial color="#e0692b" roughness={0.7} />
        </mesh>
        {seams.map((a, i) => (
          <mesh key={i} rotation-y={a}>
            <torusGeometry args={[0.221, 0.008, 6, 32]} />
            <meshStandardMaterial color="#2b1a10" />
          </mesh>
        ))}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.221, 0.008, 6, 32]} />
          <meshStandardMaterial color="#2b1a10" />
        </mesh>
        <mesh rotation-z={0.5} rotation-x={0.4}>
          <torusGeometry args={[0.221, 0.008, 6, 32, Math.PI]} />
          <meshStandardMaterial color="#2b1a10" />
        </mesh>
      </group>
    </group>
  )
}

export function Pennant({
  position,
  color,
  emblem,
  rotation = 0,
}: {
  position: [number, number, number]
  color: string
  emblem?: "shamrock" | "horns"
  rotation?: number
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.lineTo(1.5, -0.35)
    s.lineTo(0, -0.7)
    s.lineTo(0, 0)
    return s
  }, [])
  return (
    <group position={position} rotation-y={rotation}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 2.8, 8]} />
        <meshStandardMaterial color="#4a3320" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#e4d2ac" />
      </mesh>
      <group position={[0.03, 2.6, 0]}>
        <mesh>
          <shapeGeometry args={[shape]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.85} />
        </mesh>
        {emblem === "shamrock" &&
          [
            [0.4, -0.2],
            [0.55, -0.32],
            [0.4, -0.44],
          ].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.01]}>
              <circleGeometry args={[0.09, 12]} />
              <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
          ))}
        {emblem === "shamrock" && (
          <mesh position={[0.46, -0.5, 0.01]}>
            <boxGeometry args={[0.03, 0.12, 0.005]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        )}
        {emblem === "horns" && (
          <>
            <mesh position={[0.42, -0.32, 0.01]}>
              <circleGeometry args={[0.11, 14]} />
              <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
            {[1, -1].map((s) => (
              <mesh key={s} position={[0.42 + s * 0.16, -0.32 + 0.02, 0.01]} rotation-z={s * -0.5}>
                <torusGeometry args={[0.14, 0.022, 6, 12, Math.PI * 0.7]} />
                <meshStandardMaterial color="#ffffff" />
              </mesh>
            ))}
          </>
        )}
      </group>
    </group>
  )
}

export function Bevo({ position = [0, 0, 0] as [number, number, number], rotation = 0 }) {
  return (
    <group position={position} rotation-y={rotation} scale={0.9}>
      <RoundedBox args={[1.1, 0.7, 0.55]} radius={0.18} smoothness={3} position={[0, 0.75, 0]} castShadow>
        <meshStandardMaterial color="#efe6d6" roughness={0.8} />
      </RoundedBox>
      {[
        [-0.4, 0.35, 0.18],
        [0.4, 0.35, 0.18],
        [-0.4, 0.35, -0.18],
        [0.4, 0.35, -0.18],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.7, 8]} />
          <meshStandardMaterial color="#d8c39a" />
        </mesh>
      ))}
      <group position={[0.62, 0.95, 0]}>
        <RoundedBox args={[0.45, 0.42, 0.42]} radius={0.14} smoothness={3} castShadow>
          <meshStandardMaterial color="#efe6d6" roughness={0.8} />
        </RoundedBox>
        <mesh position={[0.22, 0, 0]} rotation-z={-Math.PI / 2}>
          <coneGeometry args={[0.14, 0.24, 10]} />
          <meshStandardMaterial color="#b0895a" />
        </mesh>
        {[1, -1].map((s) => (
          <mesh key={s} position={[-0.05, 0.12, s * 0.22]} rotation-x={s * 0.6}>
            <torusGeometry args={[0.26, 0.035, 8, 16, Math.PI * 0.8]} />
            <meshStandardMaterial color="#e9e2d2" />
          </mesh>
        ))}
        <mesh position={[0.16, 0.05, 0.14]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#2b1a10" />
        </mesh>
      </group>
      <mesh position={[-0.62, 0.7, 0]} rotation-z={0.5}>
        <cylinderGeometry args={[0.03, 0.05, 0.6, 6]} />
        <meshStandardMaterial color="#d8c39a" />
      </mesh>
    </group>
  )
}

export function Guitar({ position, rotation = 0, lean = -0.32 }: { position: [number, number, number]; rotation?: number; lean?: number }) {
  return (
    <group position={position} rotation-y={rotation} rotation-z={lean}>
      {/* body */}
      <group position={[0, 0.7, 0]}>
        <mesh castShadow scale={[1, 1, 0.32]}>
          <sphereGeometry args={[0.42, 20, 16]} />
          <meshStandardMaterial color="#c8763a" roughness={0.45} metalness={0.05} />
        </mesh>
        <mesh castShadow position={[0, 0.42, 0]} scale={[0.72, 1, 0.3]}>
          <sphereGeometry args={[0.34, 20, 16]} />
          <meshStandardMaterial color="#c8763a" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.06, 0.14]}>
          <circleGeometry args={[0.11, 20]} />
          <meshStandardMaterial color="#2b1a10" />
        </mesh>
        <mesh position={[0, 0.06, 0.145]}>
          <torusGeometry args={[0.13, 0.012, 6, 20]} />
          <meshStandardMaterial color="#e9c98a" />
        </mesh>
        <mesh position={[0, -0.16, 0.14]}>
          <boxGeometry args={[0.22, 0.05, 0.03]} />
          <meshStandardMaterial color="#3a2a1c" />
        </mesh>
      </group>
      {/* neck */}
      <mesh position={[0, 1.55, 0.02]} castShadow>
        <boxGeometry args={[0.12, 1.2, 0.08]} />
        <meshStandardMaterial color="#5b3d24" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.2, 0.02]} rotation-x={0.18} castShadow>
        <boxGeometry args={[0.16, 0.32, 0.06]} />
        <meshStandardMaterial color="#3a2a1c" roughness={0.7} />
      </mesh>
      {[-0.06, 0.06].map((x) =>
        [0, 1, 2].map((i) => (
          <mesh key={`${x}-${i}`} position={[x * 1.6, 2.16 + i * 0.09, 0.06]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.012, 0.012, 0.12, 6]} />
            <meshStandardMaterial color="#d9d9d9" metalness={0.6} roughness={0.3} />
          </mesh>
        )),
      )}
      {[-0.03, -0.012, 0.006, 0.024].map((x, i) => (
        <mesh key={i} position={[x, 1.4, 0.11]}>
          <boxGeometry args={[0.006, 1.9, 0.006]} />
          <meshStandardMaterial color="#e7e7e7" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

export function Armadillo({ position = [0, 0, 0] as [number, number, number], rotation = 0 }) {
  return (
    <group position={position} rotation-y={rotation} scale={0.8}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[i * 0.16 - 0.24, 0.28 - i * 0.01, 0]} castShadow>
          <sphereGeometry args={[0.26 - Math.abs(i - 1.5) * 0.04, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={i % 2 ? "#9c7b58" : "#8a6a48"} roughness={0.9} flatShading />
        </mesh>
      ))}
      <mesh position={[0.42, 0.16, 0]} rotation-z={-Math.PI / 2} castShadow>
        <coneGeometry args={[0.12, 0.3, 10]} />
        <meshStandardMaterial color="#9c7b58" roughness={0.9} />
      </mesh>
      <mesh position={[-0.5, 0.12, 0]} rotation-z={0.5}>
        <coneGeometry args={[0.05, 0.5, 8]} />
        <meshStandardMaterial color="#8a6a48" />
      </mesh>
      {[
        [0.2, -0.12],
        [-0.2, -0.12],
        [0.2, 0.12],
        [-0.2, 0.12],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.05, 0.05, 0.14, 6]} />
          <meshStandardMaterial color="#6b4a30" />
        </mesh>
      ))}
      <mesh position={[0.5, 0.2, 0.06]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#2b1a10" />
      </mesh>
    </group>
  )
}

export function OrigamiFlock({ position, count = 7 }: { position: [number, number, number]; count?: number }) {
  const cranes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (rand(i) - 0.5) * 1.6,
        z: (rand(i + 3) - 0.5) * 1.6,
        h: 0.8 + rand(i + 7) * 1.6,
        col: ["#ffffff", "#ffd9e6", "#d9ecff", "#fff0c9", "#e6ffe9"][i % 5],
        phase: rand(i + 11) * 6,
      })),
    [count],
  )
  const refs = useRef<(THREE.Group | null)[]>([])
  useFrame((s) => {
    cranes.forEach((c, i) => {
      const g = refs.current[i]
      if (!g) return
      g.position.y = c.h + Math.sin(s.clock.elapsedTime * 1.4 + c.phase) * 0.14
      g.rotation.y += 0.004
      g.rotation.z = Math.sin(s.clock.elapsedTime * 2 + c.phase) * 0.12
    })
  })
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1.15, 0.5, 20]} />
        <meshStandardMaterial color="#e4d2ac" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.08, 20]} />
        <meshStandardMaterial color="#d8c39a" />
      </mesh>
      {cranes.map((c, i) => (
        <group key={i}>
          <mesh position={[c.x, (c.h + 0.55) / 2, c.z]}>
            <cylinderGeometry args={[0.004, 0.004, c.h - 0.5, 4]} />
            <meshBasicMaterial color="#cbb083" transparent opacity={0.5} />
          </mesh>
          <group ref={(el) => (refs.current[i] = el)} position={[c.x, c.h, c.z]}>
            <mesh>
              <planeGeometry args={[0.34, 0.14]} />
              <meshStandardMaterial color={c.col} side={THREE.DoubleSide} roughness={0.85} />
            </mesh>
            <mesh rotation-y={0.5} rotation-x={-0.5} position={[-0.05, 0.05, 0]}>
              <planeGeometry args={[0.26, 0.2]} />
              <meshStandardMaterial color={c.col} side={THREE.DoubleSide} roughness={0.85} />
            </mesh>
            <mesh rotation-y={-0.5} rotation-x={-0.5} position={[0.05, 0.05, 0]}>
              <planeGeometry args={[0.26, 0.2]} />
              <meshStandardMaterial color={c.col} side={THREE.DoubleSide} roughness={0.85} />
            </mesh>
            <mesh position={[0.18, 0.03, 0]} rotation-z={0.6}>
              <planeGeometry args={[0.14, 0.05]} />
              <meshStandardMaterial color={c.col} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[-0.18, 0.06, 0]} rotation-z={0.5}>
              <planeGeometry args={[0.16, 0.05]} />
              <meshStandardMaterial color={c.col} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  )
}

export function GoldenGate({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const cable = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      pts.push(new THREE.Vector3(-3 + t * 6, 2.4 - Math.sin(Math.PI * t) * 2.0, 0))
    }
    return new THREE.CatmullRomCurve3(pts)
  }, [])
  return (
    <group position={position} rotation-y={rotation} scale={0.9}>
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[6.4, 0.4, 1]} />
        <meshStandardMaterial color="#8a6a48" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[6.4, 0.16, 0.7]} />
        <meshStandardMaterial color="#c14e2e" roughness={0.7} />
      </mesh>
      {[-2.2, 2.2].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[0.9, 2, 3].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} castShadow>
              <boxGeometry args={[0.4 - i * 0.06, i === 2 ? 1 : 1.2, 0.4 - i * 0.06]} />
              <meshStandardMaterial color="#c14e2e" roughness={0.7} />
            </mesh>
          ))}
          {[0.7, 1.5, 2.3].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[0.5, 0.08, 0.5]} />
              <meshStandardMaterial color="#a53f24" />
            </mesh>
          ))}
        </group>
      ))}
      {[0, 1].map((s) => (
        <mesh key={s} position={[0, 0, s ? 0.28 : -0.28]}>
          <tubeGeometry args={[cable, 24, 0.03, 6, false]} />
          <meshStandardMaterial color="#c14e2e" />
        </mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const t = i / 8
        const x = -3 + t * 6
        const y = 2.4 - Math.sin(Math.PI * t) * 2.0
        return (
          <mesh key={i} position={[x, (y + 0.6) / 2 + 0.3, 0]}>
            <cylinderGeometry args={[0.012, 0.012, Math.max(0.1, y - 0.6), 4]} />
            <meshStandardMaterial color="#c14e2e" />
          </mesh>
        )
      })}
    </group>
  )
}

export function BrickRowhouse({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation-y={rotation}>
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 4, 3]} />
        <meshStandardMaterial color="#8f4033" roughness={0.95} />
      </mesh>
      {/* trim courses */}
      {[0.9, 2.6].map((y) => (
        <mesh key={y} position={[0, y, 1.51]}>
          <boxGeometry args={[4.05, 0.12, 0.08]} />
          <meshStandardMaterial color="#e4d2ac" roughness={0.8} />
        </mesh>
      ))}
      {/* windows */}
      {[
        [-1, 2.6],
        [1, 2.6],
        [-1, 1.3],
        [1, 1.3],
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, 1.5]}>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.8, 1, 0.12]} />
            <meshStandardMaterial color="#e4d2ac" />
          </mesh>
          <mesh position={[0, 0, 0.09]}>
            <boxGeometry args={[0.62, 0.82, 0.05]} />
            <meshStandardMaterial color="#243b52" metalness={0.3} roughness={0.2} emissive="#4a6f96" emissiveIntensity={0.35} />
          </mesh>
        </group>
      ))}
      {/* door + stoop */}
      <mesh position={[0, 0.85, 1.55]}>
        <boxGeometry args={[0.9, 1.7, 0.14]} />
        <meshStandardMaterial color="#2f5d3e" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.12, 2]} receiveShadow>
        <boxGeometry args={[1.4, 0.24, 1]} />
        <meshStandardMaterial color="#cfcfcf" roughness={0.9} />
      </mesh>
      {/* pediment */}
      <mesh position={[0, 4.2, 0]} rotation-y={Math.PI / 4}>
        <coneGeometry args={[3, 1, 4]} />
        <meshStandardMaterial color="#5f3a30" roughness={0.95} />
      </mesh>
    </group>
  )
}
