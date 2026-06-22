"use client"

import { useRef } from "react"
import { HerKadamLogo } from "@/components/ui/brand/her-kadam-logo"
import { HeroFootstepsTrail } from "@/components/ui/home/hero-footsteps-trail"
import { HeroHiddenIcons } from "@/components/ui/home/hero-hidden-icons"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-plum-light to-rose opacity-95" />

      <HeroHiddenIcons containerRef={heroRef} />
      <HeroFootstepsTrail containerRef={heroRef} />

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 border-[3px] border-primary-foreground/10 rounded-full" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 border-[3px] border-primary-foreground/10 rounded-full" />
        <div className="absolute -bottom-10 right-1/4 w-48 h-48 border-[3px] border-primary-foreground/10 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] border-t-[3px] border-l-[3px] border-r-[3px] border-primary-foreground/15 rounded-t-full hidden lg:block" />
      </div>

      <div className="pointer-events-none relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative flex w-full flex-col items-center mb-3 md:mb-4">
            <div className="flex justify-center">
              <HerKadamLogo size="hero" priority variant="hero-circle" />
            </div>
            <h1 className="relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mt-16 md:mt-20 lg:mt-24 leading-tight text-balance max-w-2xl">
              Scholarships, Fellowships, Jobs and Grants for Women.
            </h1>
          </div>

          <p className="relative z-10 text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed text-pretty mt-1 md:mt-2">
            From the first search to the final submission, you are never navigating the tiresome process alone.
          </p>
        </div>
      </div>
    </section>
  )
}
