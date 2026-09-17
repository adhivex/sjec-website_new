import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, asc, eq, ne } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/Testimonial";
import { ProjectCard, StatusBadge } from "@/components/ProjectCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/Reveal";

// Every project page is generated at build time from the seed; unknown slugs 404
// without touching the database at runtime.
export const dynamicParams = false;

async function getProject(slug: string) {
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return project;
}

export async function generateStaticParams() {
  return db.select({ slug: projects.slug }).from(projects);
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.summary} ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const related = await db
    .select()
    .from(projects)
    .where(and(eq(projects.category, project.category), ne(projects.id, project.id)))
    .orderBy(asc(projects.sortOrder))
    .limit(3);

  const facts = [
    { label: "Client", value: project.client },
    { label: "Location", value: project.location },
    { label: "Sector", value: project.category },
    { label: "Plant capacity", value: project.capacity },
    { label: "Period", value: project.period ?? "In progress" },
    { label: "Contract value", value: `₹${project.valueCr} Cr` },
  ];

  return (
    <>
      <NavBar />
      <main>
        <article className="px-6 md:px-12 pt-12 md:pt-16 pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-navy-soft hover:text-navy"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              All projects
            </Link>

            <div className="animate-rise mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end">
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <StatusBadge status={project.status} />
                  <span className="text-xs uppercase tracking-[0.12em] text-brass-ink">{project.category}</span>
                </div>
                <h1 className="font-display text-[2.3rem] leading-[1.08] sm:text-5xl font-medium text-navy">
                  {project.title}
                </h1>
              </div>
              <p className="text-lg leading-relaxed text-muted">{project.summary}</p>
            </div>

            <div className="mt-12 grid lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16">
              <div className="animate-rise" style={{ animationDelay: "120ms" }}>
                {project.imageUrl && (
                  <figure>
                    <div className="relative h-[300px] sm:h-[460px] overflow-hidden rounded-sm bg-ivory-deep">
                      <Image
                        src={project.imageUrl}
                        alt="Electrical works at an industrial plant"
                        fill
                        preload
                        sizes="(min-width: 1024px) 65vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2.5 text-xs text-stone">
                      Representative photo of our electrical works. [Site-specific
                      photo to be supplied.]
                    </figcaption>
                  </figure>
                )}
                <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-navy-soft max-w-2xl">
                  {project.description.split("\n\n").map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </div>

              <Reveal>
                <dl className="border-t border-line">
                  {facts.map((f) => (
                    <div key={f.label} className="flex justify-between gap-6 border-b border-line py-4">
                      <dt className="text-xs uppercase tracking-[0.08em] text-stone pt-0.5">{f.label}</dt>
                      <dd className="text-right text-[15px] text-navy">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/#contact"
                  className="mt-8 flex h-[54px] items-center justify-center rounded-sm bg-navy px-8 text-[15px] font-semibold text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Discuss a similar project
                </Link>
              </Reveal>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="px-6 md:px-12 py-24 md:py-32 mb-24 md:mb-32 bg-ivory-deep">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-navy mb-14">
                  More {project.category.toLowerCase()} projects
                </h2>
              </Reveal>
              <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {related.map((p) => (
                  <RevealItem key={p.id}>
                    <ProjectCard project={p} />
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </section>
        )}
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
