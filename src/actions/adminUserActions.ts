"use server";

import { prisma } from "@/lib/prisma";
import { sha256 } from "@/lib/adminAuthShared";
import { revalidatePath } from "next/cache";

export async function getAdminUsers() {
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });
  return users;
}

export async function createAdminUser(data: { username: string; password?: string; name?: string; role?: string }) {
  if (!data.username || !data.password) {
    throw new Error("Username and password are required");
  }
  
  const existing = await prisma.adminUser.findUnique({
    where: { username: data.username },
  });
  if (existing) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await sha256(`${data.password}:${process.env.ADMIN_SESSION_SECRET}`);

  await prisma.adminUser.create({
    data: {
      username: data.username,
      password: hashedPassword,
      name: data.name || "",
      role: data.role || "admin",
    },
  });

  revalidatePath("/admin/users");
}

export async function updateAdminUser(id: string, data: { username: string; password?: string; name?: string; role?: string }) {
  if (!data.username) {
    throw new Error("Username is required");
  }

  const existing = await prisma.adminUser.findUnique({
    where: { username: data.username },
  });
  if (existing && existing.id !== id) {
    throw new Error("Username already exists");
  }

  const updateData: any = {
    username: data.username,
    name: data.name || "",
    role: data.role || "admin",
  };

  if (data.password) {
    updateData.password = await sha256(`${data.password}:${process.env.ADMIN_SESSION_SECRET}`);
  }

  await prisma.adminUser.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/users");
}

export async function deleteAdminUser(id: string) {
  await prisma.adminUser.delete({
    where: { id },
  });
  revalidatePath("/admin/users");
}
