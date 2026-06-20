/** Shared env sanitization for Supabase clients */

export function sanitizeEnvValue(s: string): string {
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

export function getAdminPasswordFromEnv(): string {
  return sanitizeEnvValue(process.env.ADMIN_PASSWORD ?? "")
}

export function normalizeSupabaseUrl(raw: string | undefined): string | null {
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
