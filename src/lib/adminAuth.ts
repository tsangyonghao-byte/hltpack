import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import {
  ADMIN_SESSION_COOKIE,
  buildAdminSessionToken,
  verifyAdminSessionTokenLight,
  verifyAdminSessionToken,
  getAdminCookieOptions,
  isSafeAdminPath,
} from "./adminAuthShared";

export async function isAdminAuthenticatedLight() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return false;

  return await verifyAdminSessionTokenLight(session);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return false;

  return await verifyAdminSessionToken(session);
}

export async function setAdminSession(userId: string) {
  const cookieStore = await cookies();
  const token = await buildAdminSessionToken(userId);
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

export async function getCurrentAdminIdentity() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return null;

  const isValid = await verifyAdminSessionToken(session);
  if (!isValid) return null;

  const [userId] = session.split(".");

  if (userId === "root") {
    return {
      userId: "root",
      username: process.env.ADMIN_USER?.trim() || "root",
      name: "Super Admin",
      role: "root",
      isRoot: true,
    };
  }

  const dbUser = await prisma.adminUser.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
    },
  });

  if (!dbUser) return null;

  return {
    userId: dbUser.id,
    username: dbUser.username,
    name: dbUser.name,
    role: dbUser.role,
    isRoot: false,
  };
}

export async function requireAdminSession(nextPath = "/admin") {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    const target = isSafeAdminPath(nextPath) ? nextPath : "/admin";
    redirect(`/login?next=${encodeURIComponent(target)}`);
  }
}

export async function requireAdminPageSession(nextPath = "/admin") {
  const authenticated = await isAdminAuthenticatedLight();
  if (!authenticated) {
    const target = isSafeAdminPath(nextPath) ? nextPath : "/admin";
    redirect(`/login?next=${encodeURIComponent(target)}`);
  }
}
