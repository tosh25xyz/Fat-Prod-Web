import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getActiveServices } from "@/lib/services";
import { OrderForm } from "@/components/forms/OrderForm";

export const metadata: Metadata = {
  title: "Order a Service",
  description: "Tell us about your project and we will get back to you.",
};

async function OrderContent({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: slug } = await searchParams;
  await connection();

  const services = await getActiveServices();
  const defaultServiceId = services.find((s) => s.slug === slug)?.id;

  return (
    <OrderForm
      services={services.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
      }))}
      defaultServiceId={defaultServiceId}
    />
  );
}

export default function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-4xl font-bold">Order a Service</h1>
      <p className="mt-2 text-navy/70">
        Fill in the form and we will contact you to confirm details and price.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={<div className="h-96 animate-pulse rounded-2xl bg-navy/5" />}
        >
          <OrderContent searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}