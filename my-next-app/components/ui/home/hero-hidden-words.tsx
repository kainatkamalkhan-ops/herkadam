"use client"

import { useMemo, useEffect, useRef, type RefObject } from "react"
import { cn } from "@/lib/utils"
import { buildHeroWordCloudLayout, type WordCloudItem } from "@/lib/hero-word-cloud-layout"
import type { TrailPointRef } from "@/components/ui/home/hero-footsteps-trail"

const REVEAL_RADIUS = 68
const REVEAL_MS = 3000
const TICK_MS = 40
const FAINT_OPACITY = 0.05

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
  trailPointsRef: RefObject<TrailPointRef>
}

export function HeroHiddenWords({ containerRef, trailPointsRef }: HeroHiddenWordsProps) {
  const layout = useMemo(() => buildHeroWordCloudLayout(), [])
  const layoutRef = useRef<WordCloudItem[]>(layout)
  const sizeRef = useRef({ w: 0, h: 0 })
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

    const applyVisuals = () => {
      const { w, h } = sizeRef.current
      const revealed = revealedUntilRef.current
      const now = Date.now()
      const trailPoints = trailPointsRef.current?.points ?? []

      for (const [id, until] of revealed) {
        if (until <= now) revealed.delete(id)
      }

      if (w && h && trailPoints.length > 0) {
        for (const word of layoutRef.current) {
          const wx = (word.xPct / 100) * w
          const wy = (word.yPct / 100) * h

          for (const point of trailPoints) {
            const d = Math.hypot(point.x - wx, point.y - wy)
            if (d <= REVEAL_RADIUS) {
              revealed.set(word.id, now + REVEAL_MS)
              break
            }
          }
        }
      }

      for (const word of layoutRef.current) {
        const node = wordElsRef.current.get(word.id)
        if (!node) continue
        const isDark = revealed.has(word.id)
        node.style.opacity = isDark ? "0.9" : String(FAINT_OPACITY)
        node.classList.toggle("hero-word-darkened", isDark)
      }
    }

    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (time - lastTickRef.current < TICK_MS) return
      lastTickRef.current = time
      applyVisuals()
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, trailPointsRef])

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
