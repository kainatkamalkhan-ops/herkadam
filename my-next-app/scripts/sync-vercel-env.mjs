/**
 * Sync .env.local secrets to a Vercel project (production).
 * Usage: node scripts/sync-vercel-env.mjs [project-name]
 */
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const projectName = process.argv[2] ?? "herkadam-6uxm"

const envPath = resolve(process.cwd(), ".env.local")
const vars = {}

for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) continue
  const eq = trimmed.indexOf("=")
  if (eq === -1) continue
  vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
}

const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_PASSWORD",
]

const vercelBase = ["vercel", "--yes"]

console.log(`Linking to Vercel project: ${projectName}`)
execFileSync("npx", [...vercelBase, "link", "--project", projectName], {
  stdio: "inherit",
  shell: true,
  cwd: process.cwd(),
  env: { ...process.env, CI: "1" },
})

for (const key of keys) {
  const value = vars[key]
  if (!value) {
    console.warn(`Skipping ${key} — not found in .env.local`)
    continue
  }

  const sensitive = key.includes("KEY") || key === "ADMIN_PASSWORD"
  const args = [
    ...vercelBase,
    "env",
    "add",
    key,
    "production",
    "--value",
    value,
    "--force",
  ]
  if (sensitive) args.push("--sensitive")
  if (key.startsWith("NEXT_PUBLIC_")) args.push("--no-sensitive")

  console.log(`Setting ${key}…`)
  execFileSync("npx", args, {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
    env: { ...process.env, CI: "1" },
  })
}

console.log(`Done. Redeploy ${projectName} production.`)
