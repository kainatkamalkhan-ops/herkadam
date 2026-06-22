import type { Opportunity } from "@/components/opportunities/opportunity-card"
import {
  OPPORTUNITY_REGIONS,
  OPPORTUNITY_TYPES,
  OPPORTUNITY_TYPE_PLURAL_TO_SINGULAR,
  OPPORTUNITY_TYPE_SINGULAR_TO_SLUG,
} from "@/lib/opportunity-constants"

/** Plural labels used in category cards → singular DB values */
const TYPE_CARD_TO_VALUE = OPPORTUNITY_TYPE_PLURAL_TO_SINGULAR

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
  return OPPORTUNITY_TYPE_SINGULAR_TO_SLUG[entry] ?? entry.toLowerCase()
}

export function fundingSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export { OPPORTUNITY_REGIONS, OPPORTUNITY_TYPES }
