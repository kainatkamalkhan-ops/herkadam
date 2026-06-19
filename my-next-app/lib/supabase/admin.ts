import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { normalizeSupabaseUrl, sanitizeEnvValue } from "@/lib/supabase/env"

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const serviceKey = sanitizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "")

  if (!url || !serviceKey) return null

  try {
    return createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  } catch {
    return null
  }
}
