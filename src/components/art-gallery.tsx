"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { artCategories, artworks } from "@/lib/data";
import { SectionHeading } from "./section-heading";

type Category = (typeof artCategories)[number];

const INITIAL_COUNT = 8;

export function ArtGallery() {
  const [category, setCategory] = useState<Category>("All");
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipe = useRef<{ x: number; t: number } | null>(null);
  const swiped = useRef(false);

  const filtered =
    category === "All" ? artworks : artworks.filter((a) => a.category === category);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const current = filtered[index];
  const neighbours = viewerOpen
    ? [...new Set([1, -1].map((d) => filtered[(index + d + filtered.length) % filtered.length]))]
    : [];

  const open = (i: number) => {
    setIndex(i);
    setViewerOpen(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + filtered.length) % filtered.length);

  return (
    <section id="art" className="bg-white/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          title="Made by hand"
          aside={
            <p className="hidden max-w-[16rem] text-right text-sm text-ink-faint md:block">
              {artworks.length} pieces — painting, henna and crochet.
            </p>
          }
        />

        <div data-reveal className="mb-8">
          <Tabs
            value={category}
            onChange={(c) => {
              setCategory(c);
              setExpanded(false);
            }}
          />
        </div>

        <div className="columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
          {visible.map((art, i) => (
            <button
              key={art.id}
              type="button"
              onClick={() => open(i)}
              className="art-tile group pressable relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-blush-100 md:mb-5"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <Image
                src={art.src}
                alt={art.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 270px, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-2.5 left-2.5 translate-y-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink-soft opacity-0 backdrop-blur transition-[opacity,transform] duration-200 ease-out-strong group-hover:translate-y-0 group-hover:opacity-100">
                {art.category}
              </span>
            </button>
          ))}
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="pressable rounded-full border border-line bg-white px-6 py-3 font-medium hover:border-blush-300"
            >
              {expanded ? "Show less" : `Show all ${filtered.length}`}
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Artwork viewer"
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
        onClose={() => setViewerOpen(false)}
        onKeyDown={(e) => {
          // Keyboard navigation is instant: no animation on repeated actions
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <div
          className="flex size-full touch-pan-y flex-col items-center justify-center gap-4 p-4 md:p-10"
          onClick={(e) => {
            if (swiped.current) {
              swiped.current = false;
              return;
            }
            if (e.target === e.currentTarget) close();
          }}
          onPointerDown={(e) => (swipe.current = { x: e.clientX, t: e.timeStamp })}
          onPointerUp={(e) => {
            if (!swipe.current) return;
            const dx = e.clientX - swipe.current.x;
            const velocity = Math.abs(dx) / (e.timeStamp - swipe.current.t);
            swipe.current = null;
            // A quick flick counts, not just a long drag
            if (Math.abs(dx) > 60 || (Math.abs(dx) > 10 && velocity > 0.11)) {
              swiped.current = true;
              step(dx < 0 ? 1 : -1);
            }
          }}
        >
          {current && (
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              placeholder="blur"
              sizes="90vw"
              className="max-h-[78dvh] w-auto max-w-full rounded-xl object-contain shadow-2xl select-none"
              draggable={false}
            />
          )}
          {/* Load the next and previous images so stepping feels instant */}
          <div aria-hidden className="pointer-events-none absolute size-px overflow-hidden opacity-0">
            {neighbours.map((art) => (
              <Image key={art.id} src={art.src} alt="" sizes="90vw" loading="eager" />
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <span>{current?.category}</span>
            <span className="text-white/40">·</span>
            <span className="tabular-nums">
              {index + 1} / {filtered.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="pressable absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous artwork"
          className="pressable absolute top-1/2 left-4 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 md:grid"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next artwork"
          className="pressable absolute top-1/2 right-4 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 md:grid"
        >
          <ChevronRight className="size-5" />
        </button>
      </dialog>
    </section>
  );
}

/**
 * Filter tabs. A dark copy of the list sits on top and is clipped to the
 * active tab, so the highlight and text colour move together in one motion.
 */
function Tabs({ value, onChange }: { value: Category; onChange: (c: Category) => void }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string>();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const tab = list.querySelector<HTMLElement>(`[data-tab="${value}"]`);
      if (!tab) return;
      // The overlay is inset by the list's 4px padding
      const left = tab.offsetLeft - 4;
      const right = list.clientWidth - 4 - tab.offsetLeft - tab.offsetWidth;
      setClip(`inset(0 ${right}px 0 ${left}px round 999px)`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [value]);

  useLayoutEffect(() => {
    // Skip the transition on first paint so the pill doesn't slide in from 0
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none]">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Filter artwork"
        className="relative inline-flex rounded-full border border-line bg-white p-1"
      >
        {artCategories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={value === c}
            data-tab={c}
            onClick={() => onChange(c)}
            className="relative rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-ink-soft"
          >
            {c}
          </button>
        ))}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-1 flex"
          style={{
            clipPath: clip ?? "inset(0 100% 0 0)",
            transition: ready ? "clip-path 320ms var(--ease-in-out-strong)" : undefined,
          }}
        >
          {artCategories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium whitespace-nowrap text-blush-50"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
