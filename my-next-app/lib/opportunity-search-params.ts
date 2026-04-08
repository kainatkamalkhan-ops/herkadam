/** URL slugs used in nav links → filter values on /opportunities */

export const TYPE_FROM_SLUG: Record<string, string> = {
  scholarships: "Scholarship",
  fellowships: "Fellowship",
  jobs: "Job",
  internships: "Internship",
  grants: "Grant",
  conferences: "Conference",
}

export const REGION_FROM_SLUG: Record<string, string> = {
  africa: "Africa",
  asia: "Asia",
  europe: "Europe",
  "north-america": "North America",
  "south-america": "South America",
  oceania: "Oceania",
  global: "Global",
}

export const FUNDING_FROM_SLUG: Record<string, string> = {
  "fully-funded": "Fully Funded",
  "partially-funded": "Partially Funded",
  "self-funded": "Self-Funded",
}

const TYPE_TO_SLUG = Object.fromEntries(
  Object.entries(TYPE_FROM_SLUG).map(([slug, label]) => [label, slug]),
) as Record<string, string>

const REGION_TO_SLUG = Object.fromEntries(
  Object.entries(REGION_FROM_SLUG).map(([slug, label]) => [label, slug]),
) as Record<string, string>

const FUNDING_TO_SLUG = Object.fromEntries(
  Object.entries(FUNDING_FROM_SLUG).map(([slug, label]) => [label, slug]),
) as Record<string, string>

export function opportunitiesQueryFromFilters(input: {
  selectedType: string
  selectedRegion: string
  selectedFunding: string
  searchQuery: string
  featuredOnly: boolean
}): string {
  const params = new URLSearchParams()
  if (input.selectedType !== "All Types") {
    const slug = TYPE_TO_SLUG[input.selectedType]
    if (slug) params.set("type", slug)
  }
  if (input.selectedRegion !== "All Regions") {
    const slug = REGION_TO_SLUG[input.selectedRegion]
    if (slug) params.set("region", slug)
  }
  if (input.selectedFunding !== "All Funding") {
    const slug = FUNDING_TO_SLUG[input.selectedFunding]
    if (slug) params.set("funding", slug)
  }
  if (input.searchQuery.trim()) {
    params.set("q", input.searchQuery.trim())
  }
  if (input.featuredOnly) {
    params.set("featured", "true")
  }
  return params.toString()
}

export function filtersFromSearchParams(searchParams: URLSearchParams): {
  selectedType: string
  selectedRegion: string
  selectedFunding: string
  searchQuery: string
  featuredOnly: boolean
} {
  const typeSlug = searchParams.get("type")?.toLowerCase() ?? ""
  const regionSlug = searchParams.get("region")?.toLowerCase() ?? ""
  const fundingSlug = searchParams.get("funding")?.toLowerCase() ?? ""

  return {
    selectedType: TYPE_FROM_SLUG[typeSlug] ?? "All Types",
    selectedRegion: REGION_FROM_SLUG[regionSlug] ?? "All Regions",
    selectedFunding: FUNDING_FROM_SLUG[fundingSlug] ?? "All Funding",
    searchQuery: searchParams.get("q") ?? "",
    featuredOnly: searchParams.get("featured") === "true",
  }
}
