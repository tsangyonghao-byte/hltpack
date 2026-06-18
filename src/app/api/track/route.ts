import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return true;
  if (ip.startsWith("172.")) {
    const parts = ip.split(".");
    if (parts.length >= 2) {
      const second = parseInt(parts[1], 10);
      if (second >= 16 && second <= 31) return true;
    }
  }
  if (ip.startsWith("fe80:")) return true;
  return false;
}

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

    let country = null;
    let countryCode = null;

    if (isPrivateIp(ip)) {
      country = "Local Network";
      countryCode = "LN";
    } else {
      // Check if we already resolved this IP in the past to prevent hitting external API
      try {
        const lastLog = await prisma.visitorLog.findFirst({
          where: {
            ip,
            country: { not: null },
          },
          orderBy: { createdAt: "desc" },
        });

        if (lastLog && lastLog.country) {
          country = lastLog.country;
          countryCode = lastLog.countryCode;
        } else {
          // Fetch from a free geolocation API
          const response = await fetch(`https://freeipapi.com/api/json/${ip}`, {
            signal: AbortSignal.timeout(3000),
          });
          if (response.ok) {
            const data = await response.json();
            if (data.countryName) {
              country = data.countryName;
              countryCode = data.countryCode;
            }
          }
        }
      } catch (err: any) {
        console.warn("Failed to resolve IP location:", err.message);
      }
    }

    // Insert visitor record in DB
    await prisma.visitorLog.create({
      data: {
        ip,
        userAgent,
        path,
        country,
        countryCode,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to track visitor log:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
