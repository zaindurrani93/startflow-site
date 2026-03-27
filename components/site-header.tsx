"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    window.history.replaceState(null, "", "/#top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link
          href="/#top"
          onClick={handleLogoClick}
          className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-neutral-950"
        >
          <Image
            src="/logo.png"
            alt="StartFlow logo"
            width={40}
            height={40}
            priority
            className="h-8 w-auto shrink-0 sm:h-9"
          />
          <span>StartFlow</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b pb-1 transition-all duration-300 ${
                pathname === item.href
                  ? "border-neutral-950 text-neutral-950 font-medium"
                  : "border-transparent hover:border-neutral-300 hover:text-neutral-950"
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
          href="/contact"
          className="button-primary interactive hidden rounded-full bg-[#8f6a2f] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7a5b28] md:inline-flex"
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
              className={`flex min-h-12 items-center rounded-2xl px-4 text-base transition hover:bg-neutral-50 ${
                pathname === item.href
                  ? "font-medium text-neutral-950"
                  : "font-normal text-neutral-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="button-primary interactive mt-2 flex min-h-12 items-center justify-center rounded-full bg-[#8f6a2f] px-5 text-base font-medium text-white hover:bg-[#7a5b28]"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
