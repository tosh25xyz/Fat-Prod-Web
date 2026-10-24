import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false },
};

const ORDER_FORMAT = /^ORD-[A-Z0-9-]{6,}$/;

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  // ?order na thakle ba format bhul hole Home e pathao
  if (!order || !ORDER_FORMAT.test(order)) redirect("/");

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 size={30} />
      </div>
      <h1 className="mt-5 text-3xl font-bold">Request received</h1>
      <p className="mt-2 text-navy/70">
        Thank you! We will contact you soon to discuss your project.
      </p>

      <p className="mt-8 text-sm text-navy/60">Your order number</p>
      <p className="mt-1 text-2xl font-semibold tracking-wide text-brand">
        {order}
      </p>
      <p className="mt-2 text-sm text-navy/60">
        Please keep this number for reference.
      </p>

      <Link href="/" className="mt-8 inline-block">
        <Button size="lg">Back to home</Button>
      </Link>
    </div>
  );
}

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  return (
    <section className="mx-auto max-w-xl px-4 py-12 sm:px-6 md:py-16">
      <Suspense
        fallback={<div className="h-72 animate-pulse rounded-2xl bg-navy/5" />}
      >
        <SuccessContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}