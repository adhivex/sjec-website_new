import type { Metadata } from "next";
import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { projects, type Project } from "@/db/schema";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/Testimonial";
import { ProjectCard, StatusBadge } from "@/components/ProjectCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed and ongoing electrical projects across cement, DRI, pellet and rolling mill plants in Odisha, Jharkhand and West Bengal.",
  alternates: { canonical: "/projects" },
};

function totalCr(rows: Project[]) {
  return rows.reduce((sum, p) => sum + Number(p.valueCr), 0).toFixed(2);
}

export default async function ProjectsPage() {
  const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder));
  const ongoing = rows.filter((p) => p.status === "ongoing");
  const completed = rows.filter((p) => p.status === "completed");

  return (
    <>
      <NavBar />
      <main>
        <section className="px-6 md:px-12 pt-16 md:pt-24 pb-16">
          <div className="animate-rise mx-auto max-w-7xl">
            <div className="text-xs md:text-sm font-semibold uppercase tracking-[0.12em] text-brass-ink mb-6">
              Projects
            </div>
            <h1 className="font-display text-[2.4rem] leading-[1.08] sm:text-5xl md:text-6xl font-medium text-navy max-w-3xl">
              Plant electrical works, completed and underway.
            </h1>
            <dl className="mt-12 pt-9 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
              <Figure value={String(completed.length)} label="Projects completed" />
              <Figure value={`₹${totalCr(completed)} Cr`} label="Completed contract value" />
              <Figure value={String(ongoing.length)} label="Projects ongoing" />
              <Figure value={`₹${totalCr(ongoing)} Cr`} label="Ongoing contract value" />
            </dl>
          </div>
        </section>

        <ProjectGroup id="ongoing" title="Ongoing" rows={ongoing} tone="deep" />
        <ProjectGroup id="completed" title="Completed" rows={completed} tone="light" />

        <section className="px-6 md:px-12 pb-24 md:pb-32">
          <Reveal className="mx-auto max-w-7xl">
            <h2 className="font-display text-2xl md:text-3xl font-medium text-navy mb-8">At a glance</h2>
            <div className="overflow-x-auto border border-line rounded-sm">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-ivory-deep text-xs uppercase tracking-[0.08em] text-stone">
                  <tr>
                    <th className="px-5 py-4 font-medium">Project</th>
                    <th className="px-5 py-4 font-medium">Location</th>
                    <th className="px-5 py-4 font-medium">Capacity</th>
                    <th className="px-5 py-4 font-medium">Period</th>
                    <th className="px-5 py-4 font-medium text-right">Value (₹ Cr)</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((p) => (
                    <tr key={p.id} className="hover:bg-ivory-deep/60 transition-colors">
                      <td className="px-5 py-4">
                        <Link href={`/projects/${p.slug}`} className="font-medium text-navy hover:text-brass-deep">
                          {p.title}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-navy-soft">{p.location}</td>
                      <td className="px-5 py-4 text-navy-soft">{p.capacity}</td>
                      <td className="px-5 py-4 text-navy-soft">{p.period ?? "—"}</td>
                      <td className="px-5 py-4 text-right tabular-nums text-navy">{p.valueCr}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="text-sm text-muted mt-1.5">{label}</dt>
      <dd className="font-display text-3xl md:text-[2.2rem] text-brass-deep">{value}</dd>
    </div>
  );
}

function ProjectGroup({
  id,
  title,
  rows,
  tone,
}: {
  id: string;
  title: string;
  rows: Project[];
  tone: "deep" | "light";
}) {
  return (
    <section id={id} className={`px-6 md:px-12 py-20 md:py-24 ${tone === "deep" ? "bg-ivory-deep" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-navy mb-12">
            {title} <span className="text-stone">({rows.length})</span>
          </h2>
        </Reveal>
        <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {rows.map((project) => (
            <RevealItem key={project.id}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
