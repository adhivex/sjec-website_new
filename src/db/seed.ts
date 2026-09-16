import { db } from "./index";
import { projects, services, testimonials, stats, galleryImages } from "./schema";
import { createId } from "../lib/id";

// Content below comes from the client's company profile PDF. Anything the
// profile doesn't state is left as a [bracketed placeholder].

type ProjectSeed = Omit<typeof projects.$inferInsert, "id" | "sortOrder" | "description">;

const IMG = {
  cement: "/images/site/cement-cable-routing-1.jpg",
  cementVrm: "/images/site/cement-vrm-2.jpg",
  cementSilo: "/images/site/cement-silo.jpg",
  cementMcc: "/images/site/cement-mcc-room.jpg",
  dri: "/images/site/dri-kiln-cable-laying.jpg",
  driKiln: "/images/site/dri-kiln-hero.jpg",
  driPanel: "/images/site/dri-panel-room-2.jpg",
  switchboard: "/images/site/switchgear-10.jpg",
  cableTray: "/images/site/switchgear-16.jpg",
  trestle: "/images/site/switchgear-14.jpg",
};

const PROJECTS: ProjectSeed[] = [
  // ── Ongoing ──────────────────────────────────────────────
  {
    title: "UltraTech Cement Grinding Unit",
    slug: "ultratech-cement-grinding-unit-cuttack",
    client: "UltraTech Cement",
    category: "Cement",
    status: "ongoing",
    capacity: "4000 TPD",
    valueCr: "5.50",
    period: null,
    year: "Ongoing",
    location: "Cuttack, Odisha",
    summary: "Electrical works for a 4000 TPD cement grinding unit.",
    imageUrl: IMG.cementVrm,
    featured: true,
  },
  {
    title: "Beekay Steel — Power Plant, DRI & FAD",
    slug: "beekay-steel-khuntni",
    client: "Beekay Steel Pvt. Ltd.",
    category: "Steel & DRI",
    status: "ongoing",
    capacity: "PP, DRI, FAD",
    valueCr: "1.6",
    period: null,
    year: "Ongoing",
    location: "Khuntni, Odisha",
    summary: "Electrical works across the power plant, DRI and FAD packages.",
    imageUrl: IMG.trestle,
    featured: true,
  },
  {
    title: "NIPL Kandra — DRI 3",
    slug: "nipl-kandra-dri-3",
    client: "NIPL",
    category: "Steel & DRI",
    status: "ongoing",
    capacity: "600 TPD",
    valueCr: "0.90",
    period: null,
    year: "Ongoing",
    location: "Kandra, Jharkhand",
    summary: "Third DRI kiln for NIPL at Kandra, following DRI 1 and DRI 2.",
    imageUrl: IMG.driKiln,
    featured: false,
  },
  {
    title: "RML DSP — DRI 3",
    slug: "rml-dsp-dri-3",
    client: "Rungta Mines Ltd.",
    category: "Steel & DRI",
    status: "ongoing",
    capacity: "600 TPD",
    valueCr: "0.72",
    period: null,
    year: "Ongoing",
    location: "Dhenkanal, Odisha",
    summary: "Electrical works for a 600 TPD DRI kiln.",
    imageUrl: IMG.dri,
    featured: false,
  },
  {
    title: "SIPL Rolling Mill",
    slug: "sipl-asansol-rolling-mill",
    client: "SIPL",
    category: "Rolling Mill",
    status: "ongoing",
    capacity: "55 TPH",
    valueCr: "0.50",
    period: null,
    year: "Ongoing",
    location: "Asansol, West Bengal",
    summary: "Electrical works for a 55 TPH rolling mill.",
    imageUrl: IMG.switchboard,
    featured: false,
  },
  {
    title: "Shyam SEL — CRM Project",
    slug: "shyam-sel-crm-jamuria",
    client: "Shyam SEL",
    category: "Rolling Mill",
    status: "ongoing",
    capacity: "PP, DRI, FAD",
    valueCr: "0.10",
    period: null,
    year: "Ongoing",
    location: "Jamuria, Durgapur, West Bengal",
    summary: "Electrical works on the CRM project at Jamuria.",
    imageUrl: IMG.cableTray,
    featured: false,
  },
  {
    title: "RML DSP — Slag Crusher & Oxygen Plant",
    slug: "rml-dsp-slag-crusher-oxygen-plant",
    client: "Rungta Mines Ltd.",
    category: "Steel & DRI",
    status: "ongoing",
    capacity: "600 TPD",
    valueCr: "0.078",
    period: null,
    year: "Ongoing",
    location: "Dhenkanal, Odisha",
    summary: "Electrical works for the slag crusher and oxygen plant.",
    imageUrl: IMG.trestle,
    featured: false,
  },
  // ── Completed ────────────────────────────────────────────
  {
    title: "Rungta Mines — Pellet Project",
    slug: "rungta-mines-pellet-project",
    client: "Rungta Mines Ltd.",
    category: "Pellet",
    status: "completed",
    capacity: "4000 MT",
    valueCr: "2.25",
    period: "Sep 2022 – Mar 2023",
    year: "2023",
    location: "Dhenkanal, Odisha",
    summary: "Electrical works for a 4000 MT pellet plant.",
    imageUrl: IMG.driPanel,
    featured: true,
  },
  {
    title: "Dalmia Cement — Kapilas Cement Works",
    slug: "dalmia-cement-kapilas",
    client: "Dalmia Cement (Bharat)",
    category: "Cement",
    status: "completed",
    capacity: "3000 TPD",
    valueCr: "1.64",
    period: "Nov 2020 – Mar 2021",
    year: "2021",
    location: "Cuttack, Odisha",
    summary: "Electrical works for the 3000 TPD Kapilas cement works.",
    imageUrl: IMG.cementSilo,
    featured: true,
  },
  {
    title: "Bangur Cement",
    slug: "bangur-cement-cuttack",
    client: "Bangur Cement",
    category: "Cement",
    status: "completed",
    capacity: "4500 TPD",
    valueCr: "1.60",
    period: "Mar 2019 – Mar 2020",
    year: "2020",
    location: "Cuttack, Odisha",
    summary: "Electrical works for a 4500 TPD cement plant.",
    imageUrl: IMG.cement,
    featured: true,
  },
  {
    title: "J.K. Cement Works",
    slug: "jk-cement-works-cuttack",
    client: "J.K. Cement",
    category: "Cement",
    status: "completed",
    capacity: "2000 TPD",
    valueCr: "1.25",
    period: "2018 – Mar 2019",
    year: "2019",
    location: "Cuttack, Odisha",
    summary: "Electrical works for a 2000 TPD cement plant.",
    imageUrl: IMG.cementMcc,
    featured: false,
  },
  {
    title: "Rungta Mines — DRI Project",
    slug: "rungta-mines-dri-project",
    client: "Rungta Mines Ltd.",
    category: "Steel & DRI",
    status: "completed",
    capacity: "500 TPD",
    valueCr: "0.88",
    period: "Apr 2019 – Jan 2020",
    year: "2020",
    location: "Dhenkanal, Odisha",
    summary: "Electrical works for a 500 TPD DRI kiln.",
    imageUrl: IMG.dri,
    featured: true,
  },
  {
    title: "NIPL Kandra — DRI 1",
    slug: "nipl-kandra-dri-1",
    client: "NIPL",
    category: "Steel & DRI",
    status: "completed",
    capacity: "500 TPD",
    valueCr: "0.80",
    period: "Oct 2020 – Mar 2021",
    year: "2021",
    location: "Kandra, Jharkhand",
    summary: "Electrical works for NIPL's first 500 TPD DRI kiln.",
    imageUrl: IMG.driKiln,
    featured: false,
  },
  {
    title: "NIPL Kandra — DRI 2",
    slug: "nipl-kandra-dri-2",
    client: "NIPL",
    category: "Steel & DRI",
    status: "completed",
    capacity: "500 TPD",
    valueCr: "0.60",
    period: "2021 – 2022",
    year: "2022",
    location: "Kandra, Jharkhand",
    summary: "Electrical works for NIPL's second 500 TPD DRI kiln.",
    imageUrl: IMG.driPanel,
    featured: false,
  },
];

function describe(p: ProjectSeed): string {
  const plant = /\d/.test(p.capacity) ? `the ${p.capacity} plant` : `the ${p.capacity} packages`;
  const when =
    p.status === "completed"
      ? `Completed ${p.period}, with a contract value of ₹${p.valueCr} crore.`
      : `Currently in progress, with a contract value of ₹${p.valueCr} crore.`;
  return [
    `Electrical contract for ${plant} at ${p.client}, ${p.location}. ${when}`,
    "[Detailed scope of work for this project — e.g. HT/LT panel erection, cable tray fabrication, cable laying & termination, motor testing — to be confirmed by the client.]",
  ].join("\n\n");
}

const SERVICES = [
  {
    title: "HT / LT Electrical Erection",
    description:
      "Installation and commissioning of HT/LT panels, transformers, generators and plant electrical equipment.",
    icon: "zap",
  },
  {
    title: "Cable Trays & Cabling",
    description:
      "Cable tray fabrication and installation, HT/LT cable laying and termination across the plant.",
    icon: "cable",
  },
  {
    title: "Motor Testing & Commissioning",
    description: "Testing and commissioning of LT and HT motors, ready for handover to operations.",
    icon: "gauge",
  },
  {
    title: "Instrumentation & PLC",
    description:
      "Instrument panels, calibration, field instruments, PLC systems and complete robo-lab automation.",
    icon: "cpu",
  },
  {
    title: "Street Light & High-Mast Poles",
    description: "Erection and installation of street light and high-mast poles, with or without material.",
    icon: "lamp",
  },
  {
    title: "Skilled Manpower Supply",
    description: "Skilled and unskilled crews for electrical and instrumentation work, shutdowns and maintenance.",
    icon: "users",
  },
];

const GALLERY = [
  { src: "dri-kiln-cable-laying.jpg", caption: "DRI kiln cable laying — 500 TPD kiln", width: 1250, height: 1600 },
  { src: "dri-panel-room-2.jpg", caption: "DRI panel room", width: 1264, height: 824 },
  { src: "cement-cable-routing-1.jpg", caption: "Cable routing, cement plant", width: 1110, height: 610 },
  { src: "transformer-erection.jpg", caption: "Transformer erection", width: 1170, height: 670 },
  { src: "cement-vrm-2.jpg", caption: "VRM of cement plant", width: 1150, height: 880 },
  { src: "high-mast-erection.jpg", caption: "High-mast pole erection", width: 1329, height: 1300 },
  { src: "drive-unit.jpg", caption: "Drive unit", width: 1280, height: 1469 },
  { src: "cement-mcc-room.jpg", caption: "MCC room of cement plant", width: 1280, height: 1060 },
  { src: "cement-silo.jpg", caption: "Cement silo", width: 1190, height: 1300 },
  { src: "switchgear-1.jpg", caption: "LT panel installation", width: 1280, height: 960 },
  { src: "switchgear-2.jpg", caption: "Switchgear line-up", width: 780, height: 1040 },
  { src: "switchgear-16.jpg", caption: "Cable tray routing", width: 1040, height: 780 },
  { src: "switchgear-10.jpg", caption: "HT switchboard", width: 1280, height: 720 },
  { src: "switchgear-13.jpg", caption: "Cable gantry", width: 1040, height: 780 },
  { src: "switchgear-12.jpg", caption: "Drive panels", width: 1280, height: 720 },
  { src: "dri-panel-room-1.jpg", caption: "DRI panel room", width: 1284, height: 528 },
];

export async function seed() {
  console.log("Seeding database with Sai Jagannath profile content...");

  await db.delete(projects);
  await db.delete(services);
  await db.delete(testimonials);
  await db.delete(stats);
  await db.delete(galleryImages);

  await db.insert(projects).values(
    PROJECTS.map((p, i) => ({
      ...p,
      id: createId(),
      description: describe(p),
      sortOrder: i + 1,
    })),
  );

  await db.insert(services).values(SERVICES.map((s, i) => ({ ...s, id: createId(), sortOrder: i + 1 })));

  // No client testimonial in the profile yet.
  await db.insert(testimonials).values([
    {
      id: createId(),
      quote:
        "[A short, credible client quote about reliability, quality and on-time delivery goes here.]",
      author: "[Client Name]",
      role: "[Client Title / Company]",
      sortOrder: 1,
    },
  ]);

  // All figures derived from the profile: journey began 2005; 7 completed +
  // 7 ongoing projects; ₹9.02 Cr completed + ₹9.40 Cr ongoing; 12 named clients.
  await db.insert(stats).values([
    { id: createId(), label: "In the field since", value: "2005", sortOrder: 1 },
    { id: createId(), label: "Plant projects (7 underway)", value: "14", sortOrder: 2 },
    { id: createId(), label: "Contract value, done & ongoing", value: "₹18 Cr+", sortOrder: 3 },
    { id: createId(), label: "Industrial clients served", value: "12+", sortOrder: 4 },
  ]);

  await db.insert(galleryImages).values(
    GALLERY.map((g, i) => ({ ...g, src: `/images/site/${g.src}`, id: createId(), sortOrder: i + 1 })),
  );

  console.log("Seed complete.");
}

