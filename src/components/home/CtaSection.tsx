import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold">Ready to grow your business?</h2>
        <Link href="/order">
          <Button size="lg" className="bg-white text-brand hover:bg-white/90">
            Order a Service
          </Button>
        </Link>
      </div>
    </section>
  );
}