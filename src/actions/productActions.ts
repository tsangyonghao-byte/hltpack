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

async function ensureUniqueProductSlug(baseValue: string, excludeId?: string) {
  const baseSlug = slugify(baseValue);
  if (!baseSlug) {
    throw new Error("Slug cannot be empty.");
  }

  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.product.findFirst({
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

export async function deleteProduct(id: string) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: text.deleteProductFailed };
  }
}

export async function deleteProducts(ids: string[]) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    if (!ids.length) {
      return { success: false, error: text.deleteProductsFailed };
    }

    const result = await prisma.product.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to delete selected products:", error);
    return { success: false, error: text.deleteProductsFailed };
  }
}

export async function createProduct(prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const name = String(formData.get("name") || "").trim();
    const categoryId = String(formData.get("categoryId") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const imageFile = formData.get("imageFile") as File | null;
    const featuresString = String(formData.get("features") || "").trim();
    const isFeatured = formData.get("isFeatured") === "on";
    const content = String(formData.get("content") || "").trim();
    const galleryUrls = String(formData.get("galleryUrls") || "[]").trim();
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

    if (!name) {
      throw new Error(text.productNameRequired);
    }

    if (!categoryId) {
      throw new Error(text.productCategoryRequired);
    }

    if (!image) {
      throw new Error(text.imageRequired);
    }

    if (image && !isValidLink(image)) {
      throw new Error(text.imageUrlInvalid);
    }

    if (!featuresString) {
      throw new Error(text.productFeaturesRequired);
    }

    const features = featuresString.split(",").map(f => f.trim()).filter(f => f);
    const slug = await ensureUniqueProductSlug(slugInput || name);

    if (!features.length) {
      throw new Error(text.productFeaturesRequired);
    }

    await prisma.product.create({
      data: {
        name,
        categoryId,
        image,
        slug,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        gallery: galleryUrls,
        features: JSON.stringify(features),
        content: content || null,
        isFeatured,
      },
    });

  } catch (error) {
    console.error("Failed to create product:", error);
    return { error: error instanceof Error ? error.message : text.createProductFailed };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products?success=created");
}

export async function updateProduct(id: string, prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const name = String(formData.get("name") || "").trim();
    const categoryId = String(formData.get("categoryId") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const imageFile = formData.get("imageFile") as File | null;
    const featuresString = String(formData.get("features") || "").trim();
    const isFeatured = formData.get("isFeatured") === "on";
    const content = String(formData.get("content") || "").trim();
    const galleryUrls = String(formData.get("galleryUrls") || "[]").trim();
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

    if (!name) {
      throw new Error(text.productNameRequired);
    }

    if (!categoryId) {
      throw new Error(text.productCategoryRequired);
    }

    if (!image) {
      throw new Error(text.imageRequired);
    }

    if (image && !isValidLink(image)) {
      throw new Error(text.imageUrlInvalid);
    }

    if (!featuresString) {
      throw new Error(text.productFeaturesRequired);
    }

    const features = featuresString.split(",").map(f => f.trim()).filter(f => f);
    const slug = await ensureUniqueProductSlug(slugInput || name, id);

    if (!features.length) {
      throw new Error(text.productFeaturesRequired);
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        categoryId,
        image,
        gallery: galleryUrls,
        features: JSON.stringify(features),
        content: content || null,
        isFeatured,
      },
    });

  } catch (error) {
    console.error("Failed to update product:", error);
    return { error: error instanceof Error ? error.message : text.updateProductFailed };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products?success=updated");
}
