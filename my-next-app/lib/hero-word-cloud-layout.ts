/** Exactly 50 treasure-hunt words for the hero header. */
export const HERO_WORD_LIST = [
  "Step", "Stride", "Forward", "Rising", "Climbing", "Momentum", "Progress", "Pathways",
  "Threshold", "Doorway", "Bridge", "Foothold", "Journey", "Wandering", "Voyage", "Borders",
  "Departure", "Arrival", "Passport", "Fully Funded", "Scholarship", "Fellowship", "Grant", "Internship", "Exchange", "Conference",
  "Access", "Navigation", "Compass", "Roadmap",
  "Discovery", "Unfolding", "Bloom", "Legacy", "Ecosystem", "Leadership", "Power", "Agency",
  "Voice", "Authority", "Command", "Sovereignty", "Women", "Sisterhood", "Solidarity",
  "Resilience", "Ambition", "Courage", "Becoming", "Kadam",
] as const

export type WordCloudItem = {
  id: string
  text: string
  xPct: number
  yPct: number
  sizeRem: number
  rotate: number
  tone: 0 | 1 | 2
}

type Box = { left: number; right: number; top: number; bottom: number }

export const LOGO_CLEAR: Box = { left: 28, right: 72, top: 5, bottom: 35 }
export const TAGLINE_CLEAR: Box = { left: 6, right: 94, top: 34, bottom: 58 }
export const SEARCH_CLEAR: Box = { left: 8, right: 92, top: 56, bottom: 97 }

function seeded(index: number, salt: number) {
  const n = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return n - Math.floor(n)
}

function wordBox(xPct: number, yPct: number, text: string, sizeRem: number, rotate: number): Box {
  const w = text.length * sizeRem * 0.48 + sizeRem * 0.38
  const h = sizeRem * 1.14
  const rad = (rotate * Math.PI) / 180
  const cos = Math.abs(Math.cos(rad))
  const sin = Math.abs(Math.sin(rad))
  const halfW = (w * cos + h * sin) / 2
  const halfH = (w * sin + h * cos) / 2
  return {
    left: xPct - halfW,
    right: xPct + halfW,
    top: yPct - halfH,
    bottom: yPct + halfH,
  }
}

function overlaps(a: Box, b: Box, gap = 0.28) {
  return !(
    a.right + gap < b.left ||
    a.left - gap > b.right ||
    a.bottom + gap < b.top ||
    a.top - gap > b.bottom
  )
}

function inClearZone(box: Box, zones: Box[]) {
  return zones.some((z) => overlaps(box, z, 0.1))
}

function fitsCanvas(box: Box) {
  return box.left >= 1.5 && box.right <= 98.5 && box.top >= 1.5 && box.bottom <= 98.5
}

function sizeForWord(index: number): number {
  return 0.48 + seeded(index, 3) * 0.44
}

function rotateForWord(index: number): number {
  return Math.round((seeded(index, 7) * 28 - 14) * 10) / 10
}

const CLEAR_ZONES = [LOGO_CLEAR, TAGLINE_CLEAR, SEARCH_CLEAR]

/** 10 × 5 grid slots — left→right, top→bottom across the full header. */
const COLS = 10
const ROWS = 5

function slotCenter(col: number, row: number) {
  const padX = 4
  const padY = 3
  const usableW = 100 - padX * 2
  const usableH = 100 - padY * 2
  return {
    xPct: padX + ((col + 0.5) / COLS) * usableW,
    yPct: padY + ((row + 0.5) / ROWS) * usableH,
  }
}

function tryPlaceInSlot(
  text: string,
  sizeRem: number,
  rotate: number,
  col: number,
  row: number,
  index: number,
  occupied: Box[],
): { xPct: number; yPct: number } | null {
  const base = slotCenter(col, row)

  for (let attempt = 0; attempt < 24; attempt++) {
    const jx = (seeded(index, attempt + 1) - 0.5) * 5.5
    const jy = (seeded(index, attempt + 9) - 0.5) * 4.2
    const xPct = base.xPct + jx
    const yPct = base.yPct + jy
    const box = wordBox(xPct, yPct, text, sizeRem, rotate)
    if (!fitsCanvas(box)) continue
    if (inClearZone(box, CLEAR_ZONES)) continue
    if (occupied.some((o) => overlaps(box, o))) continue
    return { xPct, yPct }
  }

  return null
}

/** Even left→right, top→bottom scatter — one word per grid slot. */
export function buildHeroWordCloudLayout(): WordCloudItem[] {
  const occupied: Box[] = [...CLEAR_ZONES]
  const placed: WordCloudItem[] = []

  const slots: { col: number; row: number }[] = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      slots.push({ col, row })
    }
  }

  HERO_WORD_LIST.forEach((text, index) => {
    const sizeRem = sizeForWord(index)
    const rotate = rotateForWord(index)
    const tone = (index % 3) as 0 | 1 | 2
    const slot = slots[index]
    if (!slot) return

    let pos = tryPlaceInSlot(text, sizeRem, rotate, slot.col, slot.row, index, occupied)

    if (!pos) {
      for (const fallback of slots) {
        pos = tryPlaceInSlot(text, sizeRem, rotate, fallback.col, fallback.row, index + 100, occupied)
        if (pos) break
      }
    }

    if (!pos) return

    occupied.push(wordBox(pos.xPct, pos.yPct, text, sizeRem, rotate))
    placed.push({
      id: `word-${index}`,
      text,
      xPct: pos.xPct,
      yPct: pos.yPct,
      sizeRem,
      rotate,
      tone,
    })
  })

  return placed
}

export function pointInClearZonePct(xPct: number, yPct: number): boolean {
  return (
    (xPct >= LOGO_CLEAR.left && xPct <= LOGO_CLEAR.right && yPct >= LOGO_CLEAR.top && yPct <= LOGO_CLEAR.bottom) ||
    (xPct >= TAGLINE_CLEAR.left && xPct <= TAGLINE_CLEAR.right && yPct >= TAGLINE_CLEAR.top && yPct <= TAGLINE_CLEAR.bottom) ||
    (xPct >= SEARCH_CLEAR.left && xPct <= SEARCH_CLEAR.right && yPct >= SEARCH_CLEAR.top && yPct <= SEARCH_CLEAR.bottom)
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
