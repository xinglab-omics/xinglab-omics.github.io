import Document, { Head, Html, Main, NextScript } from "next/document";

export default class SiteDocument extends Document {
  render() {
    const language = this.props.__NEXT_DATA__.page.endsWith("/zh") ? "zh-CN" : "en";

    return (
      <Html lang={language} data-scroll-behavior="smooth">
        <Head />
        <body className="min-h-screen bg-paper text-ink antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
