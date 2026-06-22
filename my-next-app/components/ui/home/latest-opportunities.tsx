"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  OpportunityCard,
  type Opportunity,
} from "@/components/opportunities/opportunity-card"
import {
  HOMEPAGE_TYPE_FILTERS,
  matchesTypeFilter,
  type HomepageTypeFilter,
} from "@/lib/opportunity-filter-labels"

export function LatestOpportunities({
  opportunities,
}: {
  opportunities: Opportunity[]
}) {
  const [activeFilter, setActiveFilter] = useState<HomepageTypeFilter>("All")

  const filteredOpportunities =
    activeFilter === "All"
      ? opportunities
      : opportunities.filter((opp) => matchesTypeFilter(opp.type, activeFilter))

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">Updated Daily</Badge>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1.5">
              Latest Opportunities
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl md:max-w-none md:whitespace-nowrap">
              Discover the newest scholarships, fellowships, and career opportunities updated every day.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 shrink-0" asChild>
            <Link href="/opportunities">
              View All Opportunities
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1.5">
          <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          {HOMEPAGE_TYPE_FILTERS.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "secondary"}
              size="sm"
              className="rounded-full shrink-0 h-8 text-xs px-3"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Opportunities Grid — 12 compact cards visible together */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4 lg:gap-2.5">
          {filteredOpportunities.slice(0, 12).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} variant="micro" />
          ))}
        </div>

        {/* More opportunities → paginated listing */}
        <div className="flex justify-center mt-6">
          <Button variant="outline" size="default" className="text-sm" asChild>
            <Link href="/opportunities">More Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
