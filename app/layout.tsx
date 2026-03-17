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
      </body>
    </html>
  );
}
