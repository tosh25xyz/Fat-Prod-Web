import Link from "next/link";
import { site, navLinks, footerServices } from "@/lib/site";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-xl font-bold">
            {site.name}
            <span className="text-brand">.</span>
          </p>
          <p className="mt-3 text-sm text-white/70">{site.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Menu
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Services
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {footerServices.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s|-/g, "")}`}
                className="hover:text-white"
              >
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-white/50">
        © <CurrentYear /> {site.name}. All rights reserved.
      </div>
    </footer>
  );
}