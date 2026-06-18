"use server";

import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/adminAuth";

export async function getVisitorLogs(params: {
  page?: number;
  limit?: number;
  search?: string;
  path?: string;
}) {
  await requireAdminSession();

  const page = params.page || 1;
  const limit = params.limit || 50;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (params.search) {
    const s = params.search.trim();
    where.OR = [
      { ip: { contains: s } },
      { path: { contains: s } },
      { country: { contains: s } },
    ];
  }

  if (params.path) {
    where.path = params.path;
  }

  const [logs, total] = await Promise.all([
    prisma.visitorLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.visitorLog.count({ where }),
  ]);

  return {
    logs,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function exportVisitorLogsCsv() {
  await requireAdminSession();

  const logs = await prisma.visitorLog.findMany({
    orderBy: { createdAt: "desc" },
  });

  // CSV Headers
  let csv = "ID,IP Address,Country,Country Code,Path,User Agent,Date,Time\n";

  for (const log of logs) {
    const dateStr = log.createdAt.toLocaleDateString("en-US");
    const timeStr = log.createdAt.toLocaleTimeString("en-US");

    // Escape fields for CSV safely
    const cleanIp = (log.ip || "").replace(/"/g, '""');
    const cleanCountry = (log.country || "").replace(/"/g, '""');
    const cleanCountryCode = (log.countryCode || "").replace(/"/g, '""');
    const cleanPath = (log.path || "").replace(/"/g, '""');
    const cleanUA = (log.userAgent || "").replace(/"/g, '""');

    csv += `"${log.id}","${cleanIp}","${cleanCountry}","${cleanCountryCode}","${cleanPath}","${cleanUA}","${dateStr}","${timeStr}"\n`;
  }

  return csv;
}
