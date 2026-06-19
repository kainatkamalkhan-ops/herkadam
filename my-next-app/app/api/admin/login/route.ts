import { NextResponse } from "next/server"
import { ADMIN_COOKIE, getAdminSessionToken } from "@/lib/admin-auth"
import { isValidAdminPassword } from "@/lib/admin-auth-server"

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string }
  const password = body.password?.trim() ?? ""

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const token = await getAdminSessionToken()
  if (!token) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 500 },
    )
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })
  return response
}
