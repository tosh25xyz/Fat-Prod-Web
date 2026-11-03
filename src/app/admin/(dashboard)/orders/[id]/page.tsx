import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDhaka } from "@/lib/format";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge, PaymentBadge } from "@/components/admin/StatusBadge";
import { OrderStatusForm } from "@/components/admin/OrderStatusForm";
import { PaymentToggle } from "@/components/admin/PaymentToggle";
import { AdminNotesForm } from "@/components/admin/AdminNotesForm";

export const metadata: Metadata = { title: "Order details" };

type Params = Promise<{ id: string }>;

// Date input e shudhu din thake, tai UTC te dekhano (timezone e din na bodlay)
function formatDay(date: Date) {
  return date.toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

async function OrderDetail({ params }: { params: Params }) {
  const { id } = await params;
  await connection();

  const session = await auth();
  if (!session) redirect("/admin/login");

  const order = await db.order.findUnique({
    where: { id },
    include: { items: { include: { service: { select: { name: true } } } } },
  });
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1 text-sm text-navy/70 hover:text-brand"
        >
          <ArrowLeft size={16} /> All orders
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl">{order.orderNumber}</h1>
          <StatusBadge status={order.status} />
          <PaymentBadge status={order.paymentStatus} />
        </div>
        <p className="mt-1 text-sm text-navy/60">
          Placed on {formatDhaka(order.createdAt)} (Dhaka time)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardTitle>Customer</CardTitle>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-navy/50">Name</dt>
                <dd className="mt-0.5 font-medium">{order.customerName}</dd>
              </div>
              <div>
                <dt className="text-navy/50">Business</dt>
                <dd className="mt-0.5 font-medium">{order.businessName ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-navy/50">Phone</dt>
                <dd className="mt-0.5">
                  <a
                    href={`tel:${order.phone}`}
                    className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
                  >
                    <Phone size={14} /> {order.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-navy/50">Email</dt>
                <dd className="mt-0.5 break-all">
                  <a
                    href={`mailto:${order.email}`}
                    className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
                  >
                    <Mail size={14} /> {order.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-navy/50">Preferred date</dt>
                <dd className="mt-0.5 font-medium">
                  {order.preferredDate ? formatDay(order.preferredDate) : "-"}
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardTitle>Project brief</CardTitle>
            <p className="mt-3 whitespace-pre-wrap break-words text-navy/80">
              {order.brief}
            </p>
          </Card>

          <Card className="p-0">
            <div className="px-6 py-4">
              <CardTitle>Services</CardTitle>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="border-y border-navy/10 bg-navy/5 text-xs uppercase text-navy/60">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Service</th>
                    <th className="px-6 py-3 font-semibold">Qty</th>
                    <th className="px-6 py-3 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {order.items.map((i) => (
                    <tr key={i.id}>
                      <td className="px-6 py-3">{i.service.name}</td>
                      <td className="px-6 py-3">{i.quantity}</td>
                      <td className="px-6 py-3">
                        {(i.price * i.quantity).toLocaleString("en-US")} Tk
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-navy/10 px-6 py-4">
              <span className="text-sm text-navy/60">Estimated amount</span>
              <span className="text-lg font-bold">
                {order.totalAmount.toLocaleString("en-US")} Tk
              </span>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <OrderStatusForm id={order.id} status={order.status} />
          </Card>
          <Card>
            <PaymentToggle id={order.id} paymentStatus={order.paymentStatus} />
          </Card>
          <Card>
            <AdminNotesForm id={order.id} notes={order.adminNotes ?? ""} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrderDetailPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-navy/5" />}>
      <OrderDetail params={params} />
    </Suspense>
  );
}