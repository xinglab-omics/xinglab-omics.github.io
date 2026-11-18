import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { AppSiteHeader } from "@/components/AppSiteHeader";
import { siteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <AppSiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
