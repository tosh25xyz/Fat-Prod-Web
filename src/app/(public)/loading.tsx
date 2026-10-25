export default function Loading() {
  return (
    <div
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
      role="status"
      aria-label="Loading"
    >
      <div className="h-10 w-2/3 max-w-md animate-pulse rounded-lg bg-navy/5" />
      <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-navy/5" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-2xl bg-navy/5" />
        ))}
      </div>
    </div>
  );
}