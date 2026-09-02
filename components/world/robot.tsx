"use client"

import { useRef, type RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { input } from "./controls"

const WORLD = { minX: -34, maxX: 34, minZ: -20, maxZ: 15 }
const WALK_SPEED = 4.6
const RUN_SPEED = 7.6

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
  const phase = useRef(0)
  const speedRef = useRef(0)
  const targetYaw = useRef(0)

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const g = groupRef.current
    if (!g) return

    // ---- desired direction (keyboard or joystick) ----
    let dx = input.right
    let dz = -input.forward
    if (input.touchActive) {
      dx = input.touchX
      dz = input.touchY
    }
    let len = Math.hypot(dx, dz)

    // ---- fast travel ----
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

    let moving = len > 0.08
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

    // ---- procedural walk ----
    const gait = speedRef.current * 1.15
    phase.current += dt * gait
    const swing = Math.sin(phase.current) * Math.min(0.6, 0.12 + speedRef.current * 0.06)
    const lift = speedRef.current > 0.2 ? 1 : 0
    if (legL.current) legL.current.rotation.x = swing * lift
    if (legR.current) legR.current.rotation.x = -swing * lift
    if (armL.current) armL.current.rotation.x = -swing * lift * 0.8
    if (armR.current) armR.current.rotation.x = swing * lift * 0.8
    if (torso.current) {
      torso.current.position.y = 0.02 + Math.abs(Math.sin(phase.current)) * 0.04 * lift
      const breathe = 1 + Math.sin(phase.current * 0.4) * 0.01 * (1 - lift)
      torso.current.scale.y = breathe
    }

    onMove?.(g.position)
  })

  const bodyMat = <meshStandardMaterial color="#1e3a8a" metalness={0.55} roughness={0.35} />
  const trimMat = <meshStandardMaterial color="#93c5fd" metalness={0.5} roughness={0.4} />
  const glowMat = <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.2} toneMapped={false} />

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* soft contact patch under the robot */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <circleGeometry args={[0.7, 24]} />
        <meshBasicMaterial color="#4a2f18" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      <group ref={torso}>
        {/* torso */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[0.92, 1.05, 0.55]} />
          {bodyMat}
        </mesh>
        {/* chest light */}
        <mesh position={[0, 1.2, 0.29]}>
          <boxGeometry args={[0.26, 0.26, 0.04]} />
          {glowMat}
        </mesh>
        {/* hips */}
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[0.7, 0.3, 0.5]} />
          {trimMat}
        </mesh>

        {/* head */}
        <group position={[0, 1.95, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.56, 0.5, 0.52]} />
            {bodyMat}
          </mesh>
          <mesh position={[0.12, 0.03, 0.27]}>
            <boxGeometry args={[0.12, 0.12, 0.04]} />
            {glowMat}
          </mesh>
          <mesh position={[-0.12, 0.03, 0.27]}>
            <boxGeometry args={[0.12, 0.12, 0.04]} />
            {glowMat}
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.22, 6]} />
            {trimMat}
          </mesh>
          <mesh position={[0, 0.56, 0]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            {glowMat}
          </mesh>
        </group>

        {/* arms */}
        <group ref={armL} position={[0.62, 1.55, 0]}>
          <mesh position={[0, -0.42, 0]} castShadow>
            <boxGeometry args={[0.2, 0.85, 0.2]} />
            {bodyMat}
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <boxGeometry args={[0.24, 0.16, 0.24]} />
            {trimMat}
          </mesh>
        </group>
        <group ref={armR} position={[-0.62, 1.55, 0]}>
          <mesh position={[0, -0.42, 0]} castShadow>
            <boxGeometry args={[0.2, 0.85, 0.2]} />
            {bodyMat}
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <boxGeometry args={[0.24, 0.16, 0.24]} />
            {trimMat}
          </mesh>
        </group>
      </group>

      {/* legs (pivot at hip) */}
      <group ref={legL} position={[0.22, 0.62, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.26, 0.82, 0.26]} />
          {bodyMat}
        </mesh>
        <mesh position={[0, -0.84, 0.06]}>
          <boxGeometry args={[0.3, 0.14, 0.4]} />
          {trimMat}
        </mesh>
      </group>
      <group ref={legR} position={[-0.22, 0.62, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.26, 0.82, 0.26]} />
          {bodyMat}
        </mesh>
        <mesh position={[0, -0.84, 0.06]}>
          <boxGeometry args={[0.3, 0.14, 0.4]} />
          {trimMat}
        </mesh>
      </group>
    </group>
  )
}
