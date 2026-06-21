"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import { createPortal } from "react-dom"

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
  clientX: number
  clientY: number
  tier: 0 | 1 | 2
}

type HeroFootstepsTrailProps = {
  containerRef: RefObject<HTMLElement | null>
  trailPointsRef?: RefObject<TrailPointRef>
  /** Hide trail below md breakpoint (phones). Laptops/tablets keep the trail. */
  desktopOnly?: boolean
}

function isInsideRect(clientX: number, clientY: number, rect: DOMRect) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  )
}

export function HeroFootstepsTrail({
  containerRef,
  trailPointsRef,
  desktopOnly = false,
}: HeroFootstepsTrailProps) {
  const [points, setPoints] = useState<TrailPoint[]>([])
  const [ready, setReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [desktopEnabled, setDesktopEnabled] = useState(true)

  const cursorRef = useRef({ clientX: 0, clientY: 0 })
  const idSeq = useRef(0)
  const tierSeq = useRef(0)
  const lastSampleRef = useRef(0)
  const rafRef = useRef(0)

  const removePoint = useCallback((id: number) => {
    setPoints((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const addTrailPoint = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      if (!isInsideRect(clientX, clientY, rect)) return

      const tier = (tierSeq.current++ % 3) as 0 | 1 | 2

      setPoints((prev) => {
        const next = [
          ...prev,
          { id: ++idSeq.current, clientX, clientY, tier },
        ].slice(-MAX_TRAIL)

        if (trailPointsRef?.current) {
          trailPointsRef.current.points = next.map((p) => ({
            x: p.clientX - rect.left,
            y: p.clientY - rect.top,
          }))
        }

        return next
      })
    },
    [containerRef, trailPointsRef],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => setReduceMotion(motionMq.matches)
    syncMotion()
    motionMq.addEventListener("change", syncMotion)

    if (desktopOnly) {
      const desktopMq = window.matchMedia("(min-width: 768px)")
      const syncDesktop = () => setDesktopEnabled(desktopMq.matches)
      syncDesktop()
      desktopMq.addEventListener("change", syncDesktop)
      setReady(true)
      return () => {
        motionMq.removeEventListener("change", syncMotion)
        desktopMq.removeEventListener("change", syncDesktop)
      }
    }

    setReady(true)
    return () => motionMq.removeEventListener("change", syncMotion)
  }, [desktopOnly])

  useEffect(() => {
    if (!ready || reduceMotion || (desktopOnly && !desktopEnabled)) return

    const container = containerRef.current
    if (!container) return

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { clientX: e.clientX, clientY: e.clientY }
    }

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      cursorRef.current = { clientX: touch.clientX, clientY: touch.clientY }
      addTrailPoint(touch.clientX, touch.clientY)
    }

    const onLeaveContainer = () => {
      setPoints([])
      if (trailPointsRef?.current) trailPointsRef.current.points = []
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    container.addEventListener("touchstart", onTouch, { passive: true })
    container.addEventListener("touchmove", onTouch, { passive: true })
    container.addEventListener("mouseleave", onLeaveContainer)

    const sampleTrail = (now: number) => {
      if (now - lastSampleRef.current < SAMPLE_MS) return
      lastSampleRef.current = now
      const { clientX, clientY } = cursorRef.current
      addTrailPoint(clientX, clientY)
    }

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick)
      sampleTrail(now)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      container.removeEventListener("touchstart", onTouch)
      container.removeEventListener("touchmove", onTouch)
      container.removeEventListener("mouseleave", onLeaveContainer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [
    addTrailPoint,
    containerRef,
    ready,
    reduceMotion,
    desktopOnly,
    desktopEnabled,
    trailPointsRef,
  ])

  if (!mounted || !ready || reduceMotion || (desktopOnly && !desktopEnabled)) {
    return null
  }

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
      aria-hidden
    >
      {points.map((point) => {
        const size = TIER_BASE_SIZE[point.tier]

        return (
          <div
            key={point.id}
            className="hero-trail-icon fixed left-0 top-0"
            style={{
              transform: `translate(${point.clientX}px, ${point.clientY}px) translate(-50%, -50%)`,
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
                className="h-full w-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                draggable={false}
              />
            </div>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}
