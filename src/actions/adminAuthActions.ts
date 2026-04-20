"use server";

import { redirect } from "next/navigation";
import {
  clearAdminFlash,
  clearAdminSession,
  setAdminFlash,
  setAdminSession,
} from "@/lib/adminAuth";
import {
  isAdminAuthConfigured,
  isSafeAdminPath,
  verifyAdminCredentials,
} from "@/lib/adminAuthShared";

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

  if (!(await verifyAdminCredentials(username, password))) {
    return { error: "invalid" };
  }

  await setAdminSession();
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
