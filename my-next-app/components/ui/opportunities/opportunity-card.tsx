"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface Opportunity {
  id: string
  title: string
  organization: string
  location: string
  deadline: string
  type: string
  fundingType: string
  region: string
  description: string
  isFeatured?: boolean
  image?: string
}

interface OpportunityCardProps {
  opportunity: Opportunity
  variant?: "default" | "featured" | "compact" | "dense"
}

const fundingColors: Record<string, string> = {
  "Fully Funded": "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  "Partially Funded": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Self-Funded": "bg-slate-100 text-slate-800 hover:bg-slate-100",
}

const typeColors: Record<string, string> = {
  "Scholarship": "bg-primary/10 text-primary hover:bg-primary/10",
  "Fellowship": "bg-accent/20 text-accent-foreground hover:bg-accent/20",
  "Job": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Internship": "bg-purple-100 text-purple-800 hover:bg-purple-100",
  "Grant": "bg-rose-100 text-rose-800 hover:bg-rose-100",
  "Conference": "bg-orange-100 text-orange-800 hover:bg-orange-100",
}

// Generate a placeholder image URL based on opportunity type
function getOpportunityImage(opportunity: Opportunity): string {
  const images: Record<string, string> = {
    "Scholarship": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop",
    "Fellowship": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
    "Job": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    "Internship": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop",
    "Grant": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop",
    "Conference": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
  }
  return opportunity.image || images[opportunity.type] || images["Scholarship"]
}

export function OpportunityCard({ opportunity, variant = "default" }: OpportunityCardProps) {
  const daysUntilDeadline = Math.ceil(
    (new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline > 0

  if (variant === "compact") {
    return (
      <Link href={`/opportunities/${opportunity.id}`} className="block group">
        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={getOpportunityImage(opportunity)}
              alt={opportunity.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {opportunity.title}
            </h4>
            <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {opportunity.location}
              </span>
              <span className={`text-xs flex items-center gap-1 ${isUrgent ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                <Clock className="h-3 w-3" />
                {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : "Expired"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "dense") {
    return (
      <Card className="group hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="aspect-[5/4] w-full max-h-40 overflow-hidden sm:max-h-36">
          <Image
            src={getOpportunityImage(opportunity)}
            alt={opportunity.title}
            width={320}
            height={256}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardContent className="p-3 sm:p-3.5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge className={`${typeColors[opportunity.type] || "bg-muted"} text-[10px] px-1.5 py-0 h-5`} variant="secondary">
              {opportunity.type}
            </Badge>
            <Badge className={`${fundingColors[opportunity.fundingType] || "bg-muted"} text-[10px] px-1.5 py-0 h-5`} variant="secondary">
              {opportunity.fundingType}
            </Badge>
          </div>

          <h3 className="font-serif text-sm sm:text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {opportunity.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{opportunity.organization}</p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">{opportunity.location}</span>
          </div>
        </CardContent>

        <CardFooter className="px-3 py-2 sm:px-3.5 bg-muted/30 flex items-center justify-between gap-2">
          <div className={`flex items-center gap-1 text-xs min-w-0 ${isUrgent ? "text-destructive font-medium" : "text-muted-foreground"}`}>
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {new Date(opportunity.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            {isUrgent && <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4 shrink-0">Urgent</Badge>}
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-0.5 shrink-0 group-hover:gap-1 transition-all" asChild>
            <Link href={`/opportunities/${opportunity.id}`}>
              View
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${variant === "featured" ? "border-primary/30 bg-gradient-to-br from-card to-secondary/30" : ""}`}>
      {/* Square Image */}
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={getOpportunityImage(opportunity)}
          alt={opportunity.title}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="p-5">
        {/* Type and Funding Badges - Below Image */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={typeColors[opportunity.type] || "bg-muted"} variant="secondary">
            {opportunity.type}
          </Badge>
          <Badge className={fundingColors[opportunity.fundingType] || "bg-muted"} variant="secondary">
            {opportunity.fundingType}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {opportunity.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{opportunity.organization}</p>

        {/* Location Only */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {opportunity.location}
        </div>
      </CardContent>

      <CardFooter className="px-5 py-4 bg-muted/30 flex items-center justify-between">
        <div className={`flex items-center gap-1.5 text-sm ${isUrgent ? "text-destructive font-medium" : "text-muted-foreground"}`}>
          <Calendar className="h-4 w-4" />
          <span>{new Date(opportunity.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          {isUrgent && <Badge variant="destructive" className="ml-2 text-xs">Urgent</Badge>}
        </div>
        <Button variant="ghost" size="sm" className="gap-1 group-hover:gap-2 transition-all" asChild>
          <Link href={`/opportunities/${opportunity.id}`}>
            View
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
