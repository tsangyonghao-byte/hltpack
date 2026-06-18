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
} from "lucide-react";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminEmptyState from "./AdminEmptyState";
import {
  AdminDashboardQuickLink,
  AdminDashboardSectionCard,
  AdminDashboardStatCard,
} from "./AdminDashboardCards";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { dict, locale } = await getAdminDictionary();
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
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
  ]);

  // Aggregate weekly message counts and product metrics
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  }).reverse();

  const dayStart = new Date(last7Days[0].getFullYear(), last7Days[0].getMonth(), last7Days[0].getDate());

  const [weeklyMessages, allMessagesProductNames] = await Promise.all([
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

  const dailyCounts = last7Days.map(date => {
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    const dayStartStr = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const dayEndStr = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
    
    const count = weeklyMessages.filter(msg => {
      const t = new Date(msg.createdAt).getTime();
      return t >= dayStartStr && t < dayEndStr;
    }).length;

    return { label: dateStr, count };
  });

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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">{dict.dashboard.title}</h1>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{dict.dashboard.overview}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {statCards.map((card) => {
            return (
              <AdminDashboardStatCard key={card.title} {...card} />
            );
          })}
        </div>
      </section>

      {/* Visual Analytics Section */}
      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminDashboardSectionCard title={dict.dashboard.inquiryTrend}>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col justify-end h-64">
            {(() => {
              const maxCount = Math.max(...dailyCounts.map(d => d.count), 1);
              return (
                <div className="relative w-full h-full flex flex-col justify-end">
                  <div className="flex-grow flex items-end justify-between px-2 pb-6 relative h-40">
                    {/* Horizontal grid lines */}
                    <div className="absolute inset-x-0 bottom-6 border-b border-gray-100 w-full" />
                    <div className="absolute inset-x-0 bottom-20 border-b border-gray-100 w-full" />
                    <div className="absolute inset-x-0 bottom-32 border-b border-gray-100 w-full" />
                    
                    {dailyCounts.map((d, index) => {
                      const pctHeight = (d.count / maxCount) * 100;
                      return (
                        <div key={index} className="flex flex-col items-center flex-1 group z-10">
                          {/* Count text displayed on hover */}
                          <span className="text-[10px] font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-gray-800 text-white px-1.5 py-0.5 rounded shadow-sm">
                            {d.count}
                          </span>
                          
                          {/* Animated Bar */}
                          <div 
                            className="w-8 bg-[#F05A22] rounded-t transition-all duration-500 ease-out group-hover:bg-[#D44A18]"
                            style={{ height: `${Math.max(pctHeight * 1.2, 4)}px`, maxHeight: '120px' }}
                          />
                          
                          {/* Date Label */}
                          <span className="text-[10px] text-gray-400 mt-2 font-medium group-hover:text-gray-700 transition-colors">
                            {d.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
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

      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <AdminDashboardSectionCard title={dict.dashboard.quickActions}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <AdminDashboardQuickLink
              href="/admin/products/new"
              label={dict.dashboard.addProduct}
              icon={Plus}
              className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700 transition hover:bg-blue-100"
            />
            <AdminDashboardQuickLink
              href="/admin/news/new"
              label={dict.dashboard.addNews}
              icon={Plus}
              className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 transition hover:bg-green-100"
            />
            <AdminDashboardQuickLink
              href="/admin/banners/new"
              label={dict.dashboard.addBanner}
              icon={Plus}
              className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700 transition hover:bg-amber-100"
            />
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
                <div key={message.id} className="rounded-lg border border-gray-100 px-4 py-3">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="font-medium text-gray-900">{message.name}</p>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
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

      <section className="mb-8">
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
                    className={`flex flex-col gap-3 rounded-xl border px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${
                      isOverdue ? "border-red-200 bg-red-50/50" : "border-amber-200 bg-amber-50/40"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <p className="font-medium text-gray-900">{message.name}</p>
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            isOverdue
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {isOverdue ? dict.dashboard.overdueBadge : dict.dashboard.dueTodayBadge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {message.productName || message.subject || dict.dashboard.messagesDesc}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span>{dict.dashboard.fromLabel}: {message.email}</span>
                        {message.assignedTo ? <span>{dict.dashboard.ownerLabel}: {message.assignedTo}</span> : null}
                        {message.followUpAt ? <span>{new Date(message.followUpAt).toLocaleString()}</span> : null}
                      </div>
                    </div>
                    <Link
                      href={`/admin/messages?followUp=${isOverdue ? "overdue" : "today"}&sort=due_priority`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#F05A22] hover:underline"
                    >
                      {dict.dashboard.messagesLink}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </AdminDashboardSectionCard>
      </section>

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
                className="flex flex-col gap-2 rounded-lg border border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.category} · {item.date}
                  </p>
                </div>
                <Link
                  href={`/admin/news/${item.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                >
                  {dict.dashboard.newsLink}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))
          )}
        </div>
      </AdminDashboardSectionCard>
    </div>
  );
}
