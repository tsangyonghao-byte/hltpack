import prisma from "@/lib/prisma";
import BannersClient from "./BannersClient";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminFlashToast from "../AdminFlashToast";
import AdminPagination from "../AdminPagination";

export const metadata = {
  title: "Admin - Banners",
};
const PAGE_SIZE = 10;
const formatSummary = (template: string, page: number, totalPages: number) =>
  template.replace("{current}", String(page)).replace("{total}", String(totalPages));

export default async function AdminBannersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; success?: string; page?: string; sort?: string }>;
}) {
  const { dict } = await getAdminDictionary();
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const status = params.status?.trim() || "";
  const success = params.success?.trim() || "";
  const sort = params.sort?.trim() || "order_asc";
  const page = Math.max(1, Number(params.page) || 1);
  const where = {
    ...(q
      ? {
          OR: [{ title: { contains: q } }, { subtitle: { contains: q } }],
        }
      : {}),
    ...(status === "active"
      ? { isActive: true }
      : status === "inactive"
        ? { isActive: false }
        : {}),
  };
  const orderBy =
    sort === "order_desc"
      ? { order: "desc" as const }
      : sort === "newest"
        ? { createdAt: "desc" as const }
        : sort === "active_first"
          ? [{ isActive: "desc" as const }, { order: "asc" as const }]
          : { order: "asc" as const };

  const [totalCount, banners] = await Promise.all([
    prisma.banner.count({ where }),
    prisma.banner.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <>
      <AdminFlashToast
        message={
          success === "created"
            ? dict.banners.toast.created
            : success === "updated"
              ? dict.banners.toast.updated
              : undefined
        }
      />
      <BannersClient
        banners={banners}
        filters={{ q, status, sort }}
        labels={dict.banners.filters}
      />
      <div className="px-8 pb-8">
        <AdminPagination
          basePath="/admin/banners"
          page={page}
          totalPages={totalPages}
          params={{ q, status, sort }}
          labels={{
            previous: dict.common.pagination.previous,
            next: dict.common.pagination.next,
            summary: formatSummary(dict.common.pagination.summary, page, totalPages),
          }}
        />
      </div>
    </>
  );
}
