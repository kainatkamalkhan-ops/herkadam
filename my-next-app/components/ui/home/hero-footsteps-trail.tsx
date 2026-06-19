"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

/** Icons in sequence: 1 → 2 → 3 → repeat */
const TRAIL_ICONS = [
  "/footprints/footprint-1.png",
  "/footprints/footprint-2.png",
  "/footprints/footprint-3.png",
] as const

const MAX_TRAIL = 15
const SAMPLE_MS = 42
const BASE_SIZE = 50
const MIN_OPACITY = 0.04

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

function trailProgress(index: number, total: number) {
  if (total <= 1) return 1
  return index / (total - 1)
}

export function HeroFootstepsTrail({ containerRef, trailPointsRef }: HeroFootstepsTrailProps) {
  const [points, setPoints] = useState<TrailPoint[]>([])
  const [ready, setReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const cursorRef = useRef({ x: 0, y: 0 })
  const insideRef = useRef(false)
  const idSeq = useRef(0)
  const tierSeq = useRef(0)
  const lastSampleRef = useRef(0)
  const rafRef = useRef(0)

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

    const header = containerRef.current
    if (!header) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = header.getBoundingClientRect()
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      insideRef.current = true
    }

    const onMouseLeave = () => {
      insideRef.current = false
      if (trailPointsRef?.current) trailPointsRef.current.points = []
    }

    header.addEventListener("mousemove", onMouseMove, true)
    header.addEventListener("mouseleave", onMouseLeave)

    const sampleTrail = (now: number) => {
      if (!insideRef.current) return
      if (now - lastSampleRef.current < SAMPLE_MS) return
      lastSampleRef.current = now

      const tier = (tierSeq.current++ % 3) as 0 | 1 | 2
      const { x, y } = cursorRef.current

      setPoints((prev) => {
        const next: TrailPoint[] = [
          ...prev,
          { id: ++idSeq.current, x, y, tier },
        ]

        const capped = next.slice(-MAX_TRAIL).filter((_, i, arr) => trailProgress(i, arr.length) >= MIN_OPACITY)

        if (trailPointsRef?.current) {
          trailPointsRef.current.points = capped.map((p) => ({ x: p.x, y: p.y }))
        }

        return capped
      })
    }

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick)
      sampleTrail(now)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      header.removeEventListener("mousemove", onMouseMove, true)
      header.removeEventListener("mouseleave", onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, ready, reduceMotion, trailPointsRef])

  // Keep trailPointsRef in sync whenever points change
  useEffect(() => {
    if (trailPointsRef?.current) {
      trailPointsRef.current.points = points.map((p) => ({ x: p.x, y: p.y }))
    }
  }, [points, trailPointsRef])

  if (!ready || reduceMotion) return null

  const total = points.length

  return (
    <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden" aria-hidden>
      {points.map((point, index) => {
        const t = trailProgress(index, total)
        const scale = 0.32 + t * 0.68
        const opacity = t
        const size = BASE_SIZE * scale

        if (opacity < MIN_OPACITY) return null

        return (
          <div
            key={point.id}
            className="hero-trail-icon absolute left-0 top-0"
            style={{
              width: size,
              height: size,
              opacity,
              transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TRAIL_ICONS[point.tier]}
              alt=""
              className="h-full w-full object-contain"
              draggable={false}
            />
          </div>
        )
      })}
    </div>
  )
}
