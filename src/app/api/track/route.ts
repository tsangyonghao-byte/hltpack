import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body.path || "/";

    // Extract visitor IP address
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const ip = xForwardedFor 
      ? xForwardedFor.split(",")[0].trim() 
      : req.headers.get("x-real-ip") || "127.0.0.1";

    const userAgent = req.headers.get("user-agent") || "Unknown Device";

    // Insert visitor record in DB
    await prisma.visitorLog.create({
      data: {
        ip,
        userAgent,
        path,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to track visitor log:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
