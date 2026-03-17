"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/workflow", label: "Workflow" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-semibold tracking-tight text-neutral-950">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          >
            <circle cx="9" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9 4.5V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M9 17.5V19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M1.5 12H3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M14.5 12H16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M3.7 6.7L5.1 8.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12.9 15.9L14.3 17.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M3.7 17.3L5.1 15.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12.9 8.1L14.3 6.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path
              d="M12 12H22M18.5 8.8L21.8 12L18.5 15.2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>StartFlow</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-neutral-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-950 transition hover:bg-neutral-50 md:hidden"
        >
          <span className="relative h-4 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition duration-200 ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.5px] w-4 bg-current transition duration-200 ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[1.5px] w-4 bg-current transition duration-200 ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
        <Link
          href="/contact"
          className="hidden rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 md:inline-flex"
        >
          Get Started
        </Link>
      </div>
      <div
        className={`overflow-hidden border-t border-neutral-200 bg-white transition-[max-height,opacity] duration-200 ease-out md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-5 py-3 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="flex min-h-12 items-center rounded-2xl px-4 text-base font-medium text-neutral-900 transition hover:bg-neutral-50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-neutral-950 px-5 text-base font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
