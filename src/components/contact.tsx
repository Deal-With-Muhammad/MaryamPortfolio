"use client";

import { ArrowUpRight, Check, Copy, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { LinkedInIcon, WhatsAppIcon } from "./brand-icons";
import { SectionHeading } from "./section-heading";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pt-24 pb-16 md:pt-32">
      <SectionHeading index="04" title="Contact" />

      <div
        data-reveal
        className="relative overflow-hidden rounded-[2rem] bg-blush-100 px-6 py-12 md:px-14 md:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-blush-200 blur-3xl"
        />

        <div className="relative">
          <p className="font-serif text-4xl tracking-tight text-balance md:text-6xl">
            Let’s talk.
          </p>
          <p className="mt-4 max-w-md text-ink-soft text-pretty">
            Teaching, admin or art enquiries — I’d love to hear from you.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <EmailButton />
            <ContactLink href={profile.linkedin} icon={<LinkedInIcon />} external>
              LinkedIn
            </ContactLink>
            <ContactLink href={profile.whatsapp} icon={<WhatsAppIcon />} external>
              WhatsApp
            </ContactLink>
            <ContactLink href={profile.phoneHref} icon={<Phone />}>
              {profile.phone}
            </ContactLink>
          </div>
        </div>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-4 text-sm text-ink-faint sm:flex-row">
        <p>© {profile.name}</p>
        <p>{profile.location}</p>
        <a href="#top" className="hover:text-ink">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}

function EmailButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="flex items-stretch overflow-hidden rounded-full bg-ink text-blush-50 shadow-[0_10px_24px_-10px_rgb(43_27_34/0.5)]">
      <a
        href={`mailto:${profile.email}`}
        className="pressable flex items-center gap-2 py-3 pr-3 pl-6 font-medium hover:bg-accent-deep"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email"}
        className="pressable relative grid w-12 place-items-center border-l border-white/15 hover:bg-accent-deep"
      >
        <Copy className="swap col-start-1 row-start-1 size-4" data-hidden={copied} />
        <Check className="swap col-start-1 row-start-1 size-4" data-hidden={!copied} />
        <span role="status" className="sr-only">
          {copied ? "Copied" : ""}
        </span>
      </button>
    </div>
  );
}

function ContactLink({
  href,
  icon,
  external,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener" })}
      className="pressable group inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 font-medium hover:border-blush-300 [&>svg:first-child]:size-4 [&>svg:first-child]:text-accent-deep"
    >
      {icon}
      {children}
      {external && (
        <ArrowUpRight className="size-3.5 text-ink-faint transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </a>
  );
}
