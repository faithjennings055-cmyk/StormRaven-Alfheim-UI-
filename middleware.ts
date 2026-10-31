import { NextResponse, type NextRequest } from "next/server"

// Zero-trust dashboard gate (Heimdall): every route requires an authenticated
// Better Auth session. Public exceptions: auth endpoints, sign-in page + next internals.
const PUBLIC = ["/api/auth", "/signin"]

// Better Auth issues the session cookie as `better-auth.session_token`; on
// HTTPS it gets the __Secure- prefix variant. Accept both spellings.
const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
]

// Assets that must stay reachable while logged out (login screen visuals).
const PUBLIC_ASSETS = ["/logo.svg", "/favicon.ico", "/manifest.json", "/sw.js"]

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  if (
    PUBLIC.some((p) => path.startsWith(p)) ||
    path.startsWith("/_next") ||
    PUBLIC_ASSETS.some((p) => path === p)
  ) {
    return NextResponse.next()
  }

  const hasSession = SESSION_COOKIES.some((name) => !!req.cookies.get(name)?.value)
  if (hasSession) return NextResponse.next()

  if (path.startsWith("/api")) {
    return NextResponse.json(
      { ok: false, error: "unauthorized", detail: "missing session" },
      { status: 401 },
    )
  }

  // Better Auth has no built-in GET sign-in page at /api/auth/signin; bounce
  // anonymous visitors to the app's sign-in route and carry the destination.
  const url = req.nextUrl.clone()
  url.pathname = "/signin"
  url.search = `?callbackUrl=${encodeURIComponent(path)}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg|manifest.json|sw.js|icons).*)"],
}
