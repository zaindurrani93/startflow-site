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
        <Link href="/" className="text-xl font-semibold tracking-tight">
          StartFlow
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
