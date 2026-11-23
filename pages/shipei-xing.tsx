import { Mail } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { PersonAvatar } from "@/components/PersonAvatar";
import { ProfileLinkIcon } from "@/components/ProfileLinkIcon";
import { piProfile } from "@/lib/content";
import type { ProfileEntry } from "@/lib/content";
import type { ProfileHonor } from "@/lib/content/types";

const subtleDetailLinkLabels = new Set(["Tao Huan", "Zhan Lu", "Feihe Huang"]);

function detailLinkClassName(label: string) {
  if (subtleDetailLinkLabels.has(label)) {
    return "font-medium text-muted underline decoration-line underline-offset-2 transition hover:text-fudan";
  }

  return "font-semibold text-fudan underline decoration-fudan/40 underline-offset-2 transition hover:text-ink";
}

function renderLinkedText(text: string, links: ProfileEntry["detailLinks"] = []) {
  if (links.length === 0) {
    return text;
  }

  const content = [];
  let cursor = 0;

  links.forEach((link) => {
    const index = text.indexOf(link.label, cursor);

    if (index === -1) {
      return;
    }

    if (index > cursor) {
      content.push(text.slice(cursor, index));
    }

    content.push(
      <a key={`${link.href}-${index}`} href={link.href} className={detailLinkClassName(link.label)}>
        {link.label}
      </a>
    );
    cursor = index + link.label.length;
  });

  if (cursor < text.length) {
    content.push(text.slice(cursor));
  }

  return content;
}

function renderEntryDetails(entry: ProfileEntry) {
  if (!entry.detail) {
    return entry.institution;
  }

  return (
    <>
      <span className="block">{entry.institution}</span>
      <span className="block">{renderLinkedText(entry.detail, entry.detailLinks)}</span>
    </>
  );
}

function renderServiceItem(item: string) {
  const servicePrefixes = ["Reviewer: ", "Editorial Board Member: "];
  const prefix = servicePrefixes.find((servicePrefix) => item.startsWith(servicePrefix));

  if (!prefix) {
    return item;
  }

  const journals = item
    .slice(prefix.length)
    .replace(", and ", ", ")
    .split(", ")
    .map((journal) => journal.trim())
    .filter(Boolean);

  return (
    <>
      <span className="block font-semibold text-ink">{prefix.trim()}</span>
      <span className="mt-1.5 block">
        {journals.map((journal, index) => (
          <span key={journal} className="inline-block whitespace-nowrap">
            {journal}
            {index < journals.length - 1 ? <span className="mx-2.5 text-line">|</span> : null}
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
  const honors: ProfileHonor[] = piProfile.honors;
  const hasBio = Boolean(piProfile.bio);

  return (
    <>
      <PageIntro
        eyebrow="Principal Investigator"
        title={piProfile.name}
        description={piProfile.title}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:py-12">
        <aside className="rounded-lg border border-line bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-4">
            <PersonAvatar name={piProfile.name} image={piProfile.image} size="xl" priority />
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold tracking-[-0.015em] text-ink">
                {piProfile.name}
                {piProfile.chineseName ? (
                  <span lang="zh-Hans" className="font-cjk ml-2.5 text-lg font-normal text-muted">
                    {piProfile.chineseName}
                  </span>
                ) : null}
              </h2>
              <p className="mt-1 text-xs font-medium leading-5 text-muted">
                Assistant Professor, Fudan University
              </p>
            </div>
          </div>

          <nav
            aria-label="Profile links"
            className="mt-5 grid gap-2.5 border-t border-line pt-5 text-sm"
          >
            <a
              href={`mailto:${piProfile.email}`}
              className="inline-flex items-center gap-2.5 font-semibold text-fudan transition hover:text-ink"
            >
              <Mail aria-hidden="true" size={16} className="shrink-0" />
              <span className="break-all">{piProfile.email}</span>
            </a>
            {piProfile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2.5 font-semibold text-fudan transition hover:text-ink"
              >
                <ProfileLinkIcon label={link.label} />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="grid min-w-0 gap-6">
          {hasBio ? (
            <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">01</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h2 className="mt-3.5 text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
                Biography
              </h2>
              <p className="mt-3.5 text-sm leading-7 text-muted sm:text-base sm:leading-7">{piProfile.bio}</p>
            </section>
          ) : null}

          <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">
                {hasBio ? "02" : "01"}
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <h2 className="mt-3.5 text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
              Appointments & Education
            </h2>
            <div className="mt-5 grid gap-4">
              {experienceAndEducation.map((entry) => (
                <article key={`${entry.period}-${entry.institution}`} className="border-l-2 border-fudan pl-4">
                  <p className="text-sm font-semibold text-ink">
                    <span className="tabular-nums">{entry.period}</span>
                    <span className="mx-2 text-line">|</span>
                    <span className="text-ink">{entry.title}</span>
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">{renderEntryDetails(entry)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">
                {hasBio ? "03" : "02"}
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <h2 className="mt-3.5 text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
              Selected Honors & Awards
            </h2>
            <ul className="mt-5 divide-y divide-line/70 text-sm leading-6 text-muted">
              {honors.map((honor) => (
                <li
                  key={`${honor.year}-${honor.title}`}
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="font-semibold tabular-nums text-fudan">{honor.year}</span>
                  <span className={honor.highlight ? "font-semibold text-ink" : undefined}>
                    <span className="block text-ink/90">{honor.title}</span>
                    {honor.chineseTitle ? (
                      <span lang="zh-Hans" className="font-cjk mt-0.5 block text-muted">
                        {honor.chineseTitle}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">
                {hasBio ? "04" : "03"}
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <h2 className="mt-3.5 text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">Service</h2>
            <ul className="guide-bullets mt-5 grid gap-3 text-sm leading-6 text-muted">
              {serviceItems.map(({ item, content }) => (
                <li key={item}>{content}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };
