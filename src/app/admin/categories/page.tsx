import prisma from "@/lib/prisma";
import CategoriesClient from "./CategoriesClient";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminFlashToast from "../AdminFlashToast";
import AdminPagination from "../AdminPagination";

export const metadata = {
  title: "Admin - Categories",
};
const PAGE_SIZE = 10;
const formatSummary = (template: string, page: number, totalPages: number) =>
  template.replace("{current}", String(page)).replace("{total}", String(totalPages));

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; success?: string; page?: string; sort?: string }>;
}) {
  const { dict } = await getAdminDictionary();
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const success = params.success?.trim() || "";
  const sort = params.sort?.trim() || "newest";
  const page = Math.max(1, Number(params.page) || 1);
  const where = q
    ? {
        OR: [{ name: { contains: q } }, { description: { contains: q } }],
      }
    : undefined;
  const orderBy =
    sort === "oldest"
      ? { createdAt: "asc" as const }
      : sort === "name_asc"
        ? { name: "asc" as const }
        : sort === "products_desc"
          ? { products: { _count: "desc" as const } }
          : { createdAt: "desc" as const };

  const [totalCount, categories] = await Promise.all([
    prisma.category.count({ where }),
    prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
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
            ? dict.categories.toast.created
            : success === "updated"
              ? dict.categories.toast.updated
              : undefined
        }
      />
      <CategoriesClient
        categories={categories}
        filters={{ q, sort }}
        labels={dict.categories.filters}
      />
      <div className="px-8 pb-8">
        <AdminPagination
          basePath="/admin/categories"
          page={page}
          totalPages={totalPages}
          params={{ q, sort }}
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
