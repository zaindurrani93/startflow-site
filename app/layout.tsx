import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

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
      <body className="bg-white text-neutral-900">
        <SiteHeader />
        {children}
        <footer className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-6 text-center text-sm text-neutral-500 sm:px-6 lg:px-8">
            © 2026 StartFlow. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
