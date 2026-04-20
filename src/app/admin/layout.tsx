import AdminSidebar from "./AdminSidebar";
import AdminToaster from "./AdminToaster";
import AdminFlashToast from "./AdminFlashToast";
import { AdminLanguageProvider } from "@/i18n/AdminLanguageContext";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import { consumeAdminFlash, requireAdminSession } from "@/lib/adminAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession("/admin");
  const flash = await consumeAdminFlash();
  const { dict, locale } = await getAdminDictionary();

  return (
    <AdminLanguageProvider dict={dict} locale={locale}>
      <div className="flex h-screen bg-gray-100">
        <AdminToaster />
        <AdminFlashToast message={flash === "login" ? dict.auth.loginSuccess : undefined} />
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </AdminLanguageProvider>
  );
}
