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
          <div className="flex flex-col gap-1 text-sm text-navy-soft">
            {COMPANY.phones.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="py-1 hover:text-navy transition-colors">
                +91 {p.slice(0, 5)} {p.slice(5)}
              </a>
            ))}
            <a href={`mailto:${COMPANY.email}`} className="py-1 break-all hover:text-navy transition-colors">
              {COMPANY.email}
            </a>
            <address className="not-italic pt-1">
              {COMPANY.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-12 py-6 border-t border-line text-xs text-stone flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>
          © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
        </span>
        <span>
          Designed &amp; Developed by{" "}
          <a
            href="https://orangekite.in/"
            target="_blank"
            rel="noopener"
            className="font-medium text-navy-soft underline decoration-line underline-offset-4 transition-colors hover:text-brass-deep hover:decoration-brass"
          >
            OrangeKite
          </a>
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.08em] text-stone mb-4">{title}</div>
      <div className="flex flex-col gap-1 text-sm text-navy-soft">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="py-1 hover:text-navy transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
