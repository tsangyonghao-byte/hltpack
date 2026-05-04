import { redirect } from "next/navigation";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminPageHeader from "../../AdminPageHeader";
import UserForm from "./UserForm";

export const dynamic = "force-dynamic";

export default async function NewAdminUserPage() {
  const { locale } = await getAdminDictionary();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <AdminPageHeader
        title={locale === "zh" ? "添加账号" : "Add Admin User"}
      />
      <UserForm isEdit={false} />
    </div>
  );
}