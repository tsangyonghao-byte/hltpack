import prisma from "@/lib/prisma";
import type { Metadata } from "next";

const DEFAULT_SEO_DESCRIPTION = {
  zh: "为您提供创新和可持续的包装解决方案。",
  en: "Providing innovative and sustainable packaging solutions globally.",
  es: "Ofrecemos soluciones innovadoras y sostenibles de envases flexibles a nivel global.",
  ar: "نقدم حلول تغليف مرنة مبتكرة ومستدامة على مستوى العالم.",
} as const;

export async function getSystemSeo(locale: string) {
  const setting = await prisma.systemSetting.findUnique({
    where: { id: "global" },
  });

  const isZh = locale === "zh";
  const isEs = locale === "es";
  const isAr = locale === "ar";
  const siteName = isZh
    ? setting?.siteNameZh || "海力通包装"
    : setting?.siteNameEn || "Logos Packaging";
  const titleSuffix = isZh
    ? setting?.seoTitleZh || `| ${siteName}`
    : setting?.seoTitleEn || `| ${siteName}`;
  const description = isZh
    ? setting?.seoDescZh || DEFAULT_SEO_DESCRIPTION.zh
    : isEs
      ? DEFAULT_SEO_DESCRIPTION.es
      : isAr
        ? DEFAULT_SEO_DESCRIPTION.ar
        : setting?.seoDescEn || DEFAULT_SEO_DESCRIPTION.en;
  const keywords = isZh ? setting?.seoKeywordsZh || undefined : setting?.seoKeywordsEn || undefined;
  const defaultImage = setting?.defaultSeoImageUrl
    ? toAbsoluteUrl(setting.defaultSeoImageUrl)
    : getDefaultSeoImage();

  return {
    siteName,
    titleSuffix,
    description,
    keywords,
    defaultImage,
    siteNoindex: !!setting?.siteNoindex,
    robotsDisallowPaths: setting?.robotsDisallowPaths || "/admin/*\n/api/*",
    noindexPaths: setting?.noindexPaths || "",
  };
}

export function composeSeoTitle(title: string, titleSuffix: string, siteName: string) {
  if (!title) {
    return siteName;
  }
  return titleSuffix ? `${title} ${titleSuffix}` : `${title} | ${siteName}`;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function toAbsoluteUrl(value: string) {
  if (!value) return getSiteUrl();
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getDefaultSeoImage() {
  return toAbsoluteUrl("/logo.png");
}

export function jsonLdScript(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return {
    __html: JSON.stringify(data),
  };
}

export function parsePathRules(value?: string | null) {
  return (value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizePath(path: string) {
  if (!path) return "/";
  if (path === "/") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.replace(/\/+$/, "");
}

export function pathMatchesRule(path: string, rule: string) {
  const normalizedPath = normalizePath(path);
  const normalizedRule = normalizePath(rule.replace(/\*$/, ""));
  if (rule.endsWith("*")) {
    return normalizedPath === normalizedRule || normalizedPath.startsWith(`${normalizedRule}/`);
  }
  return normalizedPath === normalizedRule;
}

export function buildRobotsMetadata(
  path: string,
  options: { siteNoindex?: boolean; noindexPaths?: string | null },
): Metadata["robots"] | undefined {
  const rules = parsePathRules(options.noindexPaths);
  const shouldNoindex =
    !!options.siteNoindex || rules.some((rule) => pathMatchesRule(path, rule));

  if (!shouldNoindex) return undefined;

  return {
    index: false,
    follow: false,
    nocache: true,
  };
}

type SharedMetadataInput = {
  title: string;
  description: string;
  siteName?: string;
  socialTitle?: string;
  canonicalPath?: string;
  image?: string;
  defaultImage?: string;
  keywords?: string;
  robots?: Metadata["robots"];
};

export function buildSeoMetadata({
  title,
  description,
  siteName,
  socialTitle,
  canonicalPath,
  image,
  defaultImage,
  keywords,
  robots,
}: SharedMetadataInput): Metadata {
  const resolvedImage = toAbsoluteUrl(image || defaultImage || getDefaultSeoImage());
  const canonicalUrl = canonicalPath ? toAbsoluteUrl(canonicalPath) : undefined;
  const resolvedSocialTitle = socialTitle || title;

  return {
    title,
    description,
    keywords,
    robots,
    metadataBase: new URL(getSiteUrl()),
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: resolvedSocialTitle,
      description,
      url: canonicalUrl,
      siteName: siteName || title,
      images: [{ url: resolvedImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedSocialTitle,
      description,
      images: [resolvedImage],
    },
  };
}
