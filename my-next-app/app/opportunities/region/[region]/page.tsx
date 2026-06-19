import { notFound, redirect } from "next/navigation"
import { REGION_FROM_SLUG } from "@/lib/opportunity-search-params"

interface PageProps {
  params: Promise<{ region: string }>
}

export default async function OpportunityRegionPage({ params }: PageProps) {
  const { region } = await params
  const slug = region.toLowerCase()

  if (!REGION_FROM_SLUG[slug]) {
    notFound()
  }

  redirect(`/opportunities?region=${slug}`)
}
