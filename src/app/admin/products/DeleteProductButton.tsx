"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/productActions";
import { useTransition } from "react";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AdminConfirmButton from "../AdminConfirmButton";

export default function DeleteProductButton({ id }: { id: string }) {
  const { dict } = useAdminLanguage();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success(dict.products.toast.deleted);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <AdminConfirmButton
      onConfirm={handleDelete}
      disabled={isPending}
      className={`inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      armedClassName={`inline-flex items-center justify-center p-2 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      title={dict.products.delete.title}
      armedTitle={dict.products.delete.confirm}
    >
      <Trash2 className="w-4 h-4" />
    </AdminConfirmButton>
  );
}
