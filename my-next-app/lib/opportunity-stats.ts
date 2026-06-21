import type { Opportunity } from "@/components/opportunities/opportunity-card"
import { OPPORTUNITY_REGIONS, OPPORTUNITY_TYPES } from "@/lib/opportunity-constants"

/** Plural labels used in category cards → singular DB values */
const TYPE_CARD_TO_VALUE: Record<string, string> = {
  Scholarships: "Scholarship",
  Fellowships: "Fellowship",
  Jobs: "Job",
  Internships: "Internship",
  Grants: "Grant",
  Conferences: "Conference",
  Others: "Other",
}

export function countOpportunitiesByRegion(
  opportunities: Opportunity[],
  region: string,
): number {
  return opportunities.filter((o) => o.region === region).length
}

export function countOpportunitiesByTypeCardLabel(
  opportunities: Opportunity[],
  cardLabel: string,
): number {
  const value = TYPE_CARD_TO_VALUE[cardLabel] ?? cardLabel
  return opportunities.filter((o) => o.type === value).length
}

export function countOpportunitiesByFunding(
  opportunities: Opportunity[],
  funding: string,
): number {
  return opportunities.filter((o) => o.fundingType === funding).length
}

export function regionSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export function typeSlugFromCardLabel(cardLabel: string): string {
  const value = TYPE_CARD_TO_VALUE[cardLabel] ?? cardLabel
  const entry = OPPORTUNITY_TYPES.find((t) => t === value)
  if (!entry) return cardLabel.toLowerCase()
  const slugMap: Record<string, string> = {
    Scholarship: "scholarships",
    Fellowship: "fellowships",
    Job: "jobs",
    Internship: "internships",
    Grant: "grants",
    Conference: "conferences",
    Other: "other",
  }
  return slugMap[entry] ?? entry.toLowerCase()
}

export function fundingSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export { OPPORTUNITY_REGIONS, OPPORTUNITY_TYPES }
