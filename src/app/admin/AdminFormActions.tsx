import Link from "next/link";
import { ReactNode } from "react";

export default function AdminFormActions({
  cancelHref,
  cancelLabel,
  submitContent,
  submitDisabled,
  submitClassName = "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1E293B] px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-[#F05A22] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto",
  containerClassName = "flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end sm:gap-4",
  cancelClassName = "inline-flex w-full items-center justify-center rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-600 transition-colors hover:bg-gray-200 sm:w-auto",
}: {
  cancelHref: string;
  cancelLabel: string;
  submitContent: ReactNode;
  submitDisabled?: boolean;
  submitClassName?: string;
  containerClassName?: string;
  cancelClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      <Link href={cancelHref} className={cancelClassName}>
        {cancelLabel}
      </Link>
      <button type="submit" disabled={submitDisabled} className={submitClassName}>
        {submitContent}
      </button>
    </div>
  );
}
