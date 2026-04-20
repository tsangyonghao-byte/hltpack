"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { getAdminActionText } from "./adminActionText";

export async function deleteCategory(id: string) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: text.deleteCategoryFailed };
  }
}

export async function deleteCategories(ids: string[]) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    if (!ids.length) {
      return { success: false, error: text.deleteCategoriesFailed };
    }

    const categories = await prisma.category.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const deletableIds = categories
      .filter((category) => category._count.products === 0)
      .map((category) => category.id);

    const blockedNames = categories
      .filter((category) => category._count.products > 0)
      .map((category) => category.name);

    if (deletableIds.length) {
      await prisma.category.deleteMany({
        where: {
          id: { in: deletableIds },
        },
      });
    }

    revalidatePath("/admin/categories");
    revalidatePath("/products");

    const deletedCount = deletableIds.length;
    const failedCount = blockedNames.length;

    return {
      success: deletedCount > 0,
      deletedCount,
      failedCount,
      blockedNames,
      error: deletedCount === 0 ? text.deleteCategoryFailed : undefined,
    };
  } catch (error) {
    console.error("Failed to delete selected categories:", error);
    return { success: false, error: text.deleteCategoriesFailed };
  }
}

export async function createCategory(prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) {
      return { error: text.categoryNameRequired };
    }

    await prisma.category.create({
      data: {
        name,
        description: description || null,
      },
    });

  } catch (error) {
    console.error("Failed to create category:", error);
    return { error: text.createCategoryFailed };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  redirect("/admin/categories?success=created");
}

export async function updateCategory(id: string, prevState: any, formData: FormData) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) {
      return { error: text.categoryNameRequired };
    }

    await prisma.category.update({
      where: { id },
      data: {
        name,
        description: description || null,
      },
    });

  } catch (error) {
    console.error("Failed to update category:", error);
    return { error: text.updateCategoryFailed };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  redirect("/admin/categories?success=updated");
}
