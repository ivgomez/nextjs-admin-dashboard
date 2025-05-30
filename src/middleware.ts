import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  // Redirect to login if accessing protected route without session
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to dashboard if accessing auth pages with session
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
