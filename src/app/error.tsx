"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { COMPANY } from "@/content/company";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="px-6 md:px-12 py-32 md:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.12em] text-brass mb-5">Something went wrong</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium text-navy mb-5">
          This page didn&rsquo;t load.
        </h1>
        <p className="text-muted mb-10">
          Please try again. If it keeps happening, call us on +91 {COMPANY.phones[0]}.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-[54px] items-center justify-center rounded-sm bg-navy px-8 text-[15px] font-semibold text-ivory"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-[54px] items-center justify-center rounded-sm border border-line px-8 text-[15px] font-semibold text-navy"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
