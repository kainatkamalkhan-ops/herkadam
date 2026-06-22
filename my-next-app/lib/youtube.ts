/** Extract a YouTube video ID from common watch, embed, shorts, and youtu.be URLs. */
export function parseYoutubeVideoId(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    const host = parsed.hostname.replace(/^www\./, "")

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0]
      return id || null
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const watchId = parsed.searchParams.get("v")
      if (watchId) return watchId

      const parts = parsed.pathname.split("/").filter(Boolean)
      if (parts[0] === "embed" || parts[0] === "shorts") {
        return parts[1] ?? null
      }
    }
  } catch {
    return null
  }

  return null
}

export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}

export function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0`
}
