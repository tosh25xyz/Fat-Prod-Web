const colors = [
  "from-indigo-500 to-navy",
  "from-sky-500 to-indigo-600",
  "from-violet-500 to-fuchsia-600",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-rose-600",
  "from-slate-500 to-navy",
];

export function PortfolioSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-3xl font-bold">Our Work</h2>
        <p className="mt-2 text-navy/70">
          Placeholder cards. Real projects will go here later.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((c, i) => (
            <div
              key={i}
              className={`flex aspect-video items-center justify-center rounded-2xl bg-linear-to-br ${c} text-lg font-semibold text-white/90`}
            >
              Project {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}