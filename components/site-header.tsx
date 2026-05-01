"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600"]
});

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/workflow", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    closeMenu();
    window.history.replaceState(null, "", "/#home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          onClick={handleLogoClick}
          className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-neutral-950"
        >
          <span className="brand-logo-box shrink-0">
            <Image
              src="/startflow-logo-mark.png"
              alt="StartFlow logo"
              width={40}
              height={40}
              priority
              className="brand-logo h-8 w-auto sm:h-9"
            />
          </span>
          <span className="brand-wordmark">
            <span className="brand-wordmark-start">Start</span>
            <span className="brand-wordmark-flow">Flow</span>
          </span>
        </Link>
        <nav className={`${manrope.className} hidden items-center gap-8 text-sm text-neutral-600 md:flex`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link px-1 pb-1 pt-1 ${
                pathname === item.href
                  ? "active font-medium text-[#c19a5b]"
                  : "text-neutral-600"
              }`}
            >
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
          href="/inquiry"
          className="button-primary interactive hidden rounded-full bg-[linear-gradient(180deg,#c9934a_0%,#9f6f2c_100%)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_24px_rgba(148,101,38,0.18)] md:inline-flex"
        >
          Get Started
        </Link>
      </div>
      <div
        className={`overflow-hidden border-t border-neutral-200 bg-white transition-[max-height,opacity] duration-200 ease-out md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className={`${manrope.className} px-5 py-3 sm:px-6`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`nav-link-mobile flex min-h-12 items-center rounded-2xl px-4 text-base ${
                pathname === item.href
                  ? "active bg-[#fffaf0] font-medium text-[#c19a5b]"
                  : "font-normal text-neutral-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/inquiry"
            onClick={closeMenu}
            className="button-primary interactive mt-2 flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#c9934a_0%,#9f6f2c_100%)] px-5 text-base font-medium text-white shadow-[0_12px_24px_rgba(148,101,38,0.18)]"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
