import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  basePath: string;
  page: number;
  totalPages: number;
  params?: Record<string, string>;
};

function pageList(page: number, total: number): (number | "…")[] {
  const nums = [...new Set([1, total, page - 1, page, page + 1])]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

export function Pagination({ basePath, page, totalPages, params = {} }: Props) {
  if (totalPages <= 1) return null;

  const href = (n: number) => {
    const p = new URLSearchParams(params);
    if (n > 1) p.set("page", String(n));
    const qs = p.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const item =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium";

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} className={cn(item, "border-navy/20 hover:bg-navy/5")}>
          Previous
        </Link>
      ) : (
        <span className={cn(item, "border-navy/10 text-navy/30")}>Previous</span>
      )}

      {pageList(page, totalPages).map((n, i) =>
        n === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-navy/50">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={href(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              item,
              n === page
                ? "border-brand bg-brand text-white"
                : "border-navy/20 hover:bg-navy/5"
            )}
          >
            {n}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link href={href(page + 1)} className={cn(item, "border-navy/20 hover:bg-navy/5")}>
          Next
        </Link>
      ) : (
        <span className={cn(item, "border-navy/10 text-navy/30")}>Next</span>
      )}
    </nav>
  );
}