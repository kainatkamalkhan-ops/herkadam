import { randomUUID } from "crypto"
import type {
  FundingType,
  OpportunityRegion,
  OpportunityType,
} from "@/lib/opportunity-constants"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export type CreateOpportunityInput = {
  title: string
  organization: string
  location: string
  type: OpportunityType
  region: OpportunityRegion
  fundingType: FundingType
  deadline: string
  description: string
  imageUrl?: string
  applicationLink?: string
  isFeatured: boolean
}

function opportunitiesTable(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_OPPORTUNITIES_TABLE?.trim() || "opportunities"
  )
}

export async function createOpportunity(
  input: CreateOpportunityInput,
): Promise<{ id: string } | { error: string }> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return {
      error:
        "Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    }
  }

  const id = randomUUID()
  const row = {
    id,
    title: input.title.trim(),
    organization: input.organization.trim(),
    location: input.location.trim(),
    type: input.type,
    funding_type: input.fundingType,
    region: input.region,
    deadline: input.deadline,
    description: input.description.trim(),
    image: input.imageUrl?.trim() || null,
    application_link: input.applicationLink?.trim() || null,
    is_featured: input.isFeatured,
    published: true,
    published_at: new Date().toISOString(),
  }

  const { error } = await supabase.from(opportunitiesTable()).insert(row)

  if (error) {
    return { error: error.message }
  }

  return { id }
}
