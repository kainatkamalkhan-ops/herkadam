import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const src = path.join(root, "public/her-kadam-footprints-trail.png")
const outDir = path.join(root, "public/footprints")

/** Approximate crop boxes for bottom → top footprints in the trail PNG. */
const crops = [
  { name: "footprint-light.png", left: 40, top: 320, width: 180, height: 200 },
  { name: "footprint-medium.png", left: 120, top: 190, width: 190, height: 220 },
  { name: "footprint-dark.png", left: 200, top: 30, width: 220, height: 250 },
]

for (const crop of crops) {
  const out = path.join(outDir, crop.name)
  await sharp(src)
    .extract(crop)
    .trim({ threshold: 10 })
    .png()
    .toFile(out)
  console.log("Wrote", crop.name)
}
