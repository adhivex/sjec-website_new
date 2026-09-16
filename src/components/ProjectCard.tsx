import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/db/schema";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative h-60 overflow-hidden rounded-sm bg-ivory">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone">[Project Photo]</div>
        )}
        <StatusBadge status={project.status} className="absolute left-3 top-3" />
      </div>
      <div className="pt-5">
        <div className="text-xs uppercase tracking-[0.08em] text-brass mb-2">
          {project.category} · {project.capacity}
        </div>
        <h3 className="font-display text-lg font-medium text-navy mb-1.5 group-hover:text-brass-deep transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted">
          {project.location} · {project.status === "completed" ? project.year : "In progress"}
        </p>
      </div>
    </Link>
  );
}

export function StatusBadge({ status, className = "" }: { status: Project["status"]; className?: string }) {
  const ongoing = status === "ongoing";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
        ongoing ? "bg-brass text-navy" : "bg-navy text-ivory"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ongoing ? "bg-navy" : "bg-brass"}`} />
      {ongoing ? "Ongoing" : "Completed"}
    </span>
  );
}
