import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { newsItems } from "@/lib/content";
import { withBasePath } from "@/lib/site-paths";

function formatDate(date: string) {
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
        title="Lab updates"
        description="News from the lab, including openings, publications, conferences, awards, and activities."
      />

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-4">
          {newsItems.map((item) => {
            const hasSideImage = item.image && item.imageVariant === "side";
            const image = item.image;

            return (
              <article
                id={item.slug}
                key={`${item.date}-${item.title}`}
                className={`scroll-mt-28 overflow-hidden rounded-lg border border-line bg-white shadow-sm ${
                  hasSideImage ? "grid gap-0 md:grid-cols-[220px_1fr]" : ""
                }`}
              >
                {image && item.imageVariant !== "side" ? (
                  <div className="relative aspect-[16/7] border-b border-line">
                    <Image
                      src={withBasePath(image)}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                {hasSideImage && image ? (
                  <div className="relative min-h-56 border-b border-line md:border-b-0 md:border-r">
                    <Image
                      src={withBasePath(image)}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="object-cover"
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
