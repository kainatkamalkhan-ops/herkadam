"use client"

import { useRef, type ReactNode } from "react"
import { HeroFootstepsTrail } from "@/components/ui/home/hero-footsteps-trail"

/** Homepage-only wrapper: original footprint cursor trail across all main content. */
export function HomepageMainShell({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null)

  return (
    <main ref={mainRef} className="relative flex-1">
      <HeroFootstepsTrail containerRef={mainRef} desktopOnly />
      {children}
    </main>
  )
}
