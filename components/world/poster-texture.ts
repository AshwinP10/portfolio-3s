import * as THREE from "three"

function mix(hex: string, target: string, t: number) {
  const a = new THREE.Color(hex)
  const b = new THREE.Color(target)
  return a.lerp(b, t).getStyle()
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ""
  for (const w of words) {
    const test = line ? line + " " + w : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
      if (lines.length === maxLines - 1) break
    } else {
      line = test
    }
  }
  if (line && lines.length < maxLines) lines.push(line)
  if (lines.length === maxLines) {
    let last = lines[maxLines - 1]
    while (ctx.measureText(last + "…").width > maxWidth && last.length > 1) last = last.slice(0, -1)
    lines[maxLines - 1] = last + "…"
  }
  return lines
}

const cache = new Map<string, THREE.CanvasTexture>()

export function posterTexture(opts: { id: string; title: string; subtitle?: string; emoji: string; color: string }) {
  const key = opts.id
  const hit = cache.get(key)
  if (hit) return hit

  const W = 512
  const H = 660
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  // background gradient
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, mix(opts.color, "#ffffff", 0.12))
  g.addColorStop(0.55, opts.color)
  g.addColorStop(1, mix(opts.color, "#000000", 0.4))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // top art band
  ctx.fillStyle = mix(opts.color, "#ffffff", 0.22)
  ctx.fillRect(0, 0, W, 300)
  // playful stripes
  ctx.save()
  ctx.globalAlpha = 0.16
  ctx.fillStyle = "#ffffff"
  for (let i = -6; i < 14; i++) {
    ctx.save()
    ctx.translate(i * 60, 0)
    ctx.rotate(-0.5)
    ctx.fillRect(0, -40, 22, 420)
    ctx.restore()
  }
  ctx.restore()

  // emoji
  ctx.font = "180px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(opts.emoji, W / 2, 165)

  // divider
  ctx.fillStyle = mix(opts.color, "#000000", 0.28)
  ctx.fillRect(0, 300, W, 8)

  // title
  ctx.fillStyle = "#ffffff"
  ctx.shadowColor = "rgba(0,0,0,0.35)"
  ctx.shadowBlur = 8
  ctx.font = "700 46px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  const titleLines = wrap(ctx, opts.title, W - 56, 2)
  titleLines.forEach((l, i) => ctx.fillText(l, W / 2, 372 + i * 54))
  ctx.shadowBlur = 0

  // subtitle
  if (opts.subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.9)"
    ctx.font = "500 24px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    const subLines = wrap(ctx, opts.subtitle, W - 64, 3)
    subLines.forEach((l, i) => ctx.fillText(l, W / 2, 372 + titleLines.length * 54 + 26 + i * 30))
  }

  // bottom strip
  ctx.fillStyle = mix(opts.color, "#000000", 0.45)
  ctx.fillRect(0, H - 66, W, 66)
  ctx.fillStyle = "rgba(255,255,255,0.92)"
  ctx.font = "700 22px system-ui, sans-serif"
  ctx.fillText("▶  WALK  UP", W / 2, H - 32)

  // inner border
  ctx.strokeStyle = "rgba(255,255,255,0.55)"
  ctx.lineWidth = 6
  roundRect(ctx, 16, 16, W - 32, H - 32, 18)
  ctx.stroke()

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  cache.set(key, tex)
  return tex
}

let bannerTex: THREE.CanvasTexture | null = null
export function bannerTexture() {
  if (bannerTex) return bannerTex
  const W = 1024
  const H = 220
  const c = document.createElement("canvas")
  c.width = W
  c.height = H
  const ctx = c.getContext("2d")!
  const g = ctx.createLinearGradient(0, 0, W, 0)
  g.addColorStop(0, "#ff8f5e")
  g.addColorStop(0.5, "#ff6b6b")
  g.addColorStop(1, "#9b5de5")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = "rgba(255,255,255,0.7)"
  ctx.lineWidth = 8
  roundRect(ctx, 12, 12, W - 24, H - 24, 20)
  ctx.stroke()
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#ffffff"
  ctx.shadowColor = "rgba(0,0,0,0.3)"
  ctx.shadowBlur = 10
  ctx.font = "800 84px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  ctx.fillText("ASHWIN  PRAKASH", W / 2, 92)
  ctx.shadowBlur = 0
  ctx.font = "600 32px system-ui, sans-serif"
  ctx.fillText("· interactive portfolio world ·", W / 2, 160)
  bannerTex = new THREE.CanvasTexture(c)
  bannerTex.colorSpace = THREE.SRGBColorSpace
  return bannerTex
}
