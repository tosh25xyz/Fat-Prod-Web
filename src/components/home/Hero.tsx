import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          {site.name}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Take your business in front of more customers
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Video production, social media marketing and ad campaigns, all in one
          place. From idea to results.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/order">
            <Button size="lg">Order a Service</Button>
          </Link>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              View Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}