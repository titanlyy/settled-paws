"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sage-200/80 bg-cream/95 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-cream shadow-sm"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 18c-2.5 0-4.5-1.2-5.5-3 .8-1.5 2.4-2.5 4.2-2.8.3-.8.9-1.5 1.7-1.9.7.4 1.3 1.1 1.6 1.9 1.8.3 3.4 1.3 4.2 2.8-1 1.8-3 3-5.2 3zm-4.8-9.2c.9 0 1.6-.8 1.6-1.7S8.1 5.4 7.2 5.4 5.6 6.2 5.6 7.1s.7 1.7 1.6 1.7zm9.6 0c.9 0 1.6-.8 1.6-1.7s-.7-1.7-1.6-1.7-1.6.8-1.6 1.7.7 1.7 1.6 1.7zM4.8 13.5c.9 0 1.6-.8 1.6-1.7S5.7 10 4.8 10 3.2 10.8 3.2 11.8s.7 1.7 1.6 1.7zm14.4 0c.9 0 1.6-.8 1.6-1.7S20.1 10 19.2 10s-1.6.8-1.6 1.8.7 1.7 1.6 1.7z" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight text-ink group-hover:text-forest">
              {siteConfig.name}
            </span>
            <span className="hidden text-[11px] text-ink-muted sm:block">
              Training for real homes
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-sage-100 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-sage-200 bg-cream px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-sage-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
