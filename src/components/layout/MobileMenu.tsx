"use client";

import Link from "next/link";
import { navLinks } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

export function MobileMenu({ open, onClose, isActive }: Props) {
  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      className="border-t border-navy/10 bg-surface md:hidden"
    >
      <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={onClose}
              aria-current={isActive(l.href) ? "page" : undefined}
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
          <Link href="/order" onClick={onClose}>
            <Button className="w-full">Order Now</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}