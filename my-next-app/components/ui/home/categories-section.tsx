"use client"

import Link from "next/link"
import { 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Lightbulb, 
  Calendar,
  MapPin,
  DollarSign,
  ArrowRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { regions, opportunityTypes } from "@/lib/data"

const typeIcons: Record<string, React.ElementType> = {
  Scholarships: GraduationCap,
  Fellowships: Users,
  Jobs: Briefcase,
  Internships: Lightbulb,
  Grants: DollarSign,
  Conferences: Calendar,
}

const fundingTypes = [
  { name: "Fully Funded", count: 245, description: "Complete financial coverage" },
  { name: "Partially Funded", count: 178, description: "Partial financial support" },
  { name: "Self-Funded", count: 89, description: "Personal investment required" },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground">
            Find opportunities that match your interests, location, and funding needs.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="region" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-10">
            <TabsTrigger value="region">By Region</TabsTrigger>
            <TabsTrigger value="type">By Type</TabsTrigger>
            <TabsTrigger value="funding">By Funding</TabsTrigger>
          </TabsList>

          {/* By Region */}
          <TabsContent value="region">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {regions.map((region) => (
                <Link key={region.name} href={`/opportunities/region/${region.name.toLowerCase().replace(" ", "-")}`}>
                  <Card className="group hover:shadow-md hover:border-primary/30 transition-all h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-primary">{region.count}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {region.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{region.description}</p>
                      <div className="flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Explore</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* By Type */}
          <TabsContent value="type">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {opportunityTypes.map((type) => {
                const Icon = typeIcons[type.name] || GraduationCap
                return (
                  <Link key={type.name} href={`/opportunities/type/${type.name.toLowerCase()}`}>
                    <Card className="group hover:shadow-md hover:border-primary/30 transition-all h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-accent-foreground" />
                          </div>
                          <span className="text-2xl font-serif font-bold text-primary">{type.count}</span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {type.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                        <div className="flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View All</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </TabsContent>

          {/* By Funding */}
          <TabsContent value="funding">
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {fundingTypes.map((funding) => (
                <Link key={funding.name} href={`/opportunities/funding/${funding.name.toLowerCase().replace(" ", "-")}`}>
                  <Card className="group hover:shadow-md hover:border-primary/30 transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="h-8 w-8 text-primary" />
                      </div>
                      <span className="text-3xl font-serif font-bold text-primary block mb-2">{funding.count}</span>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
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
