import Image from "next/image"
import { Play } from "lucide-react"
import {
  parseYoutubeVideoId,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/youtube"

export function OpportunityYoutubeVideo({ videoLink }: { videoLink: string }) {
  const videoId = parseYoutubeVideoId(videoLink)
  if (!videoId) return null

  const watchUrl = youtubeWatchUrl(videoId)

  return (
    <section>
      <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Watch on YouTube</h2>
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-sm transition-shadow hover:shadow-md"
        aria-label="Watch this opportunity on YouTube"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={youtubeThumbnailUrl(videoId)}
            alt="YouTube video thumbnail"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-white/20 transition-transform group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
            </span>
          </div>
        </div>
        <p className="px-4 py-3 text-sm text-muted-foreground group-hover:text-foreground">
          Click to watch the full opportunity breakdown on YouTube
        </p>
      </a>
    </section>
  )
}
