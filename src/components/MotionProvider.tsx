"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// Loads only the DOM animation features used by the site. Components must use
// `m.*` (not `motion.*`); `strict` throws in dev if a full `motion` slips in.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
