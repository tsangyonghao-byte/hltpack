"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { updateSystemSetting } from "@/actions/settingActions";
import { Save, Search, Share2, Shield } from "lucide-react";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import AdminFormHeader from "../AdminFormHeader";
import AdminFormError from "../AdminFormError";
import AdminFormActions from "../AdminFormActions";
import { AdminField, AdminInput, AdminTextarea, AdminToggleField } from "../AdminFormFields";
import AdminImageUploadField from "../AdminImageUploadField";
import { ADMIN_FORM_CARD, ADMIN_SOFT_CARD } from "../adminUi";
import { toast } from "sonner";

export default function SettingsForm({ setting }: { setting: any }) {
  const { locale } = useAdminLanguage();
  const [state, formAction, isPending] = useActionState(updateSystemSetting, null);
  type SettingsTab = "basic" | "contact" | "social" | "seo" | "footer";

  const t = locale === "zh" ? {
    title: "系统设置",
    basic: "基础设置",
    siteNameZh: "网站名称 (中文)",
    siteNameEn: "网站名称 (英文)",
    contact: "联系方式",
    email: "联系邮箱",
    phone: "联系电话",
    addressZh: "联系地址 (中文)",
    addressEn: "联系地址 (英文)",
    social: "社交媒体",
    seo: "SEO 设置",
    seoHint: "这些设置会作为首页和未单独配置 SEO 的页面默认值使用。",
    seoTitleZh: "SEO Title 尾缀 (中文)",
    seoTitleEn: "SEO Title 尾缀 (英文)",
    seoDescZh: "全局 Meta Description (中文)",
    seoDescEn: "全局 Meta Description (英文)",
    seoKeywordsZh: "全局 Meta Keywords (中文)",
    seoKeywordsEn: "全局 Meta Keywords (英文)",
    defaultSeoImageUrl: "默认分享图 URL",
    defaultSeoImageHint: "用于首页、列表页等没有单独图片的页面分享图。",
    defaultSeoImageUpload: "上传默认分享图",
    defaultSeoImageUrlLabel: "分享图链接",
    defaultSeoImageUrlPlaceholder: "https://example.com/share-image.jpg",
    siteNoindex: "全站 noindex",
    siteNoindexHint: "开启后，整个网站会输出 noindex,nofollow，并在 robots.txt 中禁止抓取。",
    robotsDisallowPaths: "robots.txt 禁止路径",
    robotsDisallowPathsHint: "每行一个路径，支持 * 结尾表示前缀匹配，例如 /admin/*",
    noindexPaths: "页面 noindex 路径",
    noindexPathsHint: "每行一个路径，支持 * 结尾表示前缀匹配，例如 /products/*",
    preview: "SEO 预览",
    tabsHint: "按分组切换设置项，避免所有内容堆在一个长页面中。",
    unsavedHint: "当前分组有未保存修改",
    unsavedConfirm: "当前分组还有未保存的修改，确认切换吗？",
    homepagePreview: "首页默认预览",
    innerPagePreview: "内页标题模板预览",
    sharePreview: "分享卡片预览",
    robotsPreview: "Robots 预览",
    sampleInnerPage: "产品中心",
    titleLabel: "标题",
    descriptionLabel: "描述",
    imageLabel: "分享图",
    keywordsLabel: "关键词",
    robotsStatus: "抓取状态",
    robotsAllow: "允许索引和跟踪",
    robotsNoindex: "输出 noindex, nofollow",
    disallowCount: "robots 禁止规则",
    noindexCount: "noindex 路径规则",
    fallbackImage: "未设置时将回退到系统默认 logo",
    footer: "页脚设置",
    footerCopyZh: "版权信息 (中文)",
    footerCopyEn: "版权信息 (英文)",
    saveCurrent: "保存当前分组",
    savedSuffix: "已保存",
    allSaved: "系统设置已保存",
    saving: "保存中...",
    save: "保存设置",
  } : {
    title: "System Settings",
    basic: "Basic Settings",
    siteNameZh: "Site Name (Chinese)",
    siteNameEn: "Site Name (English)",
    contact: "Contact Info",
    email: "Contact Email",
    phone: "Contact Phone",
    addressZh: "Address (Chinese)",
    addressEn: "Address (English)",
    social: "Social Media",
    seo: "SEO Settings",
    seoHint: "These values act as defaults for the homepage and pages without custom SEO settings.",
    seoTitleZh: "SEO Title Suffix (Chinese)",
    seoTitleEn: "SEO Title Suffix (English)",
    seoDescZh: "Global Meta Description (Chinese)",
    seoDescEn: "Global Meta Description (English)",
    seoKeywordsZh: "Global Meta Keywords (Chinese)",
    seoKeywordsEn: "Global Meta Keywords (English)",
    defaultSeoImageUrl: "Default Share Image URL",
    defaultSeoImageHint: "Used as the fallback share image for pages without their own image.",
    defaultSeoImageUpload: "Upload Default Share Image",
    defaultSeoImageUrlLabel: "Share Image URL",
    defaultSeoImageUrlPlaceholder: "https://example.com/share-image.jpg",
    siteNoindex: "Global noindex",
    siteNoindexHint: "When enabled, the whole site outputs noindex,nofollow and robots.txt blocks crawling.",
    robotsDisallowPaths: "robots.txt Disallow Paths",
    robotsDisallowPathsHint: "One path per line. Use * at the end for prefix matching, e.g. /admin/*",
    noindexPaths: "Page noindex Paths",
    noindexPathsHint: "One path per line. Use * at the end for prefix matching, e.g. /products/*",
    preview: "SEO Preview",
    tabsHint: "Switch by section so settings are easier to manage than one long page.",
    unsavedHint: "This section has unsaved changes",
    unsavedConfirm: "This section has unsaved changes. Switch anyway?",
    homepagePreview: "Homepage Preview",
    innerPagePreview: "Inner Page Title Preview",
    sharePreview: "Share Card Preview",
    robotsPreview: "Robots Preview",
    sampleInnerPage: "Products",
    titleLabel: "Title",
    descriptionLabel: "Description",
    imageLabel: "Share Image",
    keywordsLabel: "Keywords",
    robotsStatus: "Crawl Status",
    robotsAllow: "Index and follow allowed",
    robotsNoindex: "Outputs noindex, nofollow",
    disallowCount: "robots rules",
    noindexCount: "noindex rules",
    fallbackImage: "Falls back to the system logo when empty",
    footer: "Footer Settings",
    footerCopyZh: "Copyright (Chinese)",
    footerCopyEn: "Copyright (English)",
    saveCurrent: "Save Current Section",
    savedSuffix: "saved",
    allSaved: "Settings saved successfully",
    saving: "Saving...",
    save: "Save Settings",
  };
  const [activeTab, setActiveTab] = useState<SettingsTab>("basic");

  const [siteNameZh, setSiteNameZh] = useState(setting?.siteNameZh || "");
  const [siteNameEn, setSiteNameEn] = useState(setting?.siteNameEn || "");
  const [contactEmail, setContactEmail] = useState(setting?.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(setting?.contactPhone || "");
  const [contactAddressZh, setContactAddressZh] = useState(setting?.contactAddressZh || "");
  const [contactAddressEn, setContactAddressEn] = useState(setting?.contactAddressEn || "");
  const [whatsapp, setWhatsapp] = useState(setting?.whatsapp || "");
  const [wechat, setWechat] = useState(setting?.wechat || "");
  const [facebook, setFacebook] = useState(setting?.facebook || "");
  const [linkedin, setLinkedin] = useState(setting?.linkedin || "");
  const [youtube, setYoutube] = useState(setting?.youtube || "");
  const [instagram, setInstagram] = useState(setting?.instagram || "");
  const [twitter, setTwitter] = useState(setting?.twitter || "");
  const [seoTitleZh, setSeoTitleZh] = useState(setting?.seoTitleZh || "");
  const [seoTitleEn, setSeoTitleEn] = useState(setting?.seoTitleEn || "");
  const [seoDescZh, setSeoDescZh] = useState(setting?.seoDescZh || "");
  const [seoDescEn, setSeoDescEn] = useState(setting?.seoDescEn || "");
  const [seoKeywordsZh, setSeoKeywordsZh] = useState(setting?.seoKeywordsZh || "");
  const [seoKeywordsEn, setSeoKeywordsEn] = useState(setting?.seoKeywordsEn || "");
  const [defaultSeoImageUrl, setDefaultSeoImageUrl] = useState(setting?.defaultSeoImageUrl || "");
  const [siteNoindex, setSiteNoindex] = useState(!!setting?.siteNoindex);
  const [robotsDisallowPaths, setRobotsDisallowPaths] = useState(setting?.robotsDisallowPaths || "/admin/*\n/api/*");
  const [noindexPaths, setNoindexPaths] = useState(setting?.noindexPaths || "");
  const [footerCopyZh, setFooterCopyZh] = useState(setting?.footerCopyZh || "");
  const [footerCopyEn, setFooterCopyEn] = useState(setting?.footerCopyEn || "");
  const getSectionSnapshot = (tab: SettingsTab) => {
    switch (tab) {
      case "basic":
        return { siteNameZh, siteNameEn };
      case "contact":
        return { contactEmail, contactPhone, contactAddressZh, contactAddressEn };
      case "social":
        return { whatsapp, wechat, facebook, linkedin, youtube, instagram, twitter };
      case "seo":
        return {
          seoTitleZh,
          seoTitleEn,
          seoDescZh,
          seoDescEn,
          seoKeywordsZh,
          seoKeywordsEn,
          defaultSeoImageUrl,
          siteNoindex,
          robotsDisallowPaths,
          noindexPaths,
        };
      case "footer":
        return { footerCopyZh, footerCopyEn };
    }
  };
  const [savedSnapshots, setSavedSnapshots] = useState<Record<SettingsTab, string>>({
    basic: JSON.stringify({ siteNameZh: setting?.siteNameZh || "", siteNameEn: setting?.siteNameEn || "" }),
    contact: JSON.stringify({
      contactEmail: setting?.contactEmail || "",
      contactPhone: setting?.contactPhone || "",
      contactAddressZh: setting?.contactAddressZh || "",
      contactAddressEn: setting?.contactAddressEn || "",
    }),
    social: JSON.stringify({
      whatsapp: setting?.whatsapp || "",
      wechat: setting?.wechat || "",
      facebook: setting?.facebook || "",
      linkedin: setting?.linkedin || "",
      youtube: setting?.youtube || "",
      instagram: setting?.instagram || "",
      twitter: setting?.twitter || "",
    }),
    seo: JSON.stringify({
      seoTitleZh: setting?.seoTitleZh || "",
      seoTitleEn: setting?.seoTitleEn || "",
      seoDescZh: setting?.seoDescZh || "",
      seoDescEn: setting?.seoDescEn || "",
      seoKeywordsZh: setting?.seoKeywordsZh || "",
      seoKeywordsEn: setting?.seoKeywordsEn || "",
      defaultSeoImageUrl: setting?.defaultSeoImageUrl || "",
      siteNoindex: !!setting?.siteNoindex,
      robotsDisallowPaths: setting?.robotsDisallowPaths || "/admin/*\n/api/*",
      noindexPaths: setting?.noindexPaths || "",
    }),
    footer: JSON.stringify({
      footerCopyZh: setting?.footerCopyZh || "",
      footerCopyEn: setting?.footerCopyEn || "",
    }),
  });

  const previewData = useMemo(() => {
    const zhHomeTitle = siteNameZh || "海力通包装";
    const enHomeTitle = siteNameEn || "Logos Packaging";
    const zhInnerTitle = `${t.sampleInnerPage}${seoTitleZh || ` | ${zhHomeTitle}`}`;
    const enInnerTitle = `${t.sampleInnerPage}${seoTitleEn || ` | ${enHomeTitle}`}`;
    const disallowCount = robotsDisallowPaths
      .split(/\r?\n|,/)
      .map((item: string) => item.trim())
      .filter(Boolean).length;
    const noindexCountValue = noindexPaths
      .split(/\r?\n|,/)
      .map((item: string) => item.trim())
      .filter(Boolean).length;

    return {
      zhHomeTitle,
      enHomeTitle,
      zhInnerTitle,
      enInnerTitle,
      zhDescription: seoDescZh || "为您提供创新和可持续的包装解决方案。",
      enDescription: seoDescEn || "Providing innovative and sustainable packaging solutions globally.",
      zhKeywords: seoKeywordsZh || "-",
      enKeywords: seoKeywordsEn || "-",
      image: defaultSeoImageUrl,
      disallowCount,
      noindexCountValue,
    };
  }, [
    defaultSeoImageUrl,
    noindexPaths,
    robotsDisallowPaths,
    seoDescEn,
    seoDescZh,
    seoKeywordsEn,
    seoKeywordsZh,
    seoTitleEn,
    seoTitleZh,
    siteNameEn,
    siteNameZh,
    t.sampleInnerPage,
  ]);
  const isCurrentTabDirty = savedSnapshots[activeTab] !== JSON.stringify(getSectionSnapshot(activeTab));
  const tabs = [
    { id: "basic", label: t.basic },
    { id: "contact", label: t.contact },
    { id: "social", label: t.social },
    { id: "seo", label: t.seo },
    { id: "footer", label: t.footer },
  ] as const;
  const tabLabelMap: Record<SettingsTab, string> = {
    basic: t.basic,
    contact: t.contact,
    social: t.social,
    seo: t.seo,
    footer: t.footer,
  };

  useEffect(() => {
    if (!state?.success) return;
    if (!state.section || state.section === "all") {
      toast.success(t.allSaved);
      return;
    }
    const label = tabLabelMap[state.section as SettingsTab];
    toast.success(locale === "zh" ? `${label}${t.savedSuffix}` : `${label} ${t.savedSuffix}`);
  }, [locale, state, t.allSaved, t.savedSuffix, tabLabelMap]);

  useEffect(() => {
    if (state?.success && state?.section && state.section !== "all") {
      const section = state.section as SettingsTab;
      setSavedSnapshots((prev) => ({
        ...prev,
        [section]: JSON.stringify(getSectionSnapshot(section)),
      }));
    }
  }, [
    state,
    siteNameZh,
    siteNameEn,
    contactEmail,
    contactPhone,
    contactAddressZh,
    contactAddressEn,
    whatsapp,
    wechat,
    facebook,
    linkedin,
    youtube,
    instagram,
    twitter,
    seoTitleZh,
    seoTitleEn,
    seoDescZh,
    seoDescEn,
    seoKeywordsZh,
    seoKeywordsEn,
    defaultSeoImageUrl,
    siteNoindex,
    robotsDisallowPaths,
    noindexPaths,
    footerCopyZh,
    footerCopyEn,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isCurrentTabDirty) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isCurrentTabDirty]);

  return (
    <div className={`max-w-4xl mx-auto ${ADMIN_FORM_CARD}`}>
      <AdminFormHeader
        title={t.title}
        backHref="/admin"
        backClassName="p-2 text-gray-500 hover:text-[#F05A22] hover:bg-orange-50 rounded-full transition-colors"
      />

      <AdminFormError message={state?.error} />

      <form action={formAction} className="space-y-10">
        <input type="hidden" name="__section" value={activeTab} />
        <section>
          <div className="mb-3 text-sm text-gray-500">{t.tabsHint}</div>
          <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === activeTab) return;
                  if (isCurrentTabDirty && !window.confirm(t.unsavedConfirm)) return;
                  setActiveTab(tab.id);
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-white text-[#F05A22] shadow-sm border border-orange-200"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {isCurrentTabDirty ? (
            <div className="mt-3 text-sm font-medium text-amber-600">{t.unsavedHint}</div>
          ) : null}
        </section>
        
        {/* Basic Section */}
        {activeTab === "basic" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.basic}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label={t.siteNameZh} htmlFor="siteNameZh">
              <AdminInput type="text" id="siteNameZh" name="siteNameZh" value={siteNameZh} onChange={(e) => setSiteNameZh(e.target.value)} />
            </AdminField>
            <AdminField label={t.siteNameEn} htmlFor="siteNameEn">
              <AdminInput type="text" id="siteNameEn" name="siteNameEn" value={siteNameEn} onChange={(e) => setSiteNameEn(e.target.value)} />
            </AdminField>
          </div>
        </section>
        )}

        {/* Contact Section */}
        {activeTab === "contact" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.contact}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AdminField label={t.email} htmlFor="contactEmail">
              <AdminInput type="email" id="contactEmail" name="contactEmail" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </AdminField>
            <AdminField label={t.phone} htmlFor="contactPhone">
              <AdminInput type="text" id="contactPhone" name="contactPhone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
            </AdminField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label={t.addressZh} htmlFor="contactAddressZh">
              <AdminTextarea id="contactAddressZh" name="contactAddressZh" rows={2} value={contactAddressZh} onChange={(e) => setContactAddressZh(e.target.value)} />
            </AdminField>
            <AdminField label={t.addressEn} htmlFor="contactAddressEn">
              <AdminTextarea id="contactAddressEn" name="contactAddressEn" rows={2} value={contactAddressEn} onChange={(e) => setContactAddressEn(e.target.value)} />
            </AdminField>
          </div>
        </section>
        )}

        {/* Social Section */}
        {activeTab === "social" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.social}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AdminField label="WhatsApp URL" htmlFor="whatsapp">
              <AdminInput type="text" id="whatsapp" name="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="https://wa.me/..." />
            </AdminField>
            <AdminField label="WeChat ID / URL" htmlFor="wechat">
              <AdminInput type="text" id="wechat" name="wechat" value={wechat} onChange={(e) => setWechat(e.target.value)} />
            </AdminField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AdminField label="Facebook URL" htmlFor="facebook">
              <AdminInput type="text" id="facebook" name="facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/..." />
            </AdminField>
            <AdminField label="LinkedIn URL" htmlFor="linkedin">
              <AdminInput type="text" id="linkedin" name="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/..." />
            </AdminField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AdminField label="YouTube URL" htmlFor="youtube">
              <AdminInput type="text" id="youtube" name="youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtube.com/..." />
            </AdminField>
            <AdminField label="Instagram URL" htmlFor="instagram">
              <AdminInput type="text" id="instagram" name="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
            </AdminField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label="Twitter/X URL" htmlFor="twitter">
              <AdminInput type="text" id="twitter" name="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://twitter.com/..." />
            </AdminField>
          </div>
        </section>
        )}

        {/* SEO Section */}
        {activeTab === "seo" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-2">{t.seo}</h3>
          <p className="mb-4 text-sm text-gray-500">{t.seoHint}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AdminField label={t.seoTitleZh} htmlFor="seoTitleZh">
              <AdminInput type="text" id="seoTitleZh" name="seoTitleZh" value={seoTitleZh} onChange={(e) => setSeoTitleZh(e.target.value)} placeholder=" - 海力通包装" />
            </AdminField>
            <AdminField label={t.seoTitleEn} htmlFor="seoTitleEn">
              <AdminInput type="text" id="seoTitleEn" name="seoTitleEn" value={seoTitleEn} onChange={(e) => setSeoTitleEn(e.target.value)} placeholder=" | Logos Packaging" />
            </AdminField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AdminField label={t.seoDescZh} htmlFor="seoDescZh">
              <AdminTextarea id="seoDescZh" name="seoDescZh" rows={2} value={seoDescZh} onChange={(e) => setSeoDescZh(e.target.value)} />
            </AdminField>
            <AdminField label={t.seoDescEn} htmlFor="seoDescEn">
              <AdminTextarea id="seoDescEn" name="seoDescEn" rows={2} value={seoDescEn} onChange={(e) => setSeoDescEn(e.target.value)} />
            </AdminField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label={t.seoKeywordsZh} htmlFor="seoKeywordsZh">
              <AdminTextarea id="seoKeywordsZh" name="seoKeywordsZh" rows={2} value={seoKeywordsZh} onChange={(e) => setSeoKeywordsZh(e.target.value)} />
            </AdminField>
            <AdminField label={t.seoKeywordsEn} htmlFor="seoKeywordsEn">
              <AdminTextarea id="seoKeywordsEn" name="seoKeywordsEn" rows={2} value={seoKeywordsEn} onChange={(e) => setSeoKeywordsEn(e.target.value)} />
            </AdminField>
          </div>
          <div className="mt-6">
            <AdminImageUploadField
              fieldId="default-seo-image"
              title={t.defaultSeoImageUrl}
              uploadLabel={t.defaultSeoImageUpload}
              urlLabel={t.defaultSeoImageUrlLabel}
              urlPlaceholder={t.defaultSeoImageUrlPlaceholder}
              hint={t.defaultSeoImageHint}
              initialImage={setting?.defaultSeoImageUrl || ""}
              fileInputName="defaultSeoImageFile"
              urlInputName="defaultSeoImageUrl"
              previewClassName="h-40 w-full rounded-lg object-contain bg-white"
              onImageChange={setDefaultSeoImageUrl}
            />
          </div>
          <div className="mt-6">
            <AdminToggleField
              id="siteNoindex"
              name="siteNoindex"
              label={t.siteNoindex}
              hint={t.siteNoindexHint}
              checked={siteNoindex}
              onChange={(e) => setSiteNoindex(e.target.checked)}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label={t.robotsDisallowPaths} htmlFor="robotsDisallowPaths" hint={t.robotsDisallowPathsHint}>
              <AdminTextarea
                id="robotsDisallowPaths"
                name="robotsDisallowPaths"
                rows={4}
                value={robotsDisallowPaths}
                onChange={(e) => setRobotsDisallowPaths(e.target.value)}
              />
            </AdminField>
            <AdminField label={t.noindexPaths} htmlFor="noindexPaths" hint={t.noindexPathsHint}>
              <AdminTextarea
                id="noindexPaths"
                name="noindexPaths"
                rows={4}
                value={noindexPaths}
                onChange={(e) => setNoindexPaths(e.target.value)}
              />
            </AdminField>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className={`${ADMIN_SOFT_CARD} p-5`}>
              <div className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
                <Search className="h-4 w-4 text-[#F05A22]" />
                {t.preview}
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{t.homepagePreview}</div>
                  <div className="text-sm font-semibold text-[#1A0DAB]">{previewData.zhHomeTitle}</div>
                  <div className="mt-1 text-xs text-green-700">https://your-domain.com/</div>
                  <div className="mt-2 text-sm leading-6 text-gray-600">{previewData.zhDescription}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{t.innerPagePreview}</div>
                  <div className="text-sm font-semibold text-[#1A0DAB]">{locale === "zh" ? previewData.zhInnerTitle : previewData.enInnerTitle}</div>
                  <div className="mt-1 text-xs text-green-700">https://your-domain.com/products</div>
                  <div className="mt-2 text-sm leading-6 text-gray-600">{locale === "zh" ? previewData.zhDescription : previewData.enDescription}</div>
                </div>
              </div>
            </div>

            <div className={`${ADMIN_SOFT_CARD} p-5`}>
              <div className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
                <Share2 className="h-4 w-4 text-[#F05A22]" />
                {t.sharePreview}
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="flex aspect-[1.91/1] items-center justify-center bg-gray-100">
                  {previewData.image ? (
                    <img src={previewData.image} alt={t.imageLabel} className="h-full w-full object-cover" />
                  ) : (
                    <div className="px-6 text-center text-sm text-gray-500">{t.fallbackImage}</div>
                  )}
                </div>
                <div className="space-y-2 p-4">
                  <div className="text-sm font-semibold text-gray-900">{locale === "zh" ? previewData.zhHomeTitle : previewData.enHomeTitle}</div>
                  <div className="text-sm leading-6 text-gray-600">{locale === "zh" ? previewData.zhDescription : previewData.enDescription}</div>
                  <div className="text-xs text-gray-400">{t.keywordsLabel}: {locale === "zh" ? previewData.zhKeywords : previewData.enKeywords}</div>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Shield className="h-4 w-4 text-[#F05A22]" />
                  {t.robotsPreview}
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div><span className="font-semibold">{t.robotsStatus}:</span> {siteNoindex ? t.robotsNoindex : t.robotsAllow}</div>
                  <div><span className="font-semibold">{t.disallowCount}:</span> {previewData.disallowCount}</div>
                  <div><span className="font-semibold">{t.noindexCount}:</span> {previewData.noindexCountValue}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Footer Section */}
        {activeTab === "footer" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.footer}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label={t.footerCopyZh} htmlFor="footerCopyZh">
              <AdminInput type="text" id="footerCopyZh" name="footerCopyZh" value={footerCopyZh} onChange={(e) => setFooterCopyZh(e.target.value)} />
            </AdminField>
            <AdminField label={t.footerCopyEn} htmlFor="footerCopyEn">
              <AdminInput type="text" id="footerCopyEn" name="footerCopyEn" value={footerCopyEn} onChange={(e) => setFooterCopyEn(e.target.value)} />
            </AdminField>
          </div>
        </section>
        )}

        <AdminFormActions
          cancelHref="/admin"
          cancelLabel="取消"
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
                {t.saveCurrent}
              </>
            )
          }
        />
      </form>
    </div>
  );
}
