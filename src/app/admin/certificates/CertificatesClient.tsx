"use client";

import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { Plus } from "lucide-react";
import AdminPageHeader from "../AdminPageHeader";
import {
  ADMIN_ADD_BUTTON,
  ADMIN_TABLE_CARD,
  ADMIN_SOFT_TABLE_HEAD_ROW,
  ADMIN_SOFT_TABLE_HEAD_CELL,
  ADMIN_EMPTY_TABLE_CELL,
} from "../adminUi";
import AdminEmptyState from "../AdminEmptyState";
import { AdminImageCell } from "../AdminTableCells";
import { AdminTableActions, AdminEditAction, AdminDeleteAction } from "../AdminTableActions";
import AdminStatusBadge from "../AdminStatusBadge";
import { deleteCertificate } from "@/actions/certificateActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CertificatesClient({ initialData }: { initialData: any[] }) {
  const { locale } = useAdminLanguage();
  const router = useRouter();

  const t = locale === "zh" ? {
    title: "证书资质管理",
    desc: "管理网站上的证书和资质图片",
    add: "新增证书",
    name: "证书名称",
    category: "分类",
    image: "图片",
    order: "排序",
    status: "状态",
    actions: "操作",
    edit: "编辑",
    delete: "删除",
    deleteConfirm: "确定要删除该证书吗？",
    deleteSuccess: "删除成功",
    deleteFailed: "删除失败",
  } : {
    title: "Certificates",
    desc: "Manage company certificates and qualifications",
    add: "Add Certificate",
    name: "Name",
    category: "Category",
    image: "Image",
    order: "Order",
    status: "Status",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    deleteConfirm: "Are you sure you want to delete this certificate?",
    deleteSuccess: "Deleted successfully",
    deleteFailed: "Failed to delete",
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t.deleteConfirm)) return;
    const res = await deleteCertificate(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(t.deleteSuccess);
      router.refresh();
    }
  };

  return (
    <div className="p-8">
      <AdminPageHeader
        title={t.title}
        actions={
          <Link
            href="/admin/certificates/new"
            className={ADMIN_ADD_BUTTON}
          >
            <Plus className="w-5 h-5" />
            {t.add}
          </Link>
        }
      />
      <div className={ADMIN_TABLE_CARD}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={ADMIN_SOFT_TABLE_HEAD_ROW}>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL + " w-16"}>ID</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL + " w-24"}>{t.image}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL}>{t.name}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL}>{t.category}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL + " w-24"}>{t.order}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL + " w-24"}>{t.status}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL + " w-32 text-right"}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {initialData.length === 0 ? (
              <tr>
                <td colSpan={7} className={ADMIN_EMPTY_TABLE_CELL}>
                  <AdminEmptyState title="暂无证书 / No certificates found" />
                </td>
              </tr>
            ) : (
              initialData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                  <td className="p-4">
                    <AdminImageCell 
                      src={item.image} 
                      alt={item.name} 
                      wrapperClassName="w-12 h-16 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900 text-sm">{item.name}</td>
                  <td className="p-4 text-sm text-gray-600">{item.category}</td>
                  <td className="p-4 text-sm text-gray-600">{item.order}</td>
                  <td className="p-4">
                    <AdminStatusBadge 
                      label={item.isVisible ? "显示" : "隐藏"} 
                      tone={item.isVisible ? "success" : "neutral"} 
                    />
                  </td>
                  <td className="p-4">
                    <AdminTableActions>
                      <AdminEditAction href={`/admin/certificates/${item.id}`} title={t.edit} />
                      <AdminDeleteAction onClick={() => handleDelete(item.id)} title={t.delete} />
                    </AdminTableActions>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
