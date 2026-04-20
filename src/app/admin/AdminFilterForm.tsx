import Link from "next/link";
import { ReactNode } from "react";
import {
  ADMIN_FILTER_CARD,
  ADMIN_FILTER_RESET_BUTTON,
  ADMIN_FILTER_SUBMIT_BUTTON,
} from "./adminUi";

export default function AdminFilterForm({
  children,
  gridClassName,
  submitLabel,
  resetLabel,
  resetHref,
}: {
  children: ReactNode;
  gridClassName: string;
  submitLabel: string;
  resetLabel: string;
  resetHref: string;
}) {
  return (
    <form className={ADMIN_FILTER_CARD}>
      <div className={`${gridClassName} items-stretch`}>
        {children}
        <button type="submit" className={ADMIN_FILTER_SUBMIT_BUTTON}>
          {submitLabel}
        </button>
        <Link href={resetHref} className={ADMIN_FILTER_RESET_BUTTON}>
          {resetLabel}
        </Link>
      </div>
    </form>
  );
}
