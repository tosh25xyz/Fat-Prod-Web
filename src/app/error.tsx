"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Something went wrong
      </p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
        We hit an unexpected error
      </h1>
      <p className="mt-3 max-w-md text-navy/70">
        Please try again. If the problem continues, contact us and we will fix
        it quickly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-5 font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-navy/20 px-5 font-medium text-navy transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}