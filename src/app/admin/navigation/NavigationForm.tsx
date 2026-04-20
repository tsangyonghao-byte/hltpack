"use client";

import { useActionState } from "react";
import { createNavItem, updateNavItem } from "@/actions/navigationActions";
import { Save } from "lucide-react";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminFormHeader from "../AdminFormHeader";
import AdminFormError from "../AdminFormError";
import AdminFormActions from "../AdminFormActions";
import { AdminField, AdminInput, AdminSelect, AdminToggleField } from "../AdminFormFields";
import { ADMIN_FORM_CARD } from "../adminUi";

export default function NavigationForm({
  item,
  parentOptions,
}: {
  item?: any;
  parentOptions: { id: string; nameZh: string; nameEn: string; parentId: string | null }[];
}) {
  const { locale } = useAdminLanguage();
  const isEditing = !!item;
  const action = isEditing ? updateNavItem.bind(null, item.id) : createNavItem;
  const [state, formAction, isPending] = useActionState(action, null);

  const t = locale === "zh" ? {
    title: isEditing ? "编辑导航" : "新增导航",
    nameZh: "中文名称 *",
    nameEn: "英文名称 *",
    link: "链接 *",
    image: "导航图片链接",
    order: "排序值",
    parent: "父级菜单",
    parentPlaceholder: "无 (作为顶级菜单)",
    visible: "显示状态",
    visibleHint: "是否在网站导航栏显示",
    cancel: "取消",
    saving: "保存中...",
    save: "保存",
  } : {
    title: isEditing ? "Edit Navigation" : "Add Navigation",
    nameZh: "Chinese Name *",
    nameEn: "English Name *",
    link: "Link *",
    image: "Menu Image URL",
    order: "Order",
    parent: "Parent Menu",
    parentPlaceholder: "None (Top Level)",
    visible: "Visible",
    visibleHint: "Show this item in the website navbar",
    cancel: "Cancel",
    saving: "Saving...",
    save: "Save",
  };

  // Helper to format parent options to show hierarchy
  const renderParentOptions = () => {
    const topLevel = parentOptions.filter(p => !p.parentId);
    return topLevel.map(top => {
      const children = parentOptions.filter(p => p.parentId === top.id);
      return (
        <optgroup key={top.id} label={locale === "zh" ? top.nameZh : top.nameEn}>
          <option value={top.id} disabled={top.id === item?.id}>
            {locale === "zh" ? top.nameZh : top.nameEn}
          </option>
          {children.map(child => (
            <option key={child.id} value={child.id} disabled={child.id === item?.id}>
              -- {locale === "zh" ? child.nameZh : child.nameEn}
            </option>
          ))}
        </optgroup>
      );
    });
  };

  return (
    <div className={`max-w-2xl mx-auto ${ADMIN_FORM_CARD}`}>
      <AdminFormHeader
        backHref="/admin/navigation"
        title={t.title}
        backClassName="p-2 text-gray-500 hover:text-[#F05A22] hover:bg-orange-50 rounded-full transition-colors"
      />

      <AdminFormError message={state?.error} />

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={t.nameZh} htmlFor="nameZh">
            <AdminInput
              type="text"
              id="nameZh"
              name="nameZh"
              required
              defaultValue={item?.nameZh || ""}
            />
          </AdminField>

          <AdminField label={t.nameEn} htmlFor="nameEn">
            <AdminInput
              type="text"
              id="nameEn"
              name="nameEn"
              required
              defaultValue={item?.nameEn || ""}
            />
          </AdminField>
        </div>

        <AdminField label={t.link} htmlFor="link" hint="例如: /products 或 https://google.com">
          <AdminInput
            type="text"
            id="link"
            name="link"
            required
            defaultValue={item?.link || ""}
          />
        </AdminField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={t.parent} htmlFor="parentId">
            <AdminSelect
              id="parentId"
              name="parentId"
              defaultValue={item?.parentId || ""}
            >
              <option value="">{t.parentPlaceholder}</option>
              {renderParentOptions()}
            </AdminSelect>
          </AdminField>

          <AdminField label={t.order} htmlFor="order" hint="数字越小越靠前">
            <AdminInput
              type="number"
              id="order"
              name="order"
              defaultValue={item?.order || 0}
            />
          </AdminField>
        </div>

        <AdminField label={t.image} htmlFor="image" hint="可用于 Mega Menu 菜单右侧显示的图片">
          <AdminInput
            type="text"
            id="image"
            name="image"
            defaultValue={item?.image || ""}
          />
        </AdminField>

        <AdminToggleField
          id="isVisible"
          name="isVisible"
          defaultChecked={item ? item.isVisible : true}
          label={t.visible}
          hint={t.visibleHint}
        />

        <AdminFormActions
          cancelHref="/admin/navigation"
          cancelLabel={t.cancel}
          submitDisabled={isPending}
          submitContent={
            isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t.saving}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {t.save}
              </>
            )
          }
        />
      </form>
    </div>
  );
}
