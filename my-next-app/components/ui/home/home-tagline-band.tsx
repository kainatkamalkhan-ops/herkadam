"use client"

const STEP_TRAIL = "/brand/home-step-trail.png"

export function HomeTaglineBand() {
  return (
    <section className="home-hero-blend" aria-label="Her Kadam introduction">
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
        <div className="home-hero-blend__layout home-hero-blend__layout--solo">
          <div className="home-hero-blend__copy">
            <p className="home-hero-blend__eyebrow">Her journey starts with one step.</p>
            <h1 className="home-hero-blend__headline">Scholarships, Fellowships, Jobs and Grants for Women.</h1>
            <p className="home-hero-blend__tagline">
              From the first search to the final submission, you are never navigating the tiresome process alone.
            </p>
          </div>
        </div>
      </div>

      <div className="home-hero-blend__bottom-fade max-lg:block lg:hidden" aria-hidden />
    </section>
  )
}
