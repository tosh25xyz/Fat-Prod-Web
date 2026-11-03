const orderStyles: Record<string, string> = {
  NEW: "bg-green-100 text-green-700",
  CONFIRMED: "bg-indigo-100 text-indigo-700",
  PROCESSING: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-sky-100 text-sky-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const orderLabels: Record<string, string> = {
  NEW: "New",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const paymentStyles: Record<string, string> = {
  PAID: "bg-green-100 text-green-700",
  UNPAID: "bg-slate-100 text-slate-600",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-amber-100 text-amber-700",
};

const paymentLabels: Record<string, string> = {
  PAID: "Paid",
  UNPAID: "Unpaid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

const base =
  "inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`${base} ${orderStyles[status] ?? ""}`}>
      {orderLabels[status] ?? status}
    </span>
  );
}

export function PaymentBadge({ status }: { status: string }) {
  return (
    <span className={`${base} ${paymentStyles[status] ?? ""}`}>
      {paymentLabels[status] ?? status}
    </span>
  );
}