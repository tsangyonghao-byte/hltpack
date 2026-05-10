"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/upload";
import { requireAdminSession } from "@/lib/adminAuth";
import { getAdminActionText } from "./adminActionText";

function isValidLink(value: string) {
  if (!value) return false;
  if (value.startsWith("/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getOptionalText(formData: FormData, key: string) {
  const value = String(formData.get(key) || "").trim();
  return value || null;
}

export async function deleteBanner(id: string) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    await prisma.banner.delete({
      where: { id },
    });
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete banner:", error);
    return { success: false, error: text.deleteBannerFailed };
  }
}

export async function updateBannersStatus(ids: string[], isActive: boolean) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    if (!ids.length) {
      return { success: false, error: text.updateBannersStatusFailed };
    }

    const result = await prisma.banner.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isActive,
      },
    });

    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to update selected banners:", error);
    return { success: false, error: text.updateBannersStatusFailed };
  }
}

export async function createBanner(prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const title = String(formData.get("title") || "").trim();
    const titleEs = getOptionalText(formData, "titleEs");
    const titleAr = getOptionalText(formData, "titleAr");
    const subtitle = String(formData.get("subtitle") || "").trim();
    const subtitleEs = getOptionalText(formData, "subtitleEs");
    const subtitleAr = getOptionalText(formData, "subtitleAr");
    const description = String(formData.get("description") || "").trim();
    const descriptionEs = getOptionalText(formData, "descriptionEs");
    const descriptionAr = getOptionalText(formData, "descriptionAr");
    const link = String(formData.get("link") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const imageFile = formData.get("imageFile") as File | null;
    const isActive = formData.get("isActive") === "on";
    const orderRaw = String(formData.get("order") || "").trim();
    const order = orderRaw === "" ? 0 : Number(orderRaw);

    let image = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      const uploadedPath = await uploadFile(imageFile);
      if (uploadedPath) {
        image = uploadedPath;
      }
    }

    if (!title) {
      return { error: text.bannerTitleRequired };
    }

    if (!image) {
      return { error: text.imageRequired };
    }

    if (image && !isValidLink(image)) {
      return { error: text.imageUrlInvalid };
    }

    if (link && !isValidLink(link)) {
      return { error: text.bannerLinkInvalid };
    }

    if (!Number.isFinite(order) || order < 0) {
      return { error: text.bannerOrderInvalid };
    }

    await prisma.banner.create({
      data: {
        title,
        titleEs,
        titleAr,
        subtitle: subtitle || null,
        subtitleEs,
        subtitleAr,
        description: description || null,
        descriptionEs,
        descriptionAr,
        link: link || null,
        image,
        isActive,
        order,
      },
    });

  } catch (error) {
    console.error("Failed to create banner:", error);
    return { error: text.createBannerFailed };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners?success=created");
}

export async function updateBanner(id: string, prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const title = String(formData.get("title") || "").trim();
    const titleEs = getOptionalText(formData, "titleEs");
    const titleAr = getOptionalText(formData, "titleAr");
    const subtitle = String(formData.get("subtitle") || "").trim();
    const subtitleEs = getOptionalText(formData, "subtitleEs");
    const subtitleAr = getOptionalText(formData, "subtitleAr");
    const description = String(formData.get("description") || "").trim();
    const descriptionEs = getOptionalText(formData, "descriptionEs");
    const descriptionAr = getOptionalText(formData, "descriptionAr");
    const link = String(formData.get("link") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const imageFile = formData.get("imageFile") as File | null;
    const isActive = formData.get("isActive") === "on";
    const orderRaw = String(formData.get("order") || "").trim();
    const order = orderRaw === "" ? 0 : Number(orderRaw);

    let image = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      const uploadedPath = await uploadFile(imageFile);
      if (uploadedPath) {
        image = uploadedPath;
      }
    }

    if (!title) {
      return { error: text.bannerTitleRequired };
    }

    if (!image) {
      return { error: text.imageRequired };
    }

    if (image && !isValidLink(image)) {
      return { error: text.imageUrlInvalid };
    }

    if (link && !isValidLink(link)) {
      return { error: text.bannerLinkInvalid };
    }

    if (!Number.isFinite(order) || order < 0) {
      return { error: text.bannerOrderInvalid };
    }

    await prisma.banner.update({
      where: { id },
      data: {
        title,
        titleEs,
        titleAr,
        subtitle: subtitle || null,
        subtitleEs,
        subtitleAr,
        description: description || null,
        descriptionEs,
        descriptionAr,
        link: link || null,
        image,
        isActive,
        order,
      },
    });

  } catch (error) {
    console.error("Failed to update banner:", error);
    return { error: text.updateBannerFailed };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners?success=updated");
}
