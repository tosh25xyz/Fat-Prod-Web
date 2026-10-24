import Link from "next/link";
import { connection } from "next/server";
import { Video, Share2, Megaphone, BarChart3, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { db } from "@/lib/db";
import { Card, CardTitle } from "@/components/ui/card";

const icons: Record<string, LucideIcon> = {
  "video-production": Video,
  "social-media-marketing": Share2,
  "business-promotion": Megaphone,
  "ad-campaign-and-reach": BarChart3,
};

export async function ServicesSection() {
  await connection();

  const services = await db.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
    take: 4,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 className="text-3xl font-bold">Our Services</h2>
      <p className="mt-2 text-navy/70">Choose the service your business needs.</p>

      {services.length === 0 ? (
        <p className="mt-10 text-navy/60">No services available right now.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = icons[s.slug] ?? Sparkles;
            return (
              <Card key={s.id} className="flex flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon size={22} />
                </div>
                <CardTitle className="mt-4">{s.name}</CardTitle>
                <p className="mt-2 flex-1 text-sm text-navy/70">
                  {s.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-brand">
                  Starting from {s.price.toLocaleString("en-US")} Tk
                </p>
                <Link
                  href={`/order?service=${s.slug}`}
                  className="mt-3 text-sm font-medium text-navy hover:text-brand"
                >
                  Order this service →
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function ServicesSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 className="text-3xl font-bold">Our Services</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-2xl bg-navy/5"
          />
        ))}
      </div>
    </section>
  );
}