import Link from "next/link";
import { COMPANY } from "@/content/company";

const COMPANY_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#safety", label: "Safety" },
  { href: "/#gallery", label: "Gallery" },
];

const SERVICE_LINKS = [
  { href: "/#services", label: "HT / LT Electrical" },
  { href: "/#services", label: "Instrumentation & PLC" },
  { href: "/#services", label: "Manpower Supply" },
];

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-line">
        <div>
          <div className="font-display text-xl font-semibold text-navy mb-3.5">{COMPANY.legalName}</div>
          <p className="text-sm leading-relaxed text-muted max-w-xs">
            Licensed electrical HT/LT contractor and general order supplier, serving industry from{" "}
            {COMPANY.region} since {COMPANY.journeyBegan}.
          </p>
          <dl className="mt-5 space-y-1 text-xs text-stone">
            <div>
              <dt className="inline">Electrical Licence No. </dt>
              <dd className="inline">{COMPANY.electricalLicence}</dd>
            </div>
            <div>
              <dt className="inline">GSTIN </dt>
              <dd className="inline">{COMPANY.gstin}</dd>
            </div>
          </dl>
        </div>
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Services" links={SERVICE_LINKS} />
        <div>
          <div className="text-xs uppercase tracking-[0.08em] text-stone mb-4">Contact</div>
          <div className="flex flex-col gap-2.5 text-sm text-navy-soft">
            {COMPANY.phones.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="hover:text-navy transition-colors">
                +91 {p.slice(0, 5)} {p.slice(5)}
              </a>
            ))}
            <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-navy transition-colors">
              {COMPANY.email}
            </a>
            <address className="not-italic">
              {COMPANY.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-12 py-6 border-t border-line text-xs text-stone">
        © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.08em] text-stone mb-4">{title}</div>
      <div className="flex flex-col gap-2.5 text-sm text-navy-soft">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="hover:text-navy transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
