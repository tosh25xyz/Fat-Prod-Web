import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-3 max-w-md text-navy/70">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-5 font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Back to home
        </Link>
        <Link
          href="/services"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-navy/20 px-5 font-medium text-navy transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          View services
        </Link>
      </div>
    </main>
  );
}