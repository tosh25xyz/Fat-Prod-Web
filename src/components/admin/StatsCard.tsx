import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type Props = { label: string; value: string | number; icon: ReactNode };

export function StatsCard({ label, value, icon }: Props) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-navy/60">{label}</p>
        <p className="truncate text-2xl font-bold">{value}</p>
      </div>
    </Card>
  );
}