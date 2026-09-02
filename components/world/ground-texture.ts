import * as THREE from "three"

let stone: THREE.CanvasTexture | null = null

/** Warm flag-stone / cobble texture for the plaza floor. */
export function plazaTexture() {
  if (stone) return stone
  const S = 1024
  const c = document.createElement("canvas")
  c.width = S
  c.height = S
  const ctx = c.getContext("2d")!

  ctx.fillStyle = "#d9bd8f"
  ctx.fillRect(0, 0, S, S)

  const tones = ["#e6cfa2", "#dcc094", "#d3b184", "#e9d6ad", "#cdaa7c", "#e0c79b"]
  const cell = 62
  for (let y = -1; y < S / cell + 1; y++) {
    for (let x = -1; x < S / cell + 1; x++) {
      const ox = (y % 2) * cell * 0.5
      const px = x * cell + ox + (Math.random() - 0.5) * 10
      const py = y * cell + (Math.random() - 0.5) * 10
      const w = cell * (0.78 + Math.random() * 0.16)
      const h = cell * (0.78 + Math.random() * 0.16)
      const r = 8 + Math.random() * 6
      // grout
      ctx.fillStyle = "#b9986c"
      rr(ctx, px - 3, py - 3, w + 6, h + 6, r + 3)
      ctx.fill()
      // stone
      ctx.fillStyle = tones[(Math.random() * tones.length) | 0]
      rr(ctx, px, py, w, h, r)
      ctx.fill()
      // speckle
      ctx.globalAlpha = 0.06
      ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#5b4226"
      for (let s = 0; s < 5; s++) {
        ctx.beginPath()
        ctx.arc(px + Math.random() * w, py + Math.random() * h, 1 + Math.random() * 2, 0, 7)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
  }

  stone = new THREE.CanvasTexture(c)
  stone.colorSpace = THREE.SRGBColorSpace
  stone.wrapS = stone.wrapT = THREE.RepeatWrapping
  stone.anisotropy = 8
  return stone
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

let grass: THREE.CanvasTexture | null = null
/** Soft dry-grass texture for the surrounding ground. */
export function fieldTexture() {
  if (grass) return grass
  const S = 512
  const c = document.createElement("canvas")
  c.width = S
  c.height = S
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#e3cfa1"
  ctx.fillRect(0, 0, S, S)
  for (let i = 0; i < 2600; i++) {
    ctx.strokeStyle = ["#cdb47e", "#d8c491", "#c2a774", "#b89a6a"][(Math.random() * 4) | 0]
    ctx.lineWidth = 1 + Math.random()
    const x = Math.random() * S
    const y = Math.random() * S
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (Math.random() - 0.5) * 6, y - 3 - Math.random() * 6)
    ctx.stroke()
  }
  grass = new THREE.CanvasTexture(c)
  grass.colorSpace = THREE.SRGBColorSpace
  grass.wrapS = grass.wrapT = THREE.RepeatWrapping
  grass.repeat.set(24, 24)
  return grass
}
