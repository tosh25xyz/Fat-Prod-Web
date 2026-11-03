import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  PAGE_SIZE,
  activeFilters,
  buildOrderWhere,
  parseOrderSearch,
} from "@/lib/order-query";
import { OrderFilters } from "@/components/admin/OrderFilters";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { Pagination } from "@/components/ui/Pagination";

export const metadata: Metadata = { title: "Orders" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function OrdersContent({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  await connection();

  const session = await auth();
  if (!session) redirect("/admin/login");

  const search = parseOrderSearch(raw);
  const filters = activeFilters(search);
  const where = buildOrderWhere(search);

  const total = await db.order.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // ?page=999 dile shesh page e pathao
  if (search.page > totalPages) {
    const p = new URLSearchParams(filters);
    if (totalPages > 1) p.set("page", String(totalPages));
    const qs = p.toString();
    redirect(qs ? `/admin/orders?${qs}` : "/admin/orders");
  }

  const orders = await db.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (search.page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      email: true,
      totalAmount: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
      items: { select: { service: { select: { name: true } } } },
    },
  });

  const from = total === 0 ? 0 : (search.page - 1) * PAGE_SIZE + 1;
  const to = Math.min(search.page * PAGE_SIZE, total);

  return (
    <>
      <p className="text-sm text-navy/60">
        Showing {from}-{to} of {total} orders
      </p>
      <OrdersTable orders={orders} />
      <Pagination
        basePath="/admin/orders"
        page={search.page}
        totalPages={totalPages}
        params={filters}
      />
    </>
  );
}

function TableSkeleton() {
  return <div className="h-96 animate-pulse rounded-2xl bg-navy/5" />;
}

export default function AdminOrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Orders</h1>
        <p className="mt-1 text-sm text-navy/60">
          Search, filter and manage all order requests.
        </p>
      </div>

      <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-navy/5" />}>
        <OrderFilters />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}