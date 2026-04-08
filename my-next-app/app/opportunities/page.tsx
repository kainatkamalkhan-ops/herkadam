"use client"

import { useState } from "react"
import { Search, Filter, SlidersHorizontal, Grid, List, X } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OpportunityCard } from "@/components/opportunities/opportunity-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { opportunities } from "@/lib/data"

const types = ["All Types", "Scholarship", "Fellowship", "Job", "Internship", "Grant", "Conference"]
const regions = ["All Regions", "Global", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"]
const funding = ["All Funding", "Fully Funded", "Partially Funded", "Self-Funded"]

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedFunding, setSelectedFunding] = useState("All Funding")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("deadline")

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All Types" || opp.type === selectedType
    const matchesRegion = selectedRegion === "All Regions" || opp.region === selectedRegion
    const matchesFunding = selectedFunding === "All Funding" || opp.fundingType === selectedFunding
    
    return matchesSearch && matchesType && matchesRegion && matchesFunding
  })

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    }
    return a.title.localeCompare(b.title)
  })

  const activeFilters = [
    selectedType !== "All Types" && selectedType,
    selectedRegion !== "All Regions" && selectedRegion,
    selectedFunding !== "All Funding" && selectedFunding,
  ].filter(Boolean)

  const clearFilters = () => {
    setSelectedType("All Types")
    setSelectedRegion("All Regions")
    setSelectedFunding("All Funding")
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Explore Opportunities
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Browse through hundreds of scholarships, fellowships, jobs, and grants designed for women worldwide.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search & Filters */}
          <div className="bg-card rounded-2xl border border-border p-4 md:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by keyword, organization, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-40 h-12">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full sm:w-40 h-12">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedFunding} onValueChange={setSelectedFunding}>
                  <SelectTrigger className="w-full sm:w-44 h-12">
                    <SelectValue placeholder="Funding" />
                  </SelectTrigger>
                  <SelectContent>
                    {funding.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {activeFilters.filter(Boolean).map((filter) => (
  <Badge key={String(filter)} variant="secondary" className="gap-1">
    {filter}
  </Badge>
))}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive hover:text-destructive">
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{sortedOpportunities.length}</span> opportunities
            </p>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Sort by Deadline</SelectItem>
                  <SelectItem value="title">Sort by Title</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Grid/List */}
          {sortedOpportunities.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {sortedOpportunities.map((opportunity) => (
                <OpportunityCard 
                  key={opportunity.id} 
                  opportunity={opportunity}
                  variant={viewMode === "list" ? "compact" : "default"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms to find more opportunities.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
