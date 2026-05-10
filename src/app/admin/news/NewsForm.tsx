"use client";

import { useActionState, useState } from "react";
import { createNews, updateNews } from "@/actions/newsActions";
import { Save, Calendar, Eye } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminImageUploadField from "../AdminImageUploadField";
import AdminSeoPreviewPanel from "../AdminSeoPreviewPanel";
import AdminFormHeader from "../AdminFormHeader";
import AdminFormError from "../AdminFormError";
import AdminFormActions from "../AdminFormActions";
import { AdminField, AdminInput, AdminTextarea } from "../AdminFormFields";
import { ADMIN_FORM_CARD } from "../adminUi";

export default function NewsForm({
  newsItem,
  seoDefaults,
}: {
  newsItem?: any;
  seoDefaults?: {
    siteNameZh?: string | null;
    siteNameEn?: string | null;
    defaultSeoImageUrl?: string | null;
  };
}) {
  const { dict, locale } = useAdminLanguage();
  const isEditing = !!newsItem;
  const action = isEditing ? updateNews.bind(null, newsItem.id) : createNews;
  const [state, formAction, isPending] = useActionState(action, null);
  const [title, setTitle] = useState(newsItem?.title || "");
  const [titleEs, setTitleEs] = useState(newsItem?.titleEs || "");
  const [titleAr, setTitleAr] = useState(newsItem?.titleAr || "");
  const [slug, setSlug] = useState(newsItem?.slug || "");
  const [seoTitle, setSeoTitle] = useState(newsItem?.seoTitle || "");
  const [seoTitleEs, setSeoTitleEs] = useState(newsItem?.seoTitleEs || "");
  const [seoTitleAr, setSeoTitleAr] = useState(newsItem?.seoTitleAr || "");
  const [seoDescription, setSeoDescription] = useState(newsItem?.seoDescription || "");
  const [seoDescriptionEs, setSeoDescriptionEs] = useState(newsItem?.seoDescriptionEs || "");
  const [seoDescriptionAr, setSeoDescriptionAr] = useState(newsItem?.seoDescriptionAr || "");
  const [image, setImage] = useState(newsItem?.image || "");
  const [summary, setSummary] = useState(newsItem?.summary || "");
  const [summaryEs, setSummaryEs] = useState(newsItem?.summaryEs || "");
  const [summaryAr, setSummaryAr] = useState(newsItem?.summaryAr || "");
  const [content, setContent] = useState(newsItem?.content || "");
  const [contentEs, setContentEs] = useState(newsItem?.contentEs || "");
  const [contentAr, setContentAr] = useState(newsItem?.contentAr || "");

  // Auto-fill today's date if it's a new post
  const today = new Date().toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const fallbackDescription =
    seoDescription?.trim() || summary?.trim() ||
    (locale === "zh" ? "查看最新文章内容与行业洞察。" : "Read the latest article and industry insights.");

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className={ADMIN_FORM_CARD}>
      <AdminFormHeader
        backHref="/admin/news"
        title={isEditing ? dict.news.form.editTitle : dict.news.form.createTitle}
        backClassName="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
        actions={
          isEditing && (
            <a
              href={`/news/${newsItem.slug || newsItem.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              title="Preview News"
            >
              <Eye className="w-4 h-4" />
              Preview
            </a>
          )
        }
      />

      <AdminFormError message={state?.error} />

      <form action={formAction} className="space-y-6">
        <AdminField label={dict.news.form.articleTitle} htmlFor="title">
          <AdminInput
            type="text"
            id="title"
            name="title"
            required
            minLength={4}
            maxLength={180}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            tone="green"
            placeholder={dict.news.form.articleTitlePlaceholder}
          />
        </AdminField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label="Article Title (Spanish)" htmlFor="titleEs">
            <AdminInput
              type="text"
              id="titleEs"
              name="titleEs"
              minLength={4}
              maxLength={180}
              value={titleEs}
              onChange={(e) => setTitleEs(e.target.value)}
              tone="green"
              placeholder="Spanish article title"
            />
          </AdminField>

          <AdminField label="Article Title (Arabic)" htmlFor="titleAr">
            <AdminInput
              type="text"
              id="titleAr"
              name="titleAr"
              minLength={4}
              maxLength={180}
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              tone="green"
              placeholder="Arabic article title"
            />
          </AdminField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={dict.news.form.category} htmlFor="category">
            <AdminInput
              type="text"
              id="category"
              name="category"
              required
              maxLength={60}
              defaultValue={newsItem?.category || dict.news.form.defaultCategory}
              tone="green"
              placeholder={dict.news.form.categoryPlaceholder}
            />
          </AdminField>

          <AdminField label="Category (Spanish)" htmlFor="categoryEs">
            <AdminInput
              type="text"
              id="categoryEs"
              name="categoryEs"
              maxLength={60}
              defaultValue={newsItem?.categoryEs || ""}
              tone="green"
              placeholder="Spanish category"
            />
          </AdminField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label="Category (Arabic)" htmlFor="categoryAr">
            <AdminInput
              type="text"
              id="categoryAr"
              name="categoryAr"
              maxLength={60}
              defaultValue={newsItem?.categoryAr || ""}
              tone="green"
              placeholder="Arabic category"
            />
          </AdminField>

          <AdminField label={dict.news.form.displayDate} htmlFor="date">
            <div className="relative">
              <AdminInput
                type="text"
                id="date"
                name="date"
                required
                defaultValue={newsItem?.date || today}
                tone="green"
                className="pl-11 pr-4"
              />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </AdminField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label={dict.news.form.slug} htmlFor="slug" hint={dict.news.form.slugHint}>
            <AdminInput
              type="text"
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              tone="green"
              placeholder={dict.news.form.slugPlaceholder}
            />
          </AdminField>

          <AdminField label={dict.news.form.seoTitle} htmlFor="seoTitle">
            <AdminInput
              type="text"
              id="seoTitle"
              name="seoTitle"
              maxLength={180}
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              tone="green"
              placeholder={dict.news.form.seoTitlePlaceholder}
            />
          </AdminField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label="SEO Title (Spanish)" htmlFor="seoTitleEs">
            <AdminInput
              type="text"
              id="seoTitleEs"
              name="seoTitleEs"
              maxLength={180}
              value={seoTitleEs}
              onChange={(e) => setSeoTitleEs(e.target.value)}
              tone="green"
              placeholder="Spanish SEO title"
            />
          </AdminField>

          <AdminField label="SEO Title (Arabic)" htmlFor="seoTitleAr">
            <AdminInput
              type="text"
              id="seoTitleAr"
              name="seoTitleAr"
              maxLength={180}
              value={seoTitleAr}
              onChange={(e) => setSeoTitleAr(e.target.value)}
              tone="green"
              placeholder="Arabic SEO title"
            />
          </AdminField>
        </div>

        <AdminField label={dict.news.form.seoDescription} htmlFor="seoDescription">
          <AdminTextarea
            id="seoDescription"
            name="seoDescription"
            rows={3}
            maxLength={300}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            tone="green"
            placeholder={dict.news.form.seoDescriptionPlaceholder}
          />
        </AdminField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label="SEO Description (Spanish)" htmlFor="seoDescriptionEs">
            <AdminTextarea
              id="seoDescriptionEs"
              name="seoDescriptionEs"
              rows={3}
              maxLength={300}
              value={seoDescriptionEs}
              onChange={(e) => setSeoDescriptionEs(e.target.value)}
              tone="green"
              placeholder="Spanish SEO description"
            />
          </AdminField>

          <AdminField label="SEO Description (Arabic)" htmlFor="seoDescriptionAr">
            <AdminTextarea
              id="seoDescriptionAr"
              name="seoDescriptionAr"
              rows={3}
              maxLength={300}
              value={seoDescriptionAr}
              onChange={(e) => setSeoDescriptionAr(e.target.value)}
              tone="green"
              placeholder="Arabic SEO description"
            />
          </AdminField>
        </div>

        <AdminImageUploadField
          fieldId="news-image"
          title={dict.news.form.coverImage}
          uploadLabel={dict.news.form.uploadFile}
          urlLabel={dict.news.form.enterUrl}
          urlPlaceholder={dict.news.form.imageUrlPlaceholder}
          hint={dict.news.form.imageHint}
          initialImage={newsItem?.image || ""}
          onImageChange={setImage}
        />

        <AdminField
          label={dict.news.form.summary}
          htmlFor="summary"
          hint="建议控制在 1-2 句话，方便首页新闻卡片展示。"
        >
          <AdminTextarea
            id="summary"
            name="summary"
            required
            rows={2}
            minLength={10}
            maxLength={240}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            tone="green"
            placeholder={dict.news.form.summaryPlaceholder}
          />
        </AdminField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminField label="Summary (Spanish)" htmlFor="summaryEs">
            <AdminTextarea
              id="summaryEs"
              name="summaryEs"
              rows={2}
              minLength={10}
              maxLength={240}
              value={summaryEs}
              onChange={(e) => setSummaryEs(e.target.value)}
              tone="green"
              placeholder="Spanish summary"
            />
          </AdminField>

          <AdminField label="Summary (Arabic)" htmlFor="summaryAr">
            <AdminTextarea
              id="summaryAr"
              name="summaryAr"
              rows={2}
              minLength={10}
              maxLength={240}
              value={summaryAr}
              onChange={(e) => setSummaryAr(e.target.value)}
              tone="green"
              placeholder="Arabic summary"
            />
          </AdminField>
        </div>

        <AdminField label={dict.news.form.content} htmlFor="content">
          <input type="hidden" name="content" value={content} />
          <RichTextEditor content={content} onChange={setContent} />
        </AdminField>

        <AdminField label="Content (Spanish)" htmlFor="contentEs">
          <input type="hidden" name="contentEs" value={contentEs} />
          <RichTextEditor content={contentEs} onChange={setContentEs} />
        </AdminField>

        <AdminField label="Content (Arabic)" htmlFor="contentAr">
          <input type="hidden" name="contentAr" value={contentAr} />
          <RichTextEditor content={contentAr} onChange={setContentAr} />
        </AdminField>

        <AdminFormActions
          cancelHref="/admin/news"
          cancelLabel={dict.news.form.cancel}
          submitDisabled={isPending}
          submitClassName="px-8 py-3 rounded-lg font-bold text-white bg-[#1E293B] hover:bg-green-600 shadow-md hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          submitContent={
            isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {dict.news.form.saving}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? dict.news.form.update : dict.news.form.publish}
              </>
            )
          }
        />
      </form>
        </div>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <AdminSeoPreviewPanel
            locale={locale}
            title={title}
            slug={slug}
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            fallbackDescription={fallbackDescription}
            image={image}
            basePath="/news"
            seoDefaults={seoDefaults}
          />
        </div>
      </div>
    </div>
  );
}
