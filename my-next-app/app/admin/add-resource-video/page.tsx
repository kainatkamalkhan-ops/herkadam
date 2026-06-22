"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddResourceVideoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/resource-videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        youtubeUrl,
        sortOrder: Number.parseInt(sortOrder, 10) || 0,
      }),
    })

    const data = (await res.json()) as { error?: string }

    setLoading(false)

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.")
      return
    }

    router.push("/resources")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Her Kadam Admin</p>
            <h1 className="font-serif text-2xl font-bold text-foreground">Add resource video</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/add-opportunity">Opportunities</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/resources">View resources</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Video className="h-6 w-6" aria-hidden />
            </div>
            <CardTitle className="font-serif">Publish a YouTube resource</CardTitle>
            <CardDescription>
              Paste a YouTube link after uploading your video. It will appear on the homepage (latest four) and on
              the Resources page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="CV Writing Tips for Scholarship Applications"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="A brief summary shown under the video thumbnail."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort order (optional)</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first. Homepage shows the first four published videos.
                </p>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Publishing…" : "Publish video"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/resources">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
