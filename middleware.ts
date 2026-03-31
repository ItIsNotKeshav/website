import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter (best-effort in serverless — use Upstash Redis for production scale)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - entry.count,
    resetAt: entry.resetAt,
  };
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply rate limiting to the waitlist API route
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip = getIp(request);
    const { allowed, remaining, resetAt } = checkRateLimit(ip);

    response.headers.set("X-RateLimit-Limit", String(RATE_LIMIT_MAX));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set(
      "X-RateLimit-Reset",
      String(Math.ceil(resetAt / 1000))
    );

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          },
        }
      );
    }
  }

  // Block suspicious user agents / scanners
  const userAgent = request.headers.get("user-agent") || "";
  const blockedAgents = ["sqlmap", "nikto", "masscan", "zgrab", "dirbuster"];
  if (blockedAgents.some((a) => userAgent.toLowerCase().includes(a))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
