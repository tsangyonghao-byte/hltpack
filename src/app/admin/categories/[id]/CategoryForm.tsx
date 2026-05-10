"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { createCategory, updateCategory } from "@/actions/categoryActions";
import { Category } from "@prisma/client";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminFormHeader from "../../AdminFormHeader";
import AdminFormError from "../../AdminFormError";
import AdminFormActions from "../../AdminFormActions";
import { AdminField, AdminInput, AdminTextarea } from "../../AdminFormFields";
import { ADMIN_CARD_PADDED } from "../../adminUi";

export default function CategoryForm({ category }: { category?: Category }) {
  const { dict } = useAdminLanguage();
  const isEditing = !!category;
  const action = isEditing ? updateCategory.bind(null, category.id) : createCategory;
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <AdminFormHeader
        backHref="/admin/categories"
        title={isEditing ? dict.categories.form.editTitle : dict.categories.form.createTitle}
        containerClassName="flex items-center mb-8"
      />

      <form action={formAction} className={`${ADMIN_CARD_PADDED} space-y-6`}>
        <AdminFormError
          message={state?.error}
          className="rounded-md bg-red-50 p-4 text-sm text-red-600"
        />

        <AdminField label={dict.categories.form.name} htmlFor="name" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
          <AdminInput
            type="text"
            id="name"
            name="name"
            defaultValue={category?.name || ""}
            required
            className="border-gray-300 py-2 focus:border-transparent"
            placeholder={dict.categories.form.namePlaceholder}
          />
        </AdminField>

        <AdminField label="Name (Spanish)" htmlFor="nameEs" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
          <AdminInput
            type="text"
            id="nameEs"
            name="nameEs"
            defaultValue={category?.nameEs || ""}
            className="border-gray-300 py-2 focus:border-transparent"
            placeholder="Spanish category name"
          />
        </AdminField>

        <AdminField label="Name (Arabic)" htmlFor="nameAr" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
          <AdminInput
            type="text"
            id="nameAr"
            name="nameAr"
            defaultValue={category?.nameAr || ""}
            className="border-gray-300 py-2 focus:border-transparent"
            placeholder="Arabic category name"
          />
        </AdminField>

        <AdminField label={dict.categories.form.description} htmlFor="description" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
          <AdminTextarea
            id="description"
            name="description"
            defaultValue={category?.description || ""}
            rows={4}
            className="border-gray-300 py-2 focus:border-transparent"
            placeholder={dict.categories.form.descriptionPlaceholder}
          />
        </AdminField>

        <AdminField label="Description (Spanish)" htmlFor="descriptionEs" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
          <AdminTextarea
            id="descriptionEs"
            name="descriptionEs"
            defaultValue={category?.descriptionEs || ""}
            rows={4}
            className="border-gray-300 py-2 focus:border-transparent"
            placeholder="Spanish description"
          />
        </AdminField>

        <AdminField label="Description (Arabic)" htmlFor="descriptionAr" labelClassName="block text-sm font-medium text-gray-700 mb-2" className="">
          <AdminTextarea
            id="descriptionAr"
            name="descriptionAr"
            defaultValue={category?.descriptionAr || ""}
            rows={4}
            className="border-gray-300 py-2 focus:border-transparent"
            placeholder="Arabic description"
          />
        </AdminField>

        <AdminFormActions
          cancelHref="/admin/categories"
          cancelLabel={dict.categories.form.cancel}
          submitDisabled={isPending}
          containerClassName="pt-4 flex justify-end"
          cancelClassName="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium mr-4"
          submitClassName="bg-[#F05A22] text-white px-6 py-2 rounded-lg hover:bg-[#d94f1c] transition-colors flex items-center disabled:opacity-50"
          submitContent={
            <>
              <Save className="w-5 h-5 mr-2" />
              {isPending ? dict.categories.form.saving : dict.categories.form.save}
            </>
          }
        />
      </form>
    </div>
  );
}
