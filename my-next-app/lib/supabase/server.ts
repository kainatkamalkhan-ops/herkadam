import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let warnedInvalidSupabaseUrl = false

/** Remove BOM, smart quotes, zero-width chars — common paste issues from docs/PDF */
function sanitizeEnvValue(s: string): string {
  return stripQuotes(
    s
      .replace(/^\uFEFF/, "")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
      .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
      .trim(),
  )
}

function stripQuotes(s: string): string {
  const t = s.trim()
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1).trim()
  }
  return t
}

function normalizeSupabaseUrl(raw: string | undefined): string | null {
  if (!raw) return null
  const s = sanitizeEnvValue(raw)
  if (!s) return null
  try {
    const u = new URL(s)
    if (u.protocol !== "http:" && u.protocol !== "https:") return null
    if (!u.hostname.includes(".")) return null
    return u.origin
  } catch {
    return null
  }
}

export function getSupabaseAnon(): SupabaseClient | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const url = normalizeSupabaseUrl(rawUrl)
  const key = sanitizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "")

  if (
    process.env.NODE_ENV === "development" &&
    rawUrl?.trim() &&
    !url &&
    !warnedInvalidSupabaseUrl
  ) {
    warnedInvalidSupabaseUrl = true
    console.warn(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL is not a valid https URL. Fix .env.local: use https://YOURPROJECT.supabase.co with no smart quotes or extra text. Using local JSON.",
    )
  }

  if (!url || !key) return null
  try {
    return createClient(url, key)
  } catch {
    return null
  }
}
