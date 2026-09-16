import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  client: text("client").notNull(),
  category: text("category").notNull(), // "Cement" | "Steel & DRI" | "Pellet" | "Rolling Mill"
  status: text("status", { enum: ["completed", "ongoing"] }).notNull(),
  capacity: text("capacity").notNull(), // plant capacity, e.g. "500 TPD"
  valueCr: text("value_cr").notNull(), // contract value in ₹ crore, kept as written in the profile
  period: text("period"), // null while ongoing
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  year: text("year").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"), // representative photo of this kind of work, not necessarily this site
  featured: integer("featured", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // maps to a lucide-react icon name on the frontend
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
  role: text("role").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const stats = sqliteTable("stats", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: text("id").primaryKey(),
  src: text("src").notNull(), // path under /public
  caption: text("caption").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type"),
  message: text("message").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Project = typeof projects.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Stat = typeof stats.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
