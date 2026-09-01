"use client"

import { useEffect } from "react"

/**
 * Single mutable input state for the one world instance.
 * Keyboard listeners and the on-screen joystick both write here;
 * the robot's useFrame reads it. Avoids context / prop drilling.
 */
export const input = {
  /** -1..1, forward is -Z (into the screen) */
  forward: 0,
  /** -1..1, right is +X */
  right: 0,
  sprint: false,
  /** joystick vector, -1..1 each axis; forward push = negative y */
  touchX: 0,
  touchY: 0,
  touchActive: false,
  /** set by HUD fast-travel chips; robot walks here then clears it */
  travelTarget: null as [number, number] | null,
  /** bumped when the player presses the interact key */
  interactNonce: 0,
}

export function resetInput() {
  input.forward = 0
  input.right = 0
  input.sprint = false
  input.touchX = 0
  input.touchY = 0
  input.touchActive = false
  input.travelTarget = null
}

const KEYMAP: Record<string, "up" | "down" | "left" | "right" | "sprint" | "interact"> = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  ShiftLeft: "sprint",
  ShiftRight: "sprint",
  KeyE: "interact",
  Space: "interact",
  Enter: "interact",
}

export function useKeyboardControls() {
  useEffect(() => {
    const held = new Set<string>()

    const apply = () => {
      input.forward = (held.has("up") ? 1 : 0) - (held.has("down") ? 1 : 0)
      input.right = (held.has("right") ? 1 : 0) - (held.has("left") ? 1 : 0)
      input.sprint = held.has("sprint")
    }

    const onKey = (e: KeyboardEvent, down: boolean) => {
      const action = KEYMAP[e.code]
      if (!action) return
      // don't hijack typing in inputs
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return
      if (action === "interact") {
        if (down && !e.repeat) input.interactNonce++
        e.preventDefault()
        return
      }
      if (["up", "down", "left", "right"].includes(action)) e.preventDefault()
      if (down) held.add(action)
      else held.delete(action)
      // any manual key cancels fast-travel
      if (down) input.travelTarget = null
      apply()
    }

    const kd = (e: KeyboardEvent) => onKey(e, true)
    const ku = (e: KeyboardEvent) => onKey(e, false)
    const blur = () => {
      held.clear()
      apply()
    }

    window.addEventListener("keydown", kd)
    window.addEventListener("keyup", ku)
    window.addEventListener("blur", blur)
    return () => {
      window.removeEventListener("keydown", kd)
      window.removeEventListener("keyup", ku)
      window.removeEventListener("blur", blur)
      resetInput()
    }
  }, [])
}
