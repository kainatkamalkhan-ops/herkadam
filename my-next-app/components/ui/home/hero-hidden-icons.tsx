"use client"

import { useMemo, useEffect, useRef, type RefObject } from "react"
import { buildHeroHiddenIconLayout, ICON_SRC } from "@/lib/hero-hidden-icons-layout"

const REVEAL_RADIUS = 64
const REVEAL_MS = 2800
const FAINT_OPACITY = 0.04
const TICK_MS = 40

type HeroHiddenIconsProps = {
  containerRef: RefObject<HTMLElement | null>
}

export function HeroHiddenIcons({ containerRef }: HeroHiddenIconsProps) {
  const layout = useMemo(() => buildHeroHiddenIconLayout(), [])
  const layoutRef = useRef(layout)
  const sizeRef = useRef({ w: 0, h: 0 })
  const cursorRef = useRef<{ x: number; y: number } | null>(null)
  const revealedUntilRef = useRef<Map<string, number>>(new Map())
  const rafRef = useRef(0)
  const lastTickRef = useRef(0)
  const iconElsRef = useRef<Map<string, HTMLDivElement>>(new Map())

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

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      cursorRef.current = inBounds
        ? { x: e.clientX - rect.left, y: e.clientY - rect.top }
        : null
    }

    const onMouseLeave = () => {
      cursorRef.current = null
    }

    el.addEventListener("mousemove", onMouseMove, true)
    el.addEventListener("mouseleave", onMouseLeave)

    const applyVisuals = () => {
      const { w, h } = sizeRef.current
      const cursor = cursorRef.current
      const revealed = revealedUntilRef.current
      const now = Date.now()

      for (const [id, until] of revealed) {
        if (until <= now) revealed.delete(id)
      }

      if (cursor && w && h) {
        for (const icon of layoutRef.current) {
          const ix = (icon.xPct / 100) * w
          const iy = (icon.yPct / 100) * h
          const d = Math.hypot(cursor.x - ix, cursor.y - iy)
          if (d <= REVEAL_RADIUS) {
            revealed.set(icon.id, now + REVEAL_MS)
          }
        }
      }

      for (const icon of layoutRef.current) {
        const node = iconElsRef.current.get(icon.id)
        if (!node) continue
        node.style.opacity = revealed.has(icon.id) ? "0.88" : String(FAINT_OPACITY)
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
      el.removeEventListener("mousemove", onMouseMove, true)
      el.removeEventListener("mouseleave", onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef])

  return (
    <div className="pointer-events-none absolute inset-0 z-[7] overflow-hidden" aria-hidden>
      {layout.map((icon) => (
        <div
          key={icon.id}
          ref={(node) => {
            if (node) iconElsRef.current.set(icon.id, node)
            else iconElsRef.current.delete(icon.id)
          }}
          className="hero-hidden-icon absolute transition-opacity duration-500 ease-out"
          style={{
            left: `${icon.xPct}%`,
            top: `${icon.yPct}%`,
            width: icon.sizePx,
            height: icon.sizePx,
            opacity: FAINT_OPACITY,
            transform: `translate(-50%, -50%) rotate(${icon.rotate}deg)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ICON_SRC[icon.tier]}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
