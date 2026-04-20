"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { useTransition } from "react";
import { setAdminLanguage } from "@/actions/adminLangActions";
import type { AdminLocale } from "@/i18n/admin";

export default function LoginLanguageToggle({
  locale,
  label,
}: {
  locale: AdminLocale;
  label: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextLocale: AdminLocale = locale === "zh" ? "en" : "zh";

    startTransition(async () => {
      await setAdminLanguage(nextLocale);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
    >
      <Languages className="h-4 w-4" />
      {label}
    </button>
  );
}
