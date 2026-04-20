"use client";

import { AlertTriangle, CheckCircle2, Info, Search, Share2 } from "lucide-react";
import { ADMIN_SOFT_CARD } from "./adminUi";
import { slugify } from "@/lib/slug";

type SeoDefaults = {
  siteNameZh?: string | null;
  siteNameEn?: string | null;
  defaultSeoImageUrl?: string | null;
};

export default function AdminSeoPreviewPanel({
  locale,
  title,
  slug,
  seoTitle,
  seoDescription,
  fallbackDescription,
  image,
  basePath,
  seoDefaults,
}: {
  locale: string;
  title: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  fallbackDescription: string;
  image?: string;
  basePath: "/products" | "/news";
  seoDefaults?: SeoDefaults;
}) {
  const t =
    locale === "zh"
      ? {
          title: "SEO 预览",
          search: "搜索结果预览",
          share: "分享卡片预览",
          health: "SEO 健康度",
          good: "良好",
          warning: "需关注",
          titleLength: "标题长度",
          descriptionLength: "描述长度",
          slugStatus: "Slug 状态",
          imageStatus: "分享图",
          customTitle: "自定义 SEO 标题",
          customDescription: "自定义 SEO 描述",
          titleTooShort: "偏短，搜索结果吸引力可能不足",
          titleTooLong: "偏长，搜索结果中可能被截断",
          titleIdeal: "长度较合适，适合搜索展示",
          descriptionTooShort: "偏短，建议补充更多摘要信息",
          descriptionTooLong: "偏长，搜索结果中可能被截断",
          descriptionIdeal: "长度较合适，适合搜索展示",
          slugMissing: "Slug 为空，系统保存时会根据标题自动生成",
          slugReady: "URL 别名已准备好",
          imageMissing: "暂无专属图片，将回退到系统默认分享图",
          imageReady: "分享图已准备好",
          customTitleMissing: "当前会回退使用 内容标题 + 站点名",
          customTitleReady: "已设置自定义 SEO 标题",
          customDescriptionMissing: "当前会回退使用自动/默认描述",
          customDescriptionReady: "已设置自定义 SEO 描述",
          fallbackImage: "未设置图片时，将回退到系统默认分享图或 logo",
        }
      : {
          title: "SEO Preview",
          search: "Search Preview",
          share: "Share Card Preview",
          health: "SEO Health",
          good: "Good",
          warning: "Needs Attention",
          titleLength: "Title length",
          descriptionLength: "Description length",
          slugStatus: "Slug",
          imageStatus: "Share image",
          customTitle: "Custom SEO title",
          customDescription: "Custom SEO description",
          titleTooShort: "Too short, search result impact may be weak",
          titleTooLong: "Too long, may be truncated in search results",
          titleIdeal: "Looks good for search display",
          descriptionTooShort: "Too short, consider adding more context",
          descriptionTooLong: "Too long, may be truncated in search results",
          descriptionIdeal: "Looks good for search display",
          slugMissing: "Slug is empty, the system will auto-generate one from the title",
          slugReady: "URL alias is ready",
          imageMissing: "No dedicated image yet, will fall back to the default share image",
          imageReady: "Share image is ready",
          customTitleMissing: "Currently falls back to the content title + site name",
          customTitleReady: "Custom SEO title is set",
          customDescriptionMissing: "Currently falls back to the generated/default description",
          customDescriptionReady: "Custom SEO description is set",
          fallbackImage: "Falls back to the default share image or logo when empty",
        };

  const siteName = locale === "zh"
    ? seoDefaults?.siteNameZh || "海力通包装"
    : seoDefaults?.siteNameEn || "Logos Packaging";
  const resolvedTitle = seoTitle?.trim() || (title?.trim() ? `${title.trim()} | ${siteName}` : siteName);
  const resolvedDescription = seoDescription?.trim() || fallbackDescription;
  const resolvedSlug = slug?.trim() || slugify(title || "") || "preview-item";
  const previewUrl = `https://your-domain.com${basePath}/${resolvedSlug}`;
  const resolvedImage = image?.trim() || seoDefaults?.defaultSeoImageUrl || "";
  const titleLength = resolvedTitle.length;
  const descriptionLength = resolvedDescription.length;
  const healthItems = [
    {
      key: "title-length",
      label: t.titleLength,
      ok: titleLength >= 30 && titleLength <= 60,
      detail:
        titleLength < 30
          ? t.titleTooShort
          : titleLength > 60
            ? t.titleTooLong
            : t.titleIdeal,
      value: `${titleLength}`,
    },
    {
      key: "description-length",
      label: t.descriptionLength,
      ok: descriptionLength >= 50 && descriptionLength <= 160,
      detail:
        descriptionLength < 50
          ? t.descriptionTooShort
          : descriptionLength > 160
            ? t.descriptionTooLong
            : t.descriptionIdeal,
      value: `${descriptionLength}`,
    },
    {
      key: "slug",
      label: t.slugStatus,
      ok: !!slug?.trim(),
      detail: slug?.trim() ? t.slugReady : t.slugMissing,
      value: slug?.trim() ? resolvedSlug : "auto",
    },
    {
      key: "image",
      label: t.imageStatus,
      ok: !!image?.trim(),
      detail: image?.trim() ? t.imageReady : t.imageMissing,
      value: image?.trim() ? t.good : "fallback",
    },
    {
      key: "custom-title",
      label: t.customTitle,
      ok: !!seoTitle?.trim(),
      detail: seoTitle?.trim() ? t.customTitleReady : t.customTitleMissing,
      value: seoTitle?.trim() ? t.good : "fallback",
    },
    {
      key: "custom-description",
      label: t.customDescription,
      ok: !!seoDescription?.trim(),
      detail: seoDescription?.trim() ? t.customDescriptionReady : t.customDescriptionMissing,
      value: seoDescription?.trim() ? t.good : "fallback",
    },
  ];

  return (
    <section className={`${ADMIN_SOFT_CARD} p-5`}>
      <div className="mb-5 text-base font-semibold text-gray-900">{t.title}</div>

      <div className="space-y-5">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Search className="h-4 w-4 text-[#F05A22]" />
            {t.search}
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-semibold text-[#1A0DAB]">{resolvedTitle}</div>
            <div className="mt-1 text-xs text-green-700">{previewUrl}</div>
            <div className="mt-2 text-sm leading-6 text-gray-600">{resolvedDescription}</div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Share2 className="h-4 w-4 text-[#F05A22]" />
            {t.share}
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="flex aspect-[1.91/1] items-center justify-center bg-gray-100">
              {resolvedImage ? (
                <img src={resolvedImage} alt={resolvedTitle} className="h-full w-full object-cover" />
              ) : (
                <div className="px-6 text-center text-sm text-gray-500">{t.fallbackImage}</div>
              )}
            </div>
            <div className="space-y-2 p-4">
              <div className="text-sm font-semibold text-gray-900">{resolvedTitle}</div>
              <div className="text-sm leading-6 text-gray-600">{resolvedDescription}</div>
              <div className="text-xs text-gray-400">{previewUrl}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Info className="h-4 w-4 text-[#F05A22]" />
            {t.health}
          </div>
          <div className="space-y-3">
            {healthItems.map((item) => (
              <div key={item.key} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {item.ok ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    )}
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                      <div className="mt-1 text-sm text-gray-600">{item.detail}</div>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${item.ok ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
