import { PageIntro } from "@/components/PageIntro";
import { members, piProfile, publications, type Publication } from "@/lib/content";

const publicationYears = Array.from(new Set(publications.map((publication) => publication.year)));
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
        title="All publications"
        description={
          googleScholarLink ? (
            <>
              For citation metrics and profile updates, please see{" "}
              <a href={googleScholarLink.href} className="font-semibold text-fudan transition hover:text-ink">
                Shipei Xing&apos;s Google Scholar
              </a>
              .
            </>
          ) : undefined
        }
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[120px_minmax(0,1fr)] lg:py-12">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
          <p className="text-xs font-semibold uppercase tracking-normal text-muted">Jump to</p>
          <nav className="mt-3 flex min-w-0 flex-wrap gap-2 lg:grid lg:gap-2">
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

        <div className="min-w-0">
          <p className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-line bg-white px-4 py-3 text-sm text-muted shadow-sm">
            <span className="font-semibold text-ink">Labels:</span>
            <span className="inline-flex items-baseline gap-1.5">
              <span className="font-semibold text-fudan">†</span>
              <span>co-first authors</span>
            </span>
            <span className="text-line">|</span>
            <span className="inline-flex items-baseline gap-1.5">
              <span className="font-semibold text-fudan">*</span>
              <span>corresponding author</span>
            </span>
          </p>

          {highlightedPublications.length > 0 ? (
            <section
              id="highlighted"
              className="mb-8 scroll-mt-28 overflow-hidden rounded-lg border border-line bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold tracking-normal text-ink">Highlighted papers</h2>
              <ol className="mt-4 divide-y divide-line">
                {highlightedPublications.map((publication, index) => (
                  <li
                    key={`highlighted-${publication.title}`}
                    className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[2rem_minmax(0,1fr)]"
                  >
                    <span className="text-sm font-semibold tabular-nums text-fudan">{index + 1}.</span>
                    <div className="min-w-0">
                      <a
                        href={publicationHref(publication)}
                        className="break-words text-sm leading-5 text-fudan transition hover:text-ink"
                      >
                        {publication.title}
                      </a>
                      <p className="mt-1.5 break-words text-sm leading-5 text-muted">{renderAuthors(publication)}</p>
                      <p className="mt-1 break-words text-sm leading-5 text-muted">{renderVenue(publication)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {publications.length > 0 ? (
            <section className="scroll-mt-28 overflow-hidden rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold tracking-normal text-ink">All publications</h2>
              <div className="mt-4 space-y-6">
                {publicationYears.map((year) => {
                  const yearPublications = publications.filter((publication) => publication.year === year);

                  return (
                    <section key={year} id={`year-${year}`} className="scroll-mt-28">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold tabular-nums text-ink">{year}</h3>
                        <span className="h-px flex-1 bg-sage/50" />
                      </div>
                      <ol className="mt-2 divide-y divide-line">
                        {yearPublications.map((publication) => {
                          const publicationIndex = publicationOrder.get(publication.title) ?? 0;
                          const publicationNumber = publications.length - publicationIndex;

                          return (
                            <li
                              key={`${publication.year}-${publication.title}`}
                              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 py-4 first:pt-2 last:pb-0"
                            >
                              <span className="text-sm font-semibold tabular-nums text-fudan">
                                {publicationNumber}.
                              </span>
                              <article id={publicationId(publication)} className="min-w-0 scroll-mt-28">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <h2 className="break-words text-sm leading-5 text-fudan">
                                      {publication.url ? (
                                        <a href={publicationHref(publication)} className="transition hover:text-ink">
                                          {publication.title}
                                        </a>
                                      ) : (
                                        publication.title
                                      )}
                                    </h2>
                                    <p className="mt-1.5 break-words text-sm leading-5 text-muted">
                                      {renderAuthors(publication)}
                                    </p>
                                    <p className="mt-1 break-words text-sm leading-5 text-muted">
                                      {renderVenue(publication)}
                                    </p>
                                  </div>
                                  {isPreprint(publication) ? (
                                    <span className="w-fit shrink-0 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-fudan">
                                      Preprint
                                    </span>
                                  ) : null}
                                </div>
                              </article>
                            </li>
                          );
                        })}
                      </ol>
                    </section>
                  );
                })}
              </div>
            </section>
          ) : (
            <div className="rounded-lg border border-line bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">Publications coming soon</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">
                This page is ready for journal articles and preprints once the publication record is added.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
