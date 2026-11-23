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
        className="relative isolate min-h-[60svh] overflow-hidden border-b border-line lg:min-h-[62svh]"
        data-hero-scroll
      >
        <HeroScrollAnimation />
        {/* Pure-CSS concentric geometric arcs inspired by Swiss editorial science sites (0 JS / 0 KB assets) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 hidden size-[560px] -translate-y-1/2 rounded-full lg:block"
          style={{
            boxShadow:
              "0 0 0 1px color-mix(in srgb, var(--color-sage) 13%, transparent), 0 0 0 96px color-mix(in srgb, var(--color-sage) 3%, transparent), 0 0 0 97px color-mix(in srgb, var(--color-sage) 9%, transparent), 0 0 0 210px color-mix(in srgb, var(--color-sage) 6%, transparent)"
          }}
        />
        <div
          className="absolute inset-0 origin-center will-change-transform"
          style={{
            filter: "blur(var(--hero-art-blur, 0px))",
            opacity: "var(--hero-art-opacity, 1)",
            transform:
              "translate3d(var(--hero-art-x, 0px), var(--hero-art-y, 0px), 0) scale(var(--hero-art-scale, 1)) rotate(var(--hero-art-rotate, 0deg))"
          }}
        >
          <HeroVisual />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-paper) 95%, transparent) 0%, color-mix(in srgb, var(--color-paper) 86%, transparent) 36%, color-mix(in srgb, var(--color-paper) 30%, transparent) 72%)"
          }}
        />
        <div
          className="pointer-events-none relative mx-auto flex min-h-[60svh] max-w-7xl items-center px-5 pb-12 pt-10 will-change-transform sm:px-8 lg:min-h-[62svh]"
          style={{
            opacity: "var(--hero-copy-opacity, 1)",
            transform: "translate3d(0, var(--hero-copy-y, 0px), 0)"
          }}
        >
          <div className="max-w-3xl">
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
