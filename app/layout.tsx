import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["600", "700"]
});

export const metadata: Metadata = {
  title: "StartFlow",
  description: "StartFlow business setup website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} bg-white text-neutral-900`}>
        <SiteHeader />
        {children}
        <footer className="border-t border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr] lg:px-8 lg:py-18">
            <div className="max-w-sm">
              <div className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-neutral-950">
                <Image
                  src="/logo.png"
                  alt="StartFlow logo"
                  width={40}
                  height={40}
                  className="h-9 w-auto shrink-0"
                />
                <h2>StartFlow</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Simplifying the process of starting your business — from idea to execution.
              </p>
              <Link
                href="/contact#contact-form"
                className="footer-link mt-4 inline-flex text-sm font-medium text-[#8f6a2f]"
              >
                  contact@startflowhq.com
                </Link>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900">Explore</h3>
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/services" className="footer-link text-sm text-neutral-600">
                  Services
                </Link>
                <Link href="/pricing" className="footer-link text-sm text-neutral-600">
                  Pricing
                </Link>
                <Link href="/workflow" className="footer-link text-sm text-neutral-600">
                  How It Works
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900">Company</h3>
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/about" className="footer-link text-sm text-neutral-600">
                  About
                </Link>
                <Link href="/contact" className="footer-link text-sm text-neutral-600">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
              <p>© 2026 StartFlow. All rights reserved.</p>
              <Link href="/privacy-policy" className="footer-link text-neutral-400">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
