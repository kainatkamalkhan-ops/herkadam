import { NextResponse } from "next/server"
import { ADMIN_COOKIE, getAdminSessionToken } from "@/lib/admin-auth"
import { isValidAdminPassword } from "@/lib/admin-auth-server"

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string }
  const password = body.password?.trim() ?? ""

  const token = await getAdminSessionToken()
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Admin password is not configured on the live server. Add ADMIN_PASSWORD in Vercel → Settings → Environment Variables, then redeploy.",
      },
      { status: 500 },
    )
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
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
