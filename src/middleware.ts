import { cookieName, fallbackLng, languages } from "@/configs/i18next/settings";
import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_ROUTES } from "./lib/http/contants";

acceptLanguage.languages(languages);

export async function middleware(request: NextRequest) {
  // const isAauth = await fetch(
  //   "http://localhost:3000/api/auth/is-authenticated"
  // );

  // const data = await isAauth.json();

  // console.log("middleware -       -  - 2222222222222", data);

  // if (request.cookies.has("session-token")) {
  //   const userToken = request.cookies.get("session-token")?.value;
  //   if (!userToken) {
  //     return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  //   } else {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

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
    ...PRIVATE_ROUTES,
  ],
};
