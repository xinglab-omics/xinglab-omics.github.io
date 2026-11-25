import { BookOpen, FileText } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PageIntro } from "@/components/PageIntro";
import { guideContent, type GuideContent, type GuideSection, type GuideTextPart } from "@/lib/content/guide";
import { staticPageHref, withBasePath } from "@/lib/site-paths";

function getSectionNumbers(sections: GuideSection[]): (string | null)[] {
  let count = 0;
  return sections.map((section) => {
    if (section.unnumbered || section.id === "acknowledgment" || section.id === "translation-note") {
      return null;
    }

    count += 1;
    return String(count).padStart(2, "0");
  });
}

function isInternalPageHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return false;
  }

  const path = href.split(/[?#]/)[0];
  return !/\/[^/]+\.[^/]+$/.test(path);
}

type GuideText = string | GuideTextPart[];

function renderTextParts(parts: GuideTextPart[], keyPrefix: string) {
  return parts.map((part, index) => {
    if (typeof part === "string") {
      return part;
    }

    if ("strong" in part) {
      return (
        <strong key={`${keyPrefix}-strong-${index}`} className="font-semibold text-ink">
          {part.text}
        </strong>
      );
    }

    const internalPage = isInternalPageHref(part.href);
    const resolvedHref = internalPage
      ? staticPageHref(part.href)
      : part.href.startsWith("/")
        ? withBasePath(part.href)
        : part.href;

    return (
      <a
        key={`${keyPrefix}-link-${index}-${part.href}`}
        href={resolvedHref}
        target={internalPage ? undefined : "_blank"}
        rel={internalPage ? undefined : "noreferrer"}
        className="font-semibold text-fudan transition hover:text-ink"
      >
        {part.label}
      </a>
    );
  });
}

function GuideTextInline({ value, keyPrefix }: { value: GuideText; keyPrefix: string }) {
  if (typeof value === "string") {
    return <>{value}</>;
  }

  return <>{renderTextParts(value, keyPrefix)}</>;
}

function GuideList({ items }: { items?: GuideText[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="guide-bullets mt-3.5 grid gap-2 text-sm leading-6 text-muted">
      {items.map((item, index) => (
        <li key={index}>
          <GuideTextInline value={item} keyPrefix={`guide-list-${index}`} />
        </li>
      ))}
    </ul>
  );
}

function GuideParagraph({ paragraph }: { paragraph: GuideText }) {
  if (typeof paragraph === "string") {
    return <p className="mt-3 text-sm leading-6 text-muted sm:text-[15px] sm:leading-[1.65]">{paragraph}</p>;
  }

  return (
    <p className="mt-3 text-sm leading-6 text-muted sm:text-[15px] sm:leading-[1.65]">
      {renderTextParts(paragraph, "paragraph")}
    </p>
  );
}

function GuideBlocks({ blocks }: { blocks?: GuideSection["blocks"] }) {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-3.5">
      {blocks.map((block) => (
        <section key={block.title} className="rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-base font-semibold text-ink">{block.title}</h3>
          {block.body ? (
            <p className="mt-2 text-sm leading-6 text-muted">
              <GuideTextInline value={block.body} keyPrefix={`${block.title}-body`} />
            </p>
          ) : null}
          <GuideList items={block.bullets} />
          {block.subblocks?.length ? (
            <div className="mt-4 grid gap-4 border-t border-line pt-4">
              {block.subblocks.map((subblock) => (
                <div key={subblock.title}>
                  <h4 className="text-sm font-semibold text-ink">{subblock.title}</h4>
                  {subblock.body ? (
                    <p className="mt-2 text-sm leading-6 text-muted">
                      <GuideTextInline value={subblock.body} keyPrefix={`${subblock.title}-body`} />
                    </p>
                  ) : null}
                  <GuideList items={subblock.bullets} />
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function GuideResources({ resources }: { resources?: GuideSection["resources"] }) {
  if (!resources?.length) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-3.5">
      {resources.map((resource) => (
        <section
          key={resource.id}
          id={resource.id}
          className="scroll-mt-28 rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                <FileText aria-hidden="true" className="size-4 shrink-0 text-fudan" />
                {resource.title}
              </h3>
              {resource.body ? (
                <p className="mt-2 text-sm leading-6 text-muted">
                  <GuideTextInline value={resource.body} keyPrefix={`${resource.title}-body`} />
                </p>
              ) : null}
            </div>
            {resource.href ? (
              <a
                href={resource.href.startsWith("/") ? withBasePath(resource.href) : resource.href}
                download={resource.href.startsWith("/") ? true : undefined}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-fudan px-4 py-2 text-xs font-semibold text-white transition hover:bg-ink"
              >
                {resource.actionLabel ?? "Download"}
              </a>
            ) : resource.status ? (
              <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-muted">
                {resource.status}
              </span>
            ) : null}
          </div>
          <GuideList items={resource.bullets} />
        </section>
      ))}
    </div>
  );
}

function GuideSectionView({
  section,
  numberLabel
}: {
  section: GuideSection;
  numberLabel: string | null;
}) {
  return (
    <section id={section.id} className="scroll-mt-28">
      {numberLabel ? (
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">{numberLabel}</p>
          <span className="h-px flex-1 bg-line" />
        </div>
      ) : null}
      <h2
        className={`${numberLabel ? "mt-2.5" : ""} text-2xl font-semibold tracking-[-0.015em] text-ink sm:text-[26px]`}
      >
        {section.title}
      </h2>
      {section.deck ? (
        <p className="mt-2.5 text-sm leading-6 text-muted sm:text-[15px] sm:leading-[1.65]">{section.deck}</p>
      ) : null}
      {section.paragraphs?.map((paragraph, paragraphIndex) => (
        <GuideParagraph
          key={typeof paragraph === "string" ? paragraph : `${section.id}-${paragraphIndex}`}
          paragraph={paragraph}
        />
      ))}
      <GuideList items={section.bullets} />
      <GuideBlocks blocks={section.blocks} />
      <GuideResources resources={section.resources} />
    </section>
  );
}

export function GuidePageClient({ content = guideContent }: { content?: GuideContent }) {
  const guide = content;
  const sectionNumbers = getSectionNumbers(guide.sections);
  const htmlLang = guide.htmlLang ?? "en";
  const isChinese = htmlLang.startsWith("zh");

  return (
    <div lang={htmlLang} className={isChinese ? "font-cjk" : undefined}>
      <PageIntro
        eyebrow={guide.eyebrow}
        title={guide.title}
        description={guide.description}
        action={
          guide.alternateHref ? (
            <LanguageToggle isChinese={isChinese} href={guide.alternateHref} />
          ) : undefined
        }
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav className="rounded-lg border border-line bg-white p-4 shadow-sm" aria-label={guide.tocTitle}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <BookOpen aria-hidden="true" className="size-4 text-fudan" />
              {guide.tocTitle}
            </div>
            <ol className="grid gap-0.5">
              {guide.sections.map((section, index) => {
                const numberLabel = sectionNumbers[index];
                const isFirstUnnumberedAfterNumbered =
                  !numberLabel && index > 0 && sectionNumbers[index - 1] !== null;

                return (
                  <li
                    key={section.id}
                    className={isFirstUnnumberedAfterNumbered ? "mt-1.5 border-t border-line pt-1.5" : undefined}
                  >
                    <a
                      href={`#${section.id}`}
                      className="flex gap-2 rounded-md px-2 py-1.5 text-sm leading-5 text-muted transition hover:bg-paper hover:text-ink"
                    >
                      {numberLabel ? (
                        <span className="w-5 shrink-0 font-semibold tabular-nums text-fudan">{numberLabel}</span>
                      ) : null}
                      <span>{section.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <article className="grid gap-8">
          {guide.notice ? (
            <aside className="rounded-lg border border-line bg-paper px-4 py-3 text-sm leading-6 text-muted">
              <GuideTextInline value={guide.notice} keyPrefix="guide-notice" />
            </aside>
          ) : null}
          {guide.sections.map((section, index) => (
            <GuideSectionView key={section.id} section={section} numberLabel={sectionNumbers[index]} />
          ))}
        </article>
      </section>
    </div>
  );
}
