/**
 * Smoke test: insert a test opportunity via Supabase admin client, verify read path.
 * Run: node --env-file=.env.local scripts/test-admin-opportunity.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { randomUUID } from "crypto"
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local")
  if (!existsSync(path)) return
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvLocal()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
const table =
  process.env.NEXT_PUBLIC_SUPABASE_OPPORTUNITIES_TABLE?.trim() || "opportunities"

if (!url || !serviceKey) {
  console.error(
    "SKIP: Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local to run this test.",
  )
  process.exit(0)
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const testId = randomUUID()
const deadline = new Date()
deadline.setMonth(deadline.getMonth() + 3)
const deadlineStr = deadline.toISOString().slice(0, 10)

const row = {
  id: testId,
  title: "[TEST] Her Kadam Admin E2E Opportunity",
  organization: "Her Kadam QA",
  location: "Global / Remote",
  type: "Scholarship",
  funding_type: "Fully Funded",
  region: "Global",
  deadline: deadlineStr,
  description:
    "Automated test row created by scripts/test-admin-opportunity.mjs. Safe to delete.",
  image: null,
  application_link: "https://www.herkadam.com/contact",
  is_featured: true,
  published: true,
  published_at: new Date().toISOString(),
}

console.log("Inserting test opportunity…")
const { error: insertError } = await supabase.from(table).insert(row)
if (insertError) {
  console.error("INSERT FAILED:", insertError.message)
  process.exit(1)
}

console.log("Verifying public read…")
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
if (!anonKey) {
  console.warn("No anon key — skipping public read check")
} else {
  const anon = createClient(url, anonKey)
  const { data, error } = await anon
    .from(table)
    .select("id, title, type, region, is_featured, deadline")
    .eq("id", testId)
    .eq("published", true)
    .maybeSingle()

  if (error || !data) {
    console.error("READ FAILED:", error?.message ?? "row not found")
    process.exit(1)
  }
  console.log("Public read OK:", data.title)
}

console.log("\nTest opportunity id:", testId)
console.log("Live page: /opportunities/" + testId)
console.log("Type filter: /opportunities?type=scholarships")
console.log("Region filter: /opportunities?region=global")
console.log("Featured filter: /opportunities?featured=true")
console.log("\nDelete this row from Supabase when done reviewing.")
