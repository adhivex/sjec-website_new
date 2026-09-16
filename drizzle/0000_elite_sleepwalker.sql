CREATE TABLE `contact_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`project_type` text,
	`message` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gallery_images` (
	`id` text PRIMARY KEY NOT NULL,
	`src` text NOT NULL,
	`caption` text NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`client` text NOT NULL,
	`category` text NOT NULL,
	`status` text NOT NULL,
	`capacity` text NOT NULL,
	`value_cr` text NOT NULL,
	`period` text,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`year` text NOT NULL,
	`location` text NOT NULL,
	`image_url` text,
	`featured` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stats` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`value` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`quote` text NOT NULL,
	`author` text NOT NULL,
	`role` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
