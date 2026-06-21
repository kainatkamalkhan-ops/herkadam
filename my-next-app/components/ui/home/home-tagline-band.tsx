"use client"

import { OpportunityQuiz } from "@/components/ui/home/opportunity-quiz"

const HOME_STEP_ICONS = "/brand/home-step-icons.png"

export function HomeTaglineBand() {
  return (
    <section
      className="home-tagline-band relative overflow-hidden"
      aria-label="Her Kadam tagline and opportunity quiz"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-plum-light to-rose opacity-95" />

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 lg:px-4 lg:py-3 xl:py-4">
        {/* Mobile/tablet: tagline then quiz (unchanged) */}
        <div className="flex flex-col gap-6 lg:hidden">
          <p className="text-center text-base font-medium leading-relaxed text-primary-foreground/90 md:text-lg">
            From the first search to the final submission, you are never navigating alone. Your central hub for
            scholarships, fellowships, jobs, grants, and leadership programs. Every step forward empowers a young
            woman&apos;s journey.
          </p>
          <OpportunityQuiz />
        </div>

        {/* Desktop: tagline | step icons divider | quiz — icons span full band height */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(280px,380px)] lg:items-stretch lg:gap-4 xl:gap-6">
          <div className="flex items-start pt-0.5 text-left">
            <p className="max-w-xl text-lg font-medium leading-relaxed text-primary-foreground/90 xl:text-xl">
              From the first search to the final submission, you are never navigating alone. Your central hub for
              scholarships, fellowships, jobs, grants, and leadership programs. Every step forward empowers a young
              woman&apos;s journey.
            </p>
          </div>

          <div
            className="home-step-icons-divider relative flex shrink-0 self-stretch"
            aria-hidden
          >
            <div className="absolute inset-y-0 left-0 w-px bg-primary-foreground/15" />
            <div className="relative flex h-full min-h-0 items-start justify-center px-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HOME_STEP_ICONS}
                alt=""
                className="home-step-icons-divider__img"
                draggable={false}
              />
            </div>
            <div className="absolute inset-y-0 right-0 w-px bg-primary-foreground/15" />
          </div>

          <div className="flex items-center">
            <OpportunityQuiz />
          </div>
        </div>
      </div>
    </section>
  )
}
