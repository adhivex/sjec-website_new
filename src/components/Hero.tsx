"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Stat } from "@/db/schema";
import { COMPANY } from "@/content/company";
import heroImage from "../../public/images/site/dri-kiln-hero.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="px-6 md:px-12 pt-16 md:pt-24">
      <motion.div
        className="mx-auto max-w-7xl grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.12em] text-brass"
          >
            Since {COMPANY.journeyBegan} — {COMPANY.region}
          </motion.div>
          <motion.h1
            variants={item}
            className="font-display text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl font-medium text-navy mb-7"
          >
            Powering the plants that build India.
          </motion.h1>
          <motion.p variants={item} className="text-lg leading-relaxed text-muted max-w-lg mb-10">
            HT/LT electrical erection, cabling, instrumentation and commissioning for
            steel, DRI, cement, pellet and power plants — delivered by a licensed team of
            experienced engineers.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4">
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
          </motion.div>
        </div>
        <motion.figure variants={item} className="relative h-[340px] sm:h-[420px] md:h-[520px] overflow-hidden rounded-sm bg-ivory-deep">
          <Image
            src={heroImage}
            alt="Rotary kiln and cable trays at a DRI plant"
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-0 left-0 bg-navy/85 px-4 py-2 text-xs tracking-wide text-ivory">
            DRI kiln — electrical &amp; cable tray works
          </figcaption>
        </motion.figure>
      </motion.div>

      <motion.div
        className="mx-auto max-w-7xl mt-16 md:mt-24 pt-9 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {stats.map((s) => (
          <motion.div key={s.id} variants={item}>
            <div className="font-display text-3xl md:text-[2.2rem] text-brass">{s.value}</div>
            <div className="text-sm text-muted mt-1.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
