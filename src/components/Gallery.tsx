"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/db/schema";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActive(null);
    openerRef.current?.focus();
  }, []);

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="px-6 md:px-12 py-24 md:py-32 bg-ivory-deep">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-navy">
              Glimpses of Our Execution
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              Panel rooms, cable routing, erection and commissioning from our recent sites.
            </p>
          </div>
        </Reveal>
        <RevealStagger className="columns-2 lg:columns-3 gap-3 sm:gap-6">
          {images.map((img, i) => (
            <RevealItem key={img.id} className="mb-4 sm:mb-6 break-inside-avoid">
              <figure>
                <button
                  type="button"
                  onClick={(e) => {
                    openerRef.current = e.currentTarget;
                    setActive(i);
                  }}
                  className="group block w-full overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                  aria-label={`Enlarge photo: ${img.caption}`}
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="w-full h-auto transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </button>
                <figcaption className="mt-2 sm:mt-2.5 text-xs uppercase tracking-[0.08em] text-stone leading-snug">
                  {img.caption}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>

      {active !== null && (
        <Lightbox images={images} index={active} onChange={setActive} onClose={close} />
      )}
    </section>
  );
}

function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: GalleryImage[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const img = images[index];
  const step = useCallback(
    (delta: number) => onChange((index + delta + images.length) % images.length),
    [index, images.length, onChange],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="animate-rise-fade fixed inset-0 z-[60] flex flex-col bg-navy/95 backdrop-blur-sm"
      style={{ animationDuration: "0.25s" }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-20 text-ivory/70 text-sm">
        <span className="tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-ivory/20 text-ivory hover:bg-ivory/10"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 px-4 md:px-24" onClick={(e) => e.stopPropagation()}>
        {/* key remounts the figure so the CSS entrance runs on every photo change */}
        <div key={img.id} className="animate-rise-fade relative h-full w-full" style={{ animationDuration: "0.35s" }}>
          <Image src={img.src} alt={img.caption} fill sizes="100vw" quality={85} className="object-contain" />
        </div>
        <NavButton label="Previous photo" className="left-2 md:left-8" onClick={() => step(-1)}>
          <ChevronLeft size={22} />
        </NavButton>
        <NavButton label="Next photo" className="right-2 md:right-8" onClick={() => step(1)}>
          <ChevronRight size={22} />
        </NavButton>
      </div>

      <p className="px-6 py-6 text-center text-xs uppercase tracking-[0.1em] text-ivory/80">{img.caption}</p>
    </div>
  );
}

function NavButton({
  label,
  className,
  onClick,
  children,
}: {
  label: string;
  className: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-navy/70 text-ivory border border-ivory/20 hover:bg-navy ${className}`}
    >
      {children}
    </button>
  );
}
