"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/Select";
import { updateOrderStatus } from "@/app/admin/(dashboard)/orders/actions";

type Props = { id: string; status: string };

export function OrderStatusForm({ id, status }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await updateOrderStatus({ id, status: value });
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
      <Select
        label="Order status"
        name="status"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setMsg(null);
        }}
        disabled={pending}
      >
        <option value="NEW">New</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="PROCESSING">Processing</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </Select>
      <div className="flex items-center gap-3">
        <Button size="sm" onClick={save} disabled={pending || value === status}>
          {pending ? "Saving..." : "Save status"}
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