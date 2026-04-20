"use server";

import { uploadFile } from "@/lib/upload";
import { requireAdminSession } from "@/lib/adminAuth";

export async function uploadImageAction(formData: FormData) {
  await requireAdminSession();
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };
  const url = await uploadFile(file);
  if (!url) return { success: false, error: "Upload failed" };
  return { success: true, url };
}
