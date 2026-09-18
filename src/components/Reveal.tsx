import type { ReactNode } from "react";

// Server components: the scroll reveal is pure CSS (see `.reveal` in
// globals.css). Nothing here hides content, so the page is fully readable
// before — or without — JavaScript. Framer Motion used to render these with
// `opacity: 0` in the HTML, which left phones staring at empty boxes until
// hydration finished.

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  return <div className={className ? `reveal ${className}` : "reveal"}>{children}</div>;
}

export function RevealStagger({ children, className }: RevealProps) {
  return <div className={className ? `reveal-stagger ${className}` : "reveal-stagger"}>{children}</div>;
}

export function RevealItem({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
