"use client";

import { useActionState, useState } from "react";
import { createProduct, updateProduct } from "@/actions/productActions";
import { Save, Eye } from "lucide-react";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminImageUploadField from "../AdminImageUploadField";
import AdminGalleryUploadField from "../AdminGalleryUploadField";
import AdminSeoPreviewPanel from "../AdminSeoPreviewPanel";
import AdminFormHeader from "../AdminFormHeader";
import AdminFormError from "../AdminFormError";
import AdminFormActions from "../AdminFormActions";
import { AdminField, AdminInput, AdminSelect, AdminTextarea, AdminToggleField } from "../AdminFormFields";
import { ADMIN_FORM_CARD } from "../adminUi";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function ProductForm({
  product,
  categories,
  seoDefaults,
}: {
  product?: any;
  categories: { id: string; name: string }[];
  seoDefaults?: {
    siteNameZh?: string | null;
    siteNameEn?: string | null;
    defaultSeoImageUrl?: string | null;
  };
}) {
  const { dict, locale } = useAdminLanguage();
  const isEditing = !!product;
  const action = isEditing ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction, isPending] = useActionState(action, null);

  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [seoTitle, setSeoTitle] = useState(product?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(product?.seoDescription || "");
  const [image, setImage] = useState(product?.image || "");
  const [featuresText, setFeaturesText] = useState(
    isEditing ? JSON.parse(product.features).join(", ") : ""
  );
  const fallbackDescription =
    name?.trim()
      ? locale === "zh"
        ? `探索 ${name} 的核心特点、应用场景与包装解决方案。`
        : `Explore key features, applications, and packaging solutions for ${name}.`
      : locale === "zh"
        ? "探索产品特点、应用场景与包装解决方案。"
        : "Explore product features, applications, and packaging solutions.";

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className={ADMIN_FORM_CARD}>
      <AdminFormHeader
        backHref="/admin/products"
        title={isEditing ? dict.products.form.editTitle : dict.products.form.createTitle}
        backClassName="p-2 text-gray-500 hover:text-[#F05A22] hover:bg-orange-50 rounded-full transition-colors"
        actions={
          isEditing && (
            <a
              href={`/products/${product.slug || product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#F05A22] bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
              title="Preview Product"
            >
              <Eye className="w-4 h-4" />
              Preview
            </a>
          )
        }
      />

      <AdminFormError message={state?.error} />

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={dict.products.form.productName} htmlFor="name">
            <AdminInput
              type="text"
              id="name"
              name="name"
              required
              minLength={2}
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={dict.products.form.productNamePlaceholder}
            />
          </AdminField>

          <AdminField label={dict.products.form.category} htmlFor="categoryId">
            <AdminSelect
              id="categoryId"
              name="categoryId"
              required
              defaultValue={product?.categoryId || ""}
            >
              <option value="" disabled>{dict.products.form.selectCategory}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={dict.products.form.slug} htmlFor="slug" hint={dict.products.form.slugHint}>
            <AdminInput
              type="text"
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={dict.products.form.slugPlaceholder}
            />
          </AdminField>

          <AdminField label={dict.products.form.seoTitle} htmlFor="seoTitle">
            <AdminInput
              type="text"
              id="seoTitle"
              name="seoTitle"
              maxLength={180}
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={dict.products.form.seoTitlePlaceholder}
            />
          </AdminField>
        </div>

        <AdminField label={dict.products.form.seoDescription} htmlFor="seoDescription">
          <AdminTextarea
            id="seoDescription"
            name="seoDescription"
            rows={3}
            maxLength={300}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder={dict.products.form.seoDescriptionPlaceholder}
          />
        </AdminField>

        <AdminImageUploadField
          fieldId="product-image"
          title={dict.products.form.image}
          uploadLabel={dict.products.form.uploadFile}
          urlLabel={dict.products.form.enterUrl}
          urlPlaceholder={dict.products.form.imageUrlPlaceholder}
          hint={dict.products.form.imageHint}
          initialImage={product?.image || ""}
          onImageChange={setImage}
        />

        <AdminGalleryUploadField
          fieldId="galleryUrls"
          title="Product Gallery"
          hint="Upload additional images for the product slider"
          initialImages={product?.gallery ? JSON.parse(product.gallery) : []}
        />

        <AdminField
          label={dict.products.form.features}
          htmlFor="features"
          hint="用英文逗号分隔多个特点，例如：High Barrier, Recyclable"
        >
          <AdminTextarea
            id="features"
            name="features"
            required
            rows={3}
            minLength={2}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder={dict.products.form.featuresPlaceholder}
          />
        </AdminField>

        <AdminField label={dict.products.form.content || "Content"} htmlFor="content">
          <input type="hidden" name="content" id="content" />
          <RichTextEditor
            content={product?.content || ""}
            onChange={(html) => {
              const input = document.getElementById("content") as HTMLInputElement;
              if (input) input.value = html;
            }}
          />
        </AdminField>

        <AdminToggleField
          id="isFeatured"
          name="isFeatured"
          defaultChecked={product?.isFeatured || false}
          label={dict.products.form.featured}
          hint={dict.products.form.featuredHint}
        />

        <AdminFormActions
          cancelHref="/admin/products"
          cancelLabel={dict.products.form.cancel}
          submitDisabled={isPending}
          submitContent={
            isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {dict.products.form.saving}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? dict.products.form.update : dict.products.form.create}
              </>
            )
          }
        />
      </form>
        </div>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <AdminSeoPreviewPanel
            locale={locale}
            title={name}
            slug={slug}
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            fallbackDescription={fallbackDescription}
            image={image}
            basePath="/products"
            seoDefaults={seoDefaults}
          />
        </div>
      </div>
    </div>
  );
}
