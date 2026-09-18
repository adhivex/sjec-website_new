import type { Metadata, Viewport } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { COMPANY } from "@/content/company";
import { SITE_URL } from "@/lib/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const description = `${COMPANY.legalName} — HT/LT electrical erection, cabling, instrumentation and commissioning for steel, DRI, cement, pellet and power plants. Based in ${COMPANY.region}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.legalName} — Electrical HT/LT Contractor, ${COMPANY.region}`,
    template: `%s — ${COMPANY.legalName}`,
  },
  description,
  openGraph: {
    title: COMPANY.legalName,
    description,
    images: ["/images/brand/hero.jpg"],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="antialiased">
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
