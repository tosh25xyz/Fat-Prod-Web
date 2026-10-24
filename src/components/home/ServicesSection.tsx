import { connection } from "next/server";
import { getActiveServices } from "@/lib/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export async function ServicesSection() {
  await connection();
  const services = (await getActiveServices()).slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 className="text-3xl font-bold">Our Services</h2>
      <p className="mt-2 text-navy/70">Choose the service your business needs.</p>

      {services.length === 0 ? (
        <p className="mt-10 text-navy/60">No services available right now.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
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
          <div key={i} className="h-56 animate-pulse rounded-2xl bg-navy/5" />
        ))}
      </div>
    </section>
  );
}