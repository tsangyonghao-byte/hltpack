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
    const defaultSeoImageFile = formData.get("defaultSeoImageFile") as File | null;
    const uploadedDefaultSeoImage = await uploadFile(defaultSeoImageFile);
    const isSection = (...sections: string[]) => section === "all" || sections.includes(section);
    const readString = (key: string) =>
      formData.has(key) ? String(formData.get(key) || "") : ((existing as any)?.[key] ?? "");
    const data = {
      siteNameZh: isSection("basic") ? readString("siteNameZh") : existing?.siteNameZh || "",
      siteNameEn: isSection("basic") ? readString("siteNameEn") : existing?.siteNameEn || "",
      contactEmail: isSection("contact") ? readString("contactEmail") : existing?.contactEmail || "",
      contactPhone: isSection("contact") ? readString("contactPhone") : existing?.contactPhone || "",
      contactAddressZh: isSection("contact") ? readString("contactAddressZh") : existing?.contactAddressZh || "",
      contactAddressEn: isSection("contact") ? readString("contactAddressEn") : existing?.contactAddressEn || "",
      whatsapp: isSection("social") ? readString("whatsapp") : existing?.whatsapp || "",
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
