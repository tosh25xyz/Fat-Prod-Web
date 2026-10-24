import {
  ClipboardList,
  MessagesSquare,
  Clapperboard,
  PackageCheck,
} from "lucide-react";

const steps = [
  { title: "Request", desc: "Tell us about your business and what you need.", icon: ClipboardList },
  { title: "Discussion", desc: "We talk through details, plan and final price.", icon: MessagesSquare },
  { title: "Production", desc: "We create your video, campaign or promotion.", icon: Clapperboard },
  { title: "Delivery", desc: "You get the final work, with revisions if needed.", icon: PackageCheck },
];

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 className="text-3xl font-bold">How We Work</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
              <s.icon size={22} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase text-navy/50">
              Step {i + 1}
            </p>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-navy/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}