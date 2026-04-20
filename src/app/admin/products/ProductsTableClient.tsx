"use client";

import { useMemo, useState, useTransition } from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteProductButton from "./DeleteProductButton";
import { deleteProducts } from "@/actions/productActions";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import {
  ADMIN_CHECKBOX,
  ADMIN_DANGER_BUTTON,
  ADMIN_SECONDARY_BUTTON,
} from "../adminUi";
import AdminBulkActionBar from "../AdminBulkActionBar";
import AdminConfirmButton from "../AdminConfirmButton";
import AdminTableShell from "../AdminTableShell";
import AdminEmptyTableRow from "../AdminEmptyTableRow";
import { AdminTableHead, AdminTableHeadCell, AdminTableHeadRow } from "../AdminTableHead";
import { AdminEditAction, AdminPreviewAction } from "../AdminTableActions";
import AdminStatusBadge from "../AdminStatusBadge";
import { AdminImageCell, AdminTagCell } from "../AdminTableCells";

type ProductRow = {
  id: string;
  slug?: string | null;
  name: string;
  image: string;
  features: string;
  isFeatured: boolean;
  category: {
    name: string;
  };
};

export default function ProductsTableClient({
  products,
}: {
  products: ProductRow[];
}) {
  const { dict } = useAdminLanguage();
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const allIds = useMemo(() => products.map((product) => product.id), [products]);
  const allSelected = allIds.length > 0 && selectedIds.length === allIds.length;

  const selectedLabel = dict.products.bulk.selected.replace(
    "{count}",
    String(selectedIds.length),
  );

  const toggleOne = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : allIds);
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;

    startTransition(async () => {
      const result = await deleteProducts(selectedIds);
      if (result.success) {
        toast.success(
          dict.products.toast.bulkDeleted.replace("{count}", String(result.count ?? selectedIds.length)),
        );
        setSelectedIds([]);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <>
      <AdminBulkActionBar
        checked={allSelected}
        onToggleAll={toggleAll}
        selectAllLabel={dict.products.bulk.selectAll}
        selectedLabel={selectedLabel}
        actions={
          <>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={!selectedIds.length || isPending}
            className={ADMIN_SECONDARY_BUTTON}
          >
            {dict.products.bulk.clear}
          </button>
          <AdminConfirmButton
            onConfirm={handleBulkDelete}
            disabled={!selectedIds.length || isPending}
            className={ADMIN_DANGER_BUTTON}
            armedClassName="inline-flex items-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            armedChildren={
              <>
                <Trash2 className="h-4 w-4" />
                {dict.common.confirmAction}
              </>
            }
            armedTitle={dict.products.bulk.confirm}
          >
            <Trash2 className="h-4 w-4" />
            {dict.products.bulk.delete}
          </AdminConfirmButton>
          </>
        }
      />

      <AdminTableShell>
          <table className="w-full text-left border-collapse">
            <AdminTableHead>
              <AdminTableHeadRow>
                <AdminTableHeadCell className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className={ADMIN_CHECKBOX}
                  />
                </AdminTableHeadCell>
                <AdminTableHeadCell>{dict.products.image}</AdminTableHeadCell>
                <AdminTableHeadCell>{dict.products.name}</AdminTableHeadCell>
                <AdminTableHeadCell>{dict.products.category}</AdminTableHeadCell>
                <AdminTableHeadCell>{dict.products.features}</AdminTableHeadCell>
                <AdminTableHeadCell>{dict.products.featured}</AdminTableHeadCell>
                <AdminTableHeadCell className="px-6 py-4 font-semibold text-gray-600 text-right">{dict.products.actions}</AdminTableHeadCell>
              </AdminTableHeadRow>
            </AdminTableHead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <AdminEmptyTableRow
                  colSpan={7}
                  message={dict.products.empty}
                  actionHref="/admin/products/new"
                  actionLabel={dict.products.add}
                />
              ) : (
                products.map((product) => {
                  const features = JSON.parse(product.features);
                  const checked = selectedIds.includes(product.id);

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleOne(product.id)}
                          className={ADMIN_CHECKBOX}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <AdminImageCell
                          src={product.image}
                          alt={product.name}
                          emptyIcon={<ImageIcon className="w-5 h-5 text-gray-400" />}
                          wrapperClassName="w-12 h-12 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                      <td className="px-6 py-4">
                        <AdminTagCell
                          label={product.category.name}
                          className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {features.slice(0, 2).join(", ")}
                        {features.length > 2 && " ..."}
                      </td>
                      <td className="px-6 py-4">
                        <AdminStatusBadge
                          label={product.isFeatured ? dict.products.featuredLabel : dict.products.standardLabel}
                          tone={product.isFeatured ? "success" : "neutral"}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <AdminPreviewAction href={`/products/${product.slug || product.id}`} title="Preview Product" />
                          <AdminEditAction href={`/admin/products/${product.id}`} title={dict.products.actions} />
                          <DeleteProductButton id={product.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
      </AdminTableShell>
    </>
  );
}
