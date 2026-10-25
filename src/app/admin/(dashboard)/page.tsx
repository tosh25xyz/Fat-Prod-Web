import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { CalendarDays, CalendarRange, Clock, Wallet } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { StatsCard } from "@/components/admin/StatsCard";
import { Card } from "@/components/ui/card";

const DHAKA_OFFSET_MS = 6 * 60 * 60 * 1000;

// Dhaka er aaj ar ei mash er shuru, UTC Date hishebe
function getDhakaRanges() {
  const dhakaNow = new Date(Date.now() + DHAKA_OFFSET_MS);
  const y = dhakaNow.getUTCFullYear();
  const m = dhakaNow.getUTCMonth();
  const d = dhakaNow.getUTCDate();
  return {
    todayStart: new Date(Date.UTC(y, m, d) - DHAKA_OFFSET_MS),
    monthStart: new Date(Date.UTC(y, m, 1) - DHAKA_OFFSET_MS),
  };
}

function formatDhaka(date: Date) {
  return date.toLocaleString("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-indigo-100 text-indigo-700",
  PROCESSING: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

async function DashboardContent() {
  await connection();

  // Layout er pashapashi page o nijei check kore
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { todayStart, monthStart } = getDhakaRanges();

  const [today, month, pending, valueAgg, recent] = await Promise.all([
    db.order.count({ where: { createdAt: { gte: todayStart } } }),
    db.order.count({ where: { createdAt: { gte: monthStart } } }),
    db.order.count({ where: { status: "NEW" } }),
    db.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { not: "CANCELLED" } },
    }),
    db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        totalAmount: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const totalValue = valueAgg._sum.totalAmount ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-navy/60">Overview of your orders.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Orders today" value={today} icon={<CalendarDays size={22} />} />
        <StatsCard label="Orders this month" value={month} icon={<CalendarRange size={22} />} />
        <StatsCard label="Pending (New)" value={pending} icon={<Clock size={22} />} />
        <StatsCard
          label="Estimated value"
          value={`${totalValue.toLocaleString("en-US")} Tk`}
          icon={<Wallet size={22} />}
        />
      </div>

      <Card className="p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold">Recent orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-brand hover:underline"
          >
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="px-6 pb-6 text-sm text-navy/60">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-y border-navy/10 bg-navy/5 text-xs uppercase text-navy/60">
                <tr>
                  <th className="px-6 py-3 font-semibold">Order</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Date (Dhaka)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {recent.map((o) => (
                  <tr key={o.id}>
                    <td className="px-6 py-3 font-medium">{o.orderNumber}</td>
                    <td className="px-6 py-3">{o.customerName}</td>
                    <td className="px-6 py-3">
                      {o.totalAmount.toLocaleString("en-US")} Tk
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[o.status] ?? ""}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-navy/70">
                      {formatDhaka(o.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-navy/5" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-navy/5" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-2xl bg-navy/5" />
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}