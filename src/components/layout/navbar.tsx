"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, navLinks } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-surface/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Text logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-navy"
          onClick={() => setOpen(false)}
        >
          {site.name}
          <span className="text-brand">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  isActive(l.href) ? "text-brand" : "text-navy/80"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/order">
            <Button size="sm">Order Now</Button>
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-navy/5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-navy/10 bg-surface md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base font-medium",
                    isActive(l.href)
                      ? "bg-brand/10 text-brand"
                      : "text-navy hover:bg-navy/5"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/order" onClick={() => setOpen(false)}>
                <Button className="w-full">Order Now</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}