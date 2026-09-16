import { COMPANY, INDUSTRIES } from "@/content/company";
import { absoluteUrl } from "@/lib/site";

// schema.org business data for search engines. Only facts from the profile.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": absoluteUrl("/#business"),
    name: COMPANY.legalName,
    url: absoluteUrl("/"),
    image: absoluteUrl("/images/site/dri-kiln-hero.jpg"),
    logo: absoluteUrl("/icon.svg"),
    description:
      "Electrical HT/LT contractor and general order supplier: electrical erection, cabling, instrumentation and commissioning for industrial plants.",
    telephone: COMPANY.phones.map((p) => `+91${p}`),
    email: COMPANY.email,
    foundingDate: String(COMPANY.independentSince),
    taxID: COMPANY.gstin,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Veterinary Office, Kotar, Gurudijhatia",
      addressLocality: "Cuttack",
      addressRegion: "Odisha",
      postalCode: "754028",
      addressCountry: "IN",
    },
    areaServed: ["Odisha", "Jharkhand", "West Bengal"],
    knowsAbout: INDUSTRIES,
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
