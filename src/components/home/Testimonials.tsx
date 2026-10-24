import { Card } from "@/components/ui/card";

// DUMMY content. Replace with real client reviews later.
const items = [
  { quote: "Our promo video brought in many new customers. Delivered on time.", name: "Dummy Name 1", role: "Restaurant Owner" },
  { quote: "Our page reach doubled within a few weeks. Highly recommended.", name: "Dummy Name 2", role: "Online Shop Owner" },
  { quote: "The ad campaign results were clear and easy to track.", name: "Dummy Name 3", role: "Local Business Owner" },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-3xl font-bold">What Clients Say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <Card key={t.name}>
              <p className="text-navy/80">“{t.quote}”</p>
              <p className="mt-4 font-semibold">{t.name}</p>
              <p className="text-sm text-navy/60">{t.role}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}