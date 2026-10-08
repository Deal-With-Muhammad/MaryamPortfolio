import type { Metadata } from "next";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import QRCode from "qrcode";
import { LinkedInIcon } from "@/components/brand-icons";
import {
  education,
  experience,
  highlights,
  languages,
  profile,
  skills,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Résumé",
  robots: { index: false },
};

// Print source for public/Maryam-Basit-Resume.pdf — see README.
export default async function ResumePage() {
  const qr = await QRCode.toString(profile.website, {
    type: "svg",
    margin: 0,
    color: { dark: "#2b1b22", light: "#0000" },
  });

  return (
    <main className="resume-screen min-h-dvh bg-blush-100 py-10 print:bg-white print:p-0">
      <article className="resume-page mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white text-[9.25pt] leading-[1.45] text-ink shadow-[0_30px_60px_-20px_rgb(176_63_102/0.3)] print:shadow-none">
        <header className="bg-blush-100 px-[14mm] pt-[13mm] pb-[8mm]">
          <h1
            className="font-serif text-[30pt] leading-none tracking-[-0.01em]"
            style={{ fontVariationSettings: '"SOFT" 100' }}
          >
            Maryam <em className="text-accent-deep">Basit</em>
          </h1>
          <p className="mt-[2.5mm] text-[10pt] font-medium tracking-[0.04em] text-accent-deep">
            {profile.headline}
          </p>

          <ul className="mt-[5mm] flex flex-wrap gap-x-[5mm] gap-y-[1.6mm] text-[8.5pt] text-ink-soft [&_svg]:size-[3.2mm] [&_svg]:shrink-0 [&_svg]:text-accent-deep">
            <ContactItem icon={<Phone />} href={profile.phoneHref}>
              {profile.phone}
            </ContactItem>
            <ContactItem icon={<Mail />} href={`mailto:${profile.email}`}>
              {profile.email}
            </ContactItem>
            <ContactItem icon={<MapPin />}>{profile.location}</ContactItem>
            <ContactItem icon={<Globe />} href={profile.website}>
              {profile.websiteLabel}
            </ContactItem>
            <ContactItem icon={<LinkedInIcon />} href={profile.linkedin}>
              {profile.linkedinLabel}
            </ContactItem>
          </ul>
        </header>

        <div className="grid flex-1 grid-cols-[1fr_58mm] gap-[8mm] px-[14mm] pt-[8mm] pb-[10mm]">
          <div>
            <Section title="Summary">
              <p className="text-ink-soft">{profile.summary}</p>
            </Section>

            <Section title="Experience">
              <ul className="space-y-[4.2mm]">
                {experience.map((job) => (
                  <li key={`${job.org}-${job.start}`} className="break-inside-avoid">
                    <div className="flex items-baseline justify-between gap-[3mm]">
                      <h3 className="text-[10.5pt] font-semibold">{job.role}</h3>
                      <span className="shrink-0 text-[8.5pt] tabular-nums text-ink-faint">
                        {job.start === job.end ? job.start : `${job.start} – ${job.end}`}
                      </span>
                    </div>
                    <p className="text-[9pt] text-accent-deep">
                      {job.org}
                      <span className="text-ink-faint"> · {job.location}</span>
                    </p>
                    <ul className="mt-[1.2mm] space-y-[0.6mm] text-ink-soft">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-[2mm]">
                          <span
                            aria-hidden
                            className="mt-[0.62em] size-[1.1mm] shrink-0 rounded-full bg-accent"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Education">
              <ul className="space-y-[2.6mm]">
                {education.map((e) => (
                  <li key={e.title} className="flex items-baseline justify-between gap-[3mm]">
                    <div>
                      <h3 className="text-[10pt] font-semibold">{e.title}</h3>
                      <p className="text-[9pt] text-accent-deep">{e.school}</p>
                    </div>
                    <span className="shrink-0 text-[8.5pt] tabular-nums text-ink-faint">
                      {e.dates}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <aside className="flex flex-col rounded-[4mm] bg-blush-50 px-[5mm] py-[5mm]">
            <Section title="Skills">
              <div className="space-y-[3mm]">
                {skills.map((s) => (
                  <div key={s.group}>
                    <p className="mb-[1.4mm] text-[8.5pt] font-semibold">{s.group}</p>
                    <ul className="flex flex-wrap gap-[1.4mm]">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-blush-200 bg-white px-[2.2mm] py-[0.5mm] text-[8pt] text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Highlights">
              <ul className="space-y-[2mm]">
                {highlights.map((h) => (
                  <li key={h.title}>
                    <p className="font-semibold">{h.title}</p>
                    <p className="text-[8.5pt] text-ink-soft">{h.detail}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Languages">
              <ul className="space-y-[1.8mm]">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-center justify-between">
                    <span>
                      <span className="font-semibold">{l.name}</span>
                      <span className="ml-[1.5mm] text-[8pt] text-ink-faint">{l.level}</span>
                    </span>
                    <span className="flex gap-[0.9mm]" aria-hidden>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`size-[1.6mm] rounded-full ${i < l.score ? "bg-accent" : "bg-blush-200"}`}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <a
              href={profile.website}
              className="mt-auto flex items-center gap-[3.5mm] rounded-[3mm] border border-blush-200 bg-white p-[3.5mm]"
            >
              <span
                aria-hidden
                className="block size-[17mm] shrink-0 [&>svg]:size-full"
                dangerouslySetInnerHTML={{ __html: qr }}
              />
              <span>
                <span className="block text-[8pt] font-semibold tracking-[0.08em] text-accent-deep uppercase">
                  Portfolio
                </span>
                <span className="mt-[1mm] block text-[8.5pt] leading-snug text-ink-soft">
                  Scan to see my painting, henna and crochet.
                </span>
              </span>
            </a>
          </aside>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-[6mm] last:mb-0">
      <h2 className="mb-[3mm] flex items-center gap-[2.5mm] text-[8pt] font-semibold tracking-[0.08em] text-accent-deep uppercase">
        {title}
        <span className="h-px flex-1 bg-blush-200" />
      </h2>
      {children}
    </section>
  );
}

function ContactItem({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      {icon}
      {children}
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-[1.5mm]">
          {content}
        </a>
      ) : (
        <span className="flex items-center gap-[1.5mm]">{content}</span>
      )}
    </li>
  );
}
