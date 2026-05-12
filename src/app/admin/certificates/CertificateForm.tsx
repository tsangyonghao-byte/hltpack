"use client";

import { useActionState, useEffect, useState } from "react";
import { createCertificate, updateCertificate } from "@/actions/certificateActions";
import { Save, Loader2 } from "lucide-react";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminFormHeader from "../AdminFormHeader";
import AdminFormError from "../AdminFormError";
import AdminFormActions from "../AdminFormActions";
import { AdminField, AdminInput, AdminToggleField } from "../AdminFormFields";
import AdminImageUploadField from "../AdminImageUploadField";
import { ADMIN_FORM_CARD } from "../adminUi";

export default function CertificateForm({ certificate }: { certificate?: any }) {
  const { locale } = useAdminLanguage();
  const isEdit = !!certificate;
  const action = isEdit ? updateCertificate : createCertificate;
  const [state, formAction, isPending] = useActionState(action, null);

  const t = locale === "zh" ? {
    addTitle: "添加证书",
    editTitle: "编辑证书",
    name: "证书名称",
    nameEs: "证书名称 (西语)",
    nameAr: "证书名称 (阿语)",
    category: "证书分类",
    categoryHint: "例如: System Certification, Product Certification",
    image: "证书图片",
    imageHint: "建议比例 3:4 或 1:1",
    imageUpload: "上传图片",
    imageUrl: "图片链接",
    order: "排序",
    orderHint: "数字越小越靠前",
    isVisible: "是否可见",
    save: "保存",
    saving: "保存中...",
  } : {
    addTitle: "Add Certificate",
    editTitle: "Edit Certificate",
    name: "Certificate Name",
    nameEs: "Certificate Name (Spanish)",
    nameAr: "Certificate Name (Arabic)",
    category: "Category",
    categoryHint: "e.g., System Certification, Product Certification",
    image: "Certificate Image",
    imageHint: "Recommended ratio 3:4 or 1:1",
    imageUpload: "Upload Image",
    imageUrl: "Image URL",
    order: "Order",
    orderHint: "Smaller numbers appear first",
    isVisible: "Visible",
    save: "Save",
    saving: "Saving...",
  };

  const [name, setName] = useState(certificate?.name || "");
  const [nameEs, setNameEs] = useState(certificate?.nameEs || "");
  const [nameAr, setNameAr] = useState(certificate?.nameAr || "");
  const [category, setCategory] = useState(certificate?.category || "System Certification");
  const [image, setImage] = useState(certificate?.image || "");
  const [order, setOrder] = useState(certificate?.order || 0);
  const [isVisible, setIsVisible] = useState(certificate ? certificate.isVisible : true);

  return (
    <div className={`max-w-3xl mx-auto ${ADMIN_FORM_CARD}`}>
      <AdminFormHeader title={isEdit ? t.editTitle : t.addTitle} backHref="/admin/certificates" />
      <AdminFormError message={state?.error} />

      <form action={formAction} className="space-y-6">
        {isEdit && <input type="hidden" name="id" value={certificate.id} />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={t.name} htmlFor="name">
            <AdminInput type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </AdminField>
          <AdminField label={t.category} htmlFor="category" hint={t.categoryHint}>
            <AdminInput type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </AdminField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={t.nameEs} htmlFor="nameEs">
            <AdminInput type="text" id="nameEs" name="nameEs" value={nameEs} onChange={(e) => setNameEs(e.target.value)} />
          </AdminField>
          <AdminField label={t.nameAr} htmlFor="nameAr">
            <AdminInput type="text" id="nameAr" name="nameAr" value={nameAr} onChange={(e) => setNameAr(e.target.value)} dir="rtl" />
          </AdminField>
        </div>

        <AdminImageUploadField
          fieldId="certificate-image"
          title={t.image}
          uploadLabel={t.imageUpload}
          urlLabel={t.imageUrl}
          urlPlaceholder="https://example.com/cert.jpg"
          hint={t.imageHint}
          initialImage={image}
          fileInputName="imageFile"
          urlInputName="image"
          onImageChange={setImage}
          previewClassName="w-48 h-64 object-contain bg-gray-50 border rounded-lg"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={t.order} htmlFor="order" hint={t.orderHint}>
            <AdminInput type="number" id="order" name="order" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
          </AdminField>
          <div className="pt-8">
            <AdminToggleField
              id="isVisible"
              name="isVisible"
              label={t.isVisible}
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
            />
          </div>
        </div>

        <AdminFormActions
          cancelHref="/admin/certificates"
          cancelLabel={locale === "zh" ? "取消" : "Cancel"}
          submitDisabled={isPending}
          submitContent={
            isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
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
