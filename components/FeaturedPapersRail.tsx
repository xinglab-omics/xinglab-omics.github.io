"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAutoAdvance } from "@/lib/use-auto-advance";
import type { PaperSpotlight, Publication } from "@/lib/content";
import { staticPageHref, withBasePath } from "@/lib/site-paths";

type FeaturedPapersRailProps = {
  labMemberNames: string[];
  spotlights: PaperSpotlight[];
};

const AUTO_ROLL_INTERVAL_MS = 6000;

function publicationHref(publication: Publication) {
  if (publication.url) {
    return publication.url;
  }

  return staticPageHref("/publications");
}

function authorLabels(publication: Publication, author: string) {
  const labels = [];

  if (publication.coFirstAuthors?.some((name) => author.includes(name))) {
    labels.push("†");
  }

  if (publication.correspondingAuthors?.some((name) => author.includes(name))) {
    labels.push("*");
  }

  return labels.join("");
}

function renderAuthors(publication: Publication, labMemberNames: string[]) {
  return publication.authors.split(", ").map((author, index) => {
    const labels = authorLabels(publication, author);
    const isLabMember = labMemberNames.some((name) => author.includes(name));

    return (
      <span key={`${publication.title}-${author}-${index}`}>
        {index > 0 ? ", " : null}
        <span className={isLabMember ? "font-semibold text-ink" : undefined}>{author}</span>
        {labels ? <span className="ml-0.5 font-semibold text-fudan">{labels}</span> : null}
      </span>
    );
  });
}

export function FeaturedPapersRail({ labMemberNames, spotlights }: FeaturedPapersRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiplePapers = spotlights.length > 1;

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const updateScrollState = () => {
      setActiveIndex(Math.min(spotlights.length - 1, Math.round(rail.scrollLeft / Math.max(rail.clientWidth, 1))));
    };

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [spotlights.length]);

  const nextPaper = useCallback(() => {
    const rail = railRef.current;
    if (rail) {
      const nextIndex = (activeIndex + 1) % spotlights.length;
      rail.scrollTo({ left: nextIndex * rail.clientWidth, behavior: "smooth" });
    }
  }, [activeIndex, spotlights.length]);
  useAutoAdvance(railRef, hasMultiplePapers, AUTO_ROLL_INTERVAL_MS, nextPaper);

  if (spotlights.length === 0) {
    return null;
  }

  const scrollToPaper = (index: number) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    rail.scrollTo({
      left: index * rail.clientWidth,
      behavior: "smooth"
    });
  };

  const scrollByPaper = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + spotlights.length) % spotlights.length;
    scrollToPaper(nextIndex);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-3 pt-6 sm:px-8">
      <div className="overflow-hidden rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Featured Lab Papers</p>
          <div className="flex items-center gap-2">
            <a
              href={staticPageHref("/publications")}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan"
            >
              View all publications
              <ArrowRight aria-hidden="true" size={14} />
            </a>
          </div>
        </div>

        <div
          ref={railRef}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {spotlights.map((spotlight, index) => {
            const publication = spotlight.publication;

            return (
              <article
                key={`${publication.title}-${index}`}
                data-paper-card
                className="min-w-0 basis-full shrink-0 snap-start"
              >
                <div className="grid gap-7 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-center">
                  <div className="flex min-w-0 flex-col justify-center">
                    <h2 className="text-2xl font-semibold tracking-normal text-ink">{publication.title}</h2>
                    <p className="mt-3 text-sm text-muted">
                      <span className="font-semibold text-fudan">{publication.venue}</span>
                      <span className="font-semibold text-muted">, {publication.year}</span>
                    </p>
                    <p className="mt-4 max-h-24 overflow-hidden text-xs leading-6 text-muted">
                      {renderAuthors(publication, labMemberNames)}
                    </p>
                    <a
                      href={withBasePath(publicationHref(publication))}
                      className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan"
                    >
                      Read paper
                      <ArrowUpRight aria-hidden="true" size={14} />
                    </a>
                  </div>
                  <figure
                    className="relative h-64 overflow-hidden rounded-md bg-paper lg:h-72"
                    aria-label={`Representative figure for ${publication.title}`}
                  >
                    <SiteImage
                      src={spotlight.image}
                      alt={`Representative figure for ${publication.title}`}
                      loading="lazy"
                      fetchPriority="low"
                      sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 92vw"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </figure>
                </div>
              </article>
            );
          })}
        </div>
        {hasMultiplePapers ? (
          <div className="mt-5 flex items-center justify-center gap-3" aria-label="Featured paper controls">
            <button
              type="button"
              aria-label="Show previous featured paper"
              onClick={() => scrollByPaper(-1)}
              className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-paper text-ink transition hover:border-fudan hover:text-fudan"
            >
              <ArrowLeft aria-hidden="true" size={15} />
            </button>
            <div className="flex items-center gap-2" aria-label="Featured paper position">
              {spotlights.map((spotlight, index) => (
                <button
                  key={`${spotlight.publication.title}-dot`}
                  type="button"
                  aria-label={`Show featured paper ${index + 1}`}
                  onClick={() => scrollToPaper(index)}
                  className={`size-2.5 rounded-full transition ${
                    index === activeIndex ? "bg-fudan" : "bg-line hover:bg-muted"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Show next featured paper"
              onClick={() => scrollByPaper(1)}
              className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-paper text-ink transition hover:border-fudan hover:text-fudan"
            >
              <ArrowRight aria-hidden="true" size={15} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
