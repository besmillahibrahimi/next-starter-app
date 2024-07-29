import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "@/configs/i18next/settings";

acceptLanguage.languages(languages);

export function middleware(request: NextRequest) {
  let lng;
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  // if (
  //   !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
  //   !request.nextUrl.pathname.startsWith("/_next")
  // ) {
  //   return NextResponse.redirect(
  //     new URL(`/${lng}${request.nextUrl.pathname}`, request.url)
  //   );
  // }

  // if (request.headers.has("referer")) {
  //   const refererUrl = new URL(request.headers.get("referer"));
  //   const lngInReferer = languages.find((l) =>
  //     refererUrl.pathname.startsWith(`/${l}`)
  //   );
  const response = NextResponse.next();
  //if (lngInReferer)
  response.cookies.set(cookieName, "en");
  return response;
  //}

  //return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.icosw.js|site.webmanifest).*)",
    //...PRIVATE_ROUTES
  ],
};
