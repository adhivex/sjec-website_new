import { db } from "@/db";
import { galleryImages, projects, services, stats, testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";

import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Safety } from "@/components/Safety";
import { Gallery } from "@/components/Gallery";
import { Process } from "@/components/Process";
import { Testimonial, CtaBand } from "@/components/Testimonial";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

export default async function Home() {
  const [statRows, serviceRows, projectRows, testimonialRows, galleryRows] = await Promise.all([
    db.select().from(stats).orderBy(asc(stats.sortOrder)),
    db.select().from(services).orderBy(asc(services.sortOrder)),
    db.select().from(projects).orderBy(asc(projects.sortOrder)),
    db.select().from(testimonials).orderBy(asc(testimonials.sortOrder)),
    db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder)),
  ]);

  return (
    <>
      <StructuredData />
      <NavBar />
      <main>
        <Hero stats={statRows} />
        <Services services={serviceRows} />
        <Projects projects={projectRows} />
        <About />
        <Safety />
        <Gallery images={galleryRows} />
        <Process />
        <Testimonial testimonial={testimonialRows[0]} />
        <CtaBand />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
