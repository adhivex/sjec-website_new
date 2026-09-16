import type { MetadataRoute } from "next";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await db
    .select({ slug: projects.slug, imageUrl: projects.imageUrl, createdAt: projects.createdAt })
    .from(projects);

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/images/site/dri-kiln-hero.jpg")],
    },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    ...rows.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: new Date(`${p.createdAt.replace(" ", "T")}Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: p.imageUrl ? [absoluteUrl(p.imageUrl)] : undefined,
    })),
  ];
}
