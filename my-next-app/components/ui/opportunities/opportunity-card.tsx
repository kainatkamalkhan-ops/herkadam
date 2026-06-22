"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

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
  summary?: string
  benefits?: string
  eligibility?: string
  requirements?: string
  impactForWomen?: string
  isFeatured?: boolean
  image?: string
  applicationLink?: string
  /** Optional YouTube URL for an opportunity walkthrough video */
  videoLink?: string
  /** ISO date — used for “newest first” when reading from JSON or DB */
  publishedAt?: string
}

interface OpportunityCardProps {
  opportunity: Opportunity
  variant?: "default" | "featured" | "compact" | "dense" | "horizontal" | "grid" | "list" | "home" | "mini" | "micro"
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
  "Exchange Program": "bg-teal-100 text-teal-800 hover:bg-teal-100",
  "Conference": "bg-orange-100 text-orange-800 hover:bg-orange-100",
  "Other": "bg-slate-100 text-slate-700 hover:bg-slate-100",
}

// Stable placeholder per type (Picsum); avoids broken Unsplash hotlinks
function getOpportunityImage(opportunity: Opportunity): string {
  const seeds: Record<string, string> = {
    Scholarship: "herkadam-scholarship",
    Fellowship: "herkadam-fellowship",
    Job: "herkadam-job",
    Internship: "herkadam-internship",
    Grant: "herkadam-grant",
    "Exchange Program": "herkadam-exchange",
    Conference: "herkadam-conference",
    Other: "herkadam-other",
  }
  const seed = seeds[opportunity.type] ?? "herkadam-default"
  return (
    opportunity.image ||
    `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/400`
  )
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

  if (variant === "horizontal" || variant === "list" || variant === "grid" || variant === "home") {
    return (
      <Link href={`/opportunities/${opportunity.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/25 hover:shadow-sm">
          <div className="flex items-center gap-3 p-3">
            <div className="h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:h-20 sm:w-20">
              <Image
                src={getOpportunityImage(opportunity)}
                alt={opportunity.title}
                width={80}
                height={80}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap gap-1">
                <Badge
                  className={`${typeColors[opportunity.type] || "bg-muted"} h-4 px-1.5 py-0 text-[9px]`}
                  variant="secondary"
                >
                  {opportunity.type}
                </Badge>
                <Badge
                  className={`${fundingColors[opportunity.fundingType] || "bg-muted"} h-4 px-1.5 py-0 text-[9px]`}
                  variant="secondary"
                >
                  {opportunity.fundingType}
                </Badge>
              </div>
              <h3 className="line-clamp-2 font-serif text-sm font-semibold leading-snug text-foreground group-hover:text-primary sm:text-[15px]">
                {opportunity.title}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{opportunity.organization}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                <span className="flex min-w-0 items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{opportunity.location}</span>
                </span>
                <span
                  className={`flex shrink-0 items-center gap-1 ${isUrgent ? "font-medium text-destructive" : ""}`}
                >
                  <Calendar className="h-3 w-3" />
                  {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  if (variant === "micro") {
    return (
      <Link href={`/opportunities/${opportunity.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex items-stretch gap-2 p-2">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-md">
              <Image
                src={getOpportunityImage(opportunity)}
                alt={opportunity.title}
                width={44}
                height={44}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
              <Badge
                className={`${typeColors[opportunity.type] || "bg-muted"} h-3.5 w-fit px-1 py-0 text-[8px] leading-none`}
                variant="secondary"
              >
                {opportunity.type}
              </Badge>
              <h3 className="line-clamp-2 font-serif text-[11px] font-semibold leading-tight text-foreground group-hover:text-primary">
                {opportunity.title}
              </h3>
              <p className="line-clamp-1 text-[9px] text-muted-foreground">{opportunity.organization}</p>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  if (variant === "mini") {
    return (
      <Link href={`/opportunities/${opportunity.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/25 hover:shadow-md">
          <div className="aspect-[5/3] max-h-24 w-full overflow-hidden">
            <Image
              src={getOpportunityImage(opportunity)}
              alt={opportunity.title}
              width={240}
              height={144}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <CardContent className="space-y-1.5 p-2.5">
            <div className="flex flex-wrap gap-1">
              <Badge
                className={`${typeColors[opportunity.type] || "bg-muted"} h-4 px-1.5 py-0 text-[9px]`}
                variant="secondary"
              >
                {opportunity.type}
              </Badge>
            </div>

            <h3 className="line-clamp-2 font-serif text-xs font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {opportunity.title}
            </h3>
            <p className="line-clamp-1 text-[10px] text-muted-foreground">{opportunity.organization}</p>

            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="h-2.5 w-2.5 shrink-0" />
              <span className="line-clamp-1">{opportunity.location}</span>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 px-2.5 py-1.5">
            <span
              className={`flex min-w-0 items-center gap-1 text-[10px] ${isUrgent ? "font-medium text-destructive" : "text-muted-foreground"}`}
            >
              <Calendar className="h-2.5 w-2.5 shrink-0" />
              <span className="truncate">
                {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </span>
          </CardFooter>
        </Card>
      </Link>
    )
  }

  if (variant === "dense") {
    return (
      <Link href={`/opportunities/${opportunity.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/25 hover:shadow-md">
        <div className="aspect-[5/4] w-full max-h-40 overflow-hidden sm:max-h-36">
          <Image
            src={getOpportunityImage(opportunity)}
            alt={opportunity.title}
            width={320}
            height={256}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-3 sm:p-3.5">
          <div className="mb-2 flex flex-wrap gap-1">
            <Badge
              className={`${typeColors[opportunity.type] || "bg-muted"} h-5 px-1.5 py-0 text-[10px]`}
              variant="secondary"
            >
              {opportunity.type}
            </Badge>
            <Badge
              className={`${fundingColors[opportunity.fundingType] || "bg-muted"} h-5 px-1.5 py-0 text-[10px]`}
              variant="secondary"
            >
              {opportunity.fundingType}
            </Badge>
          </div>

          <h3 className="mb-1 line-clamp-2 font-serif text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base">
            {opportunity.title}
          </h3>
          <p className="mb-2 line-clamp-1 text-xs text-muted-foreground">{opportunity.organization}</p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">{opportunity.location}</span>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 px-3 py-2 sm:px-3.5">
          <div
            className={`flex min-w-0 items-center gap-1 text-xs ${
              isUrgent ? "font-medium text-destructive" : "text-muted-foreground"
            }`}
          >
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {isUrgent && (
              <Badge variant="destructive" className="h-4 shrink-0 px-1 py-0 text-[10px]">
                Urgent
              </Badge>
            )}
          </div>
        </CardFooter>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/opportunities/${opportunity.id}`} className="group block h-full">
      <Card className={`h-full overflow-hidden transition-all duration-300 hover:border-primary/25 hover:shadow-lg ${variant === "featured" ? "border-primary/30 bg-gradient-to-br from-card to-secondary/30" : ""}`}>
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

      <CardFooter className="bg-muted/30 px-5 py-4">
        <div className={`flex items-center gap-1.5 text-sm ${isUrgent ? "text-destructive font-medium" : "text-muted-foreground"}`}>
          <Calendar className="h-4 w-4" />
          <span>{new Date(opportunity.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          {isUrgent && <Badge variant="destructive" className="ml-2 text-xs">Urgent</Badge>}
        </div>
      </CardFooter>
    </Card>
    </Link>
  )
}
