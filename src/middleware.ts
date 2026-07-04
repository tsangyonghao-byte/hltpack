import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "ADMIN_SESSION";

async function sha256(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function verifyAdminSessionTokenLight(token: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token || !token.includes(".")) return false;

  const [userId] = token.split(".");
  const hash = await sha256(`${userId}:${secret}`);
  return token === `${userId}.${hash}`;
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", `${url.pathname}${url.search}`);

    if (!process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.redirect(loginUrl);
    }

    const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (session && (await verifyAdminSessionTokenLight(session))) {
      return NextResponse.next();
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
