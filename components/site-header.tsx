import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/workflow", label: "Workflow" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
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
        <Link
          href="/contact"
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
