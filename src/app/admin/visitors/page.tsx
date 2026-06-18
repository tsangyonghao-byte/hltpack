import prisma from "@/lib/prisma";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminPageHeader from "../AdminPageHeader";
import AdminPagination from "../AdminPagination";
import ExportCsvButton from "./ExportCsvButton";
import { Monitor, MapPin, Globe, Search, RefreshCw } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin - Visitor Logs",
};

const PAGE_SIZE = 15;

function parseUserAgent(ua: string | null): string {
  if (!ua) return "Unknown Device";
  const lower = ua.toLowerCase();
  
  if (lower.includes("micromessenger")) {
    return "WeChat App";
  }
  
  let browser = "Web Browser";
  if (lower.includes("chrome") || lower.includes("crios")) {
    browser = "Chrome";
  } else if (lower.includes("safari")) {
    browser = "Safari";
  } else if (lower.includes("firefox")) {
    browser = "Firefox";
  } else if (lower.includes("edge") || lower.includes("edg")) {
    browser = "Edge";
  } else if (lower.includes("opera") || lower.includes("opr")) {
    browser = "Opera";
  } else if (lower.includes("msie") || lower.includes("trident")) {
    browser = "IE";
  }
  
  let os = "Desktop";
  if (lower.includes("android")) {
    os = "Android";
  } else if (lower.includes("iphone")) {
    os = "iPhone";
  } else if (lower.includes("ipad")) {
    os = "iPad";
  } else if (lower.includes("macintosh") || lower.includes("mac os x")) {
    os = "macOS";
  } else if (lower.includes("windows")) {
    os = "Windows";
  } else if (lower.includes("linux")) {
    os = "Linux";
  }
  
  return `${browser} (${os})`;
}

function getFlagEmoji(countryCode: string | null | undefined): string {
  if (!countryCode || countryCode === "LN") return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return "🌐";
  }
}

const formatSummary = (template: string, page: number, totalPages: number) =>
  template.replace("{current}", String(page)).replace("{total}", String(totalPages));

export default async function VisitorLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; path?: string; page?: string }>;
}) {
  const { dict, locale } = await getAdminDictionary();
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const selectedPath = params.path?.trim() || "";
  const page = Math.max(1, Number(params.page) || 1);

  const where: any = {};

  if (q) {
    where.OR = [
      { ip: { contains: q } },
      { path: { contains: q } },
      { country: { contains: q } },
    ];
  }

  if (selectedPath) {
    where.path = selectedPath;
  }

  // Get distinct visitor paths for filter dropdown
  const distinctPathsData = await prisma.visitorLog.groupBy({
    by: ["path"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    take: 15,
  });

  const [logs, totalCount] = await Promise.all([
    prisma.visitorLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.visitorLog.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const translations = (dict as any).visitors || {
    title: "Visitor Logs",
    description: "Audit website visitor logs",
    ip: "IP Address",
    path: "Path",
    country: "Location",
    userAgent: "Browser & OS",
    time: "Time",
    searchPlaceholder: "Search IP or path...",
    exportCsv: "Export CSV",
    empty: "No visitor logs found.",
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title={
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{translations.title}</h1>
            <p className="text-gray-500 mt-1 text-sm">{translations.description}</p>
          </div>
        }
        actions={<ExportCsvButton label={translations.exportCsv} />}
      />

      {/* Filter and Search Bar Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <form method="GET" className="flex flex-col md:flex-row gap-4 items-end justify-between">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder={translations.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#F05A22] focus:bg-white rounded-xl text-sm focus:outline-none transition"
              />
            </div>

            {/* Path Filter Dropdown */}
            <div>
              <select
                name="path"
                defaultValue={selectedPath}
                className="w-full px-3.5 py-2.5 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#F05A22] focus:bg-white rounded-xl text-sm focus:outline-none transition"
              >
                <option value="">{locale === "zh" ? "—— 所有访问页面 ——" : "—— All Visited Pages ——"}</option>
                {distinctPathsData.map((d) => (
                  <option key={d.path} value={d.path || "/"}>
                    {d.path || "/"} ({d._count.id} visits)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2.5 w-full md:w-auto justify-end">
            <Link
              href="/admin/visitors"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              {locale === "zh" ? "重置" : "Reset"}
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F05A22] hover:bg-[#D44A18] text-white text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              {locale === "zh" ? "筛选" : "Filter"}
            </button>
          </div>
        </form>
      </div>

      {/* Logs Table Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {translations.ip}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {translations.country}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {translations.path}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {translations.userAgent}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {translations.time}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400 font-light">
                    {translations.empty}
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const flag = getFlagEmoji(log.countryCode);
                  const isLocal = log.countryCode === "LN";
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2.5 py-1 rounded-lg">
                          {log.ip}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-lg" title={log.countryCode || "Unknown"}>{flag}</span>
                          <span className={`font-medium ${isLocal ? "text-gray-400 italic" : "text-gray-900"}`}>
                            {locale === "zh" && isLocal ? "本地局域网" : (log.country || "Unknown")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="font-mono text-xs text-gray-600 bg-slate-100 border border-gray-200/60 px-2 py-1 rounded-md break-all">
                          {log.path || "/"}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Monitor className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-medium truncate max-w-[200px]" title={log.userAgent || ""}>
                            {parseUserAgent(log.userAgent)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap text-xs text-gray-400 font-medium">
                        <div>{log.createdAt.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US")}</div>
                        <div className="text-[10px] text-gray-300 mt-0.5">
                          {log.createdAt.toLocaleTimeString(locale === "zh" ? "zh-CN" : "en-US")}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        {totalPages > 1 ? (
          <div className="px-6 pb-6 border-t border-gray-100">
            <AdminPagination
              basePath="/admin/visitors"
              page={page}
              totalPages={totalPages}
              params={{ q, path: selectedPath }}
              labels={{
                previous: dict.common.pagination.previous,
                next: dict.common.pagination.next,
                summary: formatSummary(dict.common.pagination.summary, page, totalPages),
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
