import Link from "next/link"
import { ArrowRight, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResourceVideoCard } from "@/components/resources/resource-video-card"
import type { ResourceVideo } from "@/lib/resource-videos"

type ResourcesSectionProps = {
  videos: ResourceVideo[]
}

export function ResourcesSection({ videos }: ResourcesSectionProps) {
  const preview = videos.slice(0, 4)

  return (
    <section className="py-10 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end md:gap-6">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 md:mb-4">
              <Video className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Free Resources</Badge>
            </div>
            <h2 className="mb-2 font-serif text-2xl font-bold text-foreground md:text-4xl">
              Application Resources
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              Watch expert video guides to help you craft winning applications and advance your career.
            </p>
          </div>
          <Button variant="outline" className="w-fit shrink-0 gap-2" asChild>
            <Link href="/resources">
              View All Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {preview.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center text-sm text-muted-foreground">
            Video resources will appear here once published from the admin panel.
          </p>
        ) : (
          <>
            <div className="space-y-3 md:hidden">
              {preview.map((video) => (
                <ResourceVideoCard key={video.id} video={video} compact />
              ))}
            </div>
            <div className="hidden gap-6 md:grid sm:grid-cols-2 lg:grid-cols-4">
              {preview.map((video) => (
                <ResourceVideoCard key={video.id} video={video} compact />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
