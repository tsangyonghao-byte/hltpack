import Link from "next/link";

function buildPageHref(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number,
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (!value || key === "page") return;
    searchParams.set(key, value);
  });

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export default function AdminPagination({
  basePath,
  page,
  totalPages,
  params,
  labels,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  params: Record<string, string | undefined>;
  labels: {
    previous: string;
    next: string;
    summary: string;
  };
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1,
  );

  const compactPages = pageNumbers.reduce<number[]>((acc, item) => {
    if (acc[acc.length - 1] !== item) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">{labels.summary}</p>

      <div className="flex items-center gap-2">
        <Link
          href={buildPageHref(basePath, params, page - 1)}
          aria-disabled={page <= 1}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            page <= 1
              ? "pointer-events-none border-gray-200 text-gray-300"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {labels.previous}
        </Link>

        <div className="flex items-center gap-2">
          {compactPages.map((item, index) => {
            const previous = compactPages[index - 1];
            const showGap = previous && item - previous > 1;

            return (
              <div key={item} className="flex items-center gap-2">
                {showGap ? <span className="px-1 text-sm text-gray-400">...</span> : null}
                <Link
                  href={buildPageHref(basePath, params, item)}
                  className={`min-w-9 rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
                    item === page
                      ? "border-[#F05A22] bg-[#F05A22] text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </Link>
              </div>
            );
          })}
        </div>

        <Link
          href={buildPageHref(basePath, params, page + 1)}
          aria-disabled={page >= totalPages}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            page >= totalPages
              ? "pointer-events-none border-gray-200 text-gray-300"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {labels.next}
        </Link>
      </div>
    </div>
  );
}
