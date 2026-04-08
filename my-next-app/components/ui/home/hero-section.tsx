"use client"

import { useRef, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HeroFootstepsTrail } from "@/components/ui/home/hero-footsteps-trail"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      {/* Gradient Background with Arch Pattern */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-plum-light to-rose opacity-95" />

      <HeroFootstepsTrail containerRef={heroRef} />

      {/* Decorative Arch Elements */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 border-[3px] border-primary-foreground/10 rounded-full" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 border-[3px] border-primary-foreground/10 rounded-full" />
        <div className="absolute -bottom-10 right-1/4 w-48 h-48 border-[3px] border-primary-foreground/10 rounded-full" />
        
        {/* Arch/Gateway Design */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] border-t-[3px] border-l-[3px] border-r-[3px] border-primary-foreground/15 rounded-t-full hidden lg:block" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-6 leading-tight text-balance">
            Her Kadam: Every Step Builds Her Power
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            Your central hub for scholarships, fellowships, jobs, grants, and leadership programs. Every step forward empowers her journey.
          </p>

          {/* Search Box */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-40 h-12">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scholarships">Scholarships</SelectItem>
                  <SelectItem value="fellowships">Fellowships</SelectItem>
                  <SelectItem value="jobs">Jobs</SelectItem>
                  <SelectItem value="internships">Internships</SelectItem>
                  <SelectItem value="grants">Grants</SelectItem>
                  <SelectItem value="conferences">Conferences</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-40 h-12">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="south-america">South America</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Fully Funded", "Graduate", "STEM", "Leadership", "Research"].map((tag) => (
                <Button key={tag} variant="secondary" size="sm" className="rounded-full text-xs">
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12">
            {[
              { value: "500+", label: "Opportunities" },
              { value: "50+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
