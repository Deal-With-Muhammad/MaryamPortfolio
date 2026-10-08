import { Award, GraduationCap, Languages } from "lucide-react";
import { education, highlights, languages, skills } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading index="03" title="About" />

      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div data-reveal>
          <p className="font-serif text-2xl leading-snug tracking-tight text-pretty md:text-3xl">
            I teach, I keep schools running, and I make things with my hands.
          </p>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft text-pretty">
            I’ve taught in primary, refugee and special-needs classrooms, and
            online to students across five countries. Outside class I paint,
            do henna and crochet.
          </p>

          <div className="mt-10 space-y-6">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="mb-2.5 text-xs font-medium tracking-[0.12em] text-ink-faint uppercase">
                  {s.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card icon={<GraduationCap />} title="Education" className="sm:col-span-2" d={1}>
            <ul className="divide-y divide-line">
              {education.map((e) => (
                <li
                  key={e.title}
                  className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-ink-soft">{e.school}</p>
                  </div>
                  <p className="shrink-0 text-sm tabular-nums text-ink-faint">{e.dates}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={<Languages />} title="Languages" d={2}>
            <ul className="space-y-3">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-3">
                  <span>
                    {l.name}
                    <span className="ml-2 text-sm text-ink-faint">{l.level}</span>
                  </span>
                  <span className="flex gap-1" aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`size-1.5 rounded-full ${i < l.score ? "bg-accent" : "bg-blush-200"}`}
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={<Award />} title="Highlights" d={3}>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h.title}>
                  <p className="font-medium">{h.title}</p>
                  <p className="text-sm text-ink-soft">{h.detail}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  children,
  className = "",
  d,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  d: number;
}) {
  return (
    <div
      data-reveal
      style={{ "--d": d } as React.CSSProperties}
      className={`rounded-3xl border border-line bg-white p-6 ${className}`}
    >
      <div className="mb-5 flex items-center gap-2.5 text-accent-deep [&_svg]:size-4">
        {icon}
        <h3 className="text-xs font-medium tracking-[0.12em] uppercase">{title}</h3>
      </div>
      {children}
    </div>
  );
}
