import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

function escapeCsv(value: unknown) {
  const stringValue = value == null ? "" : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";
  const status = searchParams.get("status")?.trim() || "";
  const followUp = searchParams.get("followUp")?.trim() || "";
  const sort = searchParams.get("sort")?.trim() || "newest";

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
            { assignedTo: { contains: q } },
            { internalNote: { contains: q } },
            { content: { contains: q } },
          ],
        }
      : {}),
    ...(status ? { status } : {}),
  };

  const allMessages = await prisma.message.findMany({ where });
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

  const messages = [...filteredMessages].sort((a, b) => {
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

  const headers = [
    "ID",
    "Status",
    "Is Read",
    "Name",
    "Email",
    "Phone",
    "Company",
    "Subject",
    "Inquiry Type",
    "Product ID",
    "Product Name",
    "Bag Type",
    "Material",
    "Quantity",
    "Application",
    "Target Market",
    "Source Page",
    "Assigned To",
    "Follow Up At",
    "Internal Note",
    "Content",
    "Created At",
  ];

  const rows = messages.map((msg) =>
    [
      msg.id,
      msg.status,
      msg.isRead ? "Yes" : "No",
      msg.name,
      msg.email,
      msg.phone,
      msg.company,
      msg.subject,
      msg.inquiryType,
      msg.productId,
      msg.productName,
      msg.bagType,
      msg.material,
      msg.quantity,
      msg.application,
      msg.targetMarket,
      msg.sourcePage,
      msg.assignedTo,
      msg.followUpAt ? msg.followUpAt.toISOString() : "",
      msg.internalNote,
      msg.content,
      msg.createdAt.toISOString(),
    ].map(escapeCsv).join(",")
  );

  const csv = [headers.map(escapeCsv).join(","), ...rows].join("\n");
  const filename = `messages-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
