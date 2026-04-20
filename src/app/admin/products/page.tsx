import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminFlashToast from "../AdminFlashToast";
import AdminPagination from "../AdminPagination";
import ProductsTableClient from "./ProductsTableClient";
import AdminFilterForm from "../AdminFilterForm";
import { ADMIN_ADD_BUTTON } from "../adminUi";
import AdminPageHeader from "../AdminPageHeader";
import { AdminFilterSearchInput, AdminFilterSelect } from "../AdminFilterFields";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 10;
const formatSummary = (template: string, page: number, totalPages: number) =>
  template.replace("{current}", String(page)).replace("{total}", String(totalPages));

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; featured?: string; success?: string; page?: string; sort?: string }>;
}) {
  const { dict } = await getAdminDictionary();
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const category = params.category?.trim() || "";
  const featured = params.featured?.trim() || "";
  const success = params.success?.trim() || "";
  const sort = params.sort?.trim() || "newest";
  const page = Math.max(1, Number(params.page) || 1);
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
  const where = {
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { category: { name: { contains: q } } },
          ],
        }
      : {}),
    ...(category ? { categoryId: category } : {}),
    ...(featured === "featured"
      ? { isFeatured: true }
      : featured === "regular"
        ? { isFeatured: false }
        : {}),
  };

  const orderBy =
    sort === "oldest"
      ? { createdAt: "asc" as const }
      : sort === "name_asc"
        ? { name: "asc" as const }
        : sort === "featured_first"
          ? [{ isFeatured: "desc" as const }, { createdAt: "desc" as const }]
          : { createdAt: "desc" as const };

  const [totalCount, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      include: {
        category: true,
      },
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
            ? dict.products.toast.created
            : success === "updated"
              ? dict.products.toast.updated
              : undefined
        }
      />
      <AdminPageHeader
        title={dict.products.title}
        actions={
          <Link href="/admin/products/new" className={ADMIN_ADD_BUTTON}>
            <Plus className="w-5 h-5" />
            {dict.products.add}
          </Link>
        }
      />

      <AdminFilterForm
        gridClassName="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_180px_180px_auto_auto]"
        submitLabel={dict.products.filters.search}
        resetLabel={dict.products.filters.reset}
        resetHref="/admin/products"
      >
          <AdminFilterSearchInput
            type="text"
            name="q"
            defaultValue={q}
            placeholder={dict.products.filters.searchPlaceholder}
          />
          <AdminFilterSelect
            name="category"
            defaultValue={category}
          >
            <option value="">{dict.products.filters.categoryAll}</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </AdminFilterSelect>
          <AdminFilterSelect
            name="featured"
            defaultValue={featured}
          >
            <option value="">{dict.products.filters.featuredAll}</option>
            <option value="featured">{dict.products.filters.featuredOnly}</option>
            <option value="regular">{dict.products.filters.nonFeaturedOnly}</option>
          </AdminFilterSelect>
          <AdminFilterSelect
            name="sort"
            defaultValue={sort}
          >
            <option value="newest">{dict.products.filters.sortNewest}</option>
            <option value="oldest">{dict.products.filters.sortOldest}</option>
            <option value="name_asc">{dict.products.filters.sortNameAsc}</option>
            <option value="featured_first">{dict.products.filters.sortFeaturedFirst}</option>
          </AdminFilterSelect>
      </AdminFilterForm>

      <ProductsTableClient products={products} />

      <AdminPagination
        basePath="/admin/products"
        page={page}
        totalPages={totalPages}
        params={{ q, category, featured, sort }}
        labels={{
          previous: dict.common.pagination.previous,
          next: dict.common.pagination.next,
          summary: formatSummary(dict.common.pagination.summary, page, totalPages),
        }}
      />
    </div>
  );
}
