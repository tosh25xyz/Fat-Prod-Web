import type { Metadata } from "next";
import Link from "next/link";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about our story, mission and team.",
};

// DUMMY content, real tothyo pore boshaben
const stats = [
  { value: "100+", label: "Projects completed" },
  { value: "50+", label: "Happy clients" },
  { value: "5+", label: "Years of experience" },
  { value: "4", label: "Core services" },
];

const team = [
  { name: "Dummy Name 1", role: "Founder and Creative Director" },
  { name: "Dummy Name 2", role: "Video Producer" },
  { name: "Dummy Name 3", role: "Marketing Manager" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h1 className="text-4xl font-bold md:text-5xl">About {site.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            We help local businesses reach more customers through video, social
            media and smart promotion.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-navy/80">
              Placeholder: we started with a simple idea, that every business
              deserves to be seen. What began as a small team making videos for
              friends has grown into a full service marketing partner.
            </p>
            <p className="mt-4 text-navy/80">
              Replace this text with your real story, how you started, what you
              believe in and what makes your work different.
            </p>
          </div>
          <Card className="self-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Target size={22} />
            </div>
            <CardTitle className="mt-4">Our Mission</CardTitle>
            <p className="mt-2 text-navy/70">
              To give every business, big or small, the tools and creative work
              it needs to grow and be remembered.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold text-brand">{s.value}</p>
              <p className="mt-1 text-sm text-navy/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-3xl font-bold">Meet the Team</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((m) => (
            <Card key={m.name} className="text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-linear-to-br from-navy to-brand" />
              <p className="mt-4 font-semibold">{m.name}</p>
              <p className="text-sm text-navy/60">{m.role}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Let&apos;s work together</h2>
          <Link href="/order">
            <Button size="lg" className="bg-white text-brand hover:bg-white/90">
              Order a Service
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}