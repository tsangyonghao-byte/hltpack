"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/upload";
import { requireAdminSession } from "@/lib/adminAuth";
import { getAdminActionText } from "./adminActionText";
import { slugify } from "@/lib/slug";

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

async function ensureUniqueNewsSlug(baseValue: string, excludeId?: string) {
  const baseSlug = slugify(baseValue);
  if (!baseSlug) {
    throw new Error("Slug cannot be empty.");
  }

  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.news.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function deleteNews(id: string) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    await prisma.news.delete({
      where: { id },
    });
    revalidatePath("/admin/news");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete news:", error);
    return { success: false, error: text.deleteNewsFailed };
  }
}

export async function deleteNewsItems(ids: string[]) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    if (!ids.length) {
      return { success: false, error: text.deleteNewsItemsFailed };
    }

    const result = await prisma.news.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    revalidatePath("/admin/news");
    revalidatePath("/");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to delete selected news items:", error);
    return { success: false, error: text.deleteNewsItemsFailed };
  }
}

export async function createNews(prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const title = String(formData.get("title") || "").trim();
    const summary = String(formData.get("summary") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const imageFile = formData.get("imageFile") as File | null;
    const content = String(formData.get("content") || "").trim();
    const slugInput = String(formData.get("slug") || "").trim();
    const seoTitle = String(formData.get("seoTitle") || "").trim();
    const seoDescription = String(formData.get("seoDescription") || "").trim();

    let image = imageUrl;
    
    // If a file is uploaded, it takes precedence
    if (imageFile && imageFile.size > 0) {
      const uploadedPath = await uploadFile(imageFile);
      if (uploadedPath) {
        image = uploadedPath;
      }
    }

    if (!title) {
      throw new Error(text.newsTitleRequired);
    }

    if (!category) {
      throw new Error(text.newsCategoryRequired);
    }

    if (!date) {
      throw new Error(text.newsDateRequired);
    }

    if (!summary) {
      throw new Error(text.newsSummaryRequired);
    }

    if (!image) {
      throw new Error(text.imageRequired);
    }

    if (image && !isValidLink(image)) {
      throw new Error(text.imageUrlInvalid);
    }

    const slug = await ensureUniqueNewsSlug(slugInput || title);

    await prisma.news.create({
      data: {
        title,
        slug,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        summary,
        category,
        date,
        image,
        content,
      },
    });

  } catch (error) {
    console.error("Failed to create news:", error);
    return { error: error instanceof Error ? error.message : text.createNewsFailed };
  }

  revalidatePath("/admin/news");
  revalidatePath("/");
  redirect("/admin/news?success=created");
}

export async function updateNews(id: string, prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const title = String(formData.get("title") || "").trim();
    const summary = String(formData.get("summary") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const imageFile = formData.get("imageFile") as File | null;
    const content = String(formData.get("content") || "").trim();
    const slugInput = String(formData.get("slug") || "").trim();
    const seoTitle = String(formData.get("seoTitle") || "").trim();
    const seoDescription = String(formData.get("seoDescription") || "").trim();

    let image = imageUrl;
    
    // If a file is uploaded, it takes precedence
    if (imageFile && imageFile.size > 0) {
      const uploadedPath = await uploadFile(imageFile);
      if (uploadedPath) {
        image = uploadedPath;
      }
    }

    if (!title) {
      throw new Error(text.newsTitleRequired);
    }

    if (!category) {
      throw new Error(text.newsCategoryRequired);
    }

    if (!date) {
      throw new Error(text.newsDateRequired);
    }

    if (!summary) {
      throw new Error(text.newsSummaryRequired);
    }

    if (!image) {
      throw new Error(text.imageRequired);
    }

    if (image && !isValidLink(image)) {
      throw new Error(text.imageUrlInvalid);
    }

    const slug = await ensureUniqueNewsSlug(slugInput || title, id);

    await prisma.news.update({
      where: { id },
      data: {
        title,
        slug,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        summary,
        category,
        date,
        image,
        content,
      },
    });

  } catch (error) {
    console.error("Failed to update news:", error);
    return { error: error instanceof Error ? error.message : text.updateNewsFailed };
  }

  revalidatePath("/admin/news");
  revalidatePath("/");
  redirect("/admin/news?success=updated");
}
