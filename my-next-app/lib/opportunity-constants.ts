/** Canonical values — must match dropdowns, filters, and Supabase rows */

export const OPPORTUNITY_TYPES = [
  "Scholarship",
  "Fellowship",
  "Job",
  "Internship",
  "Grant",
  "Exchange Program",
  "Conference",
  "Other",
] as const

export const OPPORTUNITY_TYPE_PLURAL_TO_SINGULAR: Record<string, string> = {
  Scholarships: "Scholarship",
  Fellowships: "Fellowship",
  Jobs: "Job",
  Internships: "Internship",
  Grants: "Grant",
  "Exchange Programs": "Exchange Program",
  Conferences: "Conference",
  Others: "Other",
}

export const OPPORTUNITY_TYPE_SINGULAR_TO_SLUG: Record<string, string> = {
  Scholarship: "scholarships",
  Fellowship: "fellowships",
  Job: "jobs",
  Internship: "internships",
  Grant: "grants",
  "Exchange Program": "exchange-programs",
  Conference: "conferences",
  Other: "other",
}

/** Plural pill labels for homepage filters and quiz (excludes Other) */
export const OPPORTUNITY_TYPE_FILTER_PILLS = [
  "Scholarships",
  "Fellowships",
  "Jobs",
  "Internships",
  "Grants",
  "Exchange Programs",
  "Conferences",
] as const

/** Lowercase list for meta descriptions and body copy */
export const OPPORTUNITY_TYPES_MARKETING_LIST =
  "scholarships, fellowships, jobs, internships, grants, exchange programs, and conferences"

export const OPPORTUNITY_TYPES_HERO_HEADLINE =
  "Scholarships, Fellowships, Conferences and more — exclusively for Women."

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
