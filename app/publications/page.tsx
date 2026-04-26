import { PageIntro } from "@/components/PageIntro";
import { members, piProfile, publications, type Publication } from "@/lib/content";

const publicationYears = Array.from(new Set(publications.map((publication) => publication.year)));
const firstPublicationByYear = new Map<number, string>();
const publicationOrder = new Map(publications.map((publication, index) => [publication.title, index]));
const googleScholarLink = piProfile.links.find((link) => link.label === "Google Scholar");
const labMemberNames = new Set(
  members
    .filter((member) => member.name !== "Open Positions")
    .map((member) => member.name)
);
const highlightedPublicationOrder = new Map([
  ["BUDDY: molecular formula discovery via bottom-up MS/MS interrogation", 0],
  ["Navigating the conjugated metabolome", 1],
  ["Charting the undiscovered metabolome with synthetic multiplexing", 2],
  ["Structural annotation of full-scan MS data: A unified solution for LC-MS and MS imaging analyses", 3]
]);
const highlightedPublications = publications
  .filter((publication) => publication.highlighted)
  .sort((a, b) => {
    const priorityA = highlightedPublicationOrder.get(a.title);
    const priorityB = highlightedPublicationOrder.get(b.title);

    if (priorityA !== undefined || priorityB !== undefined) {
      if (priorityA === undefined) {
        return 1;
      }

      if (priorityB === undefined) {
        return -1;
      }

      return priorityA - priorityB;
    }

    if (a.year !== b.year) {
      return b.year - a.year;
    }

    return (publicationOrder.get(a.title) ?? 0) - (publicationOrder.get(b.title) ?? 0);
  });

publications.forEach((publication) => {
  if (!firstPublicationByYear.has(publication.year)) {
    firstPublicationByYear.set(publication.year, publication.title);
  }
});

function isPreprint(publication: Publication) {
  return publication.preprint;
}

function publicationId(publication: Publication) {
  return `publication-${publication.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function publicationHref(publication: Publication) {
  if (publication.url) {
    return publication.url;
  }

  if (publication.doi) {
    return `https://doi.org/${publication.doi}`;
  }

  return `#${publicationId(publication)}`;
}

function renderAuthorLabels(publication: Publication, author: string) {
  const labels = [];

  if (publication.coFirstAuthors?.some((name) => author.includes(name))) {
    labels.push("†");
  }

  if (publication.correspondingAuthors?.some((name) => author.includes(name))) {
    labels.push("*");
  }

  if (labels.length === 0) {
    return null;
  }

  return <span className="font-semibold text-fudan">{labels.join("")}</span>;
}

function renderAuthors(publication: Publication) {
  return publication.authors.split(", ").map((author, index) => {
    const isLabMember = Array.from(labMemberNames).some((name) => author.includes(name));

    return (
      <span key={`${publication.title}-${author}-${index}`}>
        {index > 0 ? ", " : null}
        <span className={isLabMember ? "font-semibold text-ink" : undefined}>{author}</span>
        {renderAuthorLabels(publication, author)}
      </span>
    );
  });
}

function renderVenue(publication: Publication) {
  const [journal, rest = ""] = publication.venue.split(/([,;].*)/);

  return (
    <>
      <strong className="font-semibold text-ink">{journal}</strong>
      {rest}
      {rest.endsWith(".") ? " " : ", "}
      {publication.year}
    </>
  );
}

export default function PublicationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Publications"
        title="Selected publications"
        description={
          googleScholarLink ? (
            <>
              For full publication list, please go to{" "}
              <a href={googleScholarLink.href} className="font-semibold text-fudan transition hover:text-ink">
                Shipei Xing&apos;s Google Scholar
              </a>
              .
            </>
          ) : undefined
        }
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[120px_1fr] lg:py-12">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-xs font-semibold uppercase tracking-normal text-muted">Jump to</p>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-2 lg:overflow-visible lg:pb-0">
            {highlightedPublications.length > 0 ? (
              <a
                href="#highlighted"
                className="rounded-full border border-fudan bg-fudan px-4 py-2 text-sm font-semibold text-white transition hover:border-ink hover:bg-ink lg:text-center"
              >
                Highlighted
              </a>
            ) : null}
            {publicationYears.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted transition hover:border-fudan hover:text-fudan lg:text-center"
              >
                {year}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          <p className="mb-4 rounded-lg border border-line bg-white px-4 py-3 text-sm text-muted shadow-sm">
            <span className="font-semibold text-ink">Labels:</span>{" "}
            <span className="inline-flex items-baseline gap-1.5">
              <span className="font-semibold text-fudan">†</span>
              <span>co-first authors</span>
            </span>
            <span className="mx-4 text-line">|</span>
            <span className="inline-flex items-baseline gap-1.5">
              <span className="font-semibold text-fudan">*</span>
              <span>corresponding author</span>
            </span>
          </p>

          {highlightedPublications.length > 0 ? (
            <section
              id="highlighted"
              className="mb-8 scroll-mt-28 rounded-lg border border-line bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold tracking-normal text-ink">Highlighted papers</h2>
              <ol className="mt-4 divide-y divide-line">
                {highlightedPublications.map((publication, index) => (
                  <li
                    key={`highlighted-${publication.title}`}
                    className="grid grid-cols-[2rem_1fr] items-baseline gap-2 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm font-semibold tabular-nums text-fudan">{index + 1}.</span>
                    <div>
                      <a
                        href={publicationHref(publication)}
                        className="text-sm leading-5 text-fudan transition hover:text-ink"
                      >
                        {publication.title}
                      </a>
                      <p className="mt-1.5 text-sm leading-5 text-muted">{renderAuthors(publication)}</p>
                      <p className="mt-1 text-sm leading-5 text-muted">{renderVenue(publication)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mb-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-line" />
            <h2 className="text-sm font-semibold uppercase tracking-normal text-muted">Selected publications</h2>
            <div className="h-px flex-1 bg-line" />
          </div>

          {publications.length > 0 ? (
            <div className="grid gap-4">
              {publications.map((publication) => {
                const isFirstInYear = firstPublicationByYear.get(publication.year) === publication.title;

                return (
                  <div
                    key={`${publication.year}-${publication.title}`}
                    id={isFirstInYear ? `year-${publication.year}` : undefined}
                    className="scroll-mt-28"
                  >
                    <article
                      id={publicationId(publication)}
                      className="scroll-mt-28 rounded-lg border border-line bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-sm leading-5 text-fudan">
                            {publication.url || publication.doi ? (
                              <a href={publicationHref(publication)} className="transition hover:text-ink">
                                {publication.title}
                              </a>
                            ) : (
                              publication.title
                            )}
                          </h2>
                          <p className="mt-1.5 text-sm leading-5 text-muted">{renderAuthors(publication)}</p>
                          <p className="mt-1 text-sm leading-5 text-muted">{renderVenue(publication)}</p>
                        </div>
                        {isPreprint(publication) ? (
                          <span className="w-fit shrink-0 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-fudan">
                            Preprint
                          </span>
                        ) : null}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-line bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">Publications coming soon</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">
                This page is ready for journal articles, preprints, and selected work once the lab record is added.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
