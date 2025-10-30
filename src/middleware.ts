import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userEmail = request.cookies.get("userEmail")?.value;

  if (!userEmail) {
    // If the user is not authenticated, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - login (the login page itself)
   * - (marketing) (public marketing pages)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|.*\\..*).*)",
    "/(protected)/:path*",
  ],
};
