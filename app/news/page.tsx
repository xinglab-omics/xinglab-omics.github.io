import { PageIntro } from "@/components/PageIntro";
import { newsItemId, newsItems } from "@/lib/content";
import { withBasePath } from "@/lib/site-paths";

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

export default function NewsPage() {
  return (
    <>
      <PageIntro
        eyebrow="News"
        title="Lab Updates"
        description="News from the lab, including openings, publications, conferences, awards, and activities."
      />

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-4">
          {newsItems.map((item) => {
            const hasSideImage = item.image && item.imageVariant === "side";
            const image = item.image;

            return (
              <article
                id={newsItemId(item)}
                key={`${item.date}-${item.title}`}
                className={`scroll-mt-28 overflow-hidden rounded-lg border border-line bg-white shadow-sm ${
                  hasSideImage ? "grid gap-0 md:grid-cols-[220px_1fr]" : ""
                }`}
              >
                {image && item.imageVariant !== "side" ? (
                  <div className="border-b border-line">
                    <img
                      src={withBasePath(image)}
                      alt={item.title}
                      className="h-auto w-full"
                    />
                  </div>
                ) : null}

                {hasSideImage && image ? (
                  <div className="min-h-56 border-b border-line md:border-b-0 md:border-r">
                    <img
                      src={withBasePath(image)}
                      alt={item.title}
                      className="h-auto w-full md:h-full md:object-contain"
                    />
                  </div>
                ) : null}

                <div className="p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-normal text-fudan">{item.category}</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-normal text-ink">{item.title}</h2>
                    </div>
                    <time className="text-sm text-muted" dateTime={item.date}>
                      {formatDate(item.date)}
                    </time>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.summary}</p>
                  {item.link ? (
                    <a
                      href={withBasePath(item.link)}
                      className="mt-4 inline-flex text-sm font-semibold text-fudan transition hover:text-ink"
                    >
                      Read more
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
