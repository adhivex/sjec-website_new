// Company facts that appear in several components (nav, hero, footer,
// contact, metadata). Sourced from the client's company profile PDF
// ("SAI JAGANNATH PROFILE with credentials.pdf"). Edit here, not inline.

export const COMPANY = {
  name: "Sai Jagannath",
  legalName: "Sai Jagannath Engineering & Construction",
  tagline: "Engineering & Construction",
  region: "Cuttack, Odisha",
  journeyBegan: 2005,
  independentSince: 2013,
  phones: ["9438509604", "8917298829"],
  email: "saijagannathengineering@gmail.com",
  address: [
    "Near Veterinary Office",
    "At – Kotar, Gurudijhatia",
    "Dist. Cuttack, Odisha – 754028",
  ],
  electricalLicence: "2654 (HT)",
  gstin: "21ACQFS8125G1ZO",
} as const;

export const INDUSTRIES = [
  "Steel & sponge iron (350–650 TPD DRI, SMS)",
  "Cement",
  "Power",
  "Pellet",
  "Textile & fabric",
];

// From "About us" in the profile.
export const CLIENTS = [
  "UltraTech Cement",
  "Dalmia Bharat",
  "Shree Cement",
  "JK Lakshmi Cement",
  "Rungta Mines",
  "NIPL, Jharkhand",
  "Aarti Steel",
  "Maheshwari Ispat",
  "Bhubaneswari Power",
  "Jockey India",
  "Astral India",
  "OPTCL, Odisha",
];

export const LEADERSHIP = [
  { group: "Partners", people: ["Lopamudra Biswal", "Pranakrushna Sahoo", "Bibhuti Bhushan Pratihari"] },
  {
    group: "Advisors",
    people: [
      "Ghanshyam Pattnaik — Ex. DGM, SAIL Rourkela",
      "D. K. Jha — Ex. GM, Tata Growth Shop",
      "M. M. Mishra — B.Tech (Electrical), independent advisor",
    ],
  },
  {
    group: "Project Managers",
    people: ["Bhoodev Sharma — AMIE (Elec.)", "Prashant Goudu — AMIE (Elec.)", "Pintu Saha — B.Tech (Elec.)"],
  },
];

export const TEAM_SUMMARY = "7 site-in-charge engineers and 7 supervisors on the ground";

// "Construction equipment, tools & tackles" list — the headline items.
export const EQUIPMENT = [
  { qty: "2", label: "Hydra cranes (12 MT & 20 MT)" },
  { qty: "1", label: "JCB" },
  { qty: "35", label: "Welding rectifiers" },
  { qty: "10", label: "Hydraulic crimping tools" },
  { qty: "5", label: "Megger insulation testers" },
  { qty: "20", label: "33 kV / 11 kV HT-rated safety gloves" },
];
