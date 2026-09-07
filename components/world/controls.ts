"use client"

import { useEffect } from "react"

export const input = {
  forward: 0,
  right: 0,
  sprint: false,
  touchX: 0,
  touchY: 0,
  touchActive: false,
  travelTarget: null as [number, number] | null,
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
  ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down",
  ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right",
  ShiftLeft: "sprint", ShiftRight: "sprint",
  KeyE: "interact", Space: "interact", Enter: "interact",
}

export function useKeyboardControls(enabled = true) {
  useEffect(() => {
    if (!enabled) { resetInput(); return }
    // Track physical keys so releasing W while holding ArrowUp keeps moving.
    const held = new Set<string>()
    const apply = () => {
      const active = new Set(Array.from(held, (code) => KEYMAP[code]))
      input.forward = Number(active.has("up")) - Number(active.has("down"))
      input.right = Number(active.has("right")) - Number(active.has("left"))
      input.sprint = active.has("sprint")
    }
    const onKey = (event: KeyboardEvent, down: boolean) => {
      const action = KEYMAP[event.code]
      if (!action) return
      if (!down) { held.delete(event.code); apply(); return }
      const element = event.target as HTMLElement | null
      if (event.ctrlKey || event.metaKey || event.altKey || element?.isContentEditable ||
          element?.closest("input, textarea, select, button, a, summary, [role='dialog']")) return
      if (action === "interact") {
        if (!event.repeat) input.interactNonce++
        event.preventDefault()
        return
      }
      if (action !== "sprint") event.preventDefault()
      held.add(event.code)
      input.travelTarget = null
      apply()
    }
    const down = (event: KeyboardEvent) => onKey(event, true)
    const up = (event: KeyboardEvent) => onKey(event, false)
    const blur = () => { held.clear(); resetInput() }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    window.addEventListener("blur", blur)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
      window.removeEventListener("blur", blur)
      resetInput()
    }
  }, [enabled])
}
