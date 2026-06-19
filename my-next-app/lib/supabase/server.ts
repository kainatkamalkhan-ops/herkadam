import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { normalizeSupabaseUrl, sanitizeEnvValue } from "@/lib/supabase/env"

let warnedInvalidSupabaseUrl = false

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
