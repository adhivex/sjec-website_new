import { Reveal, RevealItem, RevealStagger } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Survey & Planning",
    body: "Site survey, drawings review and a clear scope for the electrical package.",
  },
  {
    n: "02",
    title: "Erection",
    body: "Panels, transformers, cable trays and cabling installed by supervised crews.",
  },
  {
    n: "03",
    title: "Testing & Commissioning",
    body: "Megger tests, motor trials, instrument calibration and PLC checks.",
  },
  {
    n: "04",
    title: "Handover & Support",
    body: "Documented handover, then maintenance and manpower support as needed.",
  },
];

export function Process() {
  return (
    <section id="process" className="px-6 md:px-12 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-navy mb-14">
            How We Work
          </h2>
        </Reveal>
        <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {STEPS.map((step) => (
            <RevealItem key={step.n}>
              <div className="font-display text-4xl text-line mb-4">{step.n}</div>
              <h3 className="font-display text-lg font-medium text-navy mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
