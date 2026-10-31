import { NextResponse, type NextRequest } from "next/server"

// Zero-trust dashboard gate (Heimdall): every route requires an authenticated
// Better Auth session. Public exceptions: auth endpoints + next internals.
const PUBLIC = ["/api/auth"]

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  if (PUBLIC.some((p) => path.startsWith(p)) || path.startsWith("/_next")) {
    return NextResponse.next()
  }

  // Page requests: bounce anonymous users to the sign-in flow.
  const cookie = req.cookies.get("better-auth.session_token")?.value
  if (!cookie) {
    if (path.startsWith("/api")) {
      return NextResponse.json(
        { ok: false, error: "unauthorized", detail: "missing session" },
        { status: 401 },
      )
    }
    const url = req.nextUrl.clone()
    url.pathname = "/api/auth/signin"
    url.search = `?callbackUrl=${encodeURIComponent(path)}`
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icons).*)"],
}
