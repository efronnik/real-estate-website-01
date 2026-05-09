import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSiteIndexable } from "@/lib/site-indexable";

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  if (!isSiteIndexable()) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
