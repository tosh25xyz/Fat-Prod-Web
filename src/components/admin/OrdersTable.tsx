import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatusBadge, PaymentBadge } from "@/components/admin/StatusBadge";
import { formatDhaka } from "@/lib/format";

type Row = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: Date;
  items: { service: { name: string } }[];
};

export function OrdersTable({ orders }: { orders: Row[] }) {
  if (orders.length === 0) {
    return (
      <Card className="py-12 text-center">
        <p className="font-medium">No orders found</p>
        <p className="mt-1 text-sm text-navy/60">
          Try changing or resetting the filters.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-navy/10 bg-navy/5 text-xs uppercase text-navy/60">
            <tr>
              <th className="px-5 py-3 font-semibold">Order No</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Service</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Payment</th>
              <th className="px-5 py-3 font-semibold">Date (Dhaka)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/10">
            {orders.map((o) => {
              const first = o.items[0]?.service.name ?? "-";
              const extra = o.items.length - 1;
              return (
                <tr key={o.id} className="relative hover:bg-navy/5">
                  <td className="px-5 py-3 font-medium">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="text-brand after:absolute after:inset-0"
                    >
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <p>{o.customerName}</p>
                    <p className="text-xs text-navy/50">{o.email}</p>
                  </td>
                  <td className="px-5 py-3">
                    {first}
                    {extra > 0 && (
                      <span className="text-navy/50"> +{extra} more</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    {o.totalAmount.toLocaleString("en-US")} Tk
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3">
                    <PaymentBadge status={o.paymentStatus} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-navy/70">
                    {formatDhaka(o.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}