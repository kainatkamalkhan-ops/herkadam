import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { isAdminRequestAuthenticated } from "@/lib/admin-auth"

/** Send apex → www once DNS for herkadam.com points at Vercel (same TLS cert as www). */
export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.replace(/:\d+$/, "") ?? ""
  if (host === "herkadam.com") {
    const url = request.nextUrl.clone()
    url.hostname = "www.herkadam.com"
    url.protocol = "https:"
    return NextResponse.redirect(url, 308)
  }

  const { pathname } = request.nextUrl

  const isAdminPage =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")
  const isAdminApi =
    pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")

  if ((isAdminPage || isAdminApi) && !(await isAdminRequestAuthenticated(request))) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/admin/login"
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
