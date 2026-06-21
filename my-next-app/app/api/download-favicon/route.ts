import { readFile } from "fs/promises"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "brand", "favicon-source.png")
  const body = await readFile(filePath)
  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": 'attachment; filename="her-kadam-logo-icon.png"',
      "Cache-Control": "public, max-age=3600",
    },
  })
}
