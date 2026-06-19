/** Hidden footprint icons scattered across the hero header. */

export type HiddenIconItem = {
  id: string
  xPct: number
  yPct: number
  sizePx: number
  rotate: number
  tier: 0 | 1 | 2
}

type Box = { left: number; right: number; top: number; bottom: number }

export const LOGO_CLEAR: Box = { left: 26, right: 74, top: 4, bottom: 38 }
export const TAGLINE_CLEAR: Box = { left: 8, right: 92, top: 36, bottom: 52 }
export const SUBTITLE_CLEAR: Box = { left: 10, right: 90, top: 50, bottom: 68 }

const CLEAR_ZONES = [LOGO_CLEAR, TAGLINE_CLEAR, SUBTITLE_CLEAR]

const COLS = 14
const ROWS = 10
const ICON_COUNT = COLS * ROWS

export const ICON_SRC = [
  "/footprints/footprint-1.png",
  "/footprints/footprint-2.png",
  "/footprints/footprint-3.png",
] as const

function seeded(index: number, salt: number) {
  const n = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return n - Math.floor(n)
}

function iconBox(xPct: number, yPct: number, sizePx: number): Box {
  const half = (sizePx / 14) * 0.52
  return {
    left: xPct - half,
    right: xPct + half,
    top: yPct - half,
    bottom: yPct + half,
  }
}

function overlaps(a: Box, b: Box, gap = 0.35) {
  return !(
    a.right + gap < b.left ||
    a.left - gap > b.right ||
    a.bottom + gap < b.top ||
    a.top - gap > b.bottom
  )
}

function inClearZone(box: Box) {
  return CLEAR_ZONES.some((z) => overlaps(box, z, 0.15))
}

function slotCenter(col: number, row: number) {
  const padX = 3
  const padY = 2.5
  const usableW = 100 - padX * 2
  const usableH = 100 - padY * 2
  return {
    xPct: padX + ((col + 0.5) / COLS) * usableW,
    yPct: padY + ((row + 0.5) / ROWS) * usableH,
  }
}

/** Even grid scatter — icons cycling tiers 0→1→2 with varied sizes. */
export function buildHeroHiddenIconLayout(): HiddenIconItem[] {
  const occupied: Box[] = [...CLEAR_ZONES]
  const placed: HiddenIconItem[] = []

  const slots: { col: number; row: number }[] = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      slots.push({ col, row })
    }
  }

  let tierSeq = 0

  for (let index = 0; index < ICON_COUNT; index++) {
    const slot = slots[index]
    const tier = (tierSeq++ % 3) as 0 | 1 | 2
    const sizePx = Math.round(38 + seeded(index, 2) * 58 + seeded(index, 7) * 22)
    const rotate = Math.round((seeded(index, 5) * 40 - 20) * 10) / 10
    const base = slotCenter(slot.col, slot.row)

    for (let attempt = 0; attempt < 20; attempt++) {
      const jx = (seeded(index, attempt + 1) - 0.5) * 4.8
      const jy = (seeded(index, attempt + 9) - 0.5) * 3.8
      const xPct = base.xPct + jx
      const yPct = base.yPct + jy
      const box = iconBox(xPct, yPct, sizePx)

      if (xPct < 2 || xPct > 98 || yPct < 2 || yPct > 98) continue
      if (inClearZone(box)) continue
      if (occupied.some((o) => overlaps(box, o))) continue

      occupied.push(box)
      placed.push({ id: `icon-${index}`, xPct, yPct, sizePx, rotate, tier })
      break
    }
  }

  return placed
}

export function pointInClearZonePct(xPct: number, yPct: number): boolean {
  return CLEAR_ZONES.some(
    (z) => xPct >= z.left && xPct <= z.right && yPct >= z.top && yPct <= z.bottom,
  )
}

export function nudgePointFromClearZones(x: number, y: number, w: number, h: number) {
  let xp = (x / w) * 100
  let yp = (y / h) * 100
  if (!pointInClearZonePct(xp, yp)) return { x, y }

  for (const zone of CLEAR_ZONES) {
    if (xp >= zone.left && xp <= zone.right && yp >= zone.top && yp <= zone.bottom) {
      const toBottom = zone.bottom - yp
      const toTop = yp - zone.top
      const toLeft = xp - zone.left
      const toRight = zone.right - xp
      const min = Math.min(toBottom, toTop, toLeft, toRight)
      if (min === toBottom) yp = zone.bottom + 2
      else if (min === toTop) yp = zone.top - 2
      else if (min === toLeft) xp = zone.left - 2
      else xp = zone.right + 2
    }
  }

  return { x: (xp / 100) * w, y: (yp / 100) * h }
}
