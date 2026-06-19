"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"

/** Icons in sequence: 1 → 2 → 3 → repeat, each tier has its own size */
const TRAIL_ICONS = [
  "/footprints/footprint-1.png",
  "/footprints/footprint-2.png",
  "/footprints/footprint-3.png",
] as const

const TIER_BASE_SIZE = [56, 72, 88] as const

const MAX_TRAIL = 14
const SAMPLE_MS = 58
const TRAIL_LIFE_MS = 1600

export type TrailPointRef = {
  points: { x: number; y: number }[]
}

type TrailPoint = {
  id: number
  x: number
  y: number
  tier: 0 | 1 | 2
}

type HeroFootstepsTrailProps = {
  containerRef: RefObject<HTMLElement | null>
  trailPointsRef?: RefObject<TrailPointRef>
}

function isInsideRect(clientX: number, clientY: number, rect: DOMRect) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  )
}

export function HeroFootstepsTrail({ containerRef, trailPointsRef }: HeroFootstepsTrailProps) {
  const [points, setPoints] = useState<TrailPoint[]>([])
  const [ready, setReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const cursorRef = useRef({ clientX: 0, clientY: 0 })
  const idSeq = useRef(0)
  const tierSeq = useRef(0)
  const lastSampleRef = useRef(0)
  const rafRef = useRef(0)

  const removePoint = useCallback((id: number) => {
    setPoints((prev) => prev.filter((p) => p.id !== id))
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    setReady(true)
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!ready || reduceMotion) return

    const hero = containerRef.current
    if (!hero) return

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { clientX: e.clientX, clientY: e.clientY }
    }

    const onMouseLeaveHero = () => {
      setPoints([])
      if (trailPointsRef?.current) trailPointsRef.current.points = []
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    hero.addEventListener("mouseleave", onMouseLeaveHero)

    const sampleTrail = (now: number) => {
      if (now - lastSampleRef.current < SAMPLE_MS) return

      const rect = hero.getBoundingClientRect()
      const { clientX, clientY } = cursorRef.current
      if (!isInsideRect(clientX, clientY, rect)) return

      lastSampleRef.current = now

      const x = clientX - rect.left
      const y = clientY - rect.top
      const tier = (tierSeq.current++ % 3) as 0 | 1 | 2

      setPoints((prev) => {
        const next = [...prev, { id: ++idSeq.current, x, y, tier }].slice(-MAX_TRAIL)

        if (trailPointsRef?.current) {
          trailPointsRef.current.points = next.map((p) => ({ x: p.x, y: p.y }))
        }

        return next
      })
    }

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick)
      sampleTrail(now)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      hero.removeEventListener("mouseleave", onMouseLeaveHero)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, ready, reduceMotion, trailPointsRef])

  if (!ready || reduceMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden" aria-hidden>
      {points.map((point) => {
        const size = TIER_BASE_SIZE[point.tier]

        return (
          <div
            key={point.id}
            className="hero-trail-icon absolute left-0 top-0"
            style={{
              transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`,
            }}
          >
            <div
              className="hero-trail-icon--live"
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
