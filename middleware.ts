import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies?.get("token")?.value;

  if (!token) {
    throw new Error(" token invalid ");
  }

  const url = request.nextUrl.pathname;

  if (token && (url.startsWith("/login") || url.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!token && url.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/home", "/upload"],
};
