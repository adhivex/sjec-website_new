"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/content/company";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-32 bg-ivory-deep">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-navy mb-3">
            Get in Touch
          </h2>
          <p className="text-[15px] text-muted mb-10 max-w-sm">
            Tell us about your plant and scope — we&rsquo;ll get back to you with next steps.
          </p>
          <ContactDetails />
        </Reveal>

        <Reveal>
          {submitted ? (
            <div className="rounded-sm border border-line bg-ivory p-8">
              <p className="font-display text-xl text-navy mb-2">Thank you.</p>
              {/* The form is intentionally static (no backend yet), so be honest
                 with the visitor and point them to a channel that works. When
                 wiring it up, add src/app/api/contact/route.ts and insert into
                 the contactSubmissions table. */}
              <p className="text-sm text-muted mb-6">
                Online enquiries aren&rsquo;t connected yet — please call or email us directly and
                we&rsquo;ll respond promptly.
              </p>
              <ContactDetails />
            </div>
          ) : (
            <form
              className="grid sm:grid-cols-2 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone (optional)" name="phone" type="tel" />
              <Field label="Company / plant" name="projectType" placeholder="e.g. 500 TPD DRI, Dhenkanal" />
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-navy mb-2" htmlFor="message">
                  Scope of work
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-sm border border-line bg-ivory px-4 py-3 text-[15px] text-navy outline-none transition-colors focus:border-brass"
                  placeholder="Panels, cabling, instrumentation, commissioning, manpower..."
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex h-[54px] items-center justify-center rounded-sm bg-navy px-9 text-[15px] font-semibold text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function ContactDetails() {
  return (
    <ul className="space-y-5 text-[15px] text-navy">
      <li className="flex gap-4">
        <Phone className="mt-0.5 shrink-0 text-brass" size={20} strokeWidth={1.5} />
        <span className="flex flex-col gap-1">
          {COMPANY.phones.map((p) => (
            <a key={p} href={`tel:+91${p}`} className="hover:text-brass-deep transition-colors">
              +91 {p.slice(0, 5)} {p.slice(5)}
            </a>
          ))}
        </span>
      </li>
      <li className="flex gap-4">
        <Mail className="mt-0.5 shrink-0 text-brass" size={20} strokeWidth={1.5} />
        <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-brass-deep transition-colors">
          {COMPANY.email}
        </a>
      </li>
      <li className="flex gap-4">
        <MapPin className="mt-0.5 shrink-0 text-brass" size={20} strokeWidth={1.5} />
        <address className="not-italic">
          {COMPANY.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </li>
    </ul>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full h-12 rounded-sm border border-line bg-ivory px-4 text-[15px] text-navy outline-none transition-colors focus:border-brass"
      />
    </div>
  );
}
