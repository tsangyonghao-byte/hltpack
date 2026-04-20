"use client";

import { useState, Fragment } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminPageHeader from "../AdminPageHeader";
import {
  ADMIN_ADD_BUTTON,
  ADMIN_CARD_PADDED,
  ADMIN_TABLE_CARD,
  ADMIN_SOFT_TABLE_HEAD_ROW,
  ADMIN_SOFT_TABLE_HEAD_CELL,
  ADMIN_EMPTY_TABLE_CELL,
} from "../adminUi";
import { deleteNavItem } from "@/actions/navigationActions";
import AdminConfirmButton from "../AdminConfirmButton";
import { AdminEditAction, AdminTableActions } from "../AdminTableActions";
import AdminStatusBadge from "../AdminStatusBadge";

export default function NavigationClient({ items }: { items: any[] }) {
  const { locale } = useAdminLanguage();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoading(id);
    const res = await deleteNavItem(id);
    setLoading(null);
    if (res.success) {
      toast.success(locale === "zh" ? "删除成功" : "Deleted successfully");
    } else {
      toast.error(res.error);
    }
  };

  const mainItems = items.filter(item => !item.parentId);

  return (
    <div className="p-8">
      <AdminPageHeader
        title={locale === "zh" ? "导航栏管理" : "Navigation"}
        actions={
          <a href="/admin/navigation/new" className={ADMIN_ADD_BUTTON}>
            <Plus className="w-5 h-5" />
            {locale === "zh" ? "新增导航" : "Add Item"}
          </a>
        }
      />

      <div className={ADMIN_TABLE_CARD}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={ADMIN_SOFT_TABLE_HEAD_ROW}>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL}>{locale === "zh" ? "名称" : "Name"}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL}>{locale === "zh" ? "链接" : "Link"}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL}>{locale === "zh" ? "排序" : "Order"}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL}>{locale === "zh" ? "状态" : "Status"}</th>
              <th className={ADMIN_SOFT_TABLE_HEAD_CELL + " text-right"}>{locale === "zh" ? "操作" : "Actions"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mainItems.length === 0 ? (
              <tr>
                <td colSpan={5} className={ADMIN_EMPTY_TABLE_CELL}>
                  {locale === "zh" ? "暂无导航项" : "No navigation items found."}
                </td>
              </tr>
            ) : (
              mainItems.map((item) => {
                const children = items.filter(child => child.parentId === item.id);
                return (
                  <Fragment key={item.id}>
                    {/* Main Item */}
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{locale === "zh" ? item.nameZh : item.nameEn}</div>
                        <div className="text-xs text-gray-500">{locale === "zh" ? item.nameEn : item.nameZh}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{item.link}</td>
                      <td className="p-4 text-sm text-gray-600">{item.order}</td>
                      <td className="p-4">
                        <AdminStatusBadge 
                          label={item.isVisible ? (locale === "zh" ? "显示" : "Visible") : (locale === "zh" ? "隐藏" : "Hidden")} 
                          tone={item.isVisible ? "success" : "neutral"} 
                        />
                      </td>
                      <td className="p-4">
                        <AdminTableActions>
                          <AdminEditAction href={`/admin/navigation/${item.id}`} />
                          <AdminConfirmButton
                            onConfirm={() => handleDelete(item.id)}
                            disabled={loading === item.id}
                            className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            armedClassName="inline-flex items-center justify-center p-2 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title="删除"
                            armedTitle="确认删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </AdminConfirmButton>
                        </AdminTableActions>
                      </td>
                    </tr>
                    
                    {/* Sub Items */}
                    {children.map(child => {
                      const grandChildren = items.filter(gc => gc.parentId === child.id);
                      return (
                        <Fragment key={child.id}>
                          <tr className="bg-gray-50/30 hover:bg-gray-50 transition-colors">
                            <td className="p-4 pl-12 relative">
                              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>
                              <div className="absolute left-6 top-1/2 w-4 h-px bg-gray-200"></div>
                              <div className="font-medium text-gray-800 text-sm">{locale === "zh" ? child.nameZh : child.nameEn}</div>
                              <div className="text-xs text-gray-500">{locale === "zh" ? child.nameEn : child.nameZh}</div>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{child.link}</td>
                            <td className="p-4 text-sm text-gray-600">{child.order}</td>
                            <td className="p-4">
                              <AdminStatusBadge 
                                label={child.isVisible ? (locale === "zh" ? "显示" : "Visible") : (locale === "zh" ? "隐藏" : "Hidden")} 
                                tone={child.isVisible ? "success" : "neutral"} 
                              />
                            </td>
                            <td className="p-4">
                              <AdminTableActions>
                                <AdminEditAction href={`/admin/navigation/${child.id}`} />
                                <AdminConfirmButton
                                  onConfirm={() => handleDelete(child.id)}
                                  disabled={loading === child.id}
                                  className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  armedClassName="inline-flex items-center justify-center p-2 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="删除"
                                  armedTitle="确认删除"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </AdminConfirmButton>
                              </AdminTableActions>
                            </td>
                          </tr>
                          
                          {/* Grandchildren (3rd level) */}
                          {grandChildren.map(gc => (
                            <tr key={gc.id} className="bg-gray-50/10 hover:bg-gray-50 transition-colors">
                              <td className="p-4 pl-20 relative">
                                <div className="absolute left-14 top-0 bottom-0 w-px bg-gray-200"></div>
                                <div className="absolute left-14 top-1/2 w-4 h-px bg-gray-200"></div>
                                <div className="font-medium text-gray-700 text-sm flex items-center gap-2">
                                  {locale === "zh" ? gc.nameZh : gc.nameEn}
                                  {gc.image && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full">Img</span>}
                                </div>
                                <div className="text-xs text-gray-500">{locale === "zh" ? gc.nameEn : gc.nameZh}</div>
                              </td>
                              <td className="p-4 text-sm text-gray-500">{gc.link}</td>
                              <td className="p-4 text-sm text-gray-500">{gc.order}</td>
                              <td className="p-4">
                                <AdminStatusBadge 
                                  label={gc.isVisible ? (locale === "zh" ? "显示" : "Visible") : (locale === "zh" ? "隐藏" : "Hidden")} 
                                  tone={gc.isVisible ? "success" : "neutral"} 
                                />
                              </td>
                              <td className="p-4">
                                <AdminTableActions>
                                  <AdminEditAction href={`/admin/navigation/${gc.id}`} />
                                  <AdminConfirmButton
                                    onConfirm={() => handleDelete(gc.id)}
                                    disabled={loading === gc.id}
                                    className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    armedClassName="inline-flex items-center justify-center p-2 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="删除"
                                    armedTitle="确认删除"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </AdminConfirmButton>
                                </AdminTableActions>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      );
                    })}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
