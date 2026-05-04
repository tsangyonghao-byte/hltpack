import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminFlashToast from "../AdminFlashToast";
import AdminPageHeader from "../AdminPageHeader";
import { ADMIN_ADD_BUTTON } from "../adminUi";
import UserTableClient from "./UserTableClient";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { dict, locale } = await getAdminDictionary();
  const params = await searchParams;
  const success = params.success?.trim() || "";

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    }
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {success === "created" && <AdminFlashToast message={locale === "zh" ? "用户创建成功" : "User created successfully"} />}
      {success === "updated" && <AdminFlashToast message={locale === "zh" ? "用户更新成功" : "User updated successfully"} />}
      {success === "deleted" && <AdminFlashToast message={locale === "zh" ? "用户删除成功" : "User deleted successfully"} />}

      <AdminPageHeader
        title={locale === "zh" ? "管理员账号" : "Admin Users"}
        actions={
          <Link href="/admin/users/new" className={ADMIN_ADD_BUTTON}>
            <Plus className="w-5 h-5 mr-2" />
            {locale === "zh" ? "添加账号" : "Add User"}
          </Link>
        }
      />

      <UserTableClient users={users} />
    </div>
  );
}
