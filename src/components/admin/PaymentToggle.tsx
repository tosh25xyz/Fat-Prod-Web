

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaymentBadge } from "@/components/admin/StatusBadge";
import { updatePaymentStatus } from "@/app/admin/(dashboard)/orders/actions";

type Props = { id: string; paymentStatus: string };

export function PaymentToggle({ id, paymentStatus }: Props) {
  const router = useRouter();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const isPaid = paymentStatus === "PAID";

  function toggle() {
    setMsg(null);
    startTransition(async () => {
      const res = await updatePaymentStatus({
        id,
        paymentStatus: isPaid ? "UNPAID" : "PAID",
      });
      if (res.ok) {
        setMsg({ ok: true, text: "Saved" });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error });
      }
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Payment</span>
        <PaymentBadge status={paymentStatus} />
      </div>
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant={isPaid ? "outline" : "primary"}
          onClick={toggle}
          disabled={pending}
        >
          {pending ? "Saving..." : isPaid ? "Mark as Unpaid" : "Mark as Paid"}
        </Button>
        {msg && (
          <span
            role="status"
            className={msg.ok ? "text-sm text-green-700" : "text-sm text-red-600"}
          >
            {msg.text}
          </span>
        )}
      </div>
    </div>
  );
}