import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminPageHeader from "../../AdminPageHeader";
import UserForm from "../new/UserForm";

export const dynamic = "force-dynamic";

export default async function EditAdminUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { locale } = await getAdminDictionary();

  const user = await prisma.adminUser.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <AdminPageHeader
        title={locale === "zh" ? "编辑账号" : "Edit Admin User"}
      />
      <UserForm isEdit={true} initialData={user} />
    </div>
  );
}