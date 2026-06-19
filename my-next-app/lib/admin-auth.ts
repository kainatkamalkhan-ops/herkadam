import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export const ADMIN_COOKIE = "herkadam_admin"

/** Edge-safe session token derived from ADMIN_PASSWORD */
export async function getAdminSessionToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD?.trim()
  if (!password) return null

  const data = new TextEncoder().encode(`herkadam-admin:${password}`)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminSessionToken()
  if (!token) return false
  const jar = await cookies()
  return jar.get(ADMIN_COOKIE)?.value === token
}

export async function isAdminRequestAuthenticated(
  request: NextRequest,
): Promise<boolean> {
  const token = await getAdminSessionToken()
  if (!token) return false
  return request.cookies.get(ADMIN_COOKIE)?.value === token
}
