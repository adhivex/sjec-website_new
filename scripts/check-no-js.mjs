// Guards the rule that broke the site on phones once already: no element may
// arrive hidden in the server HTML. Framer Motion's whileInView shipped
// `opacity: 0` inline, so until hydration finished a real phone showed empty
// boxes — every emulated desktop check still passed.
//
//   node scripts/check-no-js.mjs [baseUrl]      # default http://localhost:3000
//
// Exits non-zero if any page contains inline zero-opacity (or visibility:
// hidden) styles.
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const HIDDEN = /style="[^"]*(?:opacity:\s*0(?!\.\d*[1-9])|visibility:\s*hidden)[^"]*"/gi;

async function routes() {
  const fixed = ["/", "/projects"];
  try {
    const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
    const first = [...sitemap.matchAll(/<loc>([^<]+\/projects\/[^<]+)<\/loc>/g)][0]?.[1];
    if (first) fixed.push(new URL(first).pathname);
  } catch {
    // sitemap is optional for this check
  }
  return fixed;
}

let failures = 0;

for (const route of await routes()) {
  const res = await fetch(base + route);
  const html = await res.text();
  const hits = [...html.matchAll(HIDDEN)];
  const status = hits.length === 0 ? "ok" : `${hits.length} hidden element(s)`;
  console.log(`${res.status} ${route.padEnd(44)} ${status}`);
  if (hits.length) {
    failures += hits.length;
    for (const hit of hits.slice(0, 3)) console.log(`    ${hit[0].slice(0, 120)}`);
  }
}

if (failures) {
  console.error(
    `\nFAIL: ${failures} element(s) render hidden before JavaScript runs.\n` +
      "Content must be visible without JS — see the animation notes in CLAUDE.md.",
  );
  process.exit(1);
}

console.log("\nPASS: every page renders its content without JavaScript.");
