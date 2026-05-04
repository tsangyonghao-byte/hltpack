"use server";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import {
  clearAdminFlash,
  clearAdminSession,
  getCurrentAdminIdentity,
  setAdminFlash,
  setAdminSession,
} from "@/lib/adminAuth";
import {
  isAdminAuthConfigured,
  isSafeAdminPath,
  sha256,
  verifyAdminCredentials,
} from "@/lib/adminAuthShared";
import prisma from "@/lib/prisma";

export async function loginAdmin(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!isAdminAuthConfigured()) {
    return { error: "config" };
  }

  const userId = await verifyAdminCredentials(username, password);
  if (!userId) {
    return { error: "invalid" };
  }

  await setAdminSession(userId);
  await setAdminFlash("login");
  const safeNext = isSafeAdminPath(next) ? next : "/admin";
  redirect(safeNext);
}

export async function logoutAdmin() {
  await clearAdminSession();
  return { success: true };
}

export async function dismissAdminFlash() {
  await clearAdminFlash();
}

function encodeEnvValue(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

async function updateEnvValue(key: string, value: string) {
  const envPath = path.join(process.cwd(), ".env");
  const nextLine = `${key}=${encodeEnvValue(value)}`;
  const current = await readFile(envPath, "utf8");
  const pattern = new RegExp(`^${key}=.*$`, "m");
  const updated = pattern.test(current)
    ? current.replace(pattern, nextLine)
    : `${current.trimEnd()}\n${nextLine}\n`;

  await writeFile(envPath, updated, "utf8");
}

export async function changeCurrentAdminPassword(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData,
) {
  const currentPassword = String(formData.get("currentPassword") || "");
  const nextPassword = String(formData.get("nextPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!currentPassword || !nextPassword || !confirmPassword) {
    return { error: "required" };
  }

  if (nextPassword.length < 8) {
    return { error: "length" };
  }

  if (nextPassword !== confirmPassword) {
    return { error: "mismatch" };
  }

  if (currentPassword === nextPassword) {
    return { error: "same" };
  }

  const identity = await getCurrentAdminIdentity();
  if (!identity) {
    return { error: "unauthorized" };
  }

  if (identity.isRoot) {
    const currentEnvPassword = process.env.ADMIN_PASS || "";
    if (currentPassword !== currentEnvPassword) {
      return { error: "invalidCurrent" };
    }

    await updateEnvValue("ADMIN_PASS", nextPassword);
    process.env.ADMIN_PASS = nextPassword;
    return { success: "updated" };
  }

  const dbUser = await prisma.adminUser.findUnique({
    where: { id: identity.userId },
    select: { id: true, password: true },
  });

  if (!dbUser) {
    return { error: "unauthorized" };
  }

  const hashedCurrentPassword = await sha256(`${currentPassword}:${process.env.ADMIN_SESSION_SECRET}`);
  if (dbUser.password !== hashedCurrentPassword) {
    return { error: "invalidCurrent" };
  }

  const hashedNextPassword = await sha256(`${nextPassword}:${process.env.ADMIN_SESSION_SECRET}`);
  await prisma.adminUser.update({
    where: { id: dbUser.id },
    data: { password: hashedNextPassword },
  });

  return { success: "updated" };
}
