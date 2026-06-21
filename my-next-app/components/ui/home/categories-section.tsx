"use client"

import Link from "next/link"
import {
  Globe,
  GraduationCap,
  Briefcase,
  Users,
  Lightbulb,
  Calendar,
  DollarSign,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { regions, opportunityTypes } from "@/lib/data"
import type { Opportunity } from "@/components/opportunities/opportunity-card"
import {
  countOpportunitiesByFunding,
  countOpportunitiesByRegion,
  countOpportunitiesByTypeCardLabel,
  fundingSlug,
  regionSlug,
  typeSlugFromCardLabel,
} from "@/lib/opportunity-stats"

const typeIcons: Record<string, React.ElementType> = {
  Scholarships: GraduationCap,
  Fellowships: Users,
  Jobs: Briefcase,
  Internships: Lightbulb,
  Grants: DollarSign,
  Conferences: Calendar,
  Others: Lightbulb,
}

const fundingTypes = [
  { name: "Fully Funded", description: "Complete financial coverage" },
  { name: "Partially Funded", description: "Partial financial support" },
  { name: "Self-Funded", description: "Personal investment required" },
]

function CategoryListRow({
  href,
  icon: Icon,
  title,
  description,
  count,
}: {
  href: string
  icon: React.ElementType
  title: string
  description: string
  count: number
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-muted/40"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
      <span className="shrink-0 text-sm font-semibold text-primary">{count}</span>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  )
}

export function CategoriesSection({
  opportunities = [],
}: {
  opportunities?: Opportunity[]
}) {
  return (
    <section className="py-10 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Browse by Category
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Find opportunities that match your interests, location, and funding needs.
          </p>
        </div>

        <Tabs defaultValue="region" className="w-full">
          <TabsList className="mb-5 grid h-auto w-full max-w-md mx-auto grid-cols-3 md:mb-10">
            <TabsTrigger value="region" className="text-xs sm:text-sm">
              Region
            </TabsTrigger>
            <TabsTrigger value="type" className="text-xs sm:text-sm">
              Type
            </TabsTrigger>
            <TabsTrigger value="funding" className="text-xs sm:text-sm">
              Funding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="region">
            <div className="space-y-2 md:hidden">
              {regions.map((region) => (
                <CategoryListRow
                  key={region.name}
                  href={`/opportunities/region/${regionSlug(region.name)}`}
                  icon={Globe}
                  title={region.name}
                  description={region.description}
                  count={countOpportunitiesByRegion(opportunities, region.name)}
                />
              ))}
            </div>
            <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {regions.map((region) => (
                <Link key={region.name} href={`/opportunities/region/${regionSlug(region.name)}`}>
                  <Card className="group h-full transition-all hover:border-primary/30 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-serif text-2xl font-bold text-primary">
                          {countOpportunitiesByRegion(opportunities, region.name)}
                        </span>
                      </div>
                      <h3 className="mb-1 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {region.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{region.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="type">
            <div className="space-y-2 md:hidden">
              {opportunityTypes.map((type) => {
                const Icon = typeIcons[type.name] || GraduationCap
                return (
                  <CategoryListRow
                    key={type.name}
                    href={`/opportunities/type/${typeSlugFromCardLabel(type.name)}`}
                    icon={Icon}
                    title={type.name}
                    description={type.description}
                    count={countOpportunitiesByTypeCardLabel(opportunities, type.name)}
                  />
                )
              })}
            </div>
            <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {opportunityTypes.map((type) => {
                const Icon = typeIcons[type.name] || GraduationCap
                return (
                  <Link key={type.name} href={`/opportunities/type/${typeSlugFromCardLabel(type.name)}`}>
                    <Card className="group h-full transition-all hover:border-primary/30 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                            <Icon className="h-6 w-6 text-accent-foreground" />
                          </div>
                          <span className="font-serif text-2xl font-bold text-primary">
                            {countOpportunitiesByTypeCardLabel(opportunities, type.name)}
                          </span>
                        </div>
                        <h3 className="mb-1 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                          {type.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="funding">
            <div className="space-y-2 md:hidden">
              {fundingTypes.map((funding) => (
                <CategoryListRow
                  key={funding.name}
                  href={`/opportunities/funding/${fundingSlug(funding.name)}`}
                  icon={DollarSign}
                  title={funding.name}
                  description={funding.description}
                  count={countOpportunitiesByFunding(opportunities, funding.name)}
                />
              ))}
            </div>
            <div className="mx-auto hidden max-w-3xl md:grid sm:grid-cols-3 gap-4">
              {fundingTypes.map((funding) => (
                <Link key={funding.name} href={`/opportunities/funding/${fundingSlug(funding.name)}`}>
                  <Card className="group h-full transition-all hover:border-primary/30 hover:shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <DollarSign className="h-8 w-8 text-primary" />
                      </div>
                      <span className="mb-2 block font-serif text-3xl font-bold text-primary">
                        {countOpportunitiesByFunding(opportunities, funding.name)}
                      </span>
                      <h3 className="mb-1 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {funding.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{funding.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
