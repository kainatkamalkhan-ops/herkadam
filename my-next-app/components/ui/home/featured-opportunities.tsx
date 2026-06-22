"use client"

import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  OpportunityCard,
  type Opportunity,
} from "@/components/opportunities/opportunity-card"

export function FeaturedOpportunities({
  opportunities,
}: {
  opportunities: Opportunity[]
}) {
  const featured = opportunities.filter((opp) => opp.isFeatured).slice(0, 4)

  if (featured.length === 0) return null

  return (
    <section className="py-10 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-gold fill-gold" />
            <Badge variant="secondary" className="bg-gold/20 text-foreground hover:bg-gold/20">
              Editor&apos;s Picks
            </Badge>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Featured Opportunities
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Hand-picked opportunities with exceptional benefits and impact potential, selected by our editorial team.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-3 md:mb-10 md:grid-cols-3 md:gap-4">
          {featured.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} variant="horizontal" />
          ))}
        </div>

        <div className="text-center">
          <Button className="gap-2" asChild>
            <Link href="/opportunities?featured=true">
              Explore All Featured
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
