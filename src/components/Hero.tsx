import Image from "next/image";
import Link from "next/link";
import type { Stat } from "@/db/schema";
import { COMPANY } from "@/content/company";
import heroImage from "../../public/images/site/dri-kiln-hero.jpg";

// Server component: the staggered entrance is pure CSS (see .animate-rise in
// globals.css), so the headline and photo paint immediately without waiting
// for JavaScript — this is the page's LCP area on mobile.
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="px-6 md:px-12 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div>
          <div
            className="animate-rise-fade mb-6 inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.12em] text-brass-ink"
            style={delay(100)}
          >
            Since {COMPANY.journeyBegan} — {COMPANY.region}
          </div>
          <h1
            className="animate-rise font-display text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl font-medium text-navy mb-7"
            style={delay(180)}
          >
            Powering the plants that build India.
          </h1>
          <p className="animate-rise text-lg leading-relaxed text-muted max-w-lg mb-10" style={delay(260)}>
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
              className="inline-flex h-[54px] items-center justify-center rounded-sm border border-line px-8 text-[15px] font-semibold text-navy transition-colors hover:bg-ivory-deep"
            >
              View Our Projects
            </Link>
          </div>
        </div>
        <figure
          className="animate-rise relative h-[340px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-sm bg-ivory-deep"
          style={delay(220)}
        >
          <Image
            src={heroImage}
            alt="Rotary kiln and cable trays at a DRI plant"
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-0 left-0 bg-navy/85 px-4 py-2 text-xs tracking-wide text-ivory">
            DRI kiln — electrical &amp; cable tray works
          </figcaption>
        </figure>
      </div>

      <dl className="mx-auto max-w-7xl mt-16 md:mt-24 pt-9 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={s.id} className="animate-rise-fade flex flex-col-reverse" style={delay(420 + i * 80)}>
            <dt className="text-sm text-muted mt-1.5">{s.label}</dt>
            <dd className="font-display text-3xl md:text-[2.2rem] text-brass-deep">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
