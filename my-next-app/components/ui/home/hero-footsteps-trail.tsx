"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import { nudgePointFromClearZones } from "@/lib/hero-word-cloud-layout"

const TRAIL_ICONS = [
  { src: "/footprints/footprint-1.png", baseSize: 46 },
  { src: "/footprints/footprint-2.png", baseSize: 52 },
  { src: "/footprints/footprint-3.png", baseSize: 58 },
] as const

const MAX_TRAIL = 66
const SPAWN_DIST = 8
const MIN_SPAWN_MS = 32
const SMOOTH = 0.28

type TrailStep = {
  id: number
  x: number
  y: number
  angle: number
  tier: 0 | 1 | 2
}

type HeroFootstepsTrailProps = {
  containerRef: RefObject<HTMLElement | null>
  onFootprint?: (x: number, y: number) => void
}

function trailAngle(dx: number, dy: number) {
  if (Math.hypot(dx, dy) < 0.4) return 18
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90
}

export function HeroFootstepsTrail({ containerRef, onFootprint }: HeroFootstepsTrailProps) {
  const [steps, setSteps] = useState<TrailStep[]>([])
  const [ready, setReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const idSeq = useRef(0)
  const tierSeq = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const emitFrom = useRef({ x: 0, y: 0 })
  const lastSpawn = useRef(0)
  const inside = useRef(false)
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef(0)
  const stepsRef = useRef<TrailStep[]>([])
  const nodeRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  stepsRef.current = steps

  const trimSteps = useCallback((next: TrailStep[]) => {
    return next.length > MAX_TRAIL ? next.slice(-MAX_TRAIL) : next
  }, [])

  const spawnStep = useCallback(
    (x: number, y: number, angle: number) => {
      const tier = (tierSeq.current++ % 3) as 0 | 1 | 2
      const id = ++idSeq.current
      onFootprint?.(x, y)
      setSteps((prev) => trimSteps([...prev, { id, x, y, angle, tier }]))
    },
    [onFootprint, trimSteps],
  )

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
      if (p.inBounds) target.current = { x: p.x, y: p.y }
    }

    const onPointerLeave = () => {
      inside.current = false
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    el.addEventListener("pointerleave", onPointerLeave)

    const updateTrailVisuals = (trail: TrailStep[], w: number, h: number) => {
      const total = trail.length
      for (let i = 0; i < total; i++) {
        const step = trail[i]
        const node = nodeRefs.current.get(step.id)
        if (!node) continue

        const age = total - 1 - i
        const t = age / Math.max(total - 1, 1)
        const scale = 0.28 + (1 - t) * 0.72
        const opacity = Math.max(0, 0.94 - age * 0.028)
        const icon = TRAIL_ICONS[step.tier]
        const size = icon.baseSize * scale
        const safe = nudgePointFromClearZones(step.x, step.y, w, h)

        node.style.width = `${size}px`
        node.style.height = `${size}px`
        node.style.opacity = String(opacity)
        node.style.transform = `translate(${safe.x}px, ${safe.y}px) translate(-50%, -50%) rotate(${step.angle}deg)`
      }
    }

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)

      const { w, h } = sizeRef.current
      if (!inside.current || !w || !h) return

      smooth.current.x += (target.current.x - smooth.current.x) * SMOOTH
      smooth.current.y += (target.current.y - smooth.current.y) * SMOOTH

      const dx = smooth.current.x - emitFrom.current.x
      const dy = smooth.current.y - emitFrom.current.y
      const dist = Math.hypot(dx, dy)
      const now = performance.now()

      if (dist >= SPAWN_DIST && now - lastSpawn.current >= MIN_SPAWN_MS) {
        const lag = 0.35
        const sx = emitFrom.current.x + (smooth.current.x - emitFrom.current.x) * lag
        const sy = emitFrom.current.y + (smooth.current.y - emitFrom.current.y) * lag
        const safe = nudgePointFromClearZones(sx, sy, w, h)
        spawnStep(safe.x, safe.y, trailAngle(dx, dy))
        emitFrom.current = { ...smooth.current }
        lastSpawn.current = now
      }

      updateTrailVisuals(stepsRef.current, w, h)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerleave", onPointerLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, ready, reduceMotion, spawnStep])

  useEffect(() => {
    if (!steps.length) return
    const { w, h } = sizeRef.current
    if (!w || !h) return
    const total = steps.length
    for (let i = 0; i < total; i++) {
      const step = steps[i]
      const node = nodeRefs.current.get(step.id)
      if (!node) continue
      const age = total - 1 - i
      const t = age / Math.max(total - 1, 1)
      const scale = 0.28 + (1 - t) * 0.72
      const opacity = Math.max(0, 0.94 - age * 0.028)
      const icon = TRAIL_ICONS[step.tier]
      const size = icon.baseSize * scale
      const safe = nudgePointFromClearZones(step.x, step.y, w, h)
      node.style.width = `${size}px`
      node.style.height = `${size}px`
      node.style.opacity = String(opacity)
      node.style.transform = `translate(${safe.x}px, ${safe.y}px) translate(-50%, -50%) rotate(${step.angle}deg)`
    }
  }, [steps])

  if (!ready || reduceMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[11] overflow-hidden" aria-hidden>
      {steps.map((step) => {
        const icon = TRAIL_ICONS[step.tier]
        return (
          <div
            key={step.id}
            ref={(node) => {
              if (node) nodeRefs.current.set(step.id, node)
              else nodeRefs.current.delete(step.id)
            }}
            className="hero-trail-step absolute left-0 top-0 will-change-transform"
            style={{ width: icon.baseSize, height: icon.baseSize }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon.src} alt="" className="h-full w-full object-contain" draggable={false} />
          </div>
        )
      })}
    </div>
  )
}
