import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Send apex → www once DNS for herkadam.com points at Vercel (same TLS cert as www). */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.replace(/:\d+$/, "") ?? "";
  if (host === "herkadam.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.herkadam.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
