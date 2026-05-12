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
  type SettingsTab = "basic" | "contact" | "social" | "seo" | "about" | "images" | "footer";

  const t = locale === "zh" ? {
    title: "系统设置",
    basic: "基础设置",
    siteNameZh: "网站名称 (中文)",
    siteNameEn: "网站名称 (英文)",
    logoUrl: "网站 Logo",
    faviconUrl: "网站 favicon",
    brandAssets: "品牌资产",
    imageUpload: "上传图片",
    imageUrl: "图片链接",
    imageUrlPlaceholder: "https://",
    logoHint: "用于顶部导航、页脚等品牌展示区域。",
    faviconHint: "用于浏览器标签页图标和收藏夹图标。",
    contact: "联系方式",
    contactHint: "前台右侧浮动按钮、移动端底部按钮和联系页都会优先读取这里的手机、邮箱和 WhatsApp。",
    contactShortcut: "常用联系入口",
    contactShortcutDesc: "建议至少填写手机号和邮箱；WhatsApp 可直接填完整链接。",
    email: "联系邮箱",
    emailHint: "桌面端右侧邮箱按钮与联系页会读取这里的值。",
    phone: "联系电话",
    phoneHint: "移动端 WhatsApp 和桌面端电话按钮会优先使用这个号码。",
    whatsappLabel: "WhatsApp 链接",
    whatsappHint: "填写完整 wa.me 或官方 WhatsApp 链接；留空时前台会自动用联系电话生成。",
    addressZh: "联系地址 (中文)",
    addressEn: "联系地址 (英文)",
    social: "社交媒体",
    socialHint: "这里用于维护其它社交平台链接；WhatsApp 已并入“联系方式”分组。",
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
    about: "公司数据",
    aboutYears: "成立年数",
    aboutEquipments: "设备数量",
    aboutArea: "厂房面积 (千平米)",
    aboutGlobal: "出口国家",
    homeIntroGroup: "首页公司介绍",
    aboutStoryGroup: "About 页主介绍",
    fieldZh: "中文",
    fieldEn: "英文",
    homeAboutEyebrow: "首页小标题",
    homeAboutTitleLine1: "首页标题第 1 行",
    homeAboutTitleAccent: "首页标题高亮词",
    homeAboutTitleLine2: "首页标题第 2 行",
    homeAboutStory1: "首页简介第 1 段",
    homeAboutStory2: "首页简介第 2 段前半句",
    homeAboutMission: "首页使命文案",
    homeAboutCta: "首页按钮文字",
    aboutStoryTag: "About 主介绍小标题",
    aboutStoryTitle: "About 主介绍标题",
    aboutStoryBody1: "About 主介绍第 1 段",
    aboutStoryBody2: "About 主介绍第 2 段",
    aboutStoryPrimaryCta: "About 主按钮文字",
    aboutStorySecondaryCta: "About 次按钮文字",
    images: "页面横幅",
    aboutHeroImage: "首页公司介绍背景",
    marketHeroImage: "包装市场大图",
    safetyHeroImage: "包装安全大图",
    sustainabilityHeroImage: "可持续发展大图",
    factoryHeroImage: "工厂实景大图",
    contactHeroImage: "联系我们大图",
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
    logoUrl: "Site Logo",
    faviconUrl: "Site Favicon",
    brandAssets: "Brand Assets",
    imageUpload: "Upload Image",
    imageUrl: "Image URL",
    imageUrlPlaceholder: "https://",
    logoHint: "Used in the navbar, footer, and other brand display areas.",
    faviconHint: "Used for the browser tab icon and bookmarks.",
    contact: "Contact Info",
    contactHint: "The desktop floating buttons, mobile bottom bar, and contact page all prefer the phone, email, and WhatsApp values from this section.",
    contactShortcut: "Primary Contact Channels",
    contactShortcutDesc: "We recommend filling at least the phone and email. WhatsApp should be a full link.",
    email: "Contact Email",
    emailHint: "Used by the desktop floating email button and the contact page.",
    phone: "Contact Phone",
    phoneHint: "Used first by the mobile WhatsApp button and desktop phone button.",
    whatsappLabel: "WhatsApp URL",
    whatsappHint: "Enter a full wa.me or official WhatsApp link. When empty, the frontend falls back to the phone number.",
    addressZh: "Address (Chinese)",
    addressEn: "Address (English)",
    social: "Social Media",
    socialHint: "Manage other social platforms here. WhatsApp now lives under Contact Info.",
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
    about: "Company Stats",
    aboutYears: "Years of Experience",
    aboutEquipments: "Advanced Equipments",
    aboutArea: "Square Meters (K)",
    aboutGlobal: "Global Delivery",
    homeIntroGroup: "Homepage About Copy",
    aboutStoryGroup: "About Page Intro",
    fieldZh: "Chinese",
    fieldEn: "English",
    homeAboutEyebrow: "Homepage Eyebrow",
    homeAboutTitleLine1: "Homepage Title Line 1",
    homeAboutTitleAccent: "Homepage Accent Word",
    homeAboutTitleLine2: "Homepage Title Line 2",
    homeAboutStory1: "Homepage Intro Paragraph 1",
    homeAboutStory2: "Homepage Intro Paragraph 2 Prefix",
    homeAboutMission: "Homepage Mission Copy",
    homeAboutCta: "Homepage Button Text",
    aboutStoryTag: "About Intro Eyebrow",
    aboutStoryTitle: "About Intro Title",
    aboutStoryBody1: "About Intro Paragraph 1",
    aboutStoryBody2: "About Intro Paragraph 2",
    aboutStoryPrimaryCta: "About Primary Button",
    aboutStorySecondaryCta: "About Secondary Button",
    images: "Page Banners",
    aboutHeroImage: "Home About Us Background",
    marketHeroImage: "Packaging Market Hero",
    safetyHeroImage: "Packaging Safety Hero",
    sustainabilityHeroImage: "Sustainability Hero",
    factoryHeroImage: "Factory Gallery Hero",
    contactHeroImage: "Contact Us Hero",
    saveCurrent: "Save Current Section",
    savedSuffix: "saved",
    allSaved: "Settings saved successfully",
    saving: "Saving...",
    save: "Save Settings",
  };
  const [activeTab, setActiveTab] = useState<SettingsTab>("basic");

  const [siteNameZh, setSiteNameZh] = useState(setting?.siteNameZh || "");
  const [siteNameEn, setSiteNameEn] = useState(setting?.siteNameEn || "");
  const [logoUrl, setLogoUrl] = useState(setting?.logoUrl || "");
  const [faviconUrl, setFaviconUrl] = useState(setting?.faviconUrl || "");
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
  const [aboutYears, setAboutYears] = useState(setting?.aboutYears || "31");
  const [aboutEquipments, setAboutEquipments] = useState(setting?.aboutEquipments || "100");
  const [aboutArea, setAboutArea] = useState(setting?.aboutArea || "30");
  const [aboutGlobal, setAboutGlobal] = useState(setting?.aboutGlobal || "100");
  const [homeAboutEyebrowZh, setHomeAboutEyebrowZh] = useState(setting?.homeAboutEyebrowZh || "");
  const [homeAboutEyebrowEn, setHomeAboutEyebrowEn] = useState(setting?.homeAboutEyebrowEn || "");
  const [homeAboutTitleLine1Zh, setHomeAboutTitleLine1Zh] = useState(setting?.homeAboutTitleLine1Zh || "");
  const [homeAboutTitleLine1En, setHomeAboutTitleLine1En] = useState(setting?.homeAboutTitleLine1En || "");
  const [homeAboutTitleAccentZh, setHomeAboutTitleAccentZh] = useState(setting?.homeAboutTitleAccentZh || "");
  const [homeAboutTitleAccentEn, setHomeAboutTitleAccentEn] = useState(setting?.homeAboutTitleAccentEn || "");
  const [homeAboutTitleLine2Zh, setHomeAboutTitleLine2Zh] = useState(setting?.homeAboutTitleLine2Zh || "");
  const [homeAboutTitleLine2En, setHomeAboutTitleLine2En] = useState(setting?.homeAboutTitleLine2En || "");
  const [homeAboutStory1Zh, setHomeAboutStory1Zh] = useState(setting?.homeAboutStory1Zh || "");
  const [homeAboutStory1En, setHomeAboutStory1En] = useState(setting?.homeAboutStory1En || "");
  const [homeAboutStory2Zh, setHomeAboutStory2Zh] = useState(setting?.homeAboutStory2Zh || "");
  const [homeAboutStory2En, setHomeAboutStory2En] = useState(setting?.homeAboutStory2En || "");
  const [homeAboutMissionZh, setHomeAboutMissionZh] = useState(setting?.homeAboutMissionZh || "");
  const [homeAboutMissionEn, setHomeAboutMissionEn] = useState(setting?.homeAboutMissionEn || "");
  const [homeAboutCtaZh, setHomeAboutCtaZh] = useState(setting?.homeAboutCtaZh || "");
  const [homeAboutCtaEn, setHomeAboutCtaEn] = useState(setting?.homeAboutCtaEn || "");
  const [aboutStoryTagZh, setAboutStoryTagZh] = useState(setting?.aboutStoryTagZh || "");
  const [aboutStoryTagEn, setAboutStoryTagEn] = useState(setting?.aboutStoryTagEn || "");
  const [aboutStoryTitleZh, setAboutStoryTitleZh] = useState(setting?.aboutStoryTitleZh || "");
  const [aboutStoryTitleEn, setAboutStoryTitleEn] = useState(setting?.aboutStoryTitleEn || "");
  const [aboutStoryBody1Zh, setAboutStoryBody1Zh] = useState(setting?.aboutStoryBody1Zh || "");
  const [aboutStoryBody1En, setAboutStoryBody1En] = useState(setting?.aboutStoryBody1En || "");
  const [aboutStoryBody2Zh, setAboutStoryBody2Zh] = useState(setting?.aboutStoryBody2Zh || "");
  const [aboutStoryBody2En, setAboutStoryBody2En] = useState(setting?.aboutStoryBody2En || "");
  const [aboutStoryPrimaryCtaZh, setAboutStoryPrimaryCtaZh] = useState(setting?.aboutStoryPrimaryCtaZh || "");
  const [aboutStoryPrimaryCtaEn, setAboutStoryPrimaryCtaEn] = useState(setting?.aboutStoryPrimaryCtaEn || "");
  const [aboutStorySecondaryCtaZh, setAboutStorySecondaryCtaZh] = useState(setting?.aboutStorySecondaryCtaZh || "");
  const [aboutStorySecondaryCtaEn, setAboutStorySecondaryCtaEn] = useState(setting?.aboutStorySecondaryCtaEn || "");
  const [aboutHeroImage, setAboutHeroImage] = useState(setting?.aboutHeroImage || "");
  const [marketHeroImage, setMarketHeroImage] = useState(setting?.marketHeroImage || "");
  const [safetyHeroImage, setSafetyHeroImage] = useState(setting?.safetyHeroImage || "");
  const [sustainabilityHeroImage, setSustainabilityHeroImage] = useState(setting?.sustainabilityHeroImage || "");
  const [factoryHeroImage, setFactoryHeroImage] = useState(setting?.factoryHeroImage || "");
  const [contactHeroImage, setContactHeroImage] = useState(setting?.contactHeroImage || "");
  const getSectionSnapshot = (tab: SettingsTab) => {
    switch (tab) {
      case "basic":
        return { siteNameZh, siteNameEn, logoUrl, faviconUrl };
      case "contact":
        return { contactEmail, contactPhone, whatsapp, contactAddressZh, contactAddressEn };
      case "social":
        return { wechat, facebook, linkedin, youtube, instagram, twitter };
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
      case "about":
        return {
          aboutYears,
          aboutEquipments,
          aboutArea,
          aboutGlobal,
          homeAboutEyebrowZh,
          homeAboutEyebrowEn,
          homeAboutTitleLine1Zh,
          homeAboutTitleLine1En,
          homeAboutTitleAccentZh,
          homeAboutTitleAccentEn,
          homeAboutTitleLine2Zh,
          homeAboutTitleLine2En,
          homeAboutStory1Zh,
          homeAboutStory1En,
          homeAboutStory2Zh,
          homeAboutStory2En,
          homeAboutMissionZh,
          homeAboutMissionEn,
          homeAboutCtaZh,
          homeAboutCtaEn,
          aboutStoryTagZh,
          aboutStoryTagEn,
          aboutStoryTitleZh,
          aboutStoryTitleEn,
          aboutStoryBody1Zh,
          aboutStoryBody1En,
          aboutStoryBody2Zh,
          aboutStoryBody2En,
          aboutStoryPrimaryCtaZh,
          aboutStoryPrimaryCtaEn,
          aboutStorySecondaryCtaZh,
          aboutStorySecondaryCtaEn,
        };
      case "images":
        return { aboutHeroImage, marketHeroImage, safetyHeroImage, sustainabilityHeroImage, factoryHeroImage, contactHeroImage };
    }
  };
  const [savedSnapshots, setSavedSnapshots] = useState<Record<SettingsTab, string>>({
    basic: JSON.stringify({
      siteNameZh: setting?.siteNameZh || "",
      siteNameEn: setting?.siteNameEn || "",
      logoUrl: setting?.logoUrl || "",
      faviconUrl: setting?.faviconUrl || "",
    }),
    contact: JSON.stringify({
      contactEmail: setting?.contactEmail || "",
      contactPhone: setting?.contactPhone || "",
      whatsapp: setting?.whatsapp || "",
      contactAddressZh: setting?.contactAddressZh || "",
      contactAddressEn: setting?.contactAddressEn || "",
    }),
    social: JSON.stringify({
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
    about: JSON.stringify({
      aboutYears: setting?.aboutYears || "31",
      aboutEquipments: setting?.aboutEquipments || "100",
      aboutArea: setting?.aboutArea || "30",
      aboutGlobal: setting?.aboutGlobal || "100",
      homeAboutEyebrowZh: setting?.homeAboutEyebrowZh || "",
      homeAboutEyebrowEn: setting?.homeAboutEyebrowEn || "",
      homeAboutTitleLine1Zh: setting?.homeAboutTitleLine1Zh || "",
      homeAboutTitleLine1En: setting?.homeAboutTitleLine1En || "",
      homeAboutTitleAccentZh: setting?.homeAboutTitleAccentZh || "",
      homeAboutTitleAccentEn: setting?.homeAboutTitleAccentEn || "",
      homeAboutTitleLine2Zh: setting?.homeAboutTitleLine2Zh || "",
      homeAboutTitleLine2En: setting?.homeAboutTitleLine2En || "",
      homeAboutStory1Zh: setting?.homeAboutStory1Zh || "",
      homeAboutStory1En: setting?.homeAboutStory1En || "",
      homeAboutStory2Zh: setting?.homeAboutStory2Zh || "",
      homeAboutStory2En: setting?.homeAboutStory2En || "",
      homeAboutMissionZh: setting?.homeAboutMissionZh || "",
      homeAboutMissionEn: setting?.homeAboutMissionEn || "",
      homeAboutCtaZh: setting?.homeAboutCtaZh || "",
      homeAboutCtaEn: setting?.homeAboutCtaEn || "",
      aboutStoryTagZh: setting?.aboutStoryTagZh || "",
      aboutStoryTagEn: setting?.aboutStoryTagEn || "",
      aboutStoryTitleZh: setting?.aboutStoryTitleZh || "",
      aboutStoryTitleEn: setting?.aboutStoryTitleEn || "",
      aboutStoryBody1Zh: setting?.aboutStoryBody1Zh || "",
      aboutStoryBody1En: setting?.aboutStoryBody1En || "",
      aboutStoryBody2Zh: setting?.aboutStoryBody2Zh || "",
      aboutStoryBody2En: setting?.aboutStoryBody2En || "",
      aboutStoryPrimaryCtaZh: setting?.aboutStoryPrimaryCtaZh || "",
      aboutStoryPrimaryCtaEn: setting?.aboutStoryPrimaryCtaEn || "",
      aboutStorySecondaryCtaZh: setting?.aboutStorySecondaryCtaZh || "",
      aboutStorySecondaryCtaEn: setting?.aboutStorySecondaryCtaEn || "",
    }),
    images: JSON.stringify({
      aboutHeroImage: setting?.aboutHeroImage || "",
      marketHeroImage: setting?.marketHeroImage || "",
      safetyHeroImage: setting?.safetyHeroImage || "",
      sustainabilityHeroImage: setting?.sustainabilityHeroImage || "",
      factoryHeroImage: setting?.factoryHeroImage || "",
      contactHeroImage: setting?.contactHeroImage || "",
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
    { id: "about", label: t.about },
    { id: "images", label: t.images },
    { id: "footer", label: t.footer },
  ] as const;
  const tabLabelMap: Record<SettingsTab, string> = {
    basic: t.basic,
    contact: t.contact,
    social: t.social,
    seo: t.seo,
    about: t.about,
    images: t.images,
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
    logoUrl,
    faviconUrl,
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
    aboutYears, aboutEquipments, aboutArea, aboutGlobal,
    homeAboutEyebrowZh, homeAboutEyebrowEn,
    homeAboutTitleLine1Zh, homeAboutTitleLine1En,
    homeAboutTitleAccentZh, homeAboutTitleAccentEn,
    homeAboutTitleLine2Zh, homeAboutTitleLine2En,
    homeAboutStory1Zh, homeAboutStory1En,
    homeAboutStory2Zh, homeAboutStory2En,
    homeAboutMissionZh, homeAboutMissionEn,
    homeAboutCtaZh, homeAboutCtaEn,
    aboutStoryTagZh, aboutStoryTagEn,
    aboutStoryTitleZh, aboutStoryTitleEn,
    aboutStoryBody1Zh, aboutStoryBody1En,
    aboutStoryBody2Zh, aboutStoryBody2En,
    aboutStoryPrimaryCtaZh, aboutStoryPrimaryCtaEn,
    aboutStorySecondaryCtaZh, aboutStorySecondaryCtaEn,
    aboutHeroImage, marketHeroImage, safetyHeroImage, sustainabilityHeroImage, factoryHeroImage, contactHeroImage,
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
          <div className="mt-8 rounded-2xl border border-gray-200 p-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">{t.brandAssets}</h4>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <AdminImageUploadField
                fieldId="site-logo"
                title={t.logoUrl}
                uploadLabel={t.imageUpload}
                urlLabel={t.imageUrl}
                urlPlaceholder={t.imageUrlPlaceholder}
                hint={t.logoHint}
                initialImage={logoUrl}
                onImageChange={setLogoUrl}
                fileInputName="logoUrlFile"
                urlInputName="logoUrl"
                previewClassName="h-28 w-full rounded-lg object-contain bg-white"
              />
              <AdminImageUploadField
                fieldId="site-favicon"
                title={t.faviconUrl}
                uploadLabel={t.imageUpload}
                urlLabel={t.imageUrl}
                urlPlaceholder={t.imageUrlPlaceholder}
                hint={t.faviconHint}
                initialImage={faviconUrl}
                onImageChange={setFaviconUrl}
                fileInputName="faviconUrlFile"
                urlInputName="faviconUrl"
                previewClassName="h-20 w-full rounded-lg object-contain bg-white"
              />
            </div>
          </div>
        </section>
        )}

        {/* Contact Section */}
        {activeTab === "contact" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.contact}</h3>
          <div className="mb-6 rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
            <div className="text-sm font-semibold text-[#C2410C]">{t.contactShortcut}</div>
            <p className="mt-2 text-sm leading-6 text-gray-700">{t.contactHint}</p>
            <p className="mt-2 text-xs leading-5 text-gray-500">{t.contactShortcutDesc}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3">
            <AdminField label={t.email} htmlFor="contactEmail" hint={t.emailHint}>
              <AdminInput type="email" id="contactEmail" name="contactEmail" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </AdminField>
            <AdminField label={t.phone} htmlFor="contactPhone" hint={t.phoneHint}>
              <AdminInput type="text" id="contactPhone" name="contactPhone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
            </AdminField>
            <AdminField label={t.whatsappLabel} htmlFor="whatsapp" hint={t.whatsappHint}>
              <AdminInput
                type="text"
                id="whatsapp"
                name="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="https://wa.me/8613682412949"
              />
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
          <p className="mb-6 text-sm text-gray-500">{t.socialHint}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

                {/* About Section */}
        {activeTab === "about" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.about}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label={t.aboutYears} htmlFor="aboutYears">
              <AdminInput type="text" id="aboutYears" name="aboutYears" value={aboutYears} onChange={(e) => setAboutYears(e.target.value)} />
            </AdminField>
            <AdminField label={t.aboutEquipments} htmlFor="aboutEquipments">
              <AdminInput type="text" id="aboutEquipments" name="aboutEquipments" value={aboutEquipments} onChange={(e) => setAboutEquipments(e.target.value)} />
            </AdminField>
            <AdminField label={t.aboutArea} htmlFor="aboutArea">
              <AdminInput type="text" id="aboutArea" name="aboutArea" value={aboutArea} onChange={(e) => setAboutArea(e.target.value)} />
            </AdminField>
            <AdminField label={t.aboutGlobal} htmlFor="aboutGlobal">
              <AdminInput type="text" id="aboutGlobal" name="aboutGlobal" value={aboutGlobal} onChange={(e) => setAboutGlobal(e.target.value)} />
            </AdminField>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-200 p-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">{t.homeIntroGroup}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminField label={`${t.homeAboutEyebrow} (${t.fieldZh})`} htmlFor="homeAboutEyebrowZh">
                <AdminInput id="homeAboutEyebrowZh" name="homeAboutEyebrowZh" value={homeAboutEyebrowZh} onChange={(e) => setHomeAboutEyebrowZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutEyebrow} (${t.fieldEn})`} htmlFor="homeAboutEyebrowEn">
                <AdminInput id="homeAboutEyebrowEn" name="homeAboutEyebrowEn" value={homeAboutEyebrowEn} onChange={(e) => setHomeAboutEyebrowEn(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutTitleLine1} (${t.fieldZh})`} htmlFor="homeAboutTitleLine1Zh">
                <AdminInput id="homeAboutTitleLine1Zh" name="homeAboutTitleLine1Zh" value={homeAboutTitleLine1Zh} onChange={(e) => setHomeAboutTitleLine1Zh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutTitleLine1} (${t.fieldEn})`} htmlFor="homeAboutTitleLine1En">
                <AdminInput id="homeAboutTitleLine1En" name="homeAboutTitleLine1En" value={homeAboutTitleLine1En} onChange={(e) => setHomeAboutTitleLine1En(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutTitleAccent} (${t.fieldZh})`} htmlFor="homeAboutTitleAccentZh">
                <AdminInput id="homeAboutTitleAccentZh" name="homeAboutTitleAccentZh" value={homeAboutTitleAccentZh} onChange={(e) => setHomeAboutTitleAccentZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutTitleAccent} (${t.fieldEn})`} htmlFor="homeAboutTitleAccentEn">
                <AdminInput id="homeAboutTitleAccentEn" name="homeAboutTitleAccentEn" value={homeAboutTitleAccentEn} onChange={(e) => setHomeAboutTitleAccentEn(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutTitleLine2} (${t.fieldZh})`} htmlFor="homeAboutTitleLine2Zh">
                <AdminInput id="homeAboutTitleLine2Zh" name="homeAboutTitleLine2Zh" value={homeAboutTitleLine2Zh} onChange={(e) => setHomeAboutTitleLine2Zh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutTitleLine2} (${t.fieldEn})`} htmlFor="homeAboutTitleLine2En">
                <AdminInput id="homeAboutTitleLine2En" name="homeAboutTitleLine2En" value={homeAboutTitleLine2En} onChange={(e) => setHomeAboutTitleLine2En(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutStory1} (${t.fieldZh})`} htmlFor="homeAboutStory1Zh" className="md:col-span-2">
                <AdminTextarea id="homeAboutStory1Zh" name="homeAboutStory1Zh" rows={3} value={homeAboutStory1Zh} onChange={(e) => setHomeAboutStory1Zh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutStory1} (${t.fieldEn})`} htmlFor="homeAboutStory1En" className="md:col-span-2">
                <AdminTextarea id="homeAboutStory1En" name="homeAboutStory1En" rows={3} value={homeAboutStory1En} onChange={(e) => setHomeAboutStory1En(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutStory2} (${t.fieldZh})`} htmlFor="homeAboutStory2Zh" className="md:col-span-2">
                <AdminTextarea id="homeAboutStory2Zh" name="homeAboutStory2Zh" rows={3} value={homeAboutStory2Zh} onChange={(e) => setHomeAboutStory2Zh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutStory2} (${t.fieldEn})`} htmlFor="homeAboutStory2En" className="md:col-span-2">
                <AdminTextarea id="homeAboutStory2En" name="homeAboutStory2En" rows={3} value={homeAboutStory2En} onChange={(e) => setHomeAboutStory2En(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutMission} (${t.fieldZh})`} htmlFor="homeAboutMissionZh">
                <AdminInput id="homeAboutMissionZh" name="homeAboutMissionZh" value={homeAboutMissionZh} onChange={(e) => setHomeAboutMissionZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutMission} (${t.fieldEn})`} htmlFor="homeAboutMissionEn">
                <AdminInput id="homeAboutMissionEn" name="homeAboutMissionEn" value={homeAboutMissionEn} onChange={(e) => setHomeAboutMissionEn(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutCta} (${t.fieldZh})`} htmlFor="homeAboutCtaZh">
                <AdminInput id="homeAboutCtaZh" name="homeAboutCtaZh" value={homeAboutCtaZh} onChange={(e) => setHomeAboutCtaZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.homeAboutCta} (${t.fieldEn})`} htmlFor="homeAboutCtaEn">
                <AdminInput id="homeAboutCtaEn" name="homeAboutCtaEn" value={homeAboutCtaEn} onChange={(e) => setHomeAboutCtaEn(e.target.value)} />
              </AdminField>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-200 p-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">{t.aboutStoryGroup}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminField label={`${t.aboutStoryTag} (${t.fieldZh})`} htmlFor="aboutStoryTagZh">
                <AdminInput id="aboutStoryTagZh" name="aboutStoryTagZh" value={aboutStoryTagZh} onChange={(e) => setAboutStoryTagZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryTag} (${t.fieldEn})`} htmlFor="aboutStoryTagEn">
                <AdminInput id="aboutStoryTagEn" name="aboutStoryTagEn" value={aboutStoryTagEn} onChange={(e) => setAboutStoryTagEn(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryTitle} (${t.fieldZh})`} htmlFor="aboutStoryTitleZh">
                <AdminInput id="aboutStoryTitleZh" name="aboutStoryTitleZh" value={aboutStoryTitleZh} onChange={(e) => setAboutStoryTitleZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryTitle} (${t.fieldEn})`} htmlFor="aboutStoryTitleEn">
                <AdminInput id="aboutStoryTitleEn" name="aboutStoryTitleEn" value={aboutStoryTitleEn} onChange={(e) => setAboutStoryTitleEn(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryBody1} (${t.fieldZh})`} htmlFor="aboutStoryBody1Zh" className="md:col-span-2">
                <AdminTextarea id="aboutStoryBody1Zh" name="aboutStoryBody1Zh" rows={4} value={aboutStoryBody1Zh} onChange={(e) => setAboutStoryBody1Zh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryBody1} (${t.fieldEn})`} htmlFor="aboutStoryBody1En" className="md:col-span-2">
                <AdminTextarea id="aboutStoryBody1En" name="aboutStoryBody1En" rows={4} value={aboutStoryBody1En} onChange={(e) => setAboutStoryBody1En(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryBody2} (${t.fieldZh})`} htmlFor="aboutStoryBody2Zh" className="md:col-span-2">
                <AdminTextarea id="aboutStoryBody2Zh" name="aboutStoryBody2Zh" rows={5} value={aboutStoryBody2Zh} onChange={(e) => setAboutStoryBody2Zh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryBody2} (${t.fieldEn})`} htmlFor="aboutStoryBody2En" className="md:col-span-2">
                <AdminTextarea id="aboutStoryBody2En" name="aboutStoryBody2En" rows={5} value={aboutStoryBody2En} onChange={(e) => setAboutStoryBody2En(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryPrimaryCta} (${t.fieldZh})`} htmlFor="aboutStoryPrimaryCtaZh">
                <AdminInput id="aboutStoryPrimaryCtaZh" name="aboutStoryPrimaryCtaZh" value={aboutStoryPrimaryCtaZh} onChange={(e) => setAboutStoryPrimaryCtaZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStoryPrimaryCta} (${t.fieldEn})`} htmlFor="aboutStoryPrimaryCtaEn">
                <AdminInput id="aboutStoryPrimaryCtaEn" name="aboutStoryPrimaryCtaEn" value={aboutStoryPrimaryCtaEn} onChange={(e) => setAboutStoryPrimaryCtaEn(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStorySecondaryCta} (${t.fieldZh})`} htmlFor="aboutStorySecondaryCtaZh">
                <AdminInput id="aboutStorySecondaryCtaZh" name="aboutStorySecondaryCtaZh" value={aboutStorySecondaryCtaZh} onChange={(e) => setAboutStorySecondaryCtaZh(e.target.value)} />
              </AdminField>
              <AdminField label={`${t.aboutStorySecondaryCta} (${t.fieldEn})`} htmlFor="aboutStorySecondaryCtaEn">
                <AdminInput id="aboutStorySecondaryCtaEn" name="aboutStorySecondaryCtaEn" value={aboutStorySecondaryCtaEn} onChange={(e) => setAboutStorySecondaryCtaEn(e.target.value)} />
              </AdminField>
            </div>
          </div>
        </section>
        )}

        {/* Images Section */}
        {activeTab === "images" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.images}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdminImageUploadField
              fieldId="about-hero" title={t.aboutHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              urlPlaceholder="https://" hint=""
              initialImage={aboutHeroImage} onImageChange={setAboutHeroImage}
              fileInputName="aboutHeroImageFile" urlInputName="aboutHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="market-hero" title={t.marketHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              urlPlaceholder="https://" hint=""
              initialImage={marketHeroImage} onImageChange={setMarketHeroImage}
              fileInputName="marketHeroImageFile" urlInputName="marketHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="safety-hero" title={t.safetyHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              urlPlaceholder="https://" hint=""
              initialImage={safetyHeroImage} onImageChange={setSafetyHeroImage}
              fileInputName="safetyHeroImageFile" urlInputName="safetyHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="sustainability-hero" title={t.sustainabilityHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              urlPlaceholder="https://" hint=""
              initialImage={sustainabilityHeroImage} onImageChange={setSustainabilityHeroImage}
              fileInputName="sustainabilityHeroImageFile" urlInputName="sustainabilityHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="factory-hero" title={t.factoryHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              urlPlaceholder="https://" hint=""
              initialImage={factoryHeroImage} onImageChange={setFactoryHeroImage}
              fileInputName="factoryHeroImageFile" urlInputName="factoryHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="contact-hero" title={t.contactHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              urlPlaceholder="https://" hint=""
              initialImage={contactHeroImage} onImageChange={setContactHeroImage}
              fileInputName="contactHeroImageFile" urlInputName="contactHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
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
