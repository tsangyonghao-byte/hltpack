"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { createBanner, updateBanner } from "@/actions/bannerActions";
import { Banner } from "@prisma/client";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminImageUploadField from "../../AdminImageUploadField";
import AdminFormHeader from "../../AdminFormHeader";
import AdminFormError from "../../AdminFormError";
import AdminFormActions from "../../AdminFormActions";
import { AdminField, AdminInput, AdminTextarea, AdminToggleField } from "../../AdminFormFields";
import { ADMIN_CARD_PADDED } from "../../adminUi";

export default function BannerForm({ banner }: { banner?: Banner }) {
  const { dict } = useAdminLanguage();
  const isEditing = !!banner;
  const action = isEditing ? updateBanner.bind(null, banner.id) : createBanner;
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <AdminFormHeader
        backHref="/admin/banners"
        title={isEditing ? dict.banners.form.editTitle : dict.banners.form.createTitle}
        containerClassName="flex items-center mb-8"
      />

      <form action={formAction} className={`${ADMIN_CARD_PADDED} space-y-6`}>
        <AdminFormError
          message={state?.error}
          className="rounded-md bg-red-50 p-4 text-sm text-red-600"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AdminField label={dict.banners.form.mainTitle} htmlFor="title" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminInput
                type="text"
                id="title"
                name="title"
                defaultValue={banner?.title || ""}
                required
                minLength={2}
                maxLength={120}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label="Title (Spanish)" htmlFor="titleEs" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminInput
                type="text"
                id="titleEs"
                name="titleEs"
                defaultValue={banner?.titleEs || ""}
                minLength={2}
                maxLength={120}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label="Title (Arabic)" htmlFor="titleAr" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminInput
                type="text"
                id="titleAr"
                name="titleAr"
                defaultValue={banner?.titleAr || ""}
                minLength={2}
                maxLength={120}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label={dict.banners.form.subtitle} htmlFor="subtitle" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminInput
                type="text"
                id="subtitle"
                name="subtitle"
                defaultValue={banner?.subtitle || ""}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label="Subtitle (Spanish)" htmlFor="subtitleEs" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminInput
                type="text"
                id="subtitleEs"
                name="subtitleEs"
                defaultValue={banner?.subtitleEs || ""}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label="Subtitle (Arabic)" htmlFor="subtitleAr" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminInput
                type="text"
                id="subtitleAr"
                name="subtitleAr"
                defaultValue={banner?.subtitleAr || ""}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label={dict.banners.form.description} htmlFor="description" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminTextarea
                id="description"
                name="description"
                defaultValue={banner?.description || ""}
                rows={3}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label="Description (Spanish)" htmlFor="descriptionEs" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminTextarea
                id="descriptionEs"
                name="descriptionEs"
                defaultValue={banner?.descriptionEs || ""}
                rows={3}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField label="Description (Arabic)" htmlFor="descriptionAr" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
              <AdminTextarea
                id="descriptionAr"
                name="descriptionAr"
                defaultValue={banner?.descriptionAr || ""}
                rows={3}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <AdminField
              label={dict.banners.form.ctaLink}
              htmlFor="link"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              className=""
              hint="支持站内路径如 `/products`，或完整的 `https://` 链接。"
            >
              <AdminInput
                type="text"
                id="link"
                name="link"
                defaultValue={banner?.link || ""}
                placeholder={dict.banners.form.ctaPlaceholder}
                className="border-gray-300 py-2"
              />
            </AdminField>

            <div className="flex gap-6">
              <AdminField label={dict.banners.form.displayOrder} htmlFor="order" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
                <AdminInput
                  type="number"
                  id="order"
                  name="order"
                  defaultValue={banner?.order || 0}
                  min={0}
                  step={1}
                  className="w-24 border-gray-300 py-2"
                />
              </AdminField>

              <div className="flex items-end">
                <AdminToggleField
                  id="isActive"
                  name="isActive"
                  defaultChecked={isEditing ? banner.isActive : true}
                  label={dict.banners.form.active}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5"
                />
              </div>
            </div>
          </div>

          <AdminImageUploadField
            fieldId="banner-image"
            title={dict.banners.form.image}
            uploadLabel={dict.banners.form.uploadFile}
            urlLabel={dict.banners.form.orUrl}
            urlPlaceholder={dict.banners.form.urlPlaceholder}
            hint={dict.banners.form.uploadHint}
            initialImage={banner?.image || ""}
          />
        </div>

        <AdminFormActions
          cancelHref="/admin/banners"
          cancelLabel={dict.banners.form.cancel}
          submitDisabled={isPending}
          containerClassName="pt-6 border-t border-gray-100 flex justify-end"
          cancelClassName="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium mr-4"
          submitClassName="bg-[#F05A22] text-white px-6 py-2 rounded-lg hover:bg-[#d94f1c] transition-colors flex items-center disabled:opacity-50"
          submitContent={
            <>
              <Save className="w-5 h-5 mr-2" />
              {isPending ? dict.banners.form.saving : dict.banners.form.save}
            </>
          }
        />
      </form>
    </div>
  );
}
