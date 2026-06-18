import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Package,
  FileText,
  Layers,
  Image as ImageIcon,
  MessageSquare,
  AlertTriangle,
  CalendarClock,
  Plus,
  ArrowRight,
  Eye,
  Users,
  Globe,
  Activity,
  TrendingUp,
  Monitor,
} from "lucide-react";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminEmptyState from "./AdminEmptyState";
import {
  AdminDashboardQuickLink,
  AdminDashboardSectionCard,
  AdminDashboardStatCard,
} from "./AdminDashboardCards";

export const dynamic = "force-dynamic";

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

export default async function AdminDashboard() {
  const { dict, locale } = await getAdminDictionary();
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  }).reverse();

  const dayStart = new Date(last7Days[0].getFullYear(), last7Days[0].getMonth(), last7Days[0].getDate());

  const [
    productsCount,
    newsCount,
    categoriesCount,
    bannersCount,
    messagesCount,
    unreadMessagesCount,
    overdueMessagesCount,
    dueTodayMessagesCount,
    recentMessages,
    followUpQueue,
    recentNews,
    totalPv,
    todayPv,
    totalUvs,
    todayUvs,
    recentVisitors,
    weeklyVisitorLogs,
    weeklyMessages,
    allMessagesProductNames,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.news.count(),
    prisma.category.count(),
    prisma.banner.count(),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.message.count({
      where: {
        followUpAt: { lt: now },
      },
    }),
    prisma.message.count({
      where: {
        followUpAt: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.message.findMany({
      where: {
        OR: [
          { followUpAt: { lt: now } },
          {
            followUpAt: {
              gte: startOfToday,
              lt: startOfTomorrow,
            },
          },
        ],
      },
      orderBy: { followUpAt: "asc" },
      take: 6,
    }),
    prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        category: true,
        date: true,
      },
    }),
    prisma.visitorLog.count(),
    prisma.visitorLog.count({
      where: {
        createdAt: { gte: startOfToday },
      },
    }),
    prisma.visitorLog.groupBy({
      by: ["ip"],
    }),
    prisma.visitorLog.groupBy({
      by: ["ip"],
      where: {
        createdAt: { gte: startOfToday },
      },
    }),
    prisma.visitorLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.visitorLog.findMany({
      where: {
        createdAt: { gte: dayStart },
      },
      select: {
        createdAt: true,
        ip: true,
      },
    }),
    prisma.message.findMany({
      where: {
        createdAt: { gte: dayStart },
      },
      select: {
        createdAt: true,
      },
    }),
    prisma.message.findMany({
      select: {
        productName: true,
      },
    }),
  ]);

  const totalUv = totalUvs.length;
  const todayUv = todayUvs.length;

  const dailyCounts = last7Days.map(date => {
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    const dayStartStr = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const dayEndStr = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
    
    const count = weeklyMessages.filter(msg => {
      const t = new Date(msg.createdAt).getTime();
      return t >= dayStartStr && t < dayEndStr;
    }).length;

    const dayLogs = weeklyVisitorLogs.filter(log => {
      const t = new Date(log.createdAt).getTime();
      return t >= dayStartStr && t < dayEndStr;
    });

    const pvCount = dayLogs.length;
    const uvCount = new Set(dayLogs.map(log => log.ip)).size;

    return { label: dateStr, count, pvCount, uvCount };
  });

  const maxCount = Math.max(...dailyCounts.map(d => d.count), 1);
  const maxUv = Math.max(...dailyCounts.map(d => d.uvCount), 1);

  const productCountsMap: Record<string, number> = {};
  allMessagesProductNames.forEach(msg => {
    const name = msg.productName || (locale === "zh" ? "网站留言 / 其他" : "General Inquiry / Other");
    productCountsMap[name] = (productCountsMap[name] || 0) + 1;
  });

  const sortedProducts = Object.entries(productCountsMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const statCards = [
    {
      title: dict.dashboard.productsTitle,
      description: dict.dashboard.productsDesc,
      value: productsCount,
      href: "/admin/products",
      linkText: dict.dashboard.productsLink,
      icon: Package,
      accent: "blue",
    },
    {
      title: dict.dashboard.newsTitle,
      description: dict.dashboard.newsDesc,
      value: newsCount,
      href: "/admin/news",
      linkText: dict.dashboard.newsLink,
      icon: FileText,
      accent: "green",
    },
    {
      title: dict.dashboard.categoriesTitle,
      description: dict.dashboard.categoriesDesc,
      value: categoriesCount,
      href: "/admin/categories",
      linkText: dict.dashboard.categoriesLink,
      icon: Layers,
      accent: "purple",
    },
    {
      title: dict.dashboard.bannersTitle,
      description: dict.dashboard.bannersDesc,
      value: bannersCount,
      href: "/admin/banners",
      linkText: dict.dashboard.bannersLink,
      icon: ImageIcon,
      accent: "amber",
    },
    {
      title: dict.dashboard.messagesTitle,
      description: dict.dashboard.messagesDesc,
      value: messagesCount,
      href: "/admin/messages",
      linkText: dict.dashboard.messagesLink,
      icon: MessageSquare,
      accent: "rose",
    },
    {
      title: dict.dashboard.unreadTitle,
      description: dict.dashboard.messagesDesc,
      value: unreadMessagesCount,
      href: "/admin/messages?sort=unread_first",
      linkText: dict.dashboard.messagesLink,
      icon: MessageSquare,
      accent: "slate",
    },
    {
      title: dict.dashboard.overdueTitle,
      description: dict.dashboard.overdueDesc,
      value: overdueMessagesCount,
      href: "/admin/messages?followUp=overdue&sort=due_priority",
      linkText: dict.dashboard.messagesLink,
      icon: AlertTriangle,
      accent: "rose",
    },
    {
      title: dict.dashboard.dueTodayTitle,
      description: dict.dashboard.dueTodayDesc,
      value: dueTodayMessagesCount,
      href: "/admin/messages?followUp=today&sort=due_priority",
      linkText: dict.dashboard.messagesLink,
      icon: CalendarClock,
      accent: "amber",
    },
  ] as const;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{dict.dashboard.title}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {locale === "zh"
              ? "实时数据监测与核心内容管理面板"
              : "Real-time analytics and core content administration panel"}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {locale === "zh" ? "系统监控中" : "System Monitoring Active"}
        </div>
      </div>

      {/* Premium Visitor Analytics Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          {dict.dashboard.visitorStats}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Today PV */}
          <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-[0.08]">
              <Eye className="h-24 w-24 text-indigo-600" />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{dict.dashboard.todayPV}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{todayPv}</h3>
              </div>
            </div>
          </div>

          {/* Today UV */}
          <div className="relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/40 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-[0.08]">
              <Users className="h-24 w-24 text-violet-600" />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{dict.dashboard.todayUV}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{todayUv}</h3>
              </div>
            </div>
          </div>

          {/* Total PV */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/40 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-[0.08]">
              <Globe className="h-24 w-24 text-blue-600" />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{dict.dashboard.totalPV}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{totalPv}</h3>
              </div>
            </div>
          </div>

          {/* Total UV */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-[0.08]">
              <TrendingUp className="h-24 w-24 text-emerald-600" />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{dict.dashboard.totalUV}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{totalUv}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Analytics Row */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminDashboardSectionCard 
          title={dict.dashboard.weeklyTrendTitle}
          action={
            <div className="flex items-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#F05A22]" />
                <span className="text-gray-500">{locale === "zh" ? "询盘" : "Inquiries"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                <span className="text-gray-500">UV</span>
              </div>
            </div>
          }
        >
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col justify-end h-64">
            <div className="relative w-full h-full flex flex-col justify-end">
              <div className="flex-grow flex items-end justify-between px-2 pb-6 relative h-40">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 bottom-6 border-b border-gray-100/80 w-full" />
                <div className="absolute inset-x-0 bottom-20 border-b border-gray-100/80 w-full" />
                <div className="absolute inset-x-0 bottom-32 border-b border-gray-100/80 w-full" />
                
                {dailyCounts.map((d, index) => {
                  const inquiryPct = (d.count / maxCount) * 100;
                  const uvPct = (d.uvCount / maxUv) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 group z-10">
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-12 scale-0 group-hover:scale-100 origin-bottom transition-all duration-200 bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg z-20 flex flex-col items-center whitespace-nowrap gap-0.5 pointer-events-none">
                        <span className="font-bold text-gray-300">{d.label}</span>
                        <span>{locale === "zh" ? "询盘数" : "Inquiries"}: {d.count}</span>
                        <span>UV: {d.uvCount} ({locale === "zh" ? "访问量" : "PV"}: {d.pvCount})</span>
                      </div>

                      {/* Side-by-side Columns */}
                      <div className="flex items-end justify-center gap-1 h-32 w-full">
                        {/* Inquiry Bar (Orange) */}
                        <div 
                          className="w-3 bg-[#F05A22] rounded-t transition-all duration-500 ease-out group-hover:bg-[#D44A18]"
                          style={{ height: `${Math.max(inquiryPct * 0.9, 4)}px` }}
                        />
                        {/* UV Bar (Indigo) */}
                        <div 
                          className="w-3 bg-indigo-500 rounded-t transition-all duration-500 ease-out group-hover:bg-indigo-600"
                          style={{ height: `${Math.max(uvPct * 0.9, 4)}px` }}
                        />
                      </div>
                      
                      {/* Date Label */}
                      <span className="text-[10px] text-gray-400 mt-2 font-medium group-hover:text-gray-700 transition-colors">
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AdminDashboardSectionCard>

        <AdminDashboardSectionCard title={dict.dashboard.popularProducts}>
          <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col justify-center h-64">
            <div className="space-y-4 w-full">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-400 font-light">
                  {locale === "zh" ? "暂无数据" : "No inquiry data available"}
                </div>
              ) : (
                sortedProducts.map((p, idx) => {
                  const pct = messagesCount > 0 ? Math.round((p.count / messagesCount) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-gray-700 truncate max-w-[200px]" title={p.name}>
                          {p.name}
                        </span>
                        <span className="text-[#F05A22] font-mono text-[11px] shrink-0">
                          {p.count} {dict.dashboard.inquiriesUnit} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#F05A22] h-full rounded-full transition-all duration-700" 
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </AdminDashboardSectionCard>
      </section>

      {/* Live Visitor Dynamic Feed & Messages */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <AdminDashboardSectionCard 
          title={dict.dashboard.liveActivity}
          action={
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
          }
        >
          <div className="space-y-3">
            {recentVisitors.length === 0 ? (
              <div className="text-center py-8 text-sm text-gray-400 font-light bg-gray-50 rounded-xl border border-dashed border-gray-200">
                {locale === "zh" ? "暂无访问记录" : "No visitor activity recorded yet"}
              </div>
            ) : (
              recentVisitors.map((visitor) => (
                <div key={visitor.id} className="rounded-xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-indigo-100 hover:shadow-sm">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/50">
                        {visitor.ip}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Monitor className="w-3 h-3 text-gray-400" />
                        {parseUserAgent(visitor.userAgent)}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                      {new Date(visitor.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono text-gray-600 bg-slate-50/80 px-2 py-1 rounded select-all break-all max-w-[80%] truncate border border-slate-100/50" title={visitor.path || "/"}>
                      {visitor.path || "/"}
                    </p>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {new Date(visitor.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </AdminDashboardSectionCard>

        <AdminDashboardSectionCard
          title={dict.dashboard.recentMessages}
          action={
            <Link href="/admin/messages" className="text-sm font-medium text-[#F05A22] hover:underline">
              {dict.dashboard.viewAll}
            </Link>
          }
        >
          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <AdminEmptyState
                title={dict.dashboard.emptyMessages}
                description={dict.dashboard.emptyMessagesHint}
                actionHref="/admin/messages"
                actionLabel={dict.dashboard.messagesLink}
              />
            ) : (
              recentMessages.map((message) => (
                <div key={message.id} className="rounded-xl border border-gray-100 px-4 py-3 transition-all duration-200 hover:shadow-sm hover:border-gray-200">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900 text-sm">{message.name}</p>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {dict.dashboard.fromLabel}: {message.email}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                </div>
              ))
            )}
          </div>
        </AdminDashboardSectionCard>
      </section>

      {/* Core Admin Sections & Counts */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          {dict.dashboard.overview}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {statCards.map((card) => {
            return (
              <AdminDashboardStatCard key={card.title} {...card} />
            );
          })}
        </div>
      </section>

      {/* Quick Actions & Follow Up */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <AdminDashboardSectionCard title={dict.dashboard.quickActions}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <AdminDashboardQuickLink
              href="/admin/products/new"
              label={dict.dashboard.addProduct}
              icon={Plus}
              className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3 text-blue-700 transition hover:bg-blue-100/80"
            />
            <AdminDashboardQuickLink
              href="/admin/news/new"
              label={dict.dashboard.addNews}
              icon={Plus}
              className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50/60 px-4 py-3 text-green-700 transition hover:bg-green-100/80"
            />
            <AdminDashboardQuickLink
              href="/admin/banners/new"
              label={dict.dashboard.addBanner}
              icon={Plus}
              className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-amber-700 transition hover:bg-amber-100/80"
            />
          </div>
        </AdminDashboardSectionCard>

        <AdminDashboardSectionCard
          title={dict.dashboard.followUpQueue}
          action={
            <Link href="/admin/messages?sort=due_priority" className="text-sm font-medium text-[#F05A22] hover:underline">
              {dict.dashboard.viewAll}
            </Link>
          }
        >
          <div className="space-y-3">
            {followUpQueue.length === 0 ? (
              <AdminEmptyState
                title={dict.dashboard.emptyFollowUps}
                description={dict.dashboard.emptyFollowUpsHint}
                actionHref="/admin/messages"
                actionLabel={dict.dashboard.messagesLink}
              />
            ) : (
              followUpQueue.map((message) => {
                const isOverdue = !!message.followUpAt && new Date(message.followUpAt) < now;
                return (
                  <div
                    key={message.id}
                    className={`flex flex-col gap-3 rounded-xl border px-4 py-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-200 ${
                      isOverdue ? "border-red-200 bg-red-50/50 hover:bg-red-100/30" : "border-amber-200 bg-amber-50/40 hover:bg-amber-100/30"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-gray-900 text-sm">{message.name}</p>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isOverdue
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {isOverdue ? dict.dashboard.overdueBadge : dict.dashboard.dueTodayBadge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {message.productName || message.subject || dict.dashboard.messagesDesc}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-gray-400 font-medium">
                        <span>{dict.dashboard.fromLabel}: {message.email}</span>
                        {message.assignedTo ? <span>{dict.dashboard.ownerLabel}: {message.assignedTo}</span> : null}
                        {message.followUpAt ? <span>{new Date(message.followUpAt).toLocaleString()}</span> : null}
                      </div>
                    </div>
                    <Link
                      href={`/admin/messages?followUp=${isOverdue ? "overdue" : "today"}&sort=due_priority`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#F05A22] hover:underline whitespace-nowrap"
                    >
                      {dict.dashboard.messagesLink}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </AdminDashboardSectionCard>
      </section>

      {/* Recent News Section */}
      <section>
        <AdminDashboardSectionCard
          title={dict.dashboard.recentNews}
          action={
            <Link href="/admin/news" className="text-sm font-medium text-[#F05A22] hover:underline">
              {dict.dashboard.viewAll}
            </Link>
          }
        >
          <div className="space-y-3">
            {recentNews.length === 0 ? (
              <AdminEmptyState
                title={dict.dashboard.emptyNews}
                description={dict.dashboard.emptyNewsHint}
                actionHref="/admin/news/new"
                actionLabel={dict.dashboard.addNews}
              />
            ) : (
              recentNews.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 rounded-xl border border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between transition-all duration-200 hover:shadow-sm hover:border-gray-200 bg-white"
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {item.category} · {item.date}
                    </p>
                  </div>
                  <Link
                    href={`/admin/news/${item.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline whitespace-nowrap"
                  >
                    {dict.dashboard.newsLink}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </AdminDashboardSectionCard>
      </section>
    </div>
  );
}
