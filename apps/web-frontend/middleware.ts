import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["ar", "en"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/ai") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return;
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const prefersEn = acceptLanguage.toLowerCase().startsWith("en");
  const locale = prefersEn ? "en" : "ar";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next).*)"]
};
