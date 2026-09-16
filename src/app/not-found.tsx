import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="px-6 md:px-12 py-32 md:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.12em] text-brass mb-5">404</div>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-navy mb-5">Page not found</h1>
          <p className="text-muted mb-10">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
          <Link
            href="/"
            className="inline-flex h-[54px] items-center justify-center rounded-sm bg-navy px-8 text-[15px] font-semibold text-ivory"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
