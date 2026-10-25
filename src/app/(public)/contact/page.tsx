import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, social, address } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="mt-2 max-w-2xl text-navy/70">
        Have a question? Send us a message and we will get back to you.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <ContactForm />
        </div>

        <aside className="space-y-6 md:col-span-2">
          <ul className="space-y-4 text-navy/80">
            <li className="flex items-start gap-3">
              <Mail size={20} className="mt-0.5 text-brand" />
              <a href={`mailto:${site.email}`} className="hover:text-brand">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={20} className="mt-0.5 text-brand" />
              <a
                href={`tel:${site.phone.replace(/\s|-/g, "")}`}
                className="hover:text-brand"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 text-brand" />
              <span>{address}</span>
            </li>
          </ul>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy/50">
              Follow us
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg border border-navy/15 px-3 py-1.5 text-sm font-medium hover:border-brand hover:text-brand"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}