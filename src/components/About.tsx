import { COMPANY, CLIENTS, LEADERSHIP, TEAM_SUMMARY, EQUIPMENT } from "@/content/company";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

const PRINCIPLES = [
  {
    title: "Mission",
    body: "Raise our standards continually and deliver quality that exceeds our clients' expectations.",
  },
  {
    title: "Vision",
    body: "Strengthen India's engineering industry with an honest approach and a team that works with self-respect and satisfaction.",
  },
  {
    title: "Quality",
    body: "On time, within budget, reliably — getting it right the first time and upgrading our technical competence continually.",
  },
];

export function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.12em] text-brass mb-5">About us</div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-navy leading-tight">
              Two decades on the plant floor.
            </h2>
          </Reveal>
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-navy-soft">
            <p>
              Our journey began in {COMPANY.journeyBegan} with M/s Sri Jagannath. In{" "}
              {COMPANY.independentSince} we set out on our own as {COMPANY.legalName}, providing
              maintenance and project electrical works for cement, steel and cotton plants.
            </p>
            <p>
              We are a licensed electrical HT/LT contractor and general order supplier, run by
              senior professionals and backed by a team of qualified, experienced engineers. We
              recruit fresh technicians and engineers and train them on the job, so the people on
              your site know both the theory and the work.
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-16 md:mt-20 grid md:grid-cols-3 gap-px bg-line border border-line">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.title} className="bg-ivory p-9">
              <h3 className="font-display text-lg font-medium text-navy mb-2.5">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.body}</p>
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-20 md:mt-24 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <h3 className="font-display text-2xl font-medium text-navy mb-8">Leadership</h3>
            <dl className="space-y-7">
              {LEADERSHIP.map((g) => (
                <div key={g.group} className="grid sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6">
                  <dt className="text-xs uppercase tracking-[0.08em] text-stone pt-1">{g.group}</dt>
                  <dd>
                    <ul className="space-y-1.5 text-[15px] text-navy">
                      {g.people.map((person) => (
                        <li key={person}>{person}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
              <div className="grid sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6">
                <dt className="text-xs uppercase tracking-[0.08em] text-stone pt-1">On site</dt>
                <dd className="text-[15px] text-navy">{TEAM_SUMMARY}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal>
            <h3 className="font-display text-2xl font-medium text-navy mb-8">Plant &amp; equipment</h3>
            <ul className="grid grid-cols-2 gap-px bg-line border border-line">
              {EQUIPMENT.map((e) => (
                <li key={e.label} className="bg-ivory p-5">
                  <div className="font-display text-2xl text-brass">{e.qty}</div>
                  <div className="mt-1 text-sm text-muted">{e.label}</div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-stone">
              Plus drilling, grinding, cutting, crimping and lifting tackle for full erection work.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20 md:mt-24 pt-10 border-t border-line">
          <div className="text-xs uppercase tracking-[0.12em] text-stone mb-6">Trusted by</div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
            {CLIENTS.map((client) => (
              <li key={client} className="font-display text-lg text-navy-soft">
                {client}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
