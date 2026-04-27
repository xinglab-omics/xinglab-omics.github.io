"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PaperSpotlight, Publication } from "@/lib/content";

type FeaturedPapersRailProps = {
  labMemberNames: string[];
  spotlights: PaperSpotlight[];
};

function publicationHref(publication: Publication) {
  if (publication.url) {
    return publication.url;
  }

  return "/publications";
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
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const hasMultiplePapers = spotlights.length > 1;

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const updateScrollState = () => {
      setCanScrollBackward(rail.scrollLeft > 4);
      setCanScrollForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
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

  if (spotlights.length === 0) {
    return null;
  }

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction * rail.clientWidth,
      behavior: "smooth"
    });
  };

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

  return (
    <section className="mx-auto max-w-7xl px-5 pb-3 pt-6 sm:px-8">
      <div className="overflow-hidden rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Featured Lab Papers</p>
          <div className="flex items-center gap-2">
            <Link
              href="/publications"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan"
            >
              View all
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
            {hasMultiplePapers ? (
              <>
                <button
                  type="button"
                  aria-label="Scroll featured papers left"
                  disabled={!canScrollBackward}
                  onClick={() => scrollRail(-1)}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-paper text-ink transition hover:border-fudan hover:text-fudan disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft aria-hidden="true" size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Scroll featured papers right"
                  disabled={!canScrollForward}
                  onClick={() => scrollRail(1)}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-paper text-ink transition hover:border-fudan hover:text-fudan disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight aria-hidden="true" size={15} />
                </button>
              </>
            ) : null}
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
                      href={publicationHref(publication)}
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
                    <Image
                      src={spotlight.image}
                      alt={`Representative figure for ${publication.title}`}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 52vw, 88vw"
                      className="object-contain"
                    />
                  </figure>
                </div>
              </article>
            );
          })}
        </div>
        {hasMultiplePapers ? (
          <div className="mt-5 flex items-center justify-center gap-2" aria-label="Featured paper position">
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
        ) : null}
      </div>
    </section>
  );
}
