import { redirect } from "next/navigation";
import AdminPageHeader from "../../AdminPageHeader";
import PasswordForm from "./PasswordForm";
import { getCurrentAdminIdentity } from "@/lib/adminAuth";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";

export const dynamic = "force-dynamic";

export default async function AdminPasswordPage() {
  const identity = await getCurrentAdminIdentity();
  const { locale } = await getAdminDictionary();

  if (!identity) {
    redirect("/login?next=/admin/account/password");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <AdminPageHeader
        title={locale === "zh" ? "修改当前账号密码" : "Change Password"}
      />
      <PasswordForm
        identity={{
          username: identity.username,
          name: identity.name || "",
          role: identity.role,
          isRoot: identity.isRoot,
        }}
      />
    </div>
  );
}
