import type { Opportunity } from "@/components/opportunities/opportunity-card"
import opportunitiesSeed from "@/data/opportunities.json"
import { getSupabaseAnon } from "@/lib/supabase/server"

function opportunitiesTable(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_OPPORTUNITIES_TABLE?.trim() || "opportunities"
  )
}

function pick<T = unknown>(
  row: Record<string, unknown>,
  snake: string,
  camel: string,
): T | undefined {
  const a = row[snake]
  if (a !== undefined && a !== null) return a as T
  const b = row[camel]
  if (b !== undefined && b !== null) return b as T
  return undefined
}

function rowToOpportunity(row: Record<string, unknown>): Opportunity | null {
  const idRaw = pick<string | number>(row, "id", "id")
  const id = idRaw !== undefined && idRaw !== null ? String(idRaw) : ""
  if (!id) return null

  const title = pick<string>(row, "title", "title")
  const organization = pick<string>(row, "organization", "organization")
  const location = pick<string>(row, "location", "location")
  const deadlineRaw = pick<string | Date>(row, "deadline", "deadline")
  const type = pick<string>(row, "type", "type")
  const funding_type =
    pick<string>(row, "funding_type", "fundingType") ?? ""
  const region = pick<string>(row, "region", "region")
  const description = pick<string>(row, "description", "description")

  if (
    !title ||
    !organization ||
    !location ||
    deadlineRaw === undefined ||
    !type ||
    !region ||
    !description
  ) {
    return null
  }

  const deadline =
    typeof deadlineRaw === "string"
      ? deadlineRaw.slice(0, 10)
      : deadlineRaw instanceof Date
        ? deadlineRaw.toISOString().slice(0, 10)
        : String(deadlineRaw)

  const is_featured = pick<boolean>(row, "is_featured", "isFeatured")
  const image = pick<string>(row, "image", "image")
  const published_at = pick<string>(row, "published_at", "publishedAt")

  return {
    id,
    title,
    organization,
    location,
    deadline,
    type,
    fundingType: funding_type,
    region,
    description,
    isFeatured: is_featured ?? undefined,
    image: image ?? undefined,
    publishedAt: published_at ?? undefined,
  }
}

function sortNewestFirst(list: Opportunity[]): Opportunity[] {
  return [...list].sort((a, b) => {
    const ta = a.publishedAt
      ? new Date(a.publishedAt).getTime()
      : new Date(a.deadline).getTime()
    const tb = b.publishedAt
      ? new Date(b.publishedAt).getTime()
      : new Date(b.deadline).getTime()
    return tb - ta
  })
}

function logSupabaseError(context: string, message: string) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[opportunities / ${context}] Supabase: ${message}`)
  }
}

export async function getOpportunities(): Promise<Opportunity[]> {
  const supabase = getSupabaseAnon()
  const table = opportunitiesTable()

  if (supabase) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })

    if (error) {
      logSupabaseError("getOpportunities", error.message)
    } else if (data?.length) {
      const mapped = (data as Record<string, unknown>[])
        .map(rowToOpportunity)
        .filter((o): o is Opportunity => o !== null)
      if (mapped.length) return mapped
    }
  }

  return sortNewestFirst(opportunitiesSeed as Opportunity[])
}

export async function getOpportunityById(
  id: string,
): Promise<Opportunity | undefined> {
  const supabase = getSupabaseAnon()
  const table = opportunitiesTable()

  if (supabase) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .maybeSingle()

    if (error) {
      logSupabaseError("getOpportunityById", error.message)
    } else if (data) {
      const mapped = rowToOpportunity(data as Record<string, unknown>)
      if (mapped) return mapped
    }
  }

  return (opportunitiesSeed as Opportunity[]).find((o) => o.id === id)
}
