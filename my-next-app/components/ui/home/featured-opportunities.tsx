"use client"

import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OpportunityCard } from "@/components/opportunities/opportunity-card"
import { opportunities } from "@/lib/data"

export function FeaturedOpportunities() {
  const featured = opportunities.filter(opp => opp.isFeatured).slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-gold fill-gold" />
            <Badge variant="secondary" className="bg-gold/20 text-foreground hover:bg-gold/20">
              Editor&apos;s Picks
            </Badge>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Opportunities
          </h2>
          <p className="text-muted-foreground">
            Hand-picked opportunities with exceptional benefits and impact potential, selected by our editorial team.
          </p>
        </div>

        {/* Featured Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((opportunity) => (
            <OpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity} 
              variant="featured"
            />
          ))}
        </div>

        {/* CTA */}
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
