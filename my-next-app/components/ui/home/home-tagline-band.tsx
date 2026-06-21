"use client"

import { OpportunityQuiz } from "@/components/ui/home/opportunity-quiz"

const STEP_TRAIL = "/brand/home-step-trail.png"

export function HomeTaglineBand() {
  return (
    <section className="home-hero-blend" aria-label="Her Kadam introduction and opportunity quiz">
      <div className="home-hero-blend__atmosphere" aria-hidden>
        <div className="home-hero-blend__gradient-base" />
        <div className="home-hero-blend__orb home-hero-blend__orb--plum" />
        <div className="home-hero-blend__orb home-hero-blend__orb--rose" />
        <div className="home-hero-blend__orb home-hero-blend__orb--light" />
        <div className="home-hero-blend__mesh" />
      </div>

      <div className="home-hero-blend__steps-layer" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={STEP_TRAIL} alt="" className="home-hero-blend__steps home-hero-blend__steps--primary" draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={STEP_TRAIL} alt="" className="home-hero-blend__steps home-hero-blend__steps--ghost" draggable={false} />
      </div>

      <div className="home-hero-blend__content container mx-auto px-4">
        <div className="home-hero-blend__layout">
          <div className="home-hero-blend__copy">
            <p className="home-hero-blend__eyebrow">Your journey starts here</p>
            <h1 className="home-hero-blend__headline">Every Step Builds Her Power</h1>
            <p className="home-hero-blend__tagline">
              From the first search to the final submission, you are never navigating alone. Your central hub for
              scholarships, fellowships, jobs, grants, and leadership programs. Every step forward empowers a young
              woman&apos;s journey.
            </p>
          </div>

          <div className="home-hero-blend__quiz-wrap">
            <OpportunityQuiz variant="blend" />
          </div>
        </div>
      </div>

      <div className="home-hero-blend__bottom-fade" aria-hidden />
    </section>
  )
}
