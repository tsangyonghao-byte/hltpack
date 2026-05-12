"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";
import { redirect } from "next/navigation";

export async function getCertificates() {
  return await prisma.certificate.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createCertificate(prevState: any, formData: FormData) {
  await requireAdminSession();
  try {
    const file = formData.get("imageFile") as File | null;
    let imageUrl = formData.get("image") as string;
    
    if (file && file.size > 0) {
      const uploaded = await uploadFile(file);
      if (uploaded) imageUrl = uploaded;
    }
    
    if (!imageUrl) {
      return { error: "图片不能为空 / Image is required" };
    }

    await prisma.certificate.create({
      data: {
        name: formData.get("name") as string,
        nameEs: (formData.get("nameEs") as string) || null,
        nameAr: (formData.get("nameAr") as string) || null,
        category: (formData.get("category") as string) || "System Certification",
        image: imageUrl,
        order: parseInt(formData.get("order") as string) || 0,
        isVisible: formData.get("isVisible") === "on",
      },
    });
  } catch (error) {
    return { error: "保存失败 / Failed to save" };
  }
  revalidatePath("/", "layout");
  redirect("/admin/certificates");
}

export async function updateCertificate(prevState: any, formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id") as string;
  try {
    const file = formData.get("imageFile") as File | null;
    let imageUrl = formData.get("image") as string;
    
    if (file && file.size > 0) {
      const uploaded = await uploadFile(file);
      if (uploaded) imageUrl = uploaded;
    }
    
    if (!imageUrl) {
      return { error: "图片不能为空 / Image is required" };
    }

    await prisma.certificate.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        nameEs: (formData.get("nameEs") as string) || null,
        nameAr: (formData.get("nameAr") as string) || null,
        category: (formData.get("category") as string) || "System Certification",
        image: imageUrl,
        order: parseInt(formData.get("order") as string) || 0,
        isVisible: formData.get("isVisible") === "on",
      },
    });
  } catch (error) {
    return { error: "保存失败 / Failed to save" };
  }
  revalidatePath("/", "layout");
  redirect("/admin/certificates");
}

export async function deleteCertificate(id: string) {
  await requireAdminSession();
  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return { error: "删除失败 / Failed to delete" };
  }
}
