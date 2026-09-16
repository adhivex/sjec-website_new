import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/db/schema";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-32 bg-ivory-deep">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-navy">Selected Projects</h2>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-navy"
            >
              All {projects.length} projects
              <ArrowRight size={18} className="text-brass transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {featured.map((project) => (
            <RevealItem key={project.id}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
