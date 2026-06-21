"use client"

import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { showMailerLitePopup } from "@/lib/mailerlite"

export function NewsletterSection() {
  return (
    <section id="subscribe" className="py-16 md:py-24 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-plum-light to-rose">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 border-[3px] border-primary-foreground/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 border-[3px] border-primary-foreground/10 rounded-full" />
            <div className="absolute top-1/2 right-1/4 w-20 h-20 border-[2px] border-primary-foreground/10 rounded-full" />
          </div>

          <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm mb-6">
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 text-balance">
                Never Miss an Opportunity
              </h2>

              <p className="text-lg text-primary-foreground/85 mb-8 max-w-xl mx-auto">
                Get the latest scholarships, fellowships, and career opportunities delivered straight to your inbox every week.
              </p>

              <Button
                type="button"
                size="lg"
                variant="secondary"
                className="h-12 px-8 gap-2 shrink-0 ml-onclick-form"
                onClick={showMailerLitePopup}
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
