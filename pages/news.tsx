import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SiteImage } from "@/components/SiteImage";
import { newsItemId, newsItems } from "@/lib/content";
import { staticPageHref } from "@/lib/site-paths";

function formatDate(date: string) {
  if (/^\d{4}-\d{2}$/.test(date)) {
    return new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric"
    }).format(new Date(`${date}-01T00:00:00`));
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

function itemYear(date: string) {
  return date.slice(0, 4);
}

const newsYears = Array.from(new Set(newsItems.map((item) => itemYear(item.date))));

export default function NewsPage() {
  const leadImageItem = newsItems.slice(0, 2).find((item) => item.image);

  return (
    <>
      <PageIntro
        eyebrow="News"
        title="Lab Updates"
        description="News from the lab, including openings, publications, conferences, awards, and activities."
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[120px_minmax(0,1fr)] lg:py-12">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Jump to</p>
          <nav aria-label="News years" className="mt-3 flex min-w-0 flex-wrap gap-2 lg:grid lg:gap-2">
            {newsYears.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold tabular-nums text-muted transition hover:border-fudan hover:text-fudan lg:text-center"
              >
                {year}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 space-y-8">
          {newsYears.map((year) => {
            const yearItems = newsItems.filter((item) => itemYear(item.date) === year);

            return (
              <section key={year} id={`year-${year}`} className="scroll-mt-28">
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-sm font-semibold tabular-nums text-ink">{year}</h2>
                  <span className="h-px flex-1 bg-sage/50" />
                </div>

                <div className="grid gap-5">
                  {yearItems.map((item) => {
                    const hasSideImage = item.image && item.imageVariant === "side";
                    const image = item.image;
                    const loading = item === leadImageItem ? "eager" : "lazy";
                    const fetchPriority = item === leadImageItem ? "high" : undefined;
                    const isExternalLink = Boolean(item.link?.startsWith("http"));

                    return (
                      <article
                        id={newsItemId(item)}
                        key={`${item.date}-${item.title}`}
                        className={`scroll-mt-28 overflow-hidden rounded-lg border border-line bg-white shadow-sm ${
                          hasSideImage ? "grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]" : ""
                        }`}
                      >
                        {image && item.imageVariant !== "side" ? (
                          <div className="border-b border-line bg-paper/50 p-4 sm:p-5">
                            <SiteImage
                              src={image}
                              alt={item.title}
                              loading={loading}
                              fetchPriority={fetchPriority}
                              sizes="(min-width: 1280px) 1020px, (min-width: 640px) calc(100vw - 88px), calc(100vw - 64px)"
                              className="mx-auto max-h-[380px] w-auto max-w-full rounded object-contain"
                            />
                          </div>
                        ) : null}

                        {hasSideImage && image ? (
                          <div className="flex items-center justify-center border-b border-line bg-paper/50 p-3 md:border-b-0 md:border-r md:p-0">
                            <SiteImage
                              src={image}
                              alt={item.title}
                              loading={loading}
                              fetchPriority={fetchPriority}
                              sizes="(min-width: 768px) 220px, (min-width: 640px) calc(100vw - 66px), calc(100vw - 42px)"
                              className="max-h-60 w-auto object-contain md:h-full md:max-h-none md:w-full"
                            />
                          </div>
                        ) : null}

                        <div className="p-6">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <p className="eyebrow">
                              {item.category}
                            </p>
                            <time className="text-xs font-medium tabular-nums text-muted" dateTime={item.date}>
                              {item.dateLabel ?? formatDate(item.date)}
                            </time>
                          </div>
                          <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
                          {item.link ? (
                            <a
                              href={isExternalLink ? item.link : staticPageHref(item.link)}
                              target={isExternalLink ? "_blank" : undefined}
                              rel={isExternalLink ? "noreferrer" : undefined}
                              className="editorial-link group mt-4"
                            >
                              <span>Read more</span>
                              {isExternalLink ? (
                                <ArrowUpRight
                                  aria-hidden="true"
                                  size={14}
                                  className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              ) : (
                                <ArrowRight
                                  aria-hidden="true"
                                  size={14}
                                  className="transition group-hover:translate-x-1"
                                />
                              )}
                            </a>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
