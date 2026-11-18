import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { AppSiteHeader } from "@/components/AppSiteHeader";
import { siteMetadata } from "@/lib/site-metadata";
import { labMarkSrc } from "@/lib/site-paths";

export const metadata: Metadata = {
  ...siteMetadata,
  icons: { icon: { url: labMarkSrc, type: "image/svg+xml", sizes: "any" } }
};

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
