/**
 * Add new opportunity columns to Supabase.
 *
 * Option A — DATABASE_URL (recommended):
 *   Supabase Dashboard → Project Settings → Database → Connection string (URI)
 *   Add to .env.local: DATABASE_URL=postgresql://postgres.[ref]:[password]@...
 *
 * Option B — SUPABASE_DB_PASSWORD:
 *   Same dashboard page → database password
 *   Add to .env.local: SUPABASE_DB_PASSWORD=your_password
 *
 * Run: node --env-file=.env.local scripts/run-opportunities-migration.mjs
 */
import pg from "pg"
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

const MIGRATION_SQL = `
alter table public.opportunities add column if not exists application_link text;
alter table public.opportunities add column if not exists summary text;
alter table public.opportunities add column if not exists benefits text;
alter table public.opportunities add column if not exists eligibility text;
alter table public.opportunities add column if not exists requirements text;
alter table public.opportunities add column if not exists impact_for_women text;
`.trim()

function projectRef() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  if (!supabaseUrl) return null
  return supabaseUrl.replace(/^https:\/\//, "").replace(/\.supabase\.co\/?$/, "")
}

function resolveDatabaseUrls() {
  const direct = process.env.DATABASE_URL?.trim()
  if (direct) return [direct]

  const password = process.env.SUPABASE_DB_PASSWORD?.trim()
  const ref = projectRef()
  if (!password || !ref) return []

  if (process.env.SUPABASE_DB_HOST?.trim()) {
    const port = process.env.SUPABASE_DB_PORT?.trim() || "5432"
    const user = process.env.SUPABASE_DB_USER?.trim() || "postgres"
    return [
      `postgresql://${user}:${encodeURIComponent(password)}@${process.env.SUPABASE_DB_HOST.trim()}:${port}/postgres`,
    ]
  }

  const poolerHost =
    process.env.SUPABASE_POOLER_HOST?.trim() ||
    "aws-1-ap-northeast-1.pooler.supabase.com"

  return [
    `postgresql://postgres.${ref}:${encodeURIComponent(password)}@${poolerHost}:6543/postgres`,
    `postgresql://postgres.${ref}:${encodeURIComponent(password)}@${poolerHost}:5432/postgres`,
    `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`,
  ]
}

async function runViaManagementApi() {
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim()
  const ref = projectRef()
  if (!token || !ref) return false

  console.log("Running migration via Supabase Management API...")
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: MIGRATION_SQL }),
  })

  const body = await res.text()
  if (!res.ok) {
    throw new Error(`Management API ${res.status}: ${body}`)
  }

  console.log("Migration applied successfully.")
  return true
}

async function verifyViaSupabase() {
  const { createClient } = await import("@supabase/supabase-js")
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) return

  const sb = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { error } = await sb
    .from("opportunities")
    .select("summary, benefits, eligibility, requirements, impact_for_women")
    .limit(1)

  if (error) {
    console.error("Verification failed:", error.message)
    process.exit(1)
  }
  console.log("Verified: new columns exist on public.opportunities.")
}

async function runViaPostgres() {
  const databaseUrls = resolveDatabaseUrls()
  if (!databaseUrls.length) return false

  let lastError = null
  for (const databaseUrl of databaseUrls) {
    const client = new pg.Client({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    })

    const host = databaseUrl.split("@")[1]?.split("/")[0] ?? databaseUrl
    console.log(`Connecting to Supabase Postgres (${host})...`)
    try {
      await client.connect()
      console.log("Running migration...")
      await client.query(MIGRATION_SQL)
      console.log("Migration applied successfully.")
      await client.end()
      return true
    } catch (err) {
      lastError = err
      console.log(`Connection failed: ${err.message}`)
      try {
        await client.end()
      } catch {
        /* ignore */
      }
    }
  }

  throw lastError ?? new Error("Could not connect to Supabase Postgres")
}

async function main() {
  const ran =
    (await runViaManagementApi().catch(() => false)) || (await runViaPostgres())

  if (!ran) {
    console.error(
      "Missing database credentials.\n\n" +
        "Add one of these to .env.local, then re-run this script:\n" +
        "  SUPABASE_ACCESS_TOKEN=...  (Dashboard → Account → Access Tokens, database write)\n" +
        "  DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres\n" +
        "  SUPABASE_DB_PASSWORD=your_database_password\n\n" +
        "Or paste the SQL block from supabase/opportunities.sql into Supabase → SQL Editor.",
    )
    process.exit(1)
  }

  await verifyViaSupabase()
}

main().catch((err) => {
  console.error("Migration failed:", err.message)
  process.exit(1)
})
