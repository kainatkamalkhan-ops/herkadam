import { Suspense } from "react"
import { OpportunitiesClient } from "./opportunities-client"
import { getOpportunities } from "@/lib/opportunities"

export const revalidate = 120

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities()
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <OpportunitiesClient opportunities={opportunities} />
    </Suspense>
  )
}
