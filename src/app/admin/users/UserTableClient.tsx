"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { deleteAdminUser } from "@/actions/adminUserActions";
import AdminTableShell from "../AdminTableShell";
import AdminEmptyTableRow from "../AdminEmptyTableRow";
import { AdminTableHead, AdminTableHeadCell, AdminTableHeadRow } from "../AdminTableHead";
import { AdminEditAction } from "../AdminTableActions";
import AdminConfirmButton from "../AdminConfirmButton";
import { ADMIN_DANGER_BUTTON } from "../adminUi";

type AdminUserRow = {
  id: string;
  username: string;
  name: string | null;
  role: string;
  createdAt: Date;
};

export default function UserTableClient({ users }: { users: AdminUserRow[] }) {
  const { locale } = useAdminLanguage();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteAdminUser(id);
        toast.success(locale === "zh" ? "用户已删除" : "User deleted successfully");
        router.refresh();
      } catch (err: any) {
        toast.error(err.message || "Delete failed");
      }
    });
  };

  return (
    <AdminTableShell>
      <table className="w-full text-left border-collapse">
        <AdminTableHead>
          <AdminTableHeadRow>
            <AdminTableHeadCell>{locale === "zh" ? "用户名" : "Username"}</AdminTableHeadCell>
            <AdminTableHeadCell>{locale === "zh" ? "姓名" : "Name"}</AdminTableHeadCell>
            <AdminTableHeadCell>{locale === "zh" ? "角色" : "Role"}</AdminTableHeadCell>
            <AdminTableHeadCell>{locale === "zh" ? "创建时间" : "Created At"}</AdminTableHeadCell>
            <AdminTableHeadCell className="px-6 py-4 font-semibold text-gray-600 text-right">
              {locale === "zh" ? "操作" : "Actions"}
            </AdminTableHeadCell>
          </AdminTableHeadRow>
        </AdminTableHead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {users.length === 0 ? (
            <AdminEmptyTableRow colSpan={5} message={locale === "zh" ? "暂无账号" : "No users found"} />
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center justify-end gap-2">
                    <AdminEditAction href={`/admin/users/${user.id}`} title={locale === "zh" ? "编辑" : "Edit"} />
                    <AdminConfirmButton
                      onConfirm={() => handleDelete(user.id)}
                      disabled={isPending}
                      className={ADMIN_DANGER_BUTTON}
                      armedClassName="inline-flex items-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                      title={locale === "zh" ? "删除用户" : "Delete user"}
                      armedTitle={locale === "zh" ? "再次点击确认删除" : "Click again to confirm deletion"}
                      armedChildren={
                        <>
                          <Trash2 className="h-4 w-4" />
                          {locale === "zh" ? "确认删除" : "Confirm"}
                        </>
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                      {locale === "zh" ? "删除" : "Delete"}
                    </AdminConfirmButton>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminTableShell>
  );
}
