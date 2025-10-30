import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userEmail = request.cookies.get("userEmail")?.value;

  // Public routes that anyone can access
  const publicRoutes = ["/", "/login", "/email-verification", "/how-it-works"];

  const isPublic = publicRoutes.includes(pathname);

  // Redirect logged-in users away from the login page
  if (pathname.startsWith("/login") && userEmail) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect all non-public routes
  if (!isPublic && !userEmail) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
