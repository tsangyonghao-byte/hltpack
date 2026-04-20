"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/adminAuth";

export async function createNavItem(prevState: any, formData: FormData) {
  await requireAdminSession();
  try {
    const nameZh = String(formData.get("nameZh") || "").trim();
    const nameEn = String(formData.get("nameEn") || "").trim();
    const link = String(formData.get("link") || "").trim();
    const order = parseInt(String(formData.get("order") || "0"), 10);
    const parentId = formData.get("parentId") as string | null;
    const isVisible = formData.get("isVisible") === "on";
    const image = formData.get("image") as string | null;

    if (!nameZh || !nameEn || !link) {
      throw new Error("中文名、英文名和链接都是必填项");
    }

    await prisma.navigationItem.create({
      data: {
        nameZh,
        nameEn,
        link,
        order: isNaN(order) ? 0 : order,
        parentId: parentId || null,
        isVisible,
        image: image || null,
      },
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "创建失败" };
  }

  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true };
}

export async function updateNavItem(id: string, prevState: any, formData: FormData) {
  await requireAdminSession();
  try {
    const nameZh = String(formData.get("nameZh") || "").trim();
    const nameEn = String(formData.get("nameEn") || "").trim();
    const link = String(formData.get("link") || "").trim();
    const order = parseInt(String(formData.get("order") || "0"), 10);
    const parentId = formData.get("parentId") as string | null;
    const isVisible = formData.get("isVisible") === "on";
    const image = formData.get("image") as string | null;

    if (!nameZh || !nameEn || !link) {
      throw new Error("中文名、英文名和链接都是必填项");
    }

    if (parentId === id) {
      throw new Error("父菜单不能是自己");
    }

    await prisma.navigationItem.update({
      where: { id },
      data: {
        nameZh,
        nameEn,
        link,
        order: isNaN(order) ? 0 : order,
        parentId: parentId || null,
        isVisible,
        image: image || null,
      },
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "更新失败" };
  }

  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true };
}

export async function deleteNavItem(id: string) {
  await requireAdminSession();
  try {
    // 检查是否有子菜单
    const childrenCount = await prisma.navigationItem.count({ where: { parentId: id } });
    if (childrenCount > 0) {
      return { success: false, error: "请先删除该菜单下的所有子菜单" };
    }

    await prisma.navigationItem.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/navigation");
    return { success: true };
  } catch (error) {
    return { success: false, error: "删除失败" };
  }
}
