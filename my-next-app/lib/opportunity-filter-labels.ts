import {
  OPPORTUNITY_TYPES,
  OPPORTUNITY_TYPE_FILTER_PILLS,
  OPPORTUNITY_TYPE_PLURAL_TO_SINGULAR,
} from "@/lib/opportunity-constants"

/** Plural pill labels used on homepage filters and quiz Q1 */
export const HOMEPAGE_TYPE_FILTERS = [
  "All",
  ...OPPORTUNITY_TYPE_FILTER_PILLS,
  "Others",
] as const

export type HomepageTypeFilter = (typeof HOMEPAGE_TYPE_FILTERS)[number]

const PLURAL_TO_SINGULAR = OPPORTUNITY_TYPE_PLURAL_TO_SINGULAR

const SINGULAR_TO_PLURAL = Object.fromEntries(
  Object.entries(PLURAL_TO_SINGULAR).map(([plural, singular]) => [singular, plural]),
)

/** Quiz + filter pill label → canonical DB type value */
export function filterLabelToOpportunityType(label: string): string | null {
  if (label === "All") return null
  if (PLURAL_TO_SINGULAR[label]) return PLURAL_TO_SINGULAR[label]
  if ((OPPORTUNITY_TYPES as readonly string[]).includes(label)) return label
  return null
}

export function opportunityTypeToFilterLabel(type: string): string {
  return SINGULAR_TO_PLURAL[type] ?? type
}

export function matchesTypeFilter(opportunityType: string, filter: HomepageTypeFilter): boolean {
  if (filter === "All") return true
  const canonical = filterLabelToOpportunityType(filter)
  return canonical === opportunityType
}

export function matchesTypeFilters(opportunityType: string, filters: string[]): boolean {
  if (!filters.length) return true
  const canonicalTypes = filters
    .map(filterLabelToOpportunityType)
    .filter((t): t is string => Boolean(t))
  if (!canonicalTypes.length) return true
  return canonicalTypes.includes(opportunityType)
}
