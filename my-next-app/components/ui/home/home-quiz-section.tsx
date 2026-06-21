"use client"

import { Sparkles } from "lucide-react"
import { OpportunityQuiz } from "@/components/ui/home/opportunity-quiz"

export function HomeQuizSection() {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum via-primary to-plum-light shadow-lg">
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full border-[3px] border-primary-foreground/10" />
            <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full border-[3px] border-primary-foreground/10" />
            <div className="absolute top-1/2 right-1/4 h-20 w-20 rounded-full border-[2px] border-primary-foreground/10" />
          </div>

          <div className="relative px-5 py-8 md:px-10 md:py-10 lg:px-14">
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 flex items-center justify-center gap-2 md:justify-start">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6 text-primary-foreground" aria-hidden />
                </div>
                <div className="text-left">
                  <h2 className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
                    Find Your Match
                  </h2>
                  <p className="text-sm text-primary-foreground/80">
                    Answer a few questions to discover opportunities for you.
                  </p>
                </div>
              </div>

              <OpportunityQuiz showTitle={false} theme="gradient" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
