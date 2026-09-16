import Image from "next/image";
import { HardHat, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import safetyImage from "../../public/images/site/safety-briefing.jpg";

const POINTS = [
  { icon: ShieldCheck, text: "Policies and procedures reviewed and improved continually." },
  { icon: HardHat, text: "Dedicated safety officers on site to enforce them." },
  { icon: Users, text: "Safe conditions for our crews, the public and everyone who visits our sites." },
];

export function Safety() {
  return (
    <section id="safety" className="px-6 md:px-12 pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal className="relative h-[300px] sm:h-[420px] overflow-hidden rounded-sm bg-ivory-deep">
          <Image
            src={safetyImage}
            alt="Site crew in hard hats and safety vests at a safety briefing"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal>
          <div className="text-xs uppercase tracking-[0.12em] text-brass mb-5">Our commitment to safety</div>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-navy mb-6">
            Our target is zero harm.
          </h2>
          <p className="text-[17px] leading-relaxed text-navy-soft mb-8">
            Safety is our first priority at every stage of a project, from design and planning
            through to completion. Every level of our workforce shares the same objective.
          </p>
          <ul className="space-y-4">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-4">
                <Icon className="mt-0.5 shrink-0 text-brass" size={22} strokeWidth={1.5} />
                <span className="text-[15px] text-navy-soft">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
