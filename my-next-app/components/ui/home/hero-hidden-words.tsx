"use client"

import { useMemo, useEffect, useRef, type RefObject } from "react"
import { cn } from "@/lib/utils"
import { buildHeroWordCloudLayout, type WordCloudItem } from "@/lib/hero-word-cloud-layout"

const REVEAL_RADIUS = 72
const REVEAL_MS = 3200
const TICK_MS = 40
const FAINT_OPACITY = 0.07

const TONE_CLASS: Record<0 | 1 | 2, string> = {
  0: "text-white/35",
  1: "text-white/30",
  2: "text-primary-foreground/28",
}

const DARKENED_CLASS: Record<0 | 1 | 2, string> = {
  0: "hero-word-darkened-tone-0",
  1: "hero-word-darkened-tone-1",
  2: "hero-word-darkened-tone-2",
}

type HeroHiddenWordsProps = {
  containerRef: RefObject<HTMLElement | null>
}

export function HeroHiddenWords({ containerRef }: HeroHiddenWordsProps) {
  const layout = useMemo(() => buildHeroWordCloudLayout(), [])
  const layoutRef = useRef<WordCloudItem[]>(layout)
  const sizeRef = useRef({ w: 0, h: 0 })
  const cursorRef = useRef<{ x: number; y: number } | null>(null)
  const revealedUntilRef = useRef<Map<string, number>>(new Map())
  const rafRef = useRef(0)
  const lastTickRef = useRef(0)
  const wordElsRef = useRef<Map<string, HTMLSpanElement>>(new Map())

  layoutRef.current = layout

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const syncSize = () => {
      const rect = el.getBoundingClientRect()
      sizeRef.current = { w: rect.width, h: rect.height }
    }
    syncSize()
    const ro = new ResizeObserver(syncSize)
    ro.observe(el)

    const heroPoint = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect()
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        inBounds:
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom,
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const p = heroPoint(e.clientX, e.clientY)
      cursorRef.current = p.inBounds ? { x: p.x, y: p.y } : null
    }

    const onPointerLeave = () => {
      cursorRef.current = null
    }

    const applyVisuals = () => {
      const { w, h } = sizeRef.current
      const cursor = cursorRef.current
      const revealed = revealedUntilRef.current
      const now = Date.now()

      for (const [id, until] of revealed) {
        if (until <= now) revealed.delete(id)
      }

      if (cursor && w && h) {
        let nearest: WordCloudItem | null = null
        let nearestDist = REVEAL_RADIUS

        for (const word of layoutRef.current) {
          const wx = (word.xPct / 100) * w
          const wy = (word.yPct / 100) * h
          const d = Math.hypot(cursor.x - wx, cursor.y - wy)
          if (d <= REVEAL_RADIUS && d < nearestDist) {
            nearest = word
            nearestDist = d
          }
        }

        if (nearest) {
          revealed.set(nearest.id, now + REVEAL_MS)
        }
      }

      for (const word of layoutRef.current) {
        const node = wordElsRef.current.get(word.id)
        if (!node) continue
        const isDark = revealed.has(word.id)
        node.style.opacity = isDark ? "0.92" : String(FAINT_OPACITY)
        node.classList.toggle("hero-word-darkened", isDark)
      }
    }

    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (time - lastTickRef.current < TICK_MS) return
      lastTickRef.current = time
      applyVisuals()
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    el.addEventListener("pointerleave", onPointerLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerleave", onPointerLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef])

  return (
    <div className="pointer-events-none absolute inset-0 z-[7] overflow-hidden" aria-hidden>
      {layout.map((word) => (
        <span
          key={word.id}
          ref={(node) => {
            if (node) wordElsRef.current.set(word.id, node)
            else wordElsRef.current.delete(word.id)
          }}
          className={cn(
            "hero-word-cloud-word absolute whitespace-nowrap font-brand font-medium leading-none select-none",
            TONE_CLASS[word.tone],
            DARKENED_CLASS[word.tone],
          )}
          style={{
            left: `${word.xPct}%`,
            top: `${word.yPct}%`,
            fontSize: `${word.sizeRem}rem`,
            opacity: FAINT_OPACITY,
            transform: `translate(-50%, -50%) rotate(${word.rotate}deg)`,
          }}
        >
          {word.text}
        </span>
      ))}
    </div>
  )
}
