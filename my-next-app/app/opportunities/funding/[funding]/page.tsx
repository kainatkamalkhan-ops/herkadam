import { notFound, redirect } from "next/navigation"
import { FUNDING_FROM_SLUG } from "@/lib/opportunity-search-params"

interface PageProps {
  params: Promise<{ funding: string }>
}

export default async function OpportunityFundingPage({ params }: PageProps) {
  const { funding } = await params
  const slug = funding.toLowerCase()

  if (!FUNDING_FROM_SLUG[slug]) {
    notFound()
  }

  redirect(`/opportunities?funding=${slug}`)
}
