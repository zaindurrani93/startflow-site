import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://startflowhq.com"),
  title: "StartFlow",
  description: "StartFlow business setup website",
  icons: {
    icon: [
      { url: "/startflow-favicon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico" }
    ],
    apple: [{ url: "/startflow-favicon-512.png", sizes: "512x512", type: "image/png" }],
    shortcut: ["/favicon.ico"]
  },
  openGraph: {
    title: "StartFlow",
    description: "Build your business with clarity - not confusion.",
    url: "https://startflowhq.com",
    siteName: "StartFlow",
    images: [
      {
        url: "/startflow-share-card-v2.png",
        width: 1200,
        height: 630,
        alt: "StartFlow business setup preview"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "StartFlow",
    description: "Build your business with clarity - not confusion.",
    images: ["/startflow-share-card-v2.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18109674831"
          strategy="afterInteractive"
        />
        <Script id="google-ads-and-ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18109674831');
            gtag('config', 'G-RYX5S4G874');
          `}
        </Script>
      </head>
      <body className={`${playfairDisplay.variable} overflow-x-hidden bg-white text-neutral-900`}>
        <SiteHeader />
        {children}
        <footer className="border-t border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr] lg:px-8 lg:py-18">
            <div className="max-w-sm">
              <div className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-neutral-950">
                <span className="brand-logo-box shrink-0">
                  <Image
                    src="/startflow-logo-mark.png"
                    alt="StartFlow logo"
                    width={40}
                    height={40}
                    className="brand-logo h-9 w-auto"
                  />
                </span>
                <h2 className="brand-wordmark">
                  <span className="brand-wordmark-start">Start</span>
                  <span className="brand-wordmark-flow">Flow</span>
                </h2>
              </div>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Simplifying the process of starting your business — from idea to execution.
              </p>
              <Link
                href="/contact"
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
