"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export type ActionResult = { ok: true } | { ok: false; error: string };

const idSchema = z.string().trim().min(1).max(50);

const statusSchema = z.object({
  id: idSchema,
  status: z.enum(["NEW", "CONFIRMED", "PROCESSING", "COMPLETED", "CANCELLED"]),
});

const paymentSchema = z.object({
  id: idSchema,
  paymentStatus: z.enum(["PAID", "UNPAID"]),
});

const notesSchema = z.object({
  id: idSchema,
  adminNotes: z.string().trim().max(2000, "Note is too long (max 2000 characters)"),
});

async function requireAdmin() {
  const session = await auth();
  return !!session?.user;
}

function refresh(id: string) {
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

async function run(id: string, data: Record<string, unknown>): Promise<ActionResult> {
  try {
    await db.order.update({ where: { id }, data });
    refresh(id);
    return { ok: true };
  } catch (err) {
    // P2025 = record paoa jay nai
    if ((err as { code?: string })?.code === "P2025") {
      return { ok: false, error: "Order not found." };
    }
    console.error(err);
    return { ok: false, error: "Could not save. Please try again." };
  }
}

export async function updateOrderStatus(input: unknown): Promise<ActionResult> {
  if (!(await requireAdmin())) return { ok: false, error: "Unauthorized" };

  const parsed = statusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid status." };

  return run(parsed.data.id, { status: parsed.data.status });
}

export async function updatePaymentStatus(input: unknown): Promise<ActionResult> {
  if (!(await requireAdmin())) return { ok: false, error: "Unauthorized" };

  const parsed = paymentSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid payment status." };

  return run(parsed.data.id, { paymentStatus: parsed.data.paymentStatus });
}

export async function updateAdminNotes(input: unknown): Promise<ActionResult> {
  if (!(await requireAdmin())) return { ok: false, error: "Unauthorized" };

  const parsed = notesSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid note." };
  }

  // Khali note hole null kore dao
  return run(parsed.data.id, { adminNotes: parsed.data.adminNotes || null });
}