import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  buildAdminSessionToken,
  isAdminAuthConfigured,
} from "@/lib/adminAuthShared";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", `${url.pathname}${url.search}`);

    if (!isAdminAuthConfigured()) {
      return NextResponse.redirect(loginUrl);
    }

    const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const expected = await buildAdminSessionToken();

    if (session === expected) {
      return NextResponse.next();
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
