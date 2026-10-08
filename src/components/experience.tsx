import { experience } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading index="01" title="Experience" />

      <ol className="border-t border-line">
        {experience.map((job, i) => (
          <li
            key={`${job.org}-${job.start}`}
            data-reveal
            style={{ "--d": i } as React.CSSProperties}
            className="grid gap-3 border-b border-line py-8 md:grid-cols-[200px_1fr] md:gap-10"
          >
            <div className="flex items-center gap-2 text-sm tabular-nums text-ink-faint md:flex-col md:items-start md:pt-2">
              <span>
                {job.start === job.end ? job.start : `${job.start} – ${job.end}`}
              </span>
              {job.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-100 px-2.5 py-0.5 text-xs font-medium text-accent-deep">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Current
                </span>
              )}
            </div>

            <div>
              <h3 className="font-serif text-2xl tracking-tight md:text-[1.75rem]">
                {job.role}
              </h3>
              <p className="mt-1 text-ink-soft">
                {job.org}
                <span className="mx-2 text-blush-300">/</span>
                {job.location}
              </p>
              <ul className="mt-4 space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
