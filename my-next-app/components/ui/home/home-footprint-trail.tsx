"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"

const TRAIL_ICONS = [
  "/footprints/footprint-1.png",
  "/footprints/footprint-2.png",
  "/footprints/footprint-3.png",
] as const

const TIER_BASE_SIZE = [40, 52, 64] as const
const MAX_TRAIL = 12
const SAMPLE_MS = 62
const TRAIL_LIFE_MS = 2000

type TrailPoint = {
  id: number
  x: number
  y: number
  tier: 0 | 1 | 2
}

type HomeFootprintTrailProps = {
  containerRef: RefObject<HTMLElement | null>
}

function isInsideRect(clientX: number, clientY: number, rect: DOMRect) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  )
}

export function HomeFootprintTrail({ containerRef }: HomeFootprintTrailProps) {
  const [points, setPoints] = useState<TrailPoint[]>([])
  const [enabled, setEnabled] = useState(false)

  const cursorRef = useRef({ clientX: 0, clientY: 0 })
  const idSeq = useRef(0)
  const tierSeq = useRef(0)
  const lastSampleRef = useRef(0)
  const rafRef = useRef(0)

  const removePoint = useCallback((id: number) => {
    setPoints((prev) => prev.filter((p) => p.id !== id))
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches
    const touchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setEnabled(!reduceMotion && !coarsePointer && !touchDevice)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    if (!container) return

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { clientX: e.clientX, clientY: e.clientY }
    }

    const onMouseLeave = () => setPoints([])

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    container.addEventListener("mouseleave", onMouseLeave)

    const sampleTrail = (now: number) => {
      if (now - lastSampleRef.current < SAMPLE_MS) return

      const rect = container.getBoundingClientRect()
      const { clientX, clientY } = cursorRef.current
      if (!isInsideRect(clientX, clientY, rect)) return

      lastSampleRef.current = now
      const x = clientX - rect.left
      const y = clientY - rect.top
      const tier = (tierSeq.current++ % 3) as 0 | 1 | 2

      setPoints((prev) =>
        [...prev, { id: ++idSeq.current, x, y, tier }].slice(-MAX_TRAIL),
      )
    }

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick)
      sampleTrail(now)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      container.removeEventListener("mouseleave", onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, enabled])

  if (!enabled) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[8] overflow-hidden" aria-hidden>
      {points.map((point) => {
        const size = TIER_BASE_SIZE[point.tier]
        return (
          <div
            key={point.id}
            className="home-trail-icon absolute left-0 top-0"
            style={{
              transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`,
            }}
          >
            <div
              className="home-trail-icon--live"
              style={{
                width: size,
                height: size,
                animationDuration: `${TRAIL_LIFE_MS}ms`,
              }}
              onAnimationEnd={() => removePoint(point.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TRAIL_ICONS[point.tier]}
                alt=""
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
