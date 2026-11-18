import type { AppProps } from "next/app";
import Head from "next/head";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteMetadata } from "@/lib/site-metadata";
import { withBasePath } from "@/lib/site-paths";
import "../app/globals.css";

type SiteAppProps = AppProps & {
  Component: AppProps["Component"] & { metadata?: typeof siteMetadata };
};

export default function SiteApp({ Component, pageProps, router }: SiteAppProps) {
  const metadata = Component.metadata ?? siteMetadata;

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={withBasePath("/icon.svg")} type="image/svg+xml" />
      </Head>
      <SiteHeader pathname={router.pathname} />
      <main><Component {...pageProps} /></main>
      <SiteFooter />
    </>
  );
}
