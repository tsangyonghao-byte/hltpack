"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { deleteCategories, deleteCategory } from "@/actions/categoryActions";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { toast } from "sonner";
import {
  ADMIN_ADD_BUTTON,
  ADMIN_CHECKBOX,
  ADMIN_DANGER_BUTTON,
  ADMIN_SECONDARY_BUTTON,
  ADMIN_SOFT_TABLE_HEAD_CELL,
  ADMIN_SOFT_TABLE_HEAD_ROW,
  ADMIN_SOFT_TABLE_CARD,
} from "../adminUi";
import AdminBulkActionBar from "../AdminBulkActionBar";
import AdminConfirmButton from "../AdminConfirmButton";
import AdminFilterForm from "../AdminFilterForm";
import AdminTableShell from "../AdminTableShell";
import AdminEmptyTableRow from "../AdminEmptyTableRow";
import { AdminTableHead, AdminTableHeadCell, AdminTableHeadRow } from "../AdminTableHead";
import { AdminEditAction, AdminTableActions } from "../AdminTableActions";
import AdminPageHeader from "../AdminPageHeader";
import { AdminFilterSearchInput, AdminFilterSelect } from "../AdminFilterFields";
import { AdminTagCell } from "../AdminTableCells";

type CategoryWithCount = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  _count: {
    products: number;
  };
};

export default function CategoriesClient({
  categories,
  filters,
  labels,
}: {
  categories: CategoryWithCount[];
  filters: { q: string; sort: string };
  labels: {
    searchPlaceholder: string;
    sortNewest: string;
    sortOldest: string;
    sortNameAsc: string;
    sortProductsDesc: string;
    search: string;
    reset: string;
  };
}) {
  const { dict } = useAdminLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allIds = useMemo(() => categories.map((category) => category.id), [categories]);
  const allSelected = allIds.length > 0 && selectedIds.length === allIds.length;
  const selectedLabel = dict.categories.bulk.selected.replace("{count}", String(selectedIds.length));

  const toggleOne = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : allIds);
  };

  const handleDelete = async (id: string) => {
    setLoading(id);
    const res = await deleteCategory(id);
    if (!res.success) {
      toast.error(res.error);
    } else {
      toast.success(dict.categories.toast.deleted);
      router.refresh();
    }
    setLoading(null);
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;

    setLoading("bulk-delete");
    const result = await deleteCategories(selectedIds);
    const failedCount = result.failedCount ?? 0;
    const deletedCount = result.deletedCount ?? 0;

    if (result.success && failedCount === 0) {
      toast.success(
        dict.categories.toast.bulkDeleted.replace("{count}", String(deletedCount)),
      );
      setSelectedIds([]);
      router.refresh();
    } else if (result.success && failedCount > 0) {
      const message = dict.categories.toast.partialResult
        .replace("{success}", String(deletedCount))
        .replace("{failed}", String(failedCount));
      toast.warning(
        result.blockedNames?.length
          ? `${message}: ${result.blockedNames.join(", ")}`
          : message,
      );
      setSelectedIds([]);
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setLoading(null);
  };

  return (
    <div className="p-8">
      <AdminPageHeader
        title={dict.categories.title}
        actions={
          <Link href="/admin/categories/new" className={ADMIN_ADD_BUTTON}>
            <Plus className="w-5 h-5 mr-2" />
            {dict.categories.add}
          </Link>
        }
      />

      <AdminBulkActionBar
        checked={allSelected}
        onToggleAll={toggleAll}
        selectAllLabel={dict.categories.bulk.selectAll}
        selectedLabel={selectedLabel}
        actions={
          <>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={!selectedIds.length || loading === "bulk-delete"}
            className={ADMIN_SECONDARY_BUTTON}
          >
            {dict.categories.bulk.clear}
          </button>
          <AdminConfirmButton
            onConfirm={handleBulkDelete}
            disabled={!selectedIds.length || loading === "bulk-delete"}
            className={ADMIN_DANGER_BUTTON}
            armedClassName="inline-flex items-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            armedChildren={
              <>
                <Trash2 className="h-4 w-4" />
                {dict.common.confirmAction}
              </>
            }
            armedTitle={dict.categories.bulk.confirmDelete}
          >
            <Trash2 className="h-4 w-4" />
            {dict.categories.bulk.delete}
          </AdminConfirmButton>
          </>
        }
      />

      <AdminFilterForm
        gridClassName="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto_auto]"
        submitLabel={labels.search}
        resetLabel={labels.reset}
        resetHref="/admin/categories"
      >
          <AdminFilterSearchInput
            type="text"
            name="q"
            defaultValue={filters.q}
            placeholder={labels.searchPlaceholder}
          />
          <AdminFilterSelect
            name="sort"
            defaultValue={filters.sort}
          >
            <option value="newest">{labels.sortNewest}</option>
            <option value="oldest">{labels.sortOldest}</option>
            <option value="name_asc">{labels.sortNameAsc}</option>
            <option value="products_desc">{labels.sortProductsDesc}</option>
          </AdminFilterSelect>
      </AdminFilterForm>

      <AdminTableShell className={ADMIN_SOFT_TABLE_CARD}>
        <table className="w-full text-left border-collapse">
          <AdminTableHead>
            <AdminTableHeadRow className={ADMIN_SOFT_TABLE_HEAD_ROW}>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className={ADMIN_CHECKBOX}
                />
              </AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.categories.name}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.categories.description}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.categories.products}</AdminTableHeadCell>
              <AdminTableHeadCell className={`${ADMIN_SOFT_TABLE_HEAD_CELL} text-right`}>{dict.categories.actions}</AdminTableHeadCell>
            </AdminTableHeadRow>
          </AdminTableHead>
          <tbody>
            {categories.length === 0 ? (
              <AdminEmptyTableRow
                colSpan={5}
                message={dict.categories.empty}
                description={dict.categories.emptyHint}
                actionHref="/admin/categories/new"
                actionLabel={dict.categories.add}
              />
            ) : (
              categories.map((cat) => {
                const checked = selectedIds.includes(cat.id);

                return (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOne(cat.id)}
                        className={ADMIN_CHECKBOX}
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="p-4 text-gray-500 max-w-xs truncate">{cat.description || dict.categories.emptyDescription}</td>
                    <td className="p-4">
                      <AdminTagCell
                        label={cat._count.products}
                        className="inline-flex rounded px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800"
                      />
                    </td>
                    <td className="p-4 text-right">
                      <AdminTableActions>
                        <AdminEditAction href={`/admin/categories/${cat.id}`} />
                        <AdminConfirmButton
                          onConfirm={() => handleDelete(cat.id)}
                          disabled={loading === cat.id || loading === "bulk-delete"}
                          className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          armedClassName="inline-flex items-center justify-center p-2 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          title={dict.categories.actions}
                          armedTitle={dict.categories.confirmDelete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </AdminConfirmButton>
                      </AdminTableActions>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </AdminTableShell>
    </div>
  );
}
