import { NextResponse, type NextRequest } from "next/server";

/**
 * Basic-auth gate for /admin. Disabled (404) unless ADMIN_PASSWORD is set, so
 * the inquiries view is never exposed by accident. Username is ignored; the
 * password must match ADMIN_PASSWORD.
 */
export function middleware(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse("Not found", { status: 404 });
  }

  const header = req.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    try {
      const [, password] = atob(encoded).split(":");
      if (password === expected) return NextResponse.next();
    } catch {
      // fall through to the auth challenge
    }
  }

  return new NextResponse("인증이 필요합니다.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Looping Ai Admin"' },
  });
}

export const config = { matcher: ["/admin/:path*", "/admin"] };
