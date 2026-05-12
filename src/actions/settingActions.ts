"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";

export async function updateSystemSetting(prevState: any, formData: FormData) {
  await requireAdminSession();
  try {
    const section = String(formData.get("__section") || "all");
    const existing = await prisma.systemSetting.findUnique({
      where: { id: "global" },
    });
    const logoFile = formData.get("logoUrlFile") as File | null;
    const faviconFile = formData.get("faviconUrlFile") as File | null;
    const defaultSeoImageFile = formData.get("defaultSeoImageFile") as File | null;
    const uploadedLogo = await uploadFile(logoFile);
    const uploadedFavicon = await uploadFile(faviconFile);
    const uploadedDefaultSeoImage = await uploadFile(defaultSeoImageFile);
    const isSection = (...sections: string[]) => section === "all" || sections.includes(section);
    const readString = (key: string) =>
      formData.has(key) ? String(formData.get(key) || "") : ((existing as any)?.[key] ?? "");
    const data = {
      siteNameZh: isSection("basic") ? readString("siteNameZh") : existing?.siteNameZh || "",
      siteNameEn: isSection("basic") ? readString("siteNameEn") : existing?.siteNameEn || "",
      logoUrl: isSection("basic") ? uploadedLogo || readString("logoUrl") : existing?.logoUrl || "",
      faviconUrl: isSection("basic") ? uploadedFavicon || readString("faviconUrl") : existing?.faviconUrl || "",
      contactEmail: isSection("contact") ? readString("contactEmail") : existing?.contactEmail || "",
      contactPhone: isSection("contact") ? readString("contactPhone") : existing?.contactPhone || "",
      contactAddressZh: isSection("contact") ? readString("contactAddressZh") : existing?.contactAddressZh || "",
      contactAddressEn: isSection("contact") ? readString("contactAddressEn") : existing?.contactAddressEn || "",
      whatsapp: isSection("contact", "social") ? readString("whatsapp") : existing?.whatsapp || "",
      wechat: isSection("social") ? readString("wechat") : existing?.wechat || "",
      facebook: isSection("social") ? readString("facebook") : existing?.facebook || "",
      linkedin: isSection("social") ? readString("linkedin") : existing?.linkedin || "",
      youtube: isSection("social") ? readString("youtube") : existing?.youtube || "",
      instagram: isSection("social") ? readString("instagram") : existing?.instagram || "",
      twitter: isSection("social") ? readString("twitter") : existing?.twitter || "",
      seoTitleZh: isSection("seo") ? readString("seoTitleZh") : existing?.seoTitleZh || "",
      seoTitleEn: isSection("seo") ? readString("seoTitleEn") : existing?.seoTitleEn || "",
      seoDescZh: isSection("seo") ? readString("seoDescZh") : existing?.seoDescZh || "",
      seoDescEn: isSection("seo") ? readString("seoDescEn") : existing?.seoDescEn || "",
      seoKeywordsZh: isSection("seo") ? readString("seoKeywordsZh") : existing?.seoKeywordsZh || "",
      seoKeywordsEn: isSection("seo") ? readString("seoKeywordsEn") : existing?.seoKeywordsEn || "",
      defaultSeoImageUrl: isSection("seo")
        ? uploadedDefaultSeoImage || readString("defaultSeoImageUrl")
        : existing?.defaultSeoImageUrl || "",
      siteNoindex: isSection("seo") ? formData.get("siteNoindex") === "on" : !!existing?.siteNoindex,
      robotsDisallowPaths: isSection("seo") ? readString("robotsDisallowPaths") : existing?.robotsDisallowPaths || "",
      noindexPaths: isSection("seo") ? readString("noindexPaths") : existing?.noindexPaths || "",
      footerCopyZh: isSection("footer") ? readString("footerCopyZh") : existing?.footerCopyZh || "",
      footerCopyEn: isSection("footer") ? readString("footerCopyEn") : existing?.footerCopyEn || "",
      aboutYears: isSection("about") ? readString("aboutYears") : existing?.aboutYears || "31",
      aboutEquipments: isSection("about") ? readString("aboutEquipments") : existing?.aboutEquipments || "100",
      aboutArea: isSection("about") ? readString("aboutArea") : existing?.aboutArea || "30",
      aboutGlobal: isSection("about") ? readString("aboutGlobal") : existing?.aboutGlobal || "100",
      homeAboutEyebrowZh: isSection("about") ? readString("homeAboutEyebrowZh") : existing?.homeAboutEyebrowZh || "",
      homeAboutEyebrowEn: isSection("about") ? readString("homeAboutEyebrowEn") : existing?.homeAboutEyebrowEn || "",
      homeAboutTitleLine1Zh: isSection("about") ? readString("homeAboutTitleLine1Zh") : existing?.homeAboutTitleLine1Zh || "",
      homeAboutTitleLine1En: isSection("about") ? readString("homeAboutTitleLine1En") : existing?.homeAboutTitleLine1En || "",
      homeAboutTitleAccentZh: isSection("about") ? readString("homeAboutTitleAccentZh") : existing?.homeAboutTitleAccentZh || "",
      homeAboutTitleAccentEn: isSection("about") ? readString("homeAboutTitleAccentEn") : existing?.homeAboutTitleAccentEn || "",
      homeAboutTitleLine2Zh: isSection("about") ? readString("homeAboutTitleLine2Zh") : existing?.homeAboutTitleLine2Zh || "",
      homeAboutTitleLine2En: isSection("about") ? readString("homeAboutTitleLine2En") : existing?.homeAboutTitleLine2En || "",
      homeAboutStory1Zh: isSection("about") ? readString("homeAboutStory1Zh") : existing?.homeAboutStory1Zh || "",
      homeAboutStory1En: isSection("about") ? readString("homeAboutStory1En") : existing?.homeAboutStory1En || "",
      homeAboutStory2Zh: isSection("about") ? readString("homeAboutStory2Zh") : existing?.homeAboutStory2Zh || "",
      homeAboutStory2En: isSection("about") ? readString("homeAboutStory2En") : existing?.homeAboutStory2En || "",
      homeAboutMissionZh: isSection("about") ? readString("homeAboutMissionZh") : existing?.homeAboutMissionZh || "",
      homeAboutMissionEn: isSection("about") ? readString("homeAboutMissionEn") : existing?.homeAboutMissionEn || "",
      homeAboutCtaZh: isSection("about") ? readString("homeAboutCtaZh") : existing?.homeAboutCtaZh || "",
      homeAboutCtaEn: isSection("about") ? readString("homeAboutCtaEn") : existing?.homeAboutCtaEn || "",
      aboutStoryTagZh: isSection("about") ? readString("aboutStoryTagZh") : existing?.aboutStoryTagZh || "",
      aboutStoryTagEn: isSection("about") ? readString("aboutStoryTagEn") : existing?.aboutStoryTagEn || "",
      aboutStoryTitleZh: isSection("about") ? readString("aboutStoryTitleZh") : existing?.aboutStoryTitleZh || "",
      aboutStoryTitleEn: isSection("about") ? readString("aboutStoryTitleEn") : existing?.aboutStoryTitleEn || "",
      aboutStoryBody1Zh: isSection("about") ? readString("aboutStoryBody1Zh") : existing?.aboutStoryBody1Zh || "",
      aboutStoryBody1En: isSection("about") ? readString("aboutStoryBody1En") : existing?.aboutStoryBody1En || "",
      aboutStoryBody2Zh: isSection("about") ? readString("aboutStoryBody2Zh") : existing?.aboutStoryBody2Zh || "",
      aboutStoryBody2En: isSection("about") ? readString("aboutStoryBody2En") : existing?.aboutStoryBody2En || "",
      aboutStoryPrimaryCtaZh: isSection("about") ? readString("aboutStoryPrimaryCtaZh") : existing?.aboutStoryPrimaryCtaZh || "",
      aboutStoryPrimaryCtaEn: isSection("about") ? readString("aboutStoryPrimaryCtaEn") : existing?.aboutStoryPrimaryCtaEn || "",
      aboutStorySecondaryCtaZh: isSection("about") ? readString("aboutStorySecondaryCtaZh") : existing?.aboutStorySecondaryCtaZh || "",
      aboutStorySecondaryCtaEn: isSection("about") ? readString("aboutStorySecondaryCtaEn") : existing?.aboutStorySecondaryCtaEn || "",
      aboutHeroImage: isSection("images") ? (await uploadFile(formData.get("aboutHeroImageFile") as File | null)) || readString("aboutHeroImage") : existing?.aboutHeroImage || "",
      marketHeroImage: isSection("images") ? (await uploadFile(formData.get("marketHeroImageFile") as File | null)) || readString("marketHeroImage") : existing?.marketHeroImage || "",
      safetyHeroImage: isSection("images") ? (await uploadFile(formData.get("safetyHeroImageFile") as File | null)) || readString("safetyHeroImage") : existing?.safetyHeroImage || "",
      sustainabilityHeroImage: isSection("images") ? (await uploadFile(formData.get("sustainabilityHeroImageFile") as File | null)) || readString("sustainabilityHeroImage") : existing?.sustainabilityHeroImage || "",
      factoryHeroImage: isSection("images") ? (await uploadFile(formData.get("factoryHeroImageFile") as File | null)) || readString("factoryHeroImage") : existing?.factoryHeroImage || "",
      contactHeroImage: isSection("images") ? (await uploadFile(formData.get("contactHeroImageFile") as File | null)) || readString("contactHeroImage") : existing?.contactHeroImage || "",
    };

    await prisma.systemSetting.upsert({
      where: { id: "global" },
      update: data,
      create: { id: "global", ...data },
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "保存失败" };
  }

  revalidatePath("/", "layout");
  return { success: true, section: String(formData.get("__section") || "all") };
}
