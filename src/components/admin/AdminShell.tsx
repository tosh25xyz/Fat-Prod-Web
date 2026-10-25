"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

type Props = { name: string; children: React.ReactNode };

export function AdminShell({ name, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="md:pl-64">
        <Header name={name} onMenuClick={() => setOpen(true)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}