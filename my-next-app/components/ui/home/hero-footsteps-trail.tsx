"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react"

/** Logo paths: rear (lighter) and front foot from `public/icon.svg` — same geometry, white for hero trail. */
function FootprintShape({ variant }: { variant: 0 | 1 }) {
  if (variant === 0) {
    return (
      <g className="fill-white">
        <path d="M9 34.5c0-3.2 2.4-5.8 5.5-6.2 1.4-.2 2.8.1 4 .8 1.9 1.1 3 3.2 2.8 5.4-.2 2.5-2.2 4.5-4.7 4.7h-.6c-3.5 0-6.3-2.5-7-5.7z" />
        <circle cx="16.5" cy="27" r="2.1" />
        <circle cx="19.8" cy="25.2" r="1.65" />
        <circle cx="23.2" cy="24.2" r="1.45" />
      </g>
    )
  }
  return (
    <g className="fill-white">
      <path d="M22.5 22.2c.6-3.1 3.5-5.1 6.6-4.5 1.4.3 2.6 1.1 3.4 2.3 1.3 2 1.1 4.6-.6 6.3-1.5 1.5-3.8 2-5.9 1.2l-.5-.2c-3.2-1.2-4.8-4.5-3-7.1z" />
      <circle cx="30.5" cy="16.2" r="2.35" />
      <circle cx="34.4" cy="15" r="1.85" />
      <circle cx="38" cy="15.2" r="1.55" />
    </g>
  )
}

type TrailStep = {
  id: number
  x: number
  y: number
  angle: number
  variant: 0 | 1
}

type HeroFootstepsTrailProps = {
  /** The hero `<section>` (or wrapper) used for bounds and pointer tracking. */
  containerRef: RefObject<HTMLElement | null>
}

const SMOOTH = 0.14
/** Align logo foot “forward” with movement direction (logo faces ~upper-right in viewBox). */
const ANGLE_OFFSET = 118

export function HeroFootstepsTrail({ containerRef }: HeroFootstepsTrailProps) {
  const [steps, setSteps] = useState<TrailStep[]>([])
  const [motionPrefsReady, setMotionPrefsReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [coarsePointer, setCoarsePointer] = useState(false)

  const idSeq = useRef(0)
  const cursorTarget = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const emitFrom = useRef({ x: 0, y: 0 })
  const lastEmitAt = useRef(0)
  const lastAngle = useRef(0)
  const footToggle = useRef(0)
  const inside = useRef(false)
  const rafRef = useRef(0)
  const hasInitializedSmooth = useRef(false)

  const maxSteps = coarsePointer ? 14 : 26
  const minDist = coarsePointer ? 22 : 14
  const minIntervalMs = coarsePointer ? 85 : 58

  const removeStep = useCallback((id: number) => {
    setSteps((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const pushStep = useCallback(
    (x: number, y: number, angleDeg: number) => {
      const variant = (footToggle.current % 2) as 0 | 1
      footToggle.current += 1
      const id = ++idSeq.current
      setSteps((prev) => {
        const next = [...prev, { id, x, y, angle: angleDeg, variant }]
        if (next.length > maxSteps) {
          return next.slice(-maxSteps)
        }
        return next
      })
    },
    [maxSteps],
  )

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mqCoarse = window.matchMedia("(pointer: coarse)")
    const sync = () => {
      setReduceMotion(mqReduce.matches)
      setCoarsePointer(mqCoarse.matches)
    }
    sync()
    setMotionPrefsReady(true)
    mqReduce.addEventListener("change", sync)
    mqCoarse.addEventListener("change", sync)
    return () => {
      mqReduce.removeEventListener("change", sync)
      mqCoarse.removeEventListener("change", sync)
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) setSteps([])
  }, [reduceMotion])

  useEffect(() => {
    if (!motionPrefsReady || reduceMotion) return

    const el = containerRef.current
    if (!el) return

    const onPointerEnter = (e: PointerEvent) => {
      inside.current = true
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      cursorTarget.current = { x, y }
      smooth.current = { x, y }
      emitFrom.current = { x, y }
      hasInitializedSmooth.current = true
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      cursorTarget.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      inside.current = true
    }

    const onPointerLeave = () => {
      inside.current = false
      hasInitializedSmooth.current = false
    }

    el.addEventListener("pointerenter", onPointerEnter)
    el.addEventListener("pointermove", onPointerMove)
    el.addEventListener("pointerleave", onPointerLeave)

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)

      if (!inside.current && !hasInitializedSmooth.current) return

      const t = cursorTarget.current
      smooth.current.x += (t.x - smooth.current.x) * SMOOTH
      smooth.current.y += (t.y - smooth.current.y) * SMOOTH

      const dx = smooth.current.x - emitFrom.current.x
      const dy = smooth.current.y - emitFrom.current.y
      const dist = Math.hypot(dx, dy)
      const now = performance.now()

      if (dist >= minDist && now - lastEmitAt.current >= minIntervalMs) {
        const angleDeg =
          (dist > 0.5
            ? Math.atan2(dy, dx) * (180 / Math.PI)
            : lastAngle.current) + ANGLE_OFFSET
        lastAngle.current = angleDeg - ANGLE_OFFSET

        const lag = 0.42
        const sx = emitFrom.current.x + (smooth.current.x - emitFrom.current.x) * lag
        const sy = emitFrom.current.y + (smooth.current.y - emitFrom.current.y) * lag

        pushStep(sx, sy, angleDeg)
        emitFrom.current = { ...smooth.current }
        lastEmitAt.current = now
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener("pointerenter", onPointerEnter)
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerleave", onPointerLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [
    containerRef,
    motionPrefsReady,
    reduceMotion,
    minDist,
    minIntervalMs,
    pushStep,
  ])

  if (!motionPrefsReady || reduceMotion) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {steps.map((step) => (
        <div
          key={step.id}
          className="hero-footstep absolute"
          style={
            {
              left: step.x,
              top: step.y,
              "--foot-rotate": `${step.angle}deg`,
            } as CSSProperties
          }
          onAnimationEnd={(e) => {
            if (
              e.animationName === "hero-footstep-life" ||
              e.animationName.includes("footstep")
            ) {
              removeStep(step.id)
            }
          }}
        >
          <svg
            viewBox="0 0 48 48"
            className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_5px_rgba(255,255,255,0.45)] sm:h-10 sm:w-10"
            style={{ filter: "blur(0.35px)" }}
          >
            <FootprintShape variant={step.variant} />
          </svg>
        </div>
      ))}
    </div>
  )
}
