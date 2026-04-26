import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { NewsTicker } from "@/components/NewsTicker";
import { ResearchHighlightCard } from "@/components/ResearchHighlightCard";
import { members, newsItems, paperSpotlight, researchAreas } from "@/lib/content";
import type { Publication } from "@/lib/content";

const heroTags = ["Mass spectrometry", "Metabolomics", "Exposomics", "Bioinformatics", "Data mining", "Machine learning"];
const latestPaper = paperSpotlight.publication;
const labMemberNames = new Set(
  members
    .filter((member) => member.name !== "Open Positions")
    .map((member) => member.name)
);

function publicationHref(publication: typeof latestPaper) {
  if (publication.url) {
    return publication.url;
  }

  if (publication.doi) {
    return `https://doi.org/${publication.doi}`;
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

function renderSpotlightAuthors(publication: Publication) {
  return publication.authors.split(", ").map((author, index) => {
    const labels = authorLabels(publication, author);
    const isLabMember = Array.from(labMemberNames).some((name) => author.includes(name));

    return (
      <span key={`${publication.title}-${author}-${index}`}>
        {index > 0 ? ", " : null}
        <span className={isLabMember ? "font-semibold text-ink" : undefined}>{author}</span>
        {labels ? <span className="ml-0.5 font-semibold text-fudan">{labels}</span> : null}
      </span>
    );
  });
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[60svh] overflow-hidden border-b border-line">
        <HeroVisual />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,246,242,0.94)_0%,rgba(247,246,242,0.84)_34%,rgba(247,246,242,0.32)_72%)]" />
        <div className="relative mx-auto flex min-h-[60svh] max-w-7xl items-center px-5 pb-16 pt-10 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-ink sm:text-4xl lg:text-5xl">
              <span className="block whitespace-nowrap">Metabolomics &</span>
              <span className="block whitespace-nowrap">Molecular Transformation</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-muted">
              We aim to map the small molecules in our bodies and understand how food, microbes, and the environment shape them.
            </p>
            <p className="mt-12 flex max-w-xl flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-normal text-fudan">
              {heroTags.map((tag, index) => (
                <span key={tag} className="inline-flex items-center gap-4">
                  <span>{tag}</span>
                  {index < heroTags.length - 1 ? <span aria-hidden="true">|</span> : null}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <NewsTicker items={newsItems} />

      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <article className="grid gap-7 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(380px,1.1fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Latest Paper Spotlight</p>
              <a
                href={publicationHref(latestPaper)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan"
              >
                Read paper
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-ink">{latestPaper.title}</h2>
            <p className="mt-3 text-sm font-semibold text-muted">
              {latestPaper.venue}, {latestPaper.year}
            </p>
            <p className="mt-4 text-xs leading-6 text-muted">
              {renderSpotlightAuthors(latestPaper)}
            </p>
          </div>
          <figure
            className="relative h-64 overflow-hidden rounded-md bg-white lg:h-auto lg:min-h-72 lg:self-stretch"
            aria-label={paperSpotlight.figure.alt}
          >
            <Image
              src={paperSpotlight.figure.image}
              alt={paperSpotlight.figure.alt}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain"
            />
          </figure>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
        <Link
          href="/contact"
          className="group block rounded-lg border border-line bg-white px-5 py-4 shadow-sm transition hover:border-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6"
        >
          <article>
            <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Now Recruiting</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              We welcome postdocs, research assistants, and motivated graduate and undergraduate students.
            </p>
          </article>
          <span className="mt-3 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition group-hover:border-fudan group-hover:text-fudan sm:mt-0">
            View opportunities
            <ArrowRight aria-hidden="true" size={14} />
          </span>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-8 lg:pb-16 lg:pt-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Research Highlights</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Main research directions</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {researchAreas.map((area, index) => (
            <ResearchHighlightCard key={area.slug} area={area} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
