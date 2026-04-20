"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Banner } from "@prisma/client";
import { Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import { deleteBanner, updateBannersStatus } from "@/actions/bannerActions";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { toast } from "sonner";
import {
  ADMIN_ADD_BUTTON,
  ADMIN_CHECKBOX,
  ADMIN_NEUTRAL_ACTION_BUTTON,
  ADMIN_SECONDARY_BUTTON,
  ADMIN_SUCCESS_BUTTON,
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
import AdminStatusBadge from "../AdminStatusBadge";
import AdminPageHeader from "../AdminPageHeader";
import { AdminFilterSearchInput, AdminFilterSelect } from "../AdminFilterFields";
import { AdminImageCell } from "../AdminTableCells";

export default function BannersClient({
  banners,
  filters,
  labels,
}: {
  banners: Banner[];
  filters: { q: string; status: string; sort: string };
  labels: {
    searchPlaceholder: string;
    statusAll: string;
    activeOnly: string;
    inactiveOnly: string;
    sortOrderAsc: string;
    sortOrderDesc: string;
    sortNewest: string;
    sortActiveFirst: string;
    search: string;
    reset: string;
  };
}) {
  const { dict } = useAdminLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allIds = useMemo(() => banners.map((banner) => banner.id), [banners]);
  const allSelected = allIds.length > 0 && selectedIds.length === allIds.length;
  const selectedLabel = dict.banners.bulk.selected.replace("{count}", String(selectedIds.length));

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
    const res = await deleteBanner(id);
    if (!res.success) {
      toast.error(res.error);
    } else {
      toast.success(dict.banners.toast.deleted);
      router.refresh();
    }
    setLoading(null);
  };

  const handleBulkStatus = async (isActive: boolean) => {
    if (!selectedIds.length) return;

    setLoading(isActive ? "bulk-activate" : "bulk-deactivate");
    const result = await updateBannersStatus(selectedIds, isActive);
    if (result.success) {
      toast.success(
        (isActive ? dict.banners.toast.bulkActivated : dict.banners.toast.bulkDeactivated).replace(
          "{count}",
          String(result.count ?? selectedIds.length),
        ),
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
        title={dict.banners.title}
        actions={
          <Link href="/admin/banners/new" className={ADMIN_ADD_BUTTON}>
            <Plus className="w-5 h-5 mr-2" />
            {dict.banners.add}
          </Link>
        }
      />

      <AdminBulkActionBar
        checked={allSelected}
        onToggleAll={toggleAll}
        selectAllLabel={dict.banners.bulk.selectAll}
        selectedLabel={selectedLabel}
        actions={
          <>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={!selectedIds.length || loading === "bulk-activate" || loading === "bulk-deactivate"}
            className={ADMIN_SECONDARY_BUTTON}
          >
            {dict.banners.bulk.clear}
          </button>
          <button
            type="button"
            onClick={() => handleBulkStatus(true)}
            disabled={!selectedIds.length || loading === "bulk-activate" || loading === "bulk-deactivate"}
            className={ADMIN_SUCCESS_BUTTON}
          >
            <CheckCircle className="h-4 w-4" />
            {dict.banners.bulk.activate}
          </button>
          <button
            type="button"
            onClick={() => handleBulkStatus(false)}
            disabled={!selectedIds.length || loading === "bulk-activate" || loading === "bulk-deactivate"}
            className={ADMIN_NEUTRAL_ACTION_BUTTON}
          >
            <XCircle className="h-4 w-4" />
            {dict.banners.bulk.deactivate}
          </button>
          </>
        }
      />

      <AdminFilterForm
        gridClassName="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_auto_auto]"
        submitLabel={labels.search}
        resetLabel={labels.reset}
        resetHref="/admin/banners"
      >
          <AdminFilterSearchInput
            type="text"
            name="q"
            defaultValue={filters.q}
            placeholder={labels.searchPlaceholder}
          />
          <AdminFilterSelect
            name="status"
            defaultValue={filters.status}
          >
            <option value="">{labels.statusAll}</option>
            <option value="active">{labels.activeOnly}</option>
            <option value="inactive">{labels.inactiveOnly}</option>
          </AdminFilterSelect>
          <AdminFilterSelect
            name="sort"
            defaultValue={filters.sort}
          >
            <option value="order_asc">{labels.sortOrderAsc}</option>
            <option value="order_desc">{labels.sortOrderDesc}</option>
            <option value="newest">{labels.sortNewest}</option>
            <option value="active_first">{labels.sortActiveFirst}</option>
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
              <AdminTableHeadCell className={`${ADMIN_SOFT_TABLE_HEAD_CELL} w-32`}>{dict.banners.image}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.banners.content}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.banners.order}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.banners.status}</AdminTableHeadCell>
              <AdminTableHeadCell className={`${ADMIN_SOFT_TABLE_HEAD_CELL} text-right`}>{dict.banners.actions}</AdminTableHeadCell>
            </AdminTableHeadRow>
          </AdminTableHead>
          <tbody>
            {banners.length === 0 ? (
              <AdminEmptyTableRow
                colSpan={6}
                message={dict.banners.empty}
                description={dict.banners.emptyHint}
                actionHref="/admin/banners/new"
                actionLabel={dict.banners.add}
              />
            ) : (
              banners.map((banner) => {
                const checked = selectedIds.includes(banner.id);

                return (
                  <tr key={banner.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOne(banner.id)}
                        className={ADMIN_CHECKBOX}
                      />
                    </td>
                    <td className="p-4">
                      <AdminImageCell
                        src={banner.image}
                        alt={banner.title}
                        wrapperClassName="w-24 h-16 rounded bg-gray-100 overflow-hidden"
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{banner.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{banner.subtitle}</div>
                    </td>
                    <td className="p-4 text-gray-600">{banner.order}</td>
                    <td className="p-4">
                      {banner.isActive ? (
                        <AdminStatusBadge
                          label={dict.banners.active}
                          tone="success"
                          icon={<CheckCircle className="w-3.5 h-3.5" />}
                        />
                      ) : (
                        <AdminStatusBadge
                          label={dict.banners.inactive}
                          tone="neutral"
                          icon={<XCircle className="w-3.5 h-3.5" />}
                        />
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <AdminTableActions>
                        <AdminEditAction href={`/admin/banners/${banner.id}`} />
                        <AdminConfirmButton
                          onConfirm={() => handleDelete(banner.id)}
                          disabled={
                            loading === banner.id ||
                            loading === "bulk-activate" ||
                            loading === "bulk-deactivate"
                          }
                          className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          armedClassName="inline-flex items-center justify-center p-2 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          title={dict.banners.actions}
                          armedTitle={dict.banners.confirmDelete}
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
