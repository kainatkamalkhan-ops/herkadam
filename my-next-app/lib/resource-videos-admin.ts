import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { parseYoutubeVideoId } from "@/lib/youtube"

export type CreateResourceVideoInput = {
  title: string
  description?: string
  youtubeUrl: string
  sortOrder?: number
}

function resourceVideosTable(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_RESOURCE_VIDEOS_TABLE?.trim() || "resource_videos"
}

export async function createResourceVideo(
  input: CreateResourceVideoInput,
): Promise<{ id: string } | { error: string }> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return {
      error:
        "Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    }
  }

  const youtubeUrl = input.youtubeUrl.trim()
  if (!parseYoutubeVideoId(youtubeUrl)) {
    return { error: "Enter a valid YouTube video URL." }
  }

  const row = {
    title: input.title.trim(),
    description: input.description?.trim() || null,
    youtube_url: youtubeUrl,
    sort_order: input.sortOrder ?? 0,
    published: true,
    published_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from(resourceVideosTable())
    .insert(row)
    .select("id")
    .single()

  if (error) {
    return { error: error.message }
  }

  return { id: String(data.id) }
}
