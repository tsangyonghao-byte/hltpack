"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Mail, CheckCircle, MailOpen, Eye, X } from "lucide-react";
import { deleteMessage, deleteMessages, markMessageAsRead, markMessagesAsRead, updateMessageAssignment, updateMessageNote, updateMessageStatus, updateMessagesAssignedTo, updateMessagesFollowUpAt, updateMessagesStatus } from "@/actions/messageActions";
import { useAdminLanguage } from "@/i18n/AdminLanguageContext";
import { toast } from "sonner";
import {
  ADMIN_CHECKBOX,
  ADMIN_DANGER_BUTTON,
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
import { AdminTableActions } from "../AdminTableActions";
import AdminStatusBadge from "../AdminStatusBadge";
import AdminPageHeader from "../AdminPageHeader";
import { AdminFilterSearchInput, AdminFilterSelect } from "../AdminFilterFields";
import { AdminDateCell, AdminExcerptCell } from "../AdminTableCells";

export default function MessagesClient({
  messages,
  filters,
  labels,
  exportHref,
}: {
  messages: Array<{
    id: string;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
    status: string;
    subject?: string | null;
    inquiryType?: string | null;
    productName?: string | null;
    bagType?: string | null;
    material?: string | null;
    quantity?: string | null;
    application?: string | null;
    targetMarket?: string | null;
    sourcePage?: string | null;
    assignedTo?: string | null;
    followUpAt?: Date | null;
    internalNote?: string | null;
    logs?: Array<{
      id: string;
      action: string;
      actor: string;
      details?: string | null;
      createdAt: Date;
    }>;
    content: string;
    isRead: boolean;
    createdAt: Date;
  }>;
  filters: { q: string; status: string; followUp: string; sort: string };
  labels: {
    searchPlaceholder: string;
    statusAll: string;
    followUpAll: string;
    followUpOverdue: string;
    followUpToday: string;
    followUpUpcoming: string;
    followUpNone: string;
    statusNew: string;
    statusInProgress: string;
    statusQuoted: string;
    statusWon: string;
    statusLost: string;
    sortDuePriority: string;
    sortNewest: string;
    sortOldest: string;
    sortUnreadFirst: string;
    sortNameAsc: string;
    search: string;
    reset: string;
  };
  exportHref: string;
}) {
  const { dict } = useAdminLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailMessageId, setDetailMessageId] = useState<string | null>(null);
  const [bulkOwner, setBulkOwner] = useState("");
  const [bulkFollowUpAt, setBulkFollowUpAt] = useState("");
  const [bulkStatus, setBulkStatus] = useState("in_progress");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>(
    Object.fromEntries(messages.map((msg) => [msg.id, msg.internalNote || ""]))
  );
  const [ownerDrafts, setOwnerDrafts] = useState<Record<string, string>>(
    Object.fromEntries(messages.map((msg) => [msg.id, msg.assignedTo || ""]))
  );
  const [followUpDrafts, setFollowUpDrafts] = useState<Record<string, string>>(
    Object.fromEntries(
      messages.map((msg) => [
        msg.id,
        msg.followUpAt ? new Date(msg.followUpAt).toISOString().slice(0, 16) : "",
      ])
    )
  );

  const allIds = useMemo(() => messages.map((message) => message.id), [messages]);
  const detailMessage = useMemo(
    () => messages.find((message) => message.id === detailMessageId) ?? null,
    [messages, detailMessageId],
  );
  const allSelected = allIds.length > 0 && selectedIds.length === allIds.length;
  const selectedLabel = dict.messages.bulk.selected.replace("{count}", String(selectedIds.length));
  const getStatusMeta = (status: string) => {
    switch (status) {
      case "in_progress":
        return { label: dict.messages.statusInProgress, tone: "info" as const };
      case "quoted":
        return { label: dict.messages.statusQuoted, tone: "warning" as const };
      case "won":
        return { label: dict.messages.statusWon, tone: "success" as const };
      case "lost":
        return { label: dict.messages.statusLost, tone: "neutral" as const };
      default:
        return { label: dict.messages.statusNew, tone: "info" as const };
    }
  };
  const getFollowUpMeta = (value?: string | null) => {
    if (!value) {
      return {
        label: dict.messages.followUpNone,
        className: "border border-gray-200 bg-gray-50 text-gray-500",
        wrapperClassName: "",
      };
    }

    const followUpDate = new Date(value);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    if (followUpDate < now) {
      return {
        label: dict.messages.followUpOverdue,
        className: "border border-red-200 bg-red-50 text-red-700",
        wrapperClassName: "rounded-2xl border border-red-100 bg-red-50/40 p-3",
      };
    }

    if (followUpDate >= startOfToday && followUpDate < startOfTomorrow) {
      return {
        label: dict.messages.followUpToday,
        className: "border border-amber-200 bg-amber-50 text-amber-700",
        wrapperClassName: "rounded-2xl border border-amber-100 bg-amber-50/40 p-3",
      };
    }

    return {
      label: dict.messages.followUpUpcoming,
      className: "border border-emerald-200 bg-emerald-50 text-emerald-700",
      wrapperClassName: "rounded-2xl border border-emerald-100 bg-emerald-50/30 p-3",
    };
  };
  const getLogActionLabel = (action: string) => {
    switch (action) {
      case "marked_read":
        return dict.messages.logMarkedRead;
      case "status_updated":
        return dict.messages.logStatusUpdated;
      case "note_updated":
        return dict.messages.logNoteUpdated;
      case "assignment_updated":
        return dict.messages.logAssignmentUpdated;
      case "bulk_marked_read":
        return dict.messages.logBulkMarkedRead;
      case "bulk_status_updated":
        return dict.messages.logBulkStatusUpdated;
      case "bulk_owner_updated":
        return dict.messages.logBulkOwnerUpdated;
      case "bulk_followup_updated":
        return dict.messages.logBulkFollowUpUpdated;
      default:
        return action;
    }
  };

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
    const result = await deleteMessage(id);
    if (result.success) {
      toast.success(dict.messages.toast.deleted);
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setLoading(null);
  };

  const handleMarkAsRead = async (id: string) => {
    setLoading(id);
    const result = await markMessageAsRead(id);
    if (result.success) {
      toast.success(dict.messages.toast.markedRead);
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setLoading(null);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setLoading(`status-${id}`);
    const result = await updateMessageStatus(id, status);
    if (result.success) {
      toast.success(dict.messages.toast.statusUpdated);
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setLoading(null);
  };

  const handleSaveNote = async (id: string) => {
    setLoading(`note-${id}`);
    const result = await updateMessageNote(id, noteDrafts[id] || "");
    if (result.success) {
      toast.success(dict.messages.toast.noteUpdated);
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setLoading(null);
  };

  const handleSaveAssignment = async (id: string) => {
    setLoading(`assignment-${id}`);
    const result = await updateMessageAssignment(id, ownerDrafts[id] || "", followUpDrafts[id] || "");
    if (result.success) {
      toast.success(dict.messages.toast.assignmentUpdated);
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setLoading(null);
  };

  const handleBulkMarkRead = async () => {
    if (!selectedIds.length) return;

    setLoading("bulk-read");
    const result = await markMessagesAsRead(selectedIds);
    if (result.success) {
      toast.success(
        dict.messages.toast.bulkMarkedRead.replace(
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

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;

    setLoading("bulk-delete");
    const result = await deleteMessages(selectedIds);
    if (result.success) {
      toast.success(
        dict.messages.toast.bulkDeleted.replace(
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

  const handleBulkStatusUpdate = async () => {
    if (!selectedIds.length) return;

    setLoading("bulk-status");
    const result = await updateMessagesStatus(selectedIds, bulkStatus);
    if (result.success) {
      toast.success(
        dict.messages.toast.bulkStatusUpdated.replace(
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

  const handleBulkOwnerUpdate = async () => {
    if (!selectedIds.length) return;

    setLoading("bulk-owner");
    const result = await updateMessagesAssignedTo(selectedIds, bulkOwner);
    if (result.success) {
      toast.success(
        dict.messages.toast.bulkOwnerUpdated.replace(
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

  const handleBulkFollowUpUpdate = async () => {
    if (!selectedIds.length) return;

    setLoading("bulk-followup");
    const result = await updateMessagesFollowUpAt(selectedIds, bulkFollowUpAt);
    if (result.success) {
      toast.success(
        dict.messages.toast.bulkFollowUpUpdated.replace(
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
        title={dict.messages.title}
        actions={
          <Link
            href={exportHref}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            {dict.messages.exportCsv}
          </Link>
        }
      />

      <AdminBulkActionBar
        checked={allSelected}
        onToggleAll={toggleAll}
        selectAllLabel={dict.messages.bulk.selectAll}
        selectedLabel={selectedLabel}
        actions={
          <>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={!selectedIds.length || loading === "bulk-read" || loading === "bulk-delete" || loading === "bulk-status" || loading === "bulk-owner" || loading === "bulk-followup"}
            className={ADMIN_SECONDARY_BUTTON}
          >
            {dict.messages.bulk.clear}
          </button>
          <input
            type="text"
            value={bulkOwner}
            onChange={(e) => setBulkOwner(e.target.value)}
            placeholder={dict.messages.bulk.ownerPlaceholder}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22]"
          />
          <button
            type="button"
            onClick={handleBulkOwnerUpdate}
            disabled={!selectedIds.length || loading === "bulk-read" || loading === "bulk-delete" || loading === "bulk-status" || loading === "bulk-owner" || loading === "bulk-followup"}
            className={ADMIN_SECONDARY_BUTTON}
          >
            {dict.messages.bulk.applyOwner}
          </button>
          <input
            type="datetime-local"
            value={bulkFollowUpAt}
            onChange={(e) => setBulkFollowUpAt(e.target.value)}
            aria-label={dict.messages.bulk.followUpPlaceholder}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22]"
          />
          <button
            type="button"
            onClick={handleBulkFollowUpUpdate}
            disabled={!selectedIds.length || loading === "bulk-read" || loading === "bulk-delete" || loading === "bulk-status" || loading === "bulk-owner" || loading === "bulk-followup"}
            className={ADMIN_SECONDARY_BUTTON}
          >
            {dict.messages.bulk.applyFollowUp}
          </button>
          <select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22]"
          >
            <option value="new">{dict.messages.statusNew}</option>
            <option value="in_progress">{dict.messages.statusInProgress}</option>
            <option value="quoted">{dict.messages.statusQuoted}</option>
            <option value="won">{dict.messages.statusWon}</option>
            <option value="lost">{dict.messages.statusLost}</option>
          </select>
          <button
            type="button"
            onClick={handleBulkStatusUpdate}
            disabled={!selectedIds.length || loading === "bulk-read" || loading === "bulk-delete" || loading === "bulk-status" || loading === "bulk-owner" || loading === "bulk-followup"}
            className={ADMIN_SUCCESS_BUTTON}
          >
            {dict.messages.bulk.applyStatus}
          </button>
          <button
            type="button"
            onClick={handleBulkMarkRead}
            disabled={!selectedIds.length || loading === "bulk-read" || loading === "bulk-delete" || loading === "bulk-status" || loading === "bulk-owner" || loading === "bulk-followup"}
            className={ADMIN_SUCCESS_BUTTON}
          >
            <CheckCircle className="h-4 w-4" />
            {dict.messages.bulk.markRead}
          </button>
          <AdminConfirmButton
            onConfirm={handleBulkDelete}
            disabled={!selectedIds.length || loading === "bulk-read" || loading === "bulk-delete" || loading === "bulk-status" || loading === "bulk-owner" || loading === "bulk-followup"}
            className={ADMIN_DANGER_BUTTON}
            armedClassName="inline-flex items-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            armedChildren={
              <>
                <Trash2 className="h-4 w-4" />
                {dict.common.confirmAction}
              </>
            }
            armedTitle={dict.messages.bulk.confirmDelete}
          >
            <Trash2 className="h-4 w-4" />
            {dict.messages.bulk.delete}
          </AdminConfirmButton>
          </>
        }
      />

      <AdminFilterForm
        gridClassName="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_180px_auto_auto]"
        submitLabel={labels.search}
        resetLabel={labels.reset}
        resetHref="/admin/messages"
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
            <option value="new">{labels.statusNew}</option>
            <option value="in_progress">{labels.statusInProgress}</option>
            <option value="quoted">{labels.statusQuoted}</option>
            <option value="won">{labels.statusWon}</option>
            <option value="lost">{labels.statusLost}</option>
          </AdminFilterSelect>
          <AdminFilterSelect
            name="followUp"
            defaultValue={filters.followUp}
          >
            <option value="">{labels.followUpAll}</option>
            <option value="overdue">{labels.followUpOverdue}</option>
            <option value="today">{labels.followUpToday}</option>
            <option value="upcoming">{labels.followUpUpcoming}</option>
            <option value="none">{labels.followUpNone}</option>
          </AdminFilterSelect>
          <AdminFilterSelect
            name="sort"
            defaultValue={filters.sort}
          >
            <option value="due_priority">{labels.sortDuePriority}</option>
            <option value="newest">{labels.sortNewest}</option>
            <option value="oldest">{labels.sortOldest}</option>
            <option value="unread_first">{labels.sortUnreadFirst}</option>
            <option value="name_asc">{labels.sortNameAsc}</option>
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
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.messages.workflowStatus}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.messages.nameEmail}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.messages.rfqDetails}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.messages.message}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.messages.assignedTo}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.messages.internalNote}</AdminTableHeadCell>
              <AdminTableHeadCell className={ADMIN_SOFT_TABLE_HEAD_CELL}>{dict.messages.date}</AdminTableHeadCell>
              <AdminTableHeadCell className={`${ADMIN_SOFT_TABLE_HEAD_CELL} text-right`}>{dict.messages.actions}</AdminTableHeadCell>
            </AdminTableHeadRow>
          </AdminTableHead>
          <tbody>
            {messages.length === 0 ? (
              <AdminEmptyTableRow
                colSpan={9}
                message={dict.messages.empty}
                description={dict.messages.emptyHint}
              />
            ) : (
              messages.map((msg) => {
                const checked = selectedIds.includes(msg.id);
                const followUpMeta = getFollowUpMeta(followUpDrafts[msg.id] || "");

                return (
                  <tr
                    key={msg.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                      msg.isRead ? "opacity-70" : "font-medium"
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOne(msg.id)}
                        className={ADMIN_CHECKBOX}
                      />
                    </td>
                    <td className="p-4">
                      <div className="space-y-3">
                        <AdminStatusBadge
                          label={getStatusMeta(msg.status).label}
                          tone={getStatusMeta(msg.status).tone}
                          icon={msg.isRead ? <MailOpen className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                        />
                        <select
                          value={msg.status}
                          onChange={(e) => handleUpdateStatus(msg.id, e.target.value)}
                          disabled={loading === `status-${msg.id}` || loading === "bulk-read" || loading === "bulk-delete"}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-[#F05A22] disabled:opacity-60"
                          title={dict.messages.updateStatus}
                        >
                          <option value="new">{dict.messages.statusNew}</option>
                          <option value="in_progress">{dict.messages.statusInProgress}</option>
                          <option value="quoted">{dict.messages.statusQuoted}</option>
                          <option value="won">{dict.messages.statusWon}</option>
                          <option value="lost">{dict.messages.statusLost}</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900">{msg.name}</div>
                      <div className="text-xs text-gray-500">{msg.email}</div>
                      {msg.phone && <div className="text-xs text-gray-500 mt-1">{dict.messages.tel}: {msg.phone}</div>}
                      {msg.company && <div className="text-xs text-gray-500">{dict.messages.company}: {msg.company}</div>}
                    </td>
                    <td className="p-4 max-w-[260px]">
                      <div className="space-y-2 text-xs text-gray-600">
                        {msg.productName ? (
                          <div><span className="font-semibold text-gray-700">{dict.messages.product}:</span> {msg.productName}</div>
                        ) : (
                          <div className="text-gray-400">{dict.messages.noRfq}</div>
                        )}
                        {msg.inquiryType && <div><span className="font-semibold text-gray-700">{dict.messages.inquiryType}:</span> {msg.inquiryType}</div>}
                        {msg.quantity && <div><span className="font-semibold text-gray-700">{dict.messages.quantity}:</span> {msg.quantity}</div>}
                        {msg.material && <div><span className="font-semibold text-gray-700">{dict.messages.material}:</span> {msg.material}</div>}
                        {msg.application && <div><span className="font-semibold text-gray-700">{dict.messages.application}:</span> {msg.application}</div>}
                        {msg.targetMarket && <div><span className="font-semibold text-gray-700">{dict.messages.targetMarket}:</span> {msg.targetMarket}</div>}
                        {msg.sourcePage && <div className="truncate"><span className="font-semibold text-gray-700">{dict.messages.sourcePage}:</span> {msg.sourcePage}</div>}
                      </div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <AdminExcerptCell value={msg.content} />
                    </td>
                    <td className="p-4 min-w-[250px]">
                      <div className={`space-y-2 ${followUpMeta.wrapperClassName}`}>
                        <input
                          type="text"
                          value={ownerDrafts[msg.id] || ""}
                          onChange={(e) =>
                            setOwnerDrafts((current) => ({
                              ...current,
                              [msg.id]: e.target.value,
                            }))
                          }
                          placeholder={dict.messages.assignedToPlaceholder}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22]"
                        />
                        <input
                          type="datetime-local"
                          value={followUpDrafts[msg.id] || ""}
                          onChange={(e) =>
                            setFollowUpDrafts((current) => ({
                              ...current,
                              [msg.id]: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22]"
                        />
                        <div className="flex items-center justify-between gap-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${followUpMeta.className}`}>
                            {followUpMeta.label}
                          </span>
                          {followUpDrafts[msg.id] ? (
                            <span className="text-[11px] text-gray-500">
                              {new Date(followUpDrafts[msg.id]).toLocaleString()}
                            </span>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveAssignment(msg.id)}
                          disabled={loading === `assignment-${msg.id}` || loading === "bulk-read" || loading === "bulk-delete"}
                          className="inline-flex items-center justify-center rounded-lg bg-[#F05A22] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#D44A18] disabled:opacity-60"
                        >
                          {dict.messages.saveAssignment}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 min-w-[260px]">
                      <div className="space-y-2">
                        <textarea
                          value={noteDrafts[msg.id] || ""}
                          onChange={(e) =>
                            setNoteDrafts((current) => ({
                              ...current,
                              [msg.id]: e.target.value,
                            }))
                          }
                          rows={4}
                          placeholder={dict.messages.notePlaceholder}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22] resize-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveNote(msg.id)}
                          disabled={loading === `note-${msg.id}` || loading === "bulk-read" || loading === "bulk-delete"}
                          className="inline-flex items-center justify-center rounded-lg bg-[#1E293B] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#111827] disabled:opacity-60"
                        >
                          {dict.messages.saveNote}
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <AdminDateCell value={new Date(msg.createdAt).toLocaleDateString()} className="text-sm text-gray-500" />
                    </td>
                    <td className="p-4 text-right">
                      <AdminTableActions>
                        {!msg.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(msg.id)}
                            disabled={loading === msg.id || loading === "bulk-read" || loading === "bulk-delete"}
                            className="inline-flex items-center justify-center p-2 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 hover:border-emerald-200 transition-colors shadow-sm"
                            title={dict.messages.markRead}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setDetailMessageId(msg.id)}
                          className="inline-flex items-center justify-center p-2 text-sky-600 bg-sky-50 border border-sky-100 rounded-lg hover:bg-sky-100 hover:border-sky-200 transition-colors shadow-sm"
                          title={dict.messages.viewDetails}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <AdminConfirmButton
                          onConfirm={() => handleDelete(msg.id)}
                          disabled={loading === msg.id || loading === "bulk-read" || loading === "bulk-delete"}
                          className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          armedClassName="inline-flex items-center justify-center p-2 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          title={dict.messages.delete}
                          armedTitle={dict.messages.confirmDelete}
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

      {detailMessage && (
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 backdrop-blur-[1px]">
          <button
            type="button"
            aria-label={dict.messages.closeDetails}
            className="flex-1 cursor-default"
            onClick={() => setDetailMessageId(null)}
          />
          <aside className="relative h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{dict.messages.detailTitle}</h2>
                <p className="mt-1 text-sm text-gray-500">{detailMessage.name}</p>
              </div>
              <div className="flex items-center gap-2">
                {!detailMessage.isRead && (
                  <button
                    type="button"
                    onClick={() => handleMarkAsRead(detailMessage.id)}
                    disabled={loading === detailMessage.id}
                    className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {dict.messages.markRead}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDetailMessageId(null)}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
                  title={dict.messages.closeDetails}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <section className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{dict.messages.detailContact}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.nameEmail}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.name}</p><p className="text-sm text-gray-600">{detailMessage.email}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.tel}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.phone || dict.messages.detailNotSet}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.company}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.company || dict.messages.detailNotSet}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.detailCreatedAt}</span><p className="mt-1 text-sm text-gray-900">{new Date(detailMessage.createdAt).toLocaleString()}</p></div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{dict.messages.detailRfq}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.product}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.productName || dict.messages.detailNotSet}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.inquiryType}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.inquiryType || dict.messages.detailNotSet}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.quantity}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.quantity || dict.messages.detailNotSet}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.material}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.material || dict.messages.detailNotSet}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.application}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.application || dict.messages.detailNotSet}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">{dict.messages.targetMarket}</span><p className="mt-1 text-sm text-gray-900">{detailMessage.targetMarket || dict.messages.detailNotSet}</p></div>
                  <div className="sm:col-span-2"><span className="text-xs font-semibold text-gray-500">{dict.messages.sourcePage}</span><p className="mt-1 break-all text-sm text-gray-900">{detailMessage.sourcePage || dict.messages.detailNotSet}</p></div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{dict.messages.detailFollowUp}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <span className="text-xs font-semibold text-gray-500">{dict.messages.workflowStatus}</span>
                    <select
                      value={detailMessage.status}
                      onChange={(e) => handleUpdateStatus(detailMessage.id, e.target.value)}
                      disabled={loading === `status-${detailMessage.id}`}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22] disabled:opacity-60"
                    >
                      <option value="new">{dict.messages.statusNew}</option>
                      <option value="in_progress">{dict.messages.statusInProgress}</option>
                      <option value="quoted">{dict.messages.statusQuoted}</option>
                      <option value="won">{dict.messages.statusWon}</option>
                      <option value="lost">{dict.messages.statusLost}</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500">{dict.messages.assignedTo}</span>
                    <input
                      type="text"
                      value={ownerDrafts[detailMessage.id] || ""}
                      onChange={(e) =>
                        setOwnerDrafts((current) => ({
                          ...current,
                          [detailMessage.id]: e.target.value,
                        }))
                      }
                      placeholder={dict.messages.assignedToPlaceholder}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22]"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500">{dict.messages.followUpAt}</span>
                    <input
                      type="datetime-local"
                      value={followUpDrafts[detailMessage.id] || ""}
                      onChange={(e) =>
                        setFollowUpDrafts((current) => ({
                          ...current,
                          [detailMessage.id]: e.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22]"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => handleSaveAssignment(detailMessage.id)}
                      disabled={loading === `assignment-${detailMessage.id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-[#F05A22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#D44A18] disabled:opacity-60"
                    >
                      {dict.messages.saveAssignment}
                    </button>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs font-semibold text-gray-500">{dict.messages.internalNote}</span>
                    <textarea
                      value={noteDrafts[detailMessage.id] || ""}
                      onChange={(e) =>
                        setNoteDrafts((current) => ({
                          ...current,
                          [detailMessage.id]: e.target.value,
                        }))
                      }
                      rows={5}
                      placeholder={dict.messages.notePlaceholder}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#F05A22] resize-none"
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleSaveNote(detailMessage.id)}
                        disabled={loading === `note-${detailMessage.id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-[#1E293B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#111827] disabled:opacity-60"
                      >
                        {dict.messages.saveNote}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{dict.messages.detailMessage}</h3>
                <div className="rounded-xl bg-gray-50 px-4 py-4 text-sm leading-7 text-gray-700 whitespace-pre-wrap">
                  {detailMessage.content || dict.messages.detailNotSet}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{dict.messages.detailLogs}</h3>
                <div className="space-y-3">
                  {detailMessage.logs && detailMessage.logs.length > 0 ? (
                    detailMessage.logs.map((log) => (
                      <div key={log.id} className="rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="text-sm font-semibold text-gray-900">{getLogActionLabel(log.action)}</div>
                          <div className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">{log.actor}</div>
                        {log.details ? (
                          <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{log.details}</div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl bg-gray-50 px-4 py-4 text-sm text-gray-500">
                      {dict.messages.detailNoLogs}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
