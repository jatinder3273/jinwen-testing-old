import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN_STORAGE_KEY, USER_ROLE_KEY } from "./utils/constants";

// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_STORAGE_KEY)?.value;
  const userRole = Number(request.cookies.get(USER_ROLE_KEY)?.value);
  const pathname = request.nextUrl.pathname;
  if (token) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (userRole === 1 && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (userRole === 2 && !pathname.startsWith("/investor")) {
      return NextResponse.redirect(new URL("/investor/dashboard", request.url));
    }
  }
  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/investor/:path*"],
};
