import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for verify-email route
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Check for session token in cookies (better-auth stores it there)
  const sessionToken = request.cookies.get("better-auth.session_token");

  //* User is not authenticated at all
  if (!sessionToken) {
    console.log("Middleware: No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if token exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
