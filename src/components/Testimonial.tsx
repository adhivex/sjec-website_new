import type { Testimonial as TestimonialType } from "@/db/schema";
import Link from "next/link";
import { Reveal } from "./Reveal";

export function Testimonial({ testimonial }: { testimonial: TestimonialType | undefined }) {
  if (!testimonial) return null;
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 flex justify-center">
      <Reveal className="max-w-2xl text-center">
        <p className="font-display italic text-2xl md:text-[1.75rem] leading-relaxed text-navy mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="text-sm text-muted">
          {testimonial.author} — {testimonial.role}
        </div>
      </Reveal>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="px-6 md:px-12">
      <Reveal className="mx-auto max-w-7xl mb-24 md:mb-32 rounded-sm bg-navy px-9 md:px-16 py-14 md:py-[70px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h2 className="font-display text-2xl md:text-[2.1rem] font-medium text-ivory mb-2.5">
            Planning a plant project or shutdown?
          </h2>
          <p className="text-[15px] text-ivory/70">
            Share your scope and we&rsquo;ll come back with a quote.
          </p>
        </div>
        <Link
          href="/#contact"
          className="inline-flex h-[54px] shrink-0 items-center justify-center rounded-sm bg-brass px-8 text-[15px] font-semibold text-navy transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Contact Us
        </Link>
      </Reveal>
    </section>
  );
}
