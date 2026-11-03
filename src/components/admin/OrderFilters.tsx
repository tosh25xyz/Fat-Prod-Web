"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";

const KEYS = ["q", "status", "payment", "from", "to"] as const;

export function OrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const k of KEYS) {
      const v = String(fd.get(k) ?? "").trim();
      if (v) params.set(k, v);
    }
    const qs = params.toString();
    startTransition(() => router.push(qs ? `${pathname}?${qs}` : pathname));
  }

  function onReset() {
    startTransition(() => router.push(pathname));
  }

  return (
    <form
      key={sp.toString()}
      onSubmit={onSubmit}
      className="grid gap-4 rounded-2xl border border-navy/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <div className="sm:col-span-2">
        <Input
          label="Search"
          name="q"
          placeholder="Order no, name, email, phone"
          defaultValue={sp.get("q") ?? ""}
        />
      </div>
      <Select label="Status" name="status" defaultValue={sp.get("status") ?? ""}>
        <option value="">All</option>
        <option value="NEW">New</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="PROCESSING">Processing</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </Select>
      <Select label="Payment" name="payment" defaultValue={sp.get("payment") ?? ""}>
        <option value="">All</option>
        <option value="PAID">Paid</option>
        <option value="UNPAID">Unpaid</option>
      </Select>
      <Input label="From" name="from" type="date" defaultValue={sp.get("from") ?? ""} />
      <Input label="To" name="to" type="date" defaultValue={sp.get("to") ?? ""} />

      <div className="flex gap-2 sm:col-span-2 lg:col-span-6">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Loading..." : "Apply filters"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onReset} disabled={pending}>
          Reset
        </Button>
      </div>
    </form>
  );
}