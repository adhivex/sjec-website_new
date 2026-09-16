import { Zap, Building2, Cpu, Wrench, Cable, Gauge, Lamp, Users, type LucideIcon } from "lucide-react";
import type { Service } from "@/db/schema";
import { INDUSTRIES } from "@/content/company";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  building: Building2,
  cpu: Cpu,
  wrench: Wrench,
  cable: Cable,
  gauge: Gauge,
  lamp: Lamp,
  users: Users,
};

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="px-6 md:px-12 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-navy">What We Do</h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              Electrical and instrumentation works for heavy industry — from erection through
              testing and commissioning.
            </p>
          </div>
        </Reveal>
        <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Wrench;
            return (
              <RevealItem key={service.id} className="bg-ivory p-9">
                <Icon className="text-brass" size={30} strokeWidth={1.4} />
                <h3 className="font-display text-lg font-medium text-navy mt-6 mb-2.5">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
        <Reveal className="mt-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="shrink-0 text-xs uppercase tracking-[0.12em] text-stone">Industries served</div>
          <ul className="flex flex-wrap gap-2.5">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-line px-4 py-1.5 text-sm text-navy-soft"
              >
                {industry}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
