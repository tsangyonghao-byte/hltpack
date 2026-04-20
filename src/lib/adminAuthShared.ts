export const ADMIN_SESSION_COOKIE = "ADMIN_SESSION";

function getAdminCredentials() {
  return {
    user: process.env.ADMIN_USER,
    pass: process.env.ADMIN_PASS,
    secret: process.env.ADMIN_SESSION_SECRET,
  };
}

export function isAdminAuthConfigured() {
  const { user, pass, secret } = getAdminCredentials();
  return Boolean(user && pass && secret);
}

function requireAdminCredentials() {
  const credentials = getAdminCredentials();
  if (!credentials.user || !credentials.pass || !credentials.secret) {
    throw new Error("ADMIN_AUTH_MISSING_CONFIG");
  }
  return credentials as {
    user: string;
    pass: string;
    secret: string;
  };
}

async function sha256(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function buildAdminSessionToken() {
  const { user, pass, secret } = requireAdminCredentials();
  return sha256(`${user}:${pass}:${secret}`);
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

export async function verifyAdminCredentials(username: string, password: string) {
  const { user, pass } = requireAdminCredentials();
  return username === user && password === pass;
}
