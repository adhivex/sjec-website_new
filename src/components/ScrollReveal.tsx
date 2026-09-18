"use client";

import { useEffect } from "react";

// Progressive enhancement for the scroll reveals.
//
// The server renders every section visible. After hydration this hides only
// the elements that are still below the fold and fades them in as they come
// into view. Nothing is hidden before or without JavaScript, so a slow phone
// or a failed script shows a complete page rather than empty boxes.
//
// Replaces Framer Motion's whileInView, which wrote opacity:0 into the HTML.
const SELECTOR = ".reveal, .reveal-stagger > *";
const STAGGER_MS = 80;

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const siblings = el.parentElement?.classList.contains("reveal-stagger")
            ? [...el.parentElement.children].indexOf(el)
            : 0;
          el.style.animationDelay = `${Math.min(siblings, 5) * STAGGER_MS}ms`;
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    const viewportBottom = window.innerHeight;
    for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) {
      // Anything already on screen stays as it is — no flash, no late fade-in.
      if (el.getBoundingClientRect().top <= viewportBottom) continue;
      el.classList.add("will-reveal");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
