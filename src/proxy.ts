import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const loggedIn = !!req.auth;
  const isLoginPage = pathname === "/admin/login";

  // Logged in obosthay login page e gele /admin e pathao
  if (isLoginPage && loggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  // Logged out obosthay baki admin page e gele login e pathao
  if (!isLoginPage && !loggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};