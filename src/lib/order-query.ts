import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";

export const PAGE_SIZE = 20;
const DHAKA_OFFSET_MS = 6 * 60 * 60 * 1000;

const dateStr = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .catch(undefined);

const searchSchema = z.object({
  q: z.string().trim().max(100).catch(""),
  status: z
    .enum(["NEW", "CONFIRMED", "PROCESSING", "COMPLETED", "CANCELLED"])
    .optional()
    .catch(undefined),
  payment: z
    .enum(["UNPAID", "PAID", "FAILED", "REFUNDED"])
    .optional()
    .catch(undefined),
  from: dateStr,
  to: dateStr,
  page: z.coerce.number().int().min(1).max(100000).catch(1),
});

export type OrderSearch = z.infer<typeof searchSchema>;

type RawParams = Record<string, string | string[] | undefined>;

export function parseOrderSearch(raw: RawParams): OrderSearch {
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const parsed = searchSchema.parse({
    q: first(raw.q),
    status: first(raw.status),
    payment: first(raw.payment),
    from: first(raw.from),
    to: first(raw.to),
    page: first(raw.page),
  });

  // from > to hole ulte dao
  if (parsed.from && parsed.to && parsed.from > parsed.to) {
    return { ...parsed, from: parsed.to, to: parsed.from };
  }
  return parsed;
}

// "2026-10-26" (Dhaka din) er shuru, UTC Date hishebe
function dhakaDayStart(day: string, addDays = 0) {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + addDays) - DHAKA_OFFSET_MS);
}

export function buildOrderWhere(s: OrderSearch): Prisma.OrderWhereInput {
  const where: Prisma.OrderWhereInput = {};

  if (s.q) {
    where.OR = [
      { orderNumber: { contains: s.q, mode: "insensitive" } },
      { customerName: { contains: s.q, mode: "insensitive" } },
      { email: { contains: s.q, mode: "insensitive" } },
      { phone: { contains: s.q, mode: "insensitive" } },
    ];
  }
  if (s.status) where.status = s.status;
  if (s.payment) where.paymentStatus = s.payment;

  if (s.from || s.to) {
    where.createdAt = {
      ...(s.from && { gte: dhakaDayStart(s.from) }),
      ...(s.to && { lt: dhakaDayStart(s.to, 1) }), // "to" din shoho
    };
  }
  return where;
}

// Pagination link e jabe, shudhu filter gulo
export function activeFilters(s: OrderSearch): Record<string, string> {
  const out: Record<string, string> = {};
  if (s.q) out.q = s.q;
  if (s.status) out.status = s.status;
  if (s.payment) out.payment = s.payment;
  if (s.from) out.from = s.from;
  if (s.to) out.to = s.to;
  return out;
}