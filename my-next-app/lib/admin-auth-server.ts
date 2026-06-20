import { timingSafeEqual } from "crypto"
import { getAdminPasswordFromEnv } from "@/lib/supabase/env"

export function isValidAdminPassword(password: string): boolean {
  const expected = getAdminPasswordFromEnv()
  if (!expected) return false

  const a = Buffer.from(password.trim())
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
