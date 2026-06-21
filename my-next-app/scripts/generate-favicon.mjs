import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import toIco from "to-ico"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const sourcePath = path.join(root, "public", "brand", "favicon-source.png")
const faviconPath = path.join(root, "public", "favicon.ico")
const applePath = path.join(root, "public", "apple-touch-icon.png")
const iconPath = path.join(root, "public", "icon.png")

async function loadTrimmedLogo() {
  const trimmed = await sharp(sourcePath).trim({ threshold: 14 }).png().toBuffer()
  const meta = await sharp(trimmed).metadata()
  const width = meta.width ?? 1
  const height = meta.height ?? 1

  // Footprints sit on the right — crop empty left margin so the mark fills favicon squares.
  const cropLeft = Math.floor(width * 0.18)
  const cropWidth = width - cropLeft

  return sharp(trimmed)
    .extract({
      left: cropLeft,
      top: 0,
      width: Math.max(1, cropWidth),
      height,
    })
    .png()
    .toBuffer()
}

async function squareLogo(size, paddingRatio = 0.06) {
  const logo = await loadTrimmedLogo()
  const pad = Math.round(size * paddingRatio)
  const inner = Math.max(1, size - pad * 2)

  const resized = await sharp(logo)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
      kernel: size <= 32 ? sharp.kernel.lanczos3 : sharp.kernel.mitchell,
    })
    .sharpen(size <= 32 ? { sigma: 0.6, m1: 0.5, m2: 2 } : undefined)
    .png()
    .toBuffer()

  const meta = await sharp(resized).metadata()
  const width = meta.width ?? inner
  const height = meta.height ?? inner
  const left = Math.round((size - width) / 2)
  const top = Math.round((size - height) / 2)

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toBuffer()
}

const faviconSizes = [16, 32, 48, 64]
const pngBuffers = await Promise.all(
  faviconSizes.map((size) => squareLogo(size, size <= 16 ? 0.04 : 0.06)),
)
const icoBuffer = await toIco(pngBuffers)
fs.writeFileSync(faviconPath, icoBuffer)

const appleBuffer = await squareLogo(180, 0.05)
fs.writeFileSync(applePath, appleBuffer)

const iconBuffer = await squareLogo(32, 0.04)
fs.writeFileSync(iconPath, iconBuffer)

console.log("Wrote", faviconPath, `(${icoBuffer.length} bytes)`)
console.log("Wrote", applePath, `(${appleBuffer.length} bytes)`)
console.log("Wrote", iconPath, `(${iconBuffer.length} bytes)`)
