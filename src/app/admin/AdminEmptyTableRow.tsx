import AdminEmptyState from "./AdminEmptyState";
import { ADMIN_EMPTY_TABLE_CELL } from "./adminUi";

export default function AdminEmptyTableRow({
  colSpan,
  message,
  description,
  actionHref,
  actionLabel,
  className = ADMIN_EMPTY_TABLE_CELL,
}: {
  colSpan: number;
  message: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className={className}>
        <AdminEmptyState
          title={message}
          description={description}
          actionHref={actionHref}
          actionLabel={actionLabel}
          className="flex flex-col items-center justify-center gap-2 py-2 text-center"
        />
      </td>
    </tr>
  );
}
