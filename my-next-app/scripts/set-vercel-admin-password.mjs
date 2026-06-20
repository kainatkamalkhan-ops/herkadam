import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const envPath = resolve(process.cwd(), ".env.local")
let password = ""

for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  if (line.startsWith("ADMIN_PASSWORD=")) {
    password = line.slice("ADMIN_PASSWORD=".length).trim()
    break
  }
}

if (!password) {
  console.error("ADMIN_PASSWORD not found in .env.local")
  process.exit(1)
}

execFileSync(
  "npx",
  [
    "vercel",
    "env",
    "add",
    "ADMIN_PASSWORD",
    "production",
    "--value",
    password,
    "--sensitive",
    "--force",
    "--yes",
  ],
  { stdio: "inherit", shell: true, cwd: process.cwd() },
)

console.log("ADMIN_PASSWORD updated on Vercel production.")
