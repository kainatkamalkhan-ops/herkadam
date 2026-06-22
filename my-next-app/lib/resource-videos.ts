import { getSupabaseAnon } from "@/lib/supabase/server"
import { parseYoutubeVideoId } from "@/lib/youtube"

export type ResourceVideo = {
  id: string
  title: string
  description: string | null
  youtubeUrl: string
  sortOrder: number
  publishedAt: string
}

function resourceVideosTable(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_RESOURCE_VIDEOS_TABLE?.trim() || "resource_videos"
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

function rowToResourceVideo(row: Record<string, unknown>): ResourceVideo | null {
  const id = pick<string>(row, "id", "id")
  const title = pick<string>(row, "title", "title")
  const youtubeUrl = pick<string>(row, "youtube_url", "youtubeUrl")

  if (!id || !title || !youtubeUrl || !parseYoutubeVideoId(youtubeUrl)) {
    return null
  }

  const description = pick<string>(row, "description", "description") ?? null
  const sortOrder = pick<number>(row, "sort_order", "sortOrder") ?? 0
  const publishedAt =
    pick<string>(row, "published_at", "publishedAt") ?? new Date().toISOString()

  return {
    id,
    title,
    description,
    youtubeUrl,
    sortOrder,
    publishedAt,
  }
}

export async function getResourceVideos(options?: {
  limit?: number
}): Promise<ResourceVideo[]> {
  const supabase = getSupabaseAnon()
  if (!supabase) return []

  let query = supabase
    .from(resourceVideosTable())
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false })

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error || !data) {
    console.error("[resource_videos] fetch failed:", error?.message)
    return []
  }

  return data
    .map((row) => rowToResourceVideo(row as Record<string, unknown>))
    .filter((video): video is ResourceVideo => video !== null)
}
