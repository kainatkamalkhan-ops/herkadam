import type { ResourceVideo } from "@/lib/resource-videos"
import { ResourceVideoCard } from "@/components/resources/resource-video-card"

export function ResourceVideoGrid({
  videos,
  compact = false,
}: {
  videos: ResourceVideo[]
  compact?: boolean
}) {
  if (videos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-muted-foreground">
        Video resources will appear here once they are published from the admin panel.
      </p>
    )
  }

  return (
    <div
      className={
        compact
          ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {videos.map((video) => (
        <ResourceVideoCard key={video.id} video={video} compact={compact} />
      ))}
    </div>
  )
}
