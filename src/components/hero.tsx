import Image from "next/image";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { heroArt, profile } from "@/lib/data";
import { LinkedInIcon } from "./brand-icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft blush wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_25%,var(--color-blush-200),transparent_70%),radial-gradient(35%_35%_at_5%_45%,var(--color-blush-100),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-32 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pt-40 md:pb-28">
        <div>
          <p
            className="hero-in inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1 text-sm text-ink-soft"
            style={{ "--d": 0 } as React.CSSProperties}
          >
            <MapPin className="size-3.5 text-accent" />
            {profile.location}
          </p>

          <h1
            className="hero-in mt-6 font-serif text-[clamp(3.25rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.02em]"
            style={{ "--d": 1, fontVariationSettings: '"SOFT" 100' } as React.CSSProperties}
          >
            Maryam <em className="text-accent-deep">Basit</em>
          </h1>

          <p
            className="hero-in mt-6 max-w-md text-lg leading-relaxed text-ink-soft text-pretty"
            style={{ "--d": 2 } as React.CSSProperties}
          >
            Teacher and school administrator. Artist the rest of the time —
            paint, henna and crochet.
          </p>

          <div
            className="hero-in mt-9 flex flex-wrap items-center gap-3"
            style={{ "--d": 3 } as React.CSSProperties}
          >
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noopener"
              className="pressable inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-blush-50 shadow-[0_10px_24px_-10px_rgb(43_27_34/0.5)] hover:bg-accent-deep"
            >
              <Download className="size-4" />
              Download résumé
            </a>
            <a
              href="#contact"
              className="pressable inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-medium hover:border-blush-300"
            >
              Get in touch
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="pressable grid size-12 place-items-center rounded-full border border-line bg-white text-ink-soft hover:border-blush-300 hover:text-[#0a66c2]"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </div>
        </div>

        <a
          href="#art"
          aria-label="See my art"
          className="art-stack relative mx-auto block aspect-[6/5] w-full max-w-md"
        >
          {heroArt.map((src, i) => (
            <div
              key={src.src}
              className="card"
              style={{ "--i": i } as React.CSSProperties}
            >
              <Image
                src={src}
                alt=""
                placeholder="blur"
                loading="eager"
                fetchPriority={i === 1 ? "high" : "auto"}
                sizes="(min-width: 768px) 240px, 45vw"
                className="size-full object-cover"
              />
            </div>
          ))}
        </a>
      </div>

      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="hero-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-faint hover:text-ink md:block"
        style={{ "--d": 6 } as React.CSSProperties}
      >
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}
