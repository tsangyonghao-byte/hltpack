import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  buildAdminSessionToken,
  getAdminCookieOptions,
  isSafeAdminPath,
} from "./adminAuthShared";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return false;

  const expected = await buildAdminSessionToken();
  return session === expected;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  const token = await buildAdminSessionToken();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, getAdminCookieOptions());
}

export async function setAdminFlash(value: string) {
  const cookieStore = await cookies();
  cookieStore.set("ADMIN_FLASH", value, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60,
  });
}

export async function consumeAdminFlash() {
  const cookieStore = await cookies();
  return cookieStore.get("ADMIN_FLASH")?.value;
}

export async function clearAdminFlash() {
  const cookieStore = await cookies();
  cookieStore.delete("ADMIN_FLASH");
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function requireAdminSession(nextPath = "/admin") {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    const target = isSafeAdminPath(nextPath) ? nextPath : "/admin";
    redirect(`/login?next=${encodeURIComponent(target)}`);
  }
}
