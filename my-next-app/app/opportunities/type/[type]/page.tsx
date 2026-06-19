import { notFound, redirect } from "next/navigation"
import { TYPE_FROM_SLUG } from "@/lib/opportunity-search-params"

interface PageProps {
  params: Promise<{ type: string }>
}

export default async function OpportunityTypePage({ params }: PageProps) {
  const { type } = await params
  const slug = type.toLowerCase()

  if (!TYPE_FROM_SLUG[slug]) {
    notFound()
  }

  redirect(`/opportunities?type=${slug}`)
}
