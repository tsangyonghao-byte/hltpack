"use client";

import { useMemo, useState, useTransition } from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteNewsButton from "./DeleteNewsButton";
import { deleteNewsItems } from "@/actions/newsActions";
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
import { AdminDateCell, AdminImageCell, AdminTagCell } from "../AdminTableCells";

type NewsRow = {
  id: string;
  slug?: string | null;
  title: string;
  image: string;
  category: string;
  date: string;
};

export default function NewsTableClient({
  newsItems,
}: {
  newsItems: NewsRow[];
}) {
  const { dict } = useAdminLanguage();
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const allIds = useMemo(() => newsItems.map((item) => item.id), [newsItems]);
  const allSelected = allIds.length > 0 && selectedIds.length === allIds.length;
  const selectedLabel = dict.news.bulk.selected.replace("{count}", String(selectedIds.length));

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
      const result = await deleteNewsItems(selectedIds);
      if (result.success) {
        toast.success(
          dict.news.toast.bulkDeleted.replace("{count}", String(result.count ?? selectedIds.length)),
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
        selectAllLabel={dict.news.bulk.selectAll}
        selectedLabel={selectedLabel}
        actions={
          <>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={!selectedIds.length || isPending}
            className={ADMIN_SECONDARY_BUTTON}
          >
            {dict.news.bulk.clear}
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
            armedTitle={dict.news.bulk.confirmDelete}
          >
            <Trash2 className="h-4 w-4" />
            {dict.news.bulk.delete}
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
                <AdminTableHeadCell className="px-6 py-4 font-semibold text-gray-600 w-24">{dict.news.image}</AdminTableHeadCell>
                <AdminTableHeadCell>{dict.news.titleCol}</AdminTableHeadCell>
                <AdminTableHeadCell>{dict.news.category}</AdminTableHeadCell>
                <AdminTableHeadCell>{dict.news.date}</AdminTableHeadCell>
                <AdminTableHeadCell className="px-6 py-4 font-semibold text-gray-600 text-right">{dict.news.actions}</AdminTableHeadCell>
              </AdminTableHeadRow>
            </AdminTableHead>
            <tbody className="divide-y divide-gray-200">
              {newsItems.length === 0 ? (
                <AdminEmptyTableRow
                  colSpan={6}
                  message={dict.news.empty}
                  actionHref="/admin/news/new"
                  actionLabel={dict.news.add}
                />
              ) : (
                newsItems.map((item) => {
                  const checked = selectedIds.includes(item.id);

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleOne(item.id)}
                          className={ADMIN_CHECKBOX}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <AdminImageCell
                          src={item.image}
                          alt={item.title}
                          emptyIcon={<ImageIcon className="w-5 h-5 text-gray-400" />}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        <div className="max-w-md truncate" title={item.title}>
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <AdminTagCell label={item.category} />
                      </td>
                      <td className="px-6 py-4">
                        <AdminDateCell value={item.date} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <AdminPreviewAction href={`/news/${item.slug || item.id}`} title="Preview News" />
                          <AdminEditAction href={`/admin/news/${item.id}`} title={dict.news.actions} />
                          <DeleteNewsButton id={item.id} />
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
