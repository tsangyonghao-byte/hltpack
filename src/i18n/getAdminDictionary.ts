import { cookies } from "next/headers";
import { adminDictionaries, type AdminLocale } from "./admin";

export async function getAdminDictionary() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("ADMIN_LOCALE")?.value === "zh" ? "zh" : "en";

  return {
    locale: locale as AdminLocale,
    dict: adminDictionaries[locale as AdminLocale],
  };
}
