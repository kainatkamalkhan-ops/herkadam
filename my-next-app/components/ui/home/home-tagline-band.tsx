"use client"

import { useRef } from "react"
import { HomeFootprintTrail } from "@/components/ui/home/home-footprint-trail"
import { OpportunityQuiz } from "@/components/ui/home/opportunity-quiz"

export function HomeTaglineBand() {
  const bandRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={bandRef}
      className="home-tagline-band relative overflow-hidden"
      aria-label="Her Kadam tagline and opportunity quiz"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-plum-light to-rose opacity-95" />

      <HomeFootprintTrail containerRef={bandRef} />

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-8">
          <div className="flex min-h-[calc(var(--nav-strip-h)-2rem)] items-center justify-center text-center lg:justify-start lg:text-left">
            <p className="max-w-2xl text-base font-medium leading-relaxed text-primary-foreground/90 md:text-lg lg:text-xl">
              Your central hub for scholarships, fellowships, jobs, grants, and leadership programs.
              Every step forward empowers a young woman&apos;s journey.
            </p>
          </div>

          <OpportunityQuiz />
        </div>
      </div>
    </section>
  )
}
