"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { COMPANY } from "@/content/company";
import logo from "../../public/images/brand/logo-nav.png";

// Absolute hashes so the nav also works from /projects pages.
const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#safety", label: "Safety" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    // Solid ivory at all times: the home hero behind it is a dark photograph.
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-line">
      <div className="mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between gap-6 px-6 md:px-12">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="leading-none"
          aria-label={`${COMPANY.legalName} — home`}
        >
          {/* The lockup's own tagline is illegible at nav size, so it is set as text below. */}
          <Image src={logo} alt="SJEC" preload className="h-8 md:h-10 w-auto" sizes="140px" />
          <span className="mt-1.5 block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-brass-ink">
            {COMPANY.tagline}
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-9 text-sm text-navy-soft">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="py-2 hover:text-navy transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden sm:inline-flex h-11 items-center justify-center rounded-sm bg-navy px-6 text-sm font-semibold text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-navy"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="lg:hidden border-t border-line px-6 pb-6 pt-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 border-b border-line text-[15px] text-navy"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-5 flex h-12 items-center justify-center rounded-sm bg-navy text-sm font-semibold text-ivory sm:hidden"
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
