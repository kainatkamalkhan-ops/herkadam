"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Play } from "lucide-react"
import type { ResourceVideo } from "@/lib/resource-videos"
import {
  parseYoutubeVideoId,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/youtube"
import { cn } from "@/lib/utils"

type ResourceVideoCardProps = {
  video: ResourceVideo
  compact?: boolean
  className?: string
}

export function ResourceVideoCard({ video, compact = false, className }: ResourceVideoCardProps) {
  const videoId = parseYoutubeVideoId(video.youtubeUrl)
  const [playing, setPlaying] = useState(false)

  if (!videoId) return null

  if (playing) {
    return (
      <article className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={youtubeEmbedUrl(videoId)}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className={cn("space-y-2", compact ? "p-3" : "p-4")}>
          <h3 className={cn("font-serif font-semibold text-foreground", compact ? "text-base" : "text-lg")}>
            {video.title}
          </h3>
          {video.description && (
            <p className={cn("text-muted-foreground", compact ? "text-xs line-clamp-2" : "text-sm")}>
              {video.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="text-sm font-medium text-primary hover:underline"
            >
              Show thumbnail
            </button>
            <Link
              href={youtubeWatchUrl(videoId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Open on YouTube
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="relative block w-full text-left"
        aria-label={`Watch ${video.title}`}
      >
        <div className="relative aspect-video w-full">
          <Image
            src={youtubeThumbnailUrl(videoId)}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes={compact ? "(max-width: 768px) 100vw, 280px" : "(max-width: 768px) 100vw, 400px"}
          />
          <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-white/20 transition-transform group-hover:scale-105">
              <Play className="ml-1 h-6 w-6 fill-current" aria-hidden />
            </span>
          </div>
        </div>
      </button>
      <div className={cn("space-y-2", compact ? "p-3" : "p-4")}>
        <h3 className={cn("font-serif font-semibold text-foreground", compact ? "text-base" : "text-lg")}>
          {video.title}
        </h3>
        {video.description && (
          <p className={cn("text-muted-foreground", compact ? "text-xs line-clamp-2" : "text-sm")}>
            {video.description}
          </p>
        )}
        <p className={cn("text-primary", compact ? "text-xs font-medium" : "text-sm font-medium")}>
          Click to watch
        </p>
      </div>
    </article>
  )
}
