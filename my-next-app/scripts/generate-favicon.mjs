import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "icon.svg");
const outPath = path.join(root, "public", "favicon.ico");

const svg = fs.readFileSync(svgPath);
const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map((s) => sharp(svg).resize(s, s).png().toBuffer()),
);
const icoBuffer = await toIco(pngBuffers);
fs.writeFileSync(outPath, icoBuffer);
console.log("Wrote", outPath, `(${icoBuffer.length} bytes)`);
