"use client"

import { useRef, type RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { input } from "./controls"

const WORLD = { minX: -26, maxX: 26, minZ: -17, maxZ: 13 }
const WALK_SPEED = 4.6
const RUN_SPEED = 7.6

const CREAM = "#f2e4cf"
const ORANGE = "#e0651f"
const TEAL = "#22b8a6"
const AMBER = "#ffbf47"

function dampAngle(current: number, target: number, lambda: number, dt: number) {
  let diff = target - current
  while (diff < -Math.PI) diff += Math.PI * 2
  while (diff > Math.PI) diff -= Math.PI * 2
  return current + diff * (1 - Math.exp(-lambda * dt))
}

type Props = { groupRef: RefObject<THREE.Group | null>; onMove?: (p: THREE.Vector3) => void }

export function Robot({ groupRef, onMove }: Props) {
  const legL = useRef<THREE.Group>(null)
  const legR = useRef<THREE.Group>(null)
  const armL = useRef<THREE.Group>(null)
  const armR = useRef<THREE.Group>(null)
  const torso = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const antenna = useRef<THREE.Mesh>(null)
  const phase = useRef(0)
  const speedRef = useRef(0)
  const targetYaw = useRef(0)

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const g = groupRef.current
    if (!g) return

    let dx = input.right
    let dz = -input.forward
    if (input.touchActive) {
      dx = input.touchX
      dz = input.touchY
    }
    let len = Math.hypot(dx, dz)

    if (input.travelTarget) {
      const tx = input.travelTarget[0] - g.position.x
      const tz = input.travelTarget[1] - g.position.z
      const td = Math.hypot(tx, tz)
      if (td < 0.6) {
        input.travelTarget = null
      } else {
        dx = tx / td
        dz = tz / td
        len = 1
      }
    }

    const moving = len > 0.08
    const targetSpeed = moving ? (input.sprint ? RUN_SPEED : WALK_SPEED) * Math.min(len, 1) : 0
    speedRef.current += (targetSpeed - speedRef.current) * (1 - Math.exp(-10 * dt))

    if (moving) {
      const nx = dx / len
      const nz = dz / len
      g.position.x += nx * speedRef.current * dt
      g.position.z += nz * speedRef.current * dt
      targetYaw.current = Math.atan2(nx, nz)
    }

    g.position.x = THREE.MathUtils.clamp(g.position.x, WORLD.minX, WORLD.maxX)
    g.position.z = THREE.MathUtils.clamp(g.position.z, WORLD.minZ, WORLD.maxZ)
    g.rotation.y = dampAngle(g.rotation.y, targetYaw.current, 12, dt)

    const gait = speedRef.current * 1.15
    phase.current += dt * gait
    const swing = Math.sin(phase.current) * Math.min(0.62, 0.14 + speedRef.current * 0.06)
    const lift = speedRef.current > 0.2 ? 1 : 0
    if (legL.current) legL.current.rotation.x = swing * lift
    if (legR.current) legR.current.rotation.x = -swing * lift
    if (armL.current) armL.current.rotation.x = -swing * lift * 0.85
    if (armR.current) armR.current.rotation.x = swing * lift * 0.85
    if (torso.current) {
      torso.current.position.y = Math.abs(Math.sin(phase.current)) * 0.05 * lift
      torso.current.rotation.z = Math.sin(phase.current) * 0.03 * lift
    }
    if (head.current) {
      head.current.rotation.z = -Math.sin(phase.current) * 0.04 * lift
      head.current.position.y = 1.28 + Math.sin(state.clock.elapsedTime * 2) * 0.01 * (1 - lift)
    }
    if (antenna.current) antenna.current.rotation.z = Math.sin(state.clock.elapsedTime * 3 + phase.current) * 0.18

    onMove?.(g.position)
  })

  return (
    <group ref={groupRef}>
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <circleGeometry args={[0.62, 24]} />
        <meshBasicMaterial color="#4a2f18" transparent opacity={0.14} depthWrite={false} />
      </mesh>

      <group ref={torso}>
        {/* hips */}
        <RoundedBox args={[0.5, 0.3, 0.36]} radius={0.12} smoothness={3} position={[0, 0.66, 0]} castShadow>
          <meshStandardMaterial color={TEAL} roughness={0.4} metalness={0.15} />
        </RoundedBox>

        {/* chest */}
        <RoundedBox args={[0.58, 0.82, 0.4]} radius={0.18} smoothness={4} position={[0, 1.18, 0]} castShadow>
          <meshStandardMaterial color={CREAM} roughness={0.5} metalness={0.05} />
        </RoundedBox>
        <RoundedBox args={[0.34, 0.4, 0.06]} radius={0.06} smoothness={3} position={[0, 1.24, 0.2]}>
          <meshStandardMaterial color={ORANGE} roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, 1.24, 0.235]}>
          <circleGeometry args={[0.08, 20]} />
          <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={2.6} toneMapped={false} />
        </mesh>

        {/* backpack */}
        <RoundedBox args={[0.4, 0.5, 0.22]} radius={0.08} smoothness={3} position={[0, 1.2, -0.28]} castShadow>
          <meshStandardMaterial color={ORANGE} roughness={0.55} />
        </RoundedBox>
        <mesh position={[0, 1.05, -0.4]}>
          <boxGeometry args={[0.22, 0.06, 0.04]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={1.6} toneMapped={false} />
        </mesh>

        {/* collar / scarf */}
        <mesh position={[0, 1.58, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.2, 0.06, 8, 18]} />
          <meshStandardMaterial color="#d9433a" roughness={0.8} />
        </mesh>
        <mesh position={[-0.12, 1.4, -0.14]} rotation-z={0.4}>
          <boxGeometry args={[0.12, 0.4, 0.04]} />
          <meshStandardMaterial color="#d9433a" roughness={0.8} />
        </mesh>

        {/* head */}
        <group ref={head} position={[0, 1.28, 0]}>
          <RoundedBox args={[0.6, 0.5, 0.5]} radius={0.2} smoothness={4} castShadow>
            <meshStandardMaterial color={CREAM} roughness={0.45} metalness={0.05} />
          </RoundedBox>
          <mesh position={[0, 0.02, 0.235]}>
            <boxGeometry args={[0.5, 0.2, 0.06]} />
            <meshStandardMaterial color="#243b52" roughness={0.25} metalness={0.3} />
          </mesh>
          {[0.12, -0.12].map((x) => (
            <mesh key={x} position={[x, 0.03, 0.27]}>
              <capsuleGeometry args={[0.045, 0.05, 4, 10]} />
              <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={2.4} toneMapped={false} />
            </mesh>
          ))}
          {/* side pods */}
          {[0.34, -0.34].map((x) => (
            <mesh key={x} position={[x, 0, 0]} castShadow>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshStandardMaterial color={ORANGE} roughness={0.5} />
            </mesh>
          ))}
          {/* antenna */}
          <mesh ref={antenna} position={[0.12, 0.34, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.022, 0.3, 6]} />
            <meshStandardMaterial color="#8a6a48" />
          </mesh>
          <mesh position={[0.16, 0.52, 0]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={2.6} toneMapped={false} />
          </mesh>
        </group>

        {/* arms */}
        <group ref={armL} position={[0.4, 1.42, 0]}>
          <mesh position={[0.04, -0.02, 0]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial color={TEAL} roughness={0.4} />
          </mesh>
          <mesh position={[0.04, -0.34, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.42, 4, 12]} />
            <meshStandardMaterial color={CREAM} roughness={0.5} />
          </mesh>
          <mesh position={[0.04, -0.62, 0]} castShadow>
            <sphereGeometry args={[0.11, 14, 12]} />
            <meshStandardMaterial color={ORANGE} roughness={0.5} />
          </mesh>
        </group>
        <group ref={armR} position={[-0.4, 1.42, 0]}>
          <mesh position={[-0.04, -0.02, 0]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial color={TEAL} roughness={0.4} />
          </mesh>
          <mesh position={[-0.04, -0.34, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.42, 4, 12]} />
            <meshStandardMaterial color={CREAM} roughness={0.5} />
          </mesh>
          <mesh position={[-0.04, -0.62, 0]} castShadow>
            <sphereGeometry args={[0.11, 14, 12]} />
            <meshStandardMaterial color={ORANGE} roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* legs */}
      <group ref={legL} position={[0.16, 0.62, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.4, 4, 12]} />
          <meshStandardMaterial color={CREAM} roughness={0.5} />
        </mesh>
        <RoundedBox args={[0.24, 0.14, 0.34]} radius={0.06} smoothness={3} position={[0, -0.58, 0.06]} castShadow>
          <meshStandardMaterial color={TEAL} roughness={0.45} />
        </RoundedBox>
      </group>
      <group ref={legR} position={[-0.16, 0.62, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.4, 4, 12]} />
          <meshStandardMaterial color={CREAM} roughness={0.5} />
        </mesh>
        <RoundedBox args={[0.24, 0.14, 0.34]} radius={0.06} smoothness={3} position={[0, -0.58, 0.06]} castShadow>
          <meshStandardMaterial color={TEAL} roughness={0.45} />
        </RoundedBox>
      </group>
    </group>
  )
}
