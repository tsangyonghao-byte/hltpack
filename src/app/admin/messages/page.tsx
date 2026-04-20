import prisma from "@/lib/prisma";
import MessagesClient from "./MessagesClient";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";
import AdminPagination from "../AdminPagination";

export const metadata = {
  title: "Admin - Messages",
};
const PAGE_SIZE = 10;
const formatSummary = (template: string, page: number, totalPages: number) =>
  template.replace("{current}", String(page)).replace("{total}", String(totalPages));

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; followUp?: string; page?: string; sort?: string }>;
}) {
  const { dict } = await getAdminDictionary();
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const status = params.status?.trim() || "";
  const followUp = params.followUp?.trim() || "";
  const sort = params.sort?.trim() || "newest";
  const page = Math.max(1, Number(params.page) || 1);
  const where = {
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { company: { contains: q } },
            { phone: { contains: q } },
            { subject: { contains: q } },
            { inquiryType: { contains: q } },
            { productName: { contains: q } },
            { bagType: { contains: q } },
            { material: { contains: q } },
            { quantity: { contains: q } },
            { application: { contains: q } },
            { targetMarket: { contains: q } },
            { sourcePage: { contains: q } },
            { content: { contains: q } },
          ],
        }
      : {}),
    ...(status ? { status } : {}),
  };

  const allMessages = await prisma.message.findMany({
    where,
    include: {
      logs: {
        orderBy: { createdAt: "desc" },
        take: 8,
      },
    },
  });
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const filteredMessages = allMessages.filter((msg) => {
    if (!followUp) return true;
    if (followUp === "none") return !msg.followUpAt;
    if (!msg.followUpAt) return false;
    const date = new Date(msg.followUpAt);
    if (followUp === "overdue") return date < now;
    if (followUp === "today") return date >= startOfToday && date < startOfTomorrow;
    if (followUp === "upcoming") return date >= startOfTomorrow;
    return true;
  });

  const getPriorityRank = (dateValue: Date | null) => {
    if (!dateValue) return 3;
    const date = new Date(dateValue);
    if (date < now) return 0;
    if (date >= startOfToday && date < startOfTomorrow) return 1;
    return 2;
  };

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sort === "oldest") return +new Date(a.createdAt) - +new Date(b.createdAt);
    if (sort === "unread_first") {
      if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    }
    if (sort === "name_asc") return a.name.localeCompare(b.name);
    if (sort === "due_priority") {
      const rankDiff = getPriorityRank(a.followUpAt) - getPriorityRank(b.followUpAt);
      if (rankDiff !== 0) return rankDiff;
      if (a.followUpAt && b.followUpAt) return +new Date(a.followUpAt) - +new Date(b.followUpAt);
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    }
    return +new Date(b.createdAt) - +new Date(a.createdAt);
  });

  const totalCount = sortedMessages.length;
  const messages = sortedMessages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const exportParams = new URLSearchParams();
  if (q) exportParams.set("q", q);
  if (status) exportParams.set("status", status);
  if (followUp) exportParams.set("followUp", followUp);
  if (sort) exportParams.set("sort", sort);
  const exportHref = `/admin/messages/export${exportParams.toString() ? `?${exportParams.toString()}` : ""}`;

  return (
    <>
      <MessagesClient
        messages={messages}
        filters={{ q, status, followUp, sort }}
        labels={dict.messages.filters}
        exportHref={exportHref}
      />
      <div className="px-8 pb-8">
        <AdminPagination
          basePath="/admin/messages"
          page={page}
          totalPages={totalPages}
          params={{ q, status, followUp, sort }}
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
