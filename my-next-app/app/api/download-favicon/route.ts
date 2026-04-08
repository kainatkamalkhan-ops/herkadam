import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "her-kadam-favicon.svg",
  );
  const body = await readFile(filePath);
  return new Response(body, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": 'attachment; filename="her-kadam-favicon.svg"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
