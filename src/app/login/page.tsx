import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import AdminLoginForm from "./AdminLoginForm";
import LoginLanguageToggle from "./LoginLanguageToggle";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { isAdminAuthConfigured, isSafeAdminPath } from "@/lib/adminAuthShared";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { dict, locale } = await getAdminDictionary();
  const params = await searchParams;
  const next = isSafeAdminPath(params.next) ? params.next! : "/admin";
  const configured = isAdminAuthConfigured();

  if (configured && (await isAdminAuthenticated())) {
    redirect(next);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-orange-50 px-4 py-12">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/60">
        <LoginLanguageToggle
          locale={locale}
          label={locale === "zh" ? dict.nav.switchToEnglish : dict.nav.switchToChinese}
        />
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F05A22]/10 text-[#F05A22]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">{dict.auth.title}</h1>
          <p className="text-sm text-gray-500">{dict.auth.subtitle}</p>
        </div>

        {!configured ? (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            <div className="font-medium">{dict.auth.configMissing}</div>
            <div className="mt-1">{dict.auth.configHint}</div>
          </div>
        ) : null}

        <AdminLoginForm dict={dict} next={next} />
      </div>
    </div>
  );
}
