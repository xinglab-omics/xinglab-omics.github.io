import { staticPageHref } from "@/lib/site-paths";
import { ArrowRight } from "lucide-react";
import { FeaturedPapersRail } from "@/components/FeaturedPapersRail";
import { HeroScrollAnimation } from "@/components/HeroScrollAnimation";
import { HeroVisual } from "@/components/HeroVisual";
import { NewsTicker } from "@/components/NewsTicker";
import { ResearchHighlightCard } from "@/components/ResearchHighlightCard";
import { ResearchIntroPanel } from "@/components/ResearchIntroPanel";
import {
  featuredPaperSpotlights,
  members,
  newsItemId,
  newsItems,
  researchAreas,
  researchDirectionsIntro,
  researchDirectionsQuestion
} from "@/lib/content";

const heroTags = ["Mass spectrometry", "Metabolomics & Exposomics", "Bioinformatics", "Data mining", "Machine learning"];
const latestNewsItems = newsItems.slice(0, 4).map((item) => {
  const monthOnly = item.date.length === 7;
  const date = new Date(monthOnly ? `${item.date}-01T00:00:00Z` : `${item.date}T00:00:00Z`);
  const dateLabel = item.dateLabel ?? date.toLocaleDateString("en", {
    month: "short", day: monthOnly ? undefined : "numeric", year: "numeric", timeZone: "UTC"
  });
  return { title: item.title, summary: item.summary, dateLabel, href: staticPageHref(`/news#${newsItemId(item)}`) };
});
const labMemberNames = members
  .filter((member) => !member.isOpenPosition)
  .map((member) => member.name);

export default function HomePage() {
  return (
    <>
      <section
        className="relative isolate min-h-[60svh] overflow-hidden border-b border-line bg-paper lg:min-h-[62svh]"
        data-hero-scroll
      >
        <HeroScrollAnimation />
        {/* Seamless laboratory dot-grid texture across the full hero width */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(var(--color-line) 1px, transparent 1px)",
            backgroundSize: "34px 34px"
          }}
        />
        {/* Both left copy and right scientific SVG sit inside the exact same max-w-7xl bounds for symmetrical edges */}
        <div className="relative mx-auto grid min-h-[60svh] max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:min-h-[64svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-10 lg:py-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
          <div
            className="min-w-0 will-change-transform"
            style={{
              opacity: "var(--hero-copy-opacity, 1)",
              transform: "translate3d(0, var(--hero-copy-y, 0px), 0)"
            }}
          >
            <h1 className="space-y-2.5 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">
              <span className="block whitespace-nowrap">Metabolomics &amp;</span>
              <span className="block whitespace-nowrap">Xenobiotic Metabolism</span>
              <span lang="zh-Hans" className="font-cjk block pt-1 text-2xl font-normal tracking-normal text-muted sm:text-3xl">
                代谢组学与外源物代谢
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-sm leading-6 text-muted">
              We aim to map the full landscape of small molecules in our bodies, and understand how food, microbes, and the environment shape them.
            </p>
            <p lang="zh-Hans" className="font-cjk mt-2.5 max-w-2xl text-sm leading-6 text-muted sm:whitespace-nowrap">
              我们致力于描绘人体内小分子的完整图谱，揭示食物、微生物与环境如何重塑体内代谢。
            </p>
            <p className="mt-14 flex max-w-xl flex-wrap items-center gap-x-3.5 gap-y-2 border-t border-line/90 pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-fudan">
              {heroTags.map((tag, index) => (
                <span key={tag} className="inline-flex items-center gap-3.5">
                  <span>{tag}</span>
                  {index < heroTags.length - 1 ? <span aria-hidden="true" className="text-line">/</span> : null}
                </span>
              ))}
            </p>
          </div>

          <div
            className="hidden origin-center will-change-transform lg:block"
            style={{
              opacity: "var(--hero-art-opacity, 1)",
              transform:
                "translate3d(var(--hero-art-x, 0px), var(--hero-art-y, 0px), 0) scale(var(--hero-art-scale, 1))"
            }}
          >
            <HeroVisual />
          </div>
        </div>
      </section>

      <NewsTicker items={latestNewsItems} />

      <FeaturedPapersRail labMemberNames={labMemberNames} spotlights={featuredPaperSpotlights} />

      <section className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
        <article
          className="rounded-lg border border-line bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6"
        >
          <div>
            <p className="eyebrow">Now Recruiting</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              We welcome motivated students and researchers from all backgrounds to join us in exploring the metabolome and xenobiotic metabolism. Applicants with diverse experiences, perspectives, and skill sets are encouraged to apply.
            </p>
          </div>
          <a
            href={staticPageHref("/contact")}
            className="editorial-link group mt-3 shrink-0 sm:mt-0"
          >
            <span>View opportunities</span>
            <ArrowRight aria-hidden="true" size={14} className="transition group-hover:translate-x-1" />
          </a>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-3 sm:px-8 lg:pb-12">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-7">
            <ResearchIntroPanel
              intro={researchDirectionsIntro}
              question={researchDirectionsQuestion}
              showExploreLink
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {researchAreas.map((area, index) => (
              <ResearchHighlightCard key={area.slug} area={area} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
