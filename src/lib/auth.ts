import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";
import { isBlocked, recordFailure, resetAttempts } from "@/lib/rate-limit";

class RateLimited extends CredentialsSignin {
  code = "rate_limited";
}

const credsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
});

// Email na paleo bcrypt chalai, jate response time dekhe keu bujhte na pare
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

function getIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials, request) {
        const ip = getIp(request);
        if (isBlocked(ip)) throw new RateLimited();

        const parsed = credsSchema.safeParse(credentials);
        if (!parsed.success) {
          recordFailure(ip);
          return null;
        }

        const { email, password } = parsed.data;
        const admin = await db.admin.findUnique({ where: { email } });
        const ok = await bcrypt.compare(
          password,
          admin?.passwordHash ?? DUMMY_HASH
        );

        if (!admin || !ok) {
          recordFailure(ip);
          return null; // email vul na password vul, bola hobe na
        }

        resetAttempts(ip);
        return { id: admin.id, email: admin.email, name: admin.name };
      },
    }),
  ],
});