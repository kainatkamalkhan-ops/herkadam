import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createResourceVideo } from "@/lib/resource-videos-admin"
import { parseYoutubeVideoId } from "@/lib/youtube"

type Body = {
  title?: string
  description?: string
  youtubeUrl?: string
  sortOrder?: number
}

export async function POST(request: Request) {
  const body = (await request.json()) as Body

  const title = body.title?.trim() ?? ""
  const youtubeUrl = body.youtubeUrl?.trim() ?? ""

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 })
  }

  if (!youtubeUrl || !parseYoutubeVideoId(youtubeUrl)) {
    return NextResponse.json(
      { error: "A valid YouTube video URL is required." },
      { status: 400 },
    )
  }

  const sortOrder =
    typeof body.sortOrder === "number" && Number.isFinite(body.sortOrder)
      ? body.sortOrder
      : 0

  const result = await createResourceVideo({
    title,
    description: body.description,
    youtubeUrl,
    sortOrder,
  })

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  revalidatePath("/")
  revalidatePath("/resources")

  return NextResponse.json({ id: result.id })
}
