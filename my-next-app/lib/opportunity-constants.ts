/** Canonical values — must match dropdowns, filters, and Supabase rows */

export const OPPORTUNITY_TYPES = [
  "Scholarship",
  "Fellowship",
  "Job",
  "Internship",
  "Grant",
  "Conference",
] as const

export const OPPORTUNITY_REGIONS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Global",
] as const

export const FUNDING_TYPES = [
  "Fully Funded",
  "Partially Funded",
  "Self-Funded",
] as const

export type OpportunityType = (typeof OPPORTUNITY_TYPES)[number]
export type OpportunityRegion = (typeof OPPORTUNITY_REGIONS)[number]
export type FundingType = (typeof FUNDING_TYPES)[number]
