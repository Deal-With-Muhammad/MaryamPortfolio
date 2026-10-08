"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#art", label: "Art" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-line bg-blush-50/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-serif text-xl tracking-tight">
          Maryam<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="pressable rounded-full px-4 py-2 text-sm text-ink-soft hover:bg-blush-100 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumePdf}
            target="_blank"
            rel="noopener"
            className="pressable ml-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-blush-50 hover:bg-accent-deep"
          >
            Résumé
          </a>
        </div>

        <div ref={menuRef} className="relative md:hidden">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="pressable grid size-10 place-items-center rounded-full hover:bg-blush-100"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <div
            data-open={open}
            className="menu-panel absolute right-0 top-12 w-52 rounded-2xl border border-line bg-white p-2 shadow-[0_18px_40px_-12px_rgb(176_63_102/0.25)]"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-ink-soft active:bg-blush-100"
              >
                {l.label}
              </a>
            ))}
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-ink px-3 py-2.5 text-center font-medium text-blush-50"
            >
              Download résumé
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
