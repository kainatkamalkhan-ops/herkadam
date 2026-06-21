import type { Opportunity } from "@/components/opportunities/opportunity-card"
import { matchesTypeFilters } from "@/lib/opportunity-filter-labels"

/** Filter opportunities by quiz Q1 (types) and Q3 (region). Q2/Q4 stored for marketing only. */
export function filterOpportunitiesByQuiz(
  opportunities: Opportunity[],
  answers: { opportunityTypes: string[]; region: string },
): Opportunity[] {
  return opportunities.filter((opp) => {
    const typeOk = matchesTypeFilters(opp.type, answers.opportunityTypes)
    const regionOk =
      !answers.region ||
      opp.region === answers.region ||
      opp.region === "Global"
    return typeOk && regionOk
  })
}
