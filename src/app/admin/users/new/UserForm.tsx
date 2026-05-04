"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createAdminUser, updateAdminUser } from "@/actions/adminUserActions";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { ADMIN_ADD_BUTTON, ADMIN_SECONDARY_BUTTON } from "../../adminUi";
import AdminFormError from "../../AdminFormError";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UserForm({
  isEdit,
  initialData,
}: {
  isEdit: boolean;
  initialData?: any;
}) {
  const { locale } = useAdminLanguage();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      username: String(formData.get("username") || ""),
      password: String(formData.get("password") || ""),
      name: String(formData.get("name") || ""),
      role: String(formData.get("role") || "admin"),
    };

    if (!data.username) {
      setError(locale === "zh" ? "用户名不能为空" : "Username is required");
      return;
    }
    if (!isEdit && !data.password) {
      setError(locale === "zh" ? "密码不能为空" : "Password is required");
      return;
    }

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateAdminUser(initialData.id, data);
          router.push("/admin/users?success=updated");
        } else {
          await createAdminUser(data);
          router.push("/admin/users?success=created");
        }
      } catch (err: any) {
        setError(err.message || "Operation failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-6 md:p-8 space-y-6">
        <AdminFormError message={error} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              {locale === "zh" ? "用户名 *" : "Username *"}
            </label>
            <input
              type="text"
              name="username"
              defaultValue={initialData?.username}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#F05A22] focus:ring-[#F05A22] sm:text-sm p-3"
              placeholder="admin123"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              {isEdit ? (locale === "zh" ? "新密码 (留空则不修改)" : "New Password (leave blank to keep current)") : (locale === "zh" ? "密码 *" : "Password *")}
            </label>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#F05A22] focus:ring-[#F05A22] sm:text-sm p-3"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              {locale === "zh" ? "姓名 / 备注" : "Name / Note"}
            </label>
            <input
              type="text"
              name="name"
              defaultValue={initialData?.name}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#F05A22] focus:ring-[#F05A22] sm:text-sm p-3"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              {locale === "zh" ? "角色" : "Role"}
            </label>
            <select
              name="role"
              defaultValue={initialData?.role || "admin"}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#F05A22] focus:ring-[#F05A22] sm:text-sm p-3"
            >
              <option value="admin">{locale === "zh" ? "管理员" : "Admin"}</option>
              <option value="editor">{locale === "zh" ? "编辑者" : "Editor"}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <Link href="/admin/users" className={ADMIN_SECONDARY_BUTTON}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {locale === "zh" ? "返回" : "Cancel"}
        </Link>
        <button type="submit" disabled={isPending} className={ADMIN_ADD_BUTTON}>
          <Save className="w-4 h-4 mr-2" />
          {isPending ? (locale === "zh" ? "保存中..." : "Saving...") : (locale === "zh" ? "保存" : "Save User")}
        </button>
      </div>
    </form>
  );
}
