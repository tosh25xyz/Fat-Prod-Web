import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Check, ArrowLeft } from "lucide-react";
import { getServiceBySlug } from "@/lib/services";
import { getServiceFeatures } from "@/lib/service-ui";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connection();
  const service = await getServiceBySlug(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.name,
    description: service.description,
  };
}

async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connection();
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const features = getServiceFeatures(service.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
      <Link
        href="/services"
        className="inline-flex items-center gap-1 text-sm text-navy/70 hover:text-brand"
      >
        <ArrowLeft size={16} /> All services
      </Link>

      <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <ServiceIcon slug={service.slug} size={28} />
      </div>
      <h1 className="mt-4 text-4xl font-bold">{service.name}</h1>
      <p className="mt-4 text-lg text-navy/80">{service.description}</p>

      <p className="mt-6 text-xl font-semibold text-brand">
        Starting from {service.price.toLocaleString("en-US")} Tk
      </p>

      <h2 className="mt-10 text-2xl font-bold">What you get</h2>
      <ul className="mt-4 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Check size={14} />
            </span>
            <span className="text-navy/80">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link href={`/order?service=${service.slug}`}>
          <Button size="lg">Order this service</Button>
        </Link>
        <p className="mt-3 text-sm text-navy/60">
          The final price is confirmed after we discuss your project.
        </p>
      </div>
    </div>
  );
}

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={<div className="mx-auto h-96 max-w-4xl animate-pulse px-4 py-16" />}
    >
      <ServiceDetail params={params} />
    </Suspense>
  );
}