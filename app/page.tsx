import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { NewsTicker } from "@/components/NewsTicker";
import { ResearchHighlightCard } from "@/components/ResearchHighlightCard";
import { members, newsItems, paperSpotlight, researchAreas, researchDirectionsIntro } from "@/lib/content";
import type { Publication } from "@/lib/content";

const heroTags = ["Mass spectrometry", "Metabolomics & Exposomics", "Bioinformatics", "Data mining", "Machine learning"];
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
            <h1 className="space-y-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl lg:text-5xl">
              <span className="block whitespace-nowrap">Metabolomics &</span>
              <span className="block whitespace-nowrap">Xenobiotic Metabolism</span>
              <span lang="zh-Hans" className="font-cjk block text-3xl font-normal text-muted sm:text-3xl lg:text-3xl">
                代谢组学与外源物代谢
              </span>
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-6 text-muted">
              We aim to map the full landscape of small molecules in our human bodies and understand how food, microbes, and the environment shape them.
            </p>
            <p lang="zh-Hans" className="font-cjk mt-3 max-w-2xl text-sm leading-4 text-muted sm:whitespace-nowrap">
              我们致力于解析人体内小分子的完整图谱，并理解食物、微生物与环境如何塑造它们。
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

      <section className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
        <article className="grid gap-7 rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[minmax(380px,1.1fr)_minmax(0,1.2fr)]">
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
            <Link
              href="/publications"
              className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan"
            >
              View all publications
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
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

      <section className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
        <article
          className="rounded-lg border border-line bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Now Recruiting</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              We welcome postdocs, research assistants, and motivated graduate and undergraduate students.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-3 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan sm:mt-0"
          >
            View opportunities
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-3 sm:px-8 lg:pb-14">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="w-full">
              <p className="text-sm font-semibold uppercase tracking-normal text-fudan">Research directions</p>
              <p className="mt-4 w-full text-base leading-7 text-muted">{researchDirectionsIntro}</p>
            </div>
            <Link
              href="/research"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-fudan hover:text-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
            >
              Explore more
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {researchAreas.map((area, index) => (
              <ResearchHighlightCard key={area.slug} area={area} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
