import { ReactNode } from "react";
import { ADMIN_BULK_BAR, ADMIN_CHECKBOX } from "./adminUi";

export default function AdminBulkActionBar({
  checked,
  onToggleAll,
  selectAllLabel,
  selectedLabel,
  actions,
}: {
  checked: boolean;
  onToggleAll: () => void;
  selectAllLabel: string;
  selectedLabel: string;
  actions: ReactNode;
}) {
  return (
    <div className={ADMIN_BULK_BAR}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggleAll}
            className={ADMIN_CHECKBOX}
          />
          {selectAllLabel}
        </label>
        <span className="text-sm text-gray-500">{selectedLabel}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">{actions}</div>
    </div>
  );
}
