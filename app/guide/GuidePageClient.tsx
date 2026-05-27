import { BookOpen, ChevronRight, FileText } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { guideContent, type GuideContent, type GuideSection, type GuideTextPart } from "@/lib/content/guide";
import { withBasePath } from "@/lib/site-paths";

function sectionNumber(index: number, sectionId: string, firstSectionId?: string) {
  if ((sectionId === "acknowledgment" || sectionId === "translation-note") && index === 0) {
    return "0";
  }

  const hasZeroPreface = firstSectionId === "acknowledgment" || firstSectionId === "translation-note";
  const offset = hasZeroPreface ? 0 : 1;
  return String(index + offset).padStart(2, "0");
}

type GuideText = string | GuideTextPart[];

function renderTextParts(parts: GuideTextPart[], keyPrefix: string) {
  return parts.map((part, index) => {
    if (typeof part === "string") {
      return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
    }

    if ("strong" in part) {
      return (
        <strong key={`${keyPrefix}-strong-${index}`} className="font-semibold text-ink">
          {part.text}
        </strong>
      );
    }

    return (
      <a
        key={`${keyPrefix}-link-${part.href}`}
        href={part.href.startsWith("/") ? withBasePath(part.href) : part.href}
        target="_blank"
        rel="noreferrer"
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
    <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
      {items.map((item, index) => (
        <li key={typeof item === "string" ? item : `guide-list-${index}`} className="flex gap-3">
          <ChevronRight aria-hidden="true" className="mt-1.5 size-3.5 shrink-0 text-fudan" />
          <span>
            <GuideTextInline value={item} keyPrefix={`guide-list-${index}`} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function GuideParagraph({ paragraph }: { paragraph: GuideText }) {
  if (typeof paragraph === "string") {
    return <p className="mt-4 text-base leading-8 text-muted">{paragraph}</p>;
  }

  return <p className="mt-4 text-base leading-8 text-muted">{renderTextParts(paragraph, "paragraph")}</p>;
}

function GuideBlocks({ blocks }: { blocks?: GuideSection["blocks"] }) {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className="mt-6 grid gap-4">
      {blocks.map((block) => (
        <section key={block.title} className="rounded-md border border-line bg-white p-5">
          <h3 className="text-base font-semibold text-ink">{block.title}</h3>
          {block.body ? (
            <p className="mt-3 text-sm leading-7 text-muted">
              <GuideTextInline value={block.body} keyPrefix={`${block.title}-body`} />
            </p>
          ) : null}
          <GuideList items={block.bullets} />
          {block.subblocks?.length ? (
            <div className="mt-5 grid gap-5 border-t border-line pt-5">
              {block.subblocks.map((subblock) => (
                <div key={subblock.title}>
                  <h4 className="text-sm font-semibold text-ink">{subblock.title}</h4>
                  {subblock.body ? (
                    <p className="mt-3 text-sm leading-7 text-muted">
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
    <div className="mt-6 grid gap-4">
      {resources.map((resource) => (
        <section
          key={resource.id}
          id={resource.id}
          className="scroll-mt-28 rounded-md border border-line bg-white p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                <FileText aria-hidden="true" className="size-4 shrink-0 text-fudan" />
                {resource.title}
              </h3>
              {resource.body ? (
                <p className="mt-3 text-sm leading-7 text-muted">
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
  numberLabel: string;
}) {
  return (
    <section id={section.id} className="scroll-mt-28 border-b border-line pb-10 last:border-b-0">
      <div className="flex items-baseline gap-3">
        <p className="text-sm font-semibold text-fudan">{numberLabel}</p>
        <h2 className="text-2xl font-semibold tracking-normal text-ink sm:text-3xl">{section.title}</h2>
      </div>
      {section.deck ? <p className="mt-3 text-base leading-7 text-muted">{section.deck}</p> : null}
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
  const firstSectionId = guide.sections[0]?.id;
  const htmlLang = guide.htmlLang ?? "en";
  const isChinese = htmlLang.startsWith("zh");

  return (
    <div lang={htmlLang} className={isChinese ? "font-cjk" : undefined}>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-normal text-fudan">{guide.eyebrow}</p>
            {guide.alternateHref ? (
              <LanguageToggle isChinese={isChinese} href={guide.alternateHref} />
            ) : null}
          </div>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-5xl text-base leading-7 text-muted">{guide.description}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav className="rounded-md border border-line bg-white p-4 shadow-sm" aria-label={guide.tocTitle}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <BookOpen aria-hidden="true" className="size-4 text-fudan" />
              {guide.tocTitle}
            </div>
            <ol className="grid gap-1">
              {guide.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-2 rounded-md px-2 py-2 text-sm leading-5 text-muted transition hover:bg-paper hover:text-ink"
                  >
                    <span className="font-semibold text-fudan">
                      {sectionNumber(index, section.id, firstSectionId)}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="grid gap-10">
          {guide.sections.map((section, index) => (
            <GuideSectionView
              key={section.id}
              section={section}
              numberLabel={sectionNumber(index, section.id, firstSectionId)}
            />
          ))}
        </article>
      </section>
    </div>
  );
}
