export const ADMIN_SESSION_COOKIE = "ADMIN_SESSION";

import { prisma } from "./prisma";

function getAdminCredentials() {
  return {
    user: process.env.ADMIN_USER,
    pass: process.env.ADMIN_PASS,
    secret: process.env.ADMIN_SESSION_SECRET,
  };
}

export function isAdminAuthConfigured() {
  const { secret } = getAdminCredentials();
  return Boolean(secret); // Only require secret now, as users can be in DB
}

export async function sha256(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function buildAdminSessionToken(userId: string) {
  const { secret } = getAdminCredentials();
  if (!secret) throw new Error("ADMIN_AUTH_MISSING_CONFIG");
  const hash = await sha256(`${userId}:${secret}`);
  return `${userId}.${hash}`;
}

export async function verifyAdminSessionToken(token: string) {
  if (!token || !token.includes(".")) return false;
  const [userId] = token.split(".");
  const expected = await buildAdminSessionToken(userId);
  if (token !== expected) return false;

  if (userId === "root") {
    return true;
  }

  try {
    const dbUser = await prisma.adminUser.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    return Boolean(dbUser);
  } catch (err) {
    console.error("Admin session validation failed:", err);
    return false;
  }
}

export function isSafeAdminPath(path?: string | null) {
  return !!path && path.startsWith("/admin");
}

export function getAdminCookieOptions() {
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function verifyAdminCredentials(username: string, password: string): Promise<string | null> {
  const { user, pass } = getAdminCredentials();
  
  // 1. Check root admin from .env
  if (user && pass && username === user && password === pass) {
    return "root";
  }

  // 2. Check DB AdminUser
  try {
    const dbUser = await prisma.adminUser.findUnique({
      where: { username },
    });
    
    if (dbUser) {
      const hashedAttempt = await sha256(`${password}:${process.env.ADMIN_SESSION_SECRET}`);
      if (dbUser.password === hashedAttempt) {
        return dbUser.id;
      }
    }
  } catch (err) {
    console.error("DB User check failed:", err);
  }

  return null;
}
