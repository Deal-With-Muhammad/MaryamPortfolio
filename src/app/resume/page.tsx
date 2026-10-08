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
    <main className="min-h-dvh bg-blush-100 py-10 print:bg-white print:p-0">
      <article className="mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white text-[9.25pt] leading-[1.45] text-ink shadow-[0_30px_60px_-20px_rgb(176_63_102/0.3)] print:shadow-none">
        <header className="bg-blush-100 px-[14mm] pt-[12mm] pb-[7mm]">
          <h1 className="font-serif text-[28pt] leading-none font-medium tracking-[-0.01em]">
            {profile.name}
          </h1>
          <p className="mt-[2.5mm] text-[10.5pt] font-medium text-accent-deep">
            {profile.headline}
          </p>

          {/* Third column lines up with the sidebar text below (114mm main + 8mm gap + 5mm padding) */}
          <ul className="mt-[5mm] grid grid-cols-[58mm_69mm_auto] gap-y-[1.8mm] text-[8.5pt] text-ink-soft [&_svg]:size-[3.2mm] [&_svg]:shrink-0 [&_svg]:text-accent-deep">
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

        <div className="grid flex-1 grid-cols-[1fr_60mm] gap-[8mm] px-[14mm] pt-[7mm] pb-[10mm]">
          {/* Top padding matches the sidebar's so both columns start level */}
          <div className="pt-[5mm]">
            <Section title="Summary">
              <p className="text-ink-soft">{profile.summary}</p>
            </Section>

            <Section title="Experience">
              <ul className="space-y-[4mm]">
                {experience.map((job) => (
                  <li key={`${job.org}-${job.start}`}>
                    <Row
                      title={job.role}
                      date={job.start === job.end ? job.start : `${job.start} – ${job.end}`}
                    />
                    <p className="text-[9pt]">
                      <span className="text-accent-deep">{job.org}</span>
                      <span className="text-ink-faint"> · {job.location}</span>
                    </p>
                    <ul className="mt-[1.2mm] list-disc space-y-[0.5mm] pl-[3.8mm] text-ink-soft marker:text-accent">
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Education">
              <ul className="space-y-[2.6mm]">
                {education.map((e) => (
                  <li key={e.title}>
                    <Row title={e.title} date={e.dates} />
                    <p className="text-[9pt] text-accent-deep">{e.school}</p>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <aside className="flex flex-col rounded-[4mm] bg-blush-50 p-[5mm]">
            <Section title="Skills">
              <div className="space-y-[3mm]">
                {skills.map((s) => (
                  <div key={s.group}>
                    <p className="mb-[1mm] text-[9pt] font-semibold">{s.group}</p>
                    <ul className="list-disc space-y-[0.4mm] pl-[3.8mm] text-ink-soft marker:text-accent">
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
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
                    <p className="text-ink-soft">{h.detail}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Languages">
              <ul className="space-y-[1mm]">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between">
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-ink-soft">{l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <a
              href={profile.website}
              className="mt-auto flex items-center gap-[3.5mm] rounded-[3mm] border border-blush-200 bg-white p-[3mm]"
            >
              <span
                aria-hidden
                className="block size-[15mm] shrink-0 [&>svg]:size-full"
                dangerouslySetInnerHTML={{ __html: qr }}
              />
              <span>
                <span className="block text-[8pt] font-semibold tracking-[0.08em] text-accent-deep uppercase">
                  Portfolio
                </span>
                <span className="mt-[0.5mm] block text-ink-soft">View my artwork</span>
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
      <h2 className="mb-[3mm] flex items-center gap-[2.5mm] text-[8pt] leading-none font-semibold tracking-[0.08em] text-accent-deep uppercase">
        {title}
        <span className="h-px flex-1 bg-blush-200" />
      </h2>
      {children}
    </section>
  );
}

function Row({ title, date }: { title: string; date: string }) {
  return (
    <div className="flex items-baseline justify-between gap-[3mm]">
      <h3 className="text-[10.5pt] font-semibold">{title}</h3>
      <span className="shrink-0 text-[8.5pt] tabular-nums text-ink-faint">{date}</span>
    </div>
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
        <a href={href} className="flex items-center gap-[1.5mm] whitespace-nowrap">
          {content}
        </a>
      ) : (
        <span className="flex items-center gap-[1.5mm] whitespace-nowrap">{content}</span>
      )}
    </li>
  );
}
