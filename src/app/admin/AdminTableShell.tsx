import { ReactNode } from "react";
import { ADMIN_TABLE_CARD } from "./adminUi";

export default function AdminTableShell({
  children,
  className = ADMIN_TABLE_CARD,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
