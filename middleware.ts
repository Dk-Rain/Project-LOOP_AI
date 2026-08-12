import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protected application routes
  const protectedRoutes = ["/dashboard", "/inbox", "/ask", "/trends", "/reports", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Authentication routes
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if token is missing
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (isAuthRoute) {
    if (token) {
      // Redirect to dashboard if user is already logged in
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inbox/:path*",
    "/ask/:path*",
    "/trends/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};
