import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 }, // 8 ghonta
  providers: [], // asol provider auth.ts e
} satisfies NextAuthConfig;