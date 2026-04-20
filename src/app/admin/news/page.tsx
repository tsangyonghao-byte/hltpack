import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminFlashToast from "../AdminFlashToast";
import AdminPagination from "../AdminPagination";
import NewsTableClient from "./NewsTableClient";
import AdminFilterForm from "../AdminFilterForm";
import { ADMIN_ADD_BUTTON } from "../adminUi";
import AdminPageHeader from "../AdminPageHeader";
import { AdminFilterSearchInput, AdminFilterSelect } from "../AdminFilterFields";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 10;
const formatSummary = (template: string, page: number, totalPages: number) =>
  template.replace("{current}", String(page)).replace("{total}", String(totalPages));

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; success?: string; page?: string; sort?: string }>;
}) {
  const { dict } = await getAdminDictionary();
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const category = params.category?.trim() || "";
  const success = params.success?.trim() || "";
  const sort = params.sort?.trim() || "newest";
  const page = Math.max(1, Number(params.page) || 1);
  const categoryRows = await prisma.news.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });
  const where = {
    ...(q
      ? {
          OR: [{ title: { contains: q } }, { summary: { contains: q } }],
        }
      : {}),
    ...(category ? { category } : {}),
  };
  const orderBy =
    sort === "oldest"
      ? { createdAt: "asc" as const }
      : sort === "title_asc"
        ? { title: "asc" as const }
        : sort === "category_asc"
          ? { category: "asc" as const }
          : { createdAt: "desc" as const };

  const [totalCount, newsItems] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="p-8">
      <AdminFlashToast
        message={
          success === "created"
            ? dict.news.toast.created
            : success === "updated"
              ? dict.news.toast.updated
              : undefined
        }
      />
      <AdminPageHeader
        title={dict.news.title}
        actions={
          <Link href="/admin/news/new" className={ADMIN_ADD_BUTTON}>
            <Plus className="w-5 h-5" />
            {dict.news.add}
          </Link>
        }
      />

      <AdminFilterForm
        gridClassName="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_180px_auto_auto]"
        submitLabel={dict.news.filters.search}
        resetLabel={dict.news.filters.reset}
        resetHref="/admin/news"
      >
          <AdminFilterSearchInput
            type="text"
            name="q"
            defaultValue={q}
            placeholder={dict.news.filters.searchPlaceholder}
            className="focus:border-green-600"
          />
          <AdminFilterSelect
            name="category"
            defaultValue={category}
            className="focus:border-green-600"
          >
            <option value="">{dict.news.filters.categoryAll}</option>
            {categoryRows.map((item) => (
              <option key={item.category} value={item.category}>
                {item.category}
              </option>
            ))}
          </AdminFilterSelect>
          <AdminFilterSelect
            name="sort"
            defaultValue={sort}
            className="focus:border-green-600"
          >
            <option value="newest">{dict.news.filters.sortNewest}</option>
            <option value="oldest">{dict.news.filters.sortOldest}</option>
            <option value="title_asc">{dict.news.filters.sortTitleAsc}</option>
            <option value="category_asc">{dict.news.filters.sortCategoryAsc}</option>
          </AdminFilterSelect>
      </AdminFilterForm>

      <NewsTableClient newsItems={newsItems} />

      <AdminPagination
        basePath="/admin/news"
        page={page}
        totalPages={totalPages}
        params={{ q, category, sort }}
        labels={{
          previous: dict.common.pagination.previous,
          next: dict.common.pagination.next,
          summary: formatSummary(dict.common.pagination.summary, page, totalPages),
        }}
      />
    </div>
  );
}
