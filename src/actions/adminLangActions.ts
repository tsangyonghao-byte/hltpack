"use server";

import { cookies } from "next/headers";
import { type AdminLocale } from "@/i18n/admin";

export async function setAdminLanguage(locale: AdminLocale) {
  const cookieStore = await cookies();
  cookieStore.set("ADMIN_LOCALE", locale, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}
