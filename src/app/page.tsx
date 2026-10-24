import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { site } from "@/lib/site";
import {
  homeServices,
  portfolioItems,
  processSteps,
  testimonials,
} from "@/lib/home-data";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {site.name}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Apnar business ke shobar kache pouche din
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            {site.tagline}. Idea theke result porjonto, ek jaygay shob kichu.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/order">
              <Button size="lg">Order Now</Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Services dekhun
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-3xl font-bold">Amader Services</h2>
        <p className="mt-2 text-navy/70">Apnar proyojon moto service bechhe nin.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeServices.map((s) => (
            <Card key={s.name} className="flex flex-col">
              <CardTitle>{s.name}</CardTitle>
              <p className="mt-2 flex-1 text-sm text-navy/70">{s.desc}</p>
              <p className="mt-4 text-sm font-semibold text-brand">
                Starting from {s.price}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Portfolio placeholder */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="text-3xl font-bold">Amader Kaj</h2>
          <p className="mt-2 text-navy/70">
            Placeholder: real project er chobi ba video pore boshbe.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((p) => (
              <div
                key={p.title}
                className="group overflow-hidden rounded-2xl border border-navy/10"
              >
                <div className="flex aspect-video items-center justify-center bg-linear-to-br from-navy to-brand text-sm text-white/60">
                  Image / Video
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase text-brand">
                    {p.tag}
                  </p>
                  <p className="mt-1 font-semibold">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-3xl font-bold">Kivabe kaj kori</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <div key={step.title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-navy/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (dummy) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="text-3xl font-bold">Client ra ki bole</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <p className="text-navy/80">“{t.quote}”</p>
                <p className="mt-4 font-semibold">{t.name}</p>
                <p className="text-sm text-navy/60">{t.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Apnar kaj ajই shuru korun</h2>
            <p className="mt-2 text-white/80">
              Order form pur korun, amra shiggroi jogajog korbo.
            </p>
          </div>
          <Link href="/order">
            <Button
              size="lg"
              className="bg-white text-brand hover:bg-white/90"
            >
              Order Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}