export type Quality = "auto" | "high" | "battery"
export type RenderQuality = "high" | "balanced" | "battery"

export function parseQuality(value: string | null): Quality {
  return value === "high" || value === "battery" ? value : "auto"
}

export function renderingBudget(quality: Quality, lowPower: boolean) {
  const mode: RenderQuality = quality === "high" ? "high" : quality === "battery" || lowPower ? "battery" : "balanced"
  return {
    mode,
    dpr: mode === "high" ? 1.5 : mode === "battery" ? 1 : 1.25,
    shadows: mode !== "battery",
    shadowSize: mode === "high" ? 1536 : 1024,
  }
}

export const TOUR = ["about", "amazon", "saronic", "davatar", "vqa-disagree", "contact"] as const
