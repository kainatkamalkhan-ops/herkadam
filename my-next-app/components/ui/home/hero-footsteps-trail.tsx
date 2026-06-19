"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { nudgePointFromClearZones } from "@/lib/hero-word-cloud-layout"

const TRAIL_ICONS = [
  { src: "/footprints/footprint-1.png", size: 44, lag: 0.22 },
  { src: "/footprints/footprint-2.png", size: 50, lag: 0.14 },
  { src: "/footprints/footprint-3.png", size: 56, lag: 0.08 },
] as const

type HeroFootstepsTrailProps = {
  containerRef: RefObject<HTMLElement | null>
  onFootprint?: (x: number, y: number) => void
}

function trailAngle(dx: number, dy: number) {
  if (Math.hypot(dx, dy) < 0.4) return 18
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90
}

export function HeroFootstepsTrail({ containerRef, onFootprint }: HeroFootstepsTrailProps) {
  const [ready, setReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const layerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ])
  const prev = useRef({ x: 0, y: 0 })
  const inside = useRef(false)
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef(0)
  const lastBump = useRef(0)

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
      inside.current = p.inBounds
      if (!p.inBounds) {
        layerRef.current?.style.setProperty("opacity", "0")
        return
      }
      target.current = { x: p.x, y: p.y }
      layerRef.current?.style.setProperty("opacity", "1")
    }

    const onPointerLeave = () => {
      inside.current = false
      layerRef.current?.style.setProperty("opacity", "0")
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    el.addEventListener("pointerleave", onPointerLeave)

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)

      const { w, h } = sizeRef.current
      if (!inside.current || !w || !h) return

      const layer = layerRef.current
      if (!layer) return

      for (let i = 0; i < 3; i++) {
        const lag = TRAIL_ICONS[i].lag
        pos.current[i].x += (target.current.x - pos.current[i].x) * lag
        pos.current[i].y += (target.current.y - pos.current[i].y) * lag
      }

      const dx = pos.current[0].x - prev.current.x
      const dy = pos.current[0].y - prev.current.y
      const angle = trailAngle(dx, dy)
      prev.current = { ...pos.current[0] }

      const now = performance.now()
      if (now - lastBump.current > 120) {
        onFootprint?.(pos.current[0].x, pos.current[0].y)
        lastBump.current = now
      }

      for (let i = 0; i < 3; i++) {
        const node = iconRefs.current[i]
        if (!node) continue
        const safe = nudgePointFromClearZones(pos.current[i].x, pos.current[i].y, w, h)
        const fade = 0.55 + (2 - i) * 0.18
        node.style.transform = `translate(${safe.x}px, ${safe.y}px) translate(-50%, -50%) rotate(${angle}deg)`
        node.style.opacity = String(fade)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerleave", onPointerLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, ready, reduceMotion, onFootprint])

  if (!ready || reduceMotion) return null

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-[11] overflow-hidden opacity-0 transition-opacity duration-300"
      aria-hidden
    >
      {TRAIL_ICONS.map((icon, i) => (
        <div
          key={icon.src}
          ref={(node) => {
            iconRefs.current[i] = node
          }}
          className="hero-trail-follower absolute left-0 top-0 will-change-transform"
          style={{ width: icon.size, height: icon.size }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon.src} alt="" className="h-full w-full object-contain drop-shadow-sm" draggable={false} />
        </div>
      ))}
    </div>
  )
}
