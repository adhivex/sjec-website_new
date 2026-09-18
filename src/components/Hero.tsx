import Image from "next/image";
import Link from "next/link";
import type { Stat } from "@/db/schema";
import { COMPANY } from "@/content/company";
import heroImage from "../../public/images/brand/hero.jpg";

// Server component: the staggered entrance is pure CSS (see .animate-rise in
// globals.css), so the headline and photo paint immediately without waiting
// for JavaScript — this is the page's LCP area on mobile.
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy">
        <Image
          src={heroImage}
          alt="Site engineer overlooking a cement plant at sunrise"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[62%_center] lg:object-center"
        />
        {/* Darkened so the ivory text keeps well clear of WCAG AA over the sky */}
        <div className="absolute inset-0 bg-navy/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy/95 lg:via-navy/80 lg:to-navy/35" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div
              className="animate-rise-fade mb-6 inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.12em] text-brass"
              style={delay(100)}
            >
              Since {COMPANY.journeyBegan} — {COMPANY.region}
            </div>
            <h1
              className="animate-rise font-display text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl font-medium text-ivory mb-7"
              style={delay(180)}
            >
              Powering the plants that build India.
            </h1>
            <p className="animate-rise text-lg leading-relaxed text-ivory/85 max-w-lg mb-10" style={delay(260)}>
              HT/LT electrical erection, cabling, instrumentation and commissioning for
              steel, DRI, cement, pellet and power plants — delivered by a licensed team of
              experienced engineers.
            </p>
            <div className="animate-rise-fade flex flex-wrap gap-4" style={delay(340)}>
              <Link
                href="/#contact"
                className="inline-flex h-[54px] items-center justify-center rounded-sm bg-brass px-8 text-[15px] font-semibold text-navy transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Request a Quote
              </Link>
              <Link
                href="/projects"
                className="inline-flex h-[54px] items-center justify-center rounded-sm border border-ivory/40 px-8 text-[15px] font-semibold text-ivory transition-colors hover:bg-ivory/10"
              >
                View Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <dl className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={s.id} className="animate-rise-fade flex flex-col-reverse" style={delay(420 + i * 80)}>
            <dt className="text-sm text-muted mt-1.5">{s.label}</dt>
            <dd className="font-display text-3xl md:text-[2.2rem] text-brass-deep">{s.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
