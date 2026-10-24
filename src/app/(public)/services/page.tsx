import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getActiveServices } from "@/lib/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export const metadata: Metadata = {
  title: "Services",
  description: "Video production, social media marketing, promotion and ad campaigns.",
};

async function ServiceGrid() {
  await connection();
  const services = await getActiveServices();

  if (services.length === 0) {
    return <p className="mt-10 text-navy/60">No services available right now.</p>;
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} />
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-56 animate-pulse rounded-2xl bg-navy/5" />
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-4xl font-bold">Our Services</h1>
      <p className="mt-2 max-w-2xl text-navy/70">
        Pick a service to see what is included and how to order.
      </p>
      <Suspense fallback={<GridSkeleton />}>
        <ServiceGrid />
      </Suspense>
    </section>
  );
}