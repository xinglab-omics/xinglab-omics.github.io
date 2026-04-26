import { ExternalLink, Mail } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { PersonAvatar } from "@/components/PersonAvatar";
import { piProfile } from "@/lib/content";
import type { ProfileEntry } from "@/lib/content";

function renderEntryDetails(entry: ProfileEntry) {
  return [entry.institution, entry.detail].filter(Boolean).join(". ");
}

function renderServiceItem(item: string) {
  const reviewerPrefix = "Reviewer: ";

  if (!item.startsWith(reviewerPrefix)) {
    return item;
  }

  const journals = item
    .slice(reviewerPrefix.length)
    .replace(", and ", ", ")
    .split(", ")
    .map((journal) => journal.trim())
    .filter(Boolean);

  return (
    <>
      Reviewer:
      <span className="ml-3">
        {journals.map((journal, index) => (
          <span key={journal}>
            {journal}
            {index < journals.length - 1 ? <span className="mx-3 text-line">|</span> : null}
          </span>
        ))}
      </span>
    </>
  );
}

export default function ShipeiXingPage() {
  const experienceAndEducation = [...piProfile.experience, ...piProfile.education];
  const serviceItems = piProfile.service.map((item) => ({
    item,
    content: renderServiceItem(item)
  }));

  return (
    <>
      <PageIntro
        eyebrow="Principal Investigator"
        title={piProfile.name}
      />

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-10 sm:px-8 lg:py-12">
        <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <PersonAvatar name={piProfile.name} image={piProfile.image} size="xl" />
            <div className="min-w-0">
              <h2 className="text-3xl font-semibold tracking-normal text-ink">
                {piProfile.name}
                {piProfile.chineseName ? (
                  <span lang="zh-Hans" className="font-cjk ml-3 text-xl font-normal text-muted">
                    {piProfile.chineseName}
                  </span>
                ) : null}
              </h2>
              <p className="mt-2 text-sm font-medium text-muted">{piProfile.title}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a
                  href={`mailto:${piProfile.email}`}
                  className="inline-flex items-center gap-2 font-semibold text-fudan transition hover:text-ink"
                >
                  <Mail aria-hidden="true" size={16} />
                  {piProfile.email}
                </a>
                {piProfile.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 font-semibold text-fudan transition hover:text-ink"
                  >
                    <ExternalLink aria-hidden="true" size={16} />
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">{piProfile.current}</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">Appointments and Education</h2>
          <div className="mt-5 grid gap-4">
            {experienceAndEducation.map((entry) => (
              <article key={`${entry.period}-${entry.institution}`} className="border-l-2 border-fudan pl-4">
                <p className="text-sm font-semibold text-fudan">
                  {entry.period}
                  <span className="mx-2 text-line">|</span>
                  <span className="text-ink">{entry.title}</span>
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">{renderEntryDetails(entry)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">Selected Honors</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
            {piProfile.honors.slice(0, 6).map((honor) => (
              <li key={honor} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fudan" />
                <span>{honor}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">Service</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
            {serviceItems.map(({ item, content }) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sage" />
                <span>{content}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}
