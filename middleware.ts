import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for session token in cookies
  const sessionToken = request.cookies.get("better-auth.session_token");

  //* User is not authenticated at all
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if session exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};