"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Briefcase,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

type Props = { open: boolean; onClose: () => void };

export function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Phone e dark overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-navy text-white transition-transform",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="text-lg font-bold">
            {site.name}
            <span className="text-brand">.</span>
            <span className="ml-2 text-xs font-medium text-white/50">Admin</span>
          </span>
          <button
            type="button"
            className="rounded-lg p-1 hover:bg-white/10 md:hidden"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(l.href)
                  ? "bg-brand text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <l.icon size={18} />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-4 text-xs text-white/50">
          <Link href="/" target="_blank" className="hover:text-white">
            View website ↗
          </Link>
        </div>
      </aside>
    </>
  );
}