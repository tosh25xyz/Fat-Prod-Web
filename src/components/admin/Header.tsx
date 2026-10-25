"use client";

import { Menu } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

type Props = { name: string; onMenuClick: () => void };

export function Header({ name, onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-navy/10 bg-surface/90 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-navy/5 md:hidden"
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-navy/80">{name}</span>
        <LogoutButton />
      </div>
    </header>
  );
}