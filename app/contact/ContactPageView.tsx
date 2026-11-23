import { ArrowRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PageIntro } from "@/components/PageIntro";
import type { ContactInfo } from "@/lib/content";
import { staticPageHref } from "@/lib/site-paths";

export type ContactPageCopy = {
  htmlLang: string;
  eyebrow: string;
  title: string;
  description: string;
  applyTitle: string;
  subjectLabel: string;
  examplePrefix: string;
  copyLabel: string;
  copiedLabel: string;
  includeTitle: string;
  roleNotesTitle: string;
  contactTitle: string;
  emailLabel: string;
  locationLabel: string;
  emailCtaLabel: string;
  exploreTitle: string;
  exploreDescription: string;
  exploreLinks: {
    label: string;
    href: string;
  }[];
  alternateHref: string;
};

type ContactPageViewProps = {
  content: ContactInfo;
  copy: ContactPageCopy;
};

const copySubjectScript = `{
  const button = document.getElementById("copy-subject-format");
  if (button) {
    let resetTimer;
    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch {}
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {}
      document.body.removeChild(textarea);
      return ok;
    }
    button.addEventListener("click", async () => {
      const ok = await copyText(button.dataset.copyText || "");
      if (!ok) return;
      button.dataset.copied = "true";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        delete button.dataset.copied;
      }, 2000);
    });
  }
}`;

export function ContactPageView({ content, copy }: ContactPageViewProps) {
  const [introBeforeEmail, introAfterEmail = ""] = content.applyIntro.split(content.email);
  const isChinese = copy.htmlLang.startsWith("zh");
  const mailtoHref = `mailto:${content.email}?subject=${encodeURIComponent(content.subjectFormat)}`;

  return (
    <div lang={copy.htmlLang} className={isChinese ? "font-cjk" : undefined}>
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        action={<LanguageToggle isChinese={isChinese} href={copy.alternateHref} />}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:py-12">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">01</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <h2 className="mt-3.5 text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">{copy.applyTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base sm:leading-7">
            {introBeforeEmail}
            <a href={mailtoHref} className="font-semibold text-fudan transition hover:text-ink">
              {content.email}
            </a>
            {introAfterEmail}
          </p>

          <div className="mt-5 rounded-md border border-line bg-paper px-4 py-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="eyebrow">{copy.subjectLabel}</p>
              <button
                id="copy-subject-format"
                type="button"
                data-copy-text={content.subjectFormat}
                className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold text-muted transition hover:border-fudan hover:text-fudan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
              >
                <Copy aria-hidden="true" size={12} className="group-data-[copied=true]:hidden" />
                <Check aria-hidden="true" size={12} className="hidden text-fudan group-data-[copied=true]:block" />
                <span className="group-data-[copied=true]:hidden">{copy.copyLabel}</span>
                <span className="hidden text-fudan group-data-[copied=true]:inline">{copy.copiedLabel}</span>
              </button>
            </div>
            <p className="mt-2 font-mono text-xs font-medium text-ink sm:text-sm">{content.subjectFormat}</p>
            <p className="mt-1.5 text-xs leading-5 text-muted">
              {copy.examplePrefix} <span className="text-ink/80">{content.subjectExample}</span>
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-ink">{copy.includeTitle}</h3>
            <ul className="guide-bullets mt-3 grid gap-2.5 text-sm leading-7 text-muted">
              {content.sharedChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-line pt-7">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">02</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <h2 className="mt-3.5 text-xl font-semibold tracking-[-0.015em] text-ink">{copy.roleNotesTitle}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {content.roleNotes.map((item) => (
                <section key={item.role} className="border-l-2 border-line pl-4">
                  <h3 className="text-sm font-semibold text-ink">{item.role}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{item.note}</p>
                </section>
              ))}
            </div>
          </div>
        </article>

        <aside className="grid gap-5 lg:sticky lg:top-28">
          <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <p className="eyebrow">{copy.contactTitle}</p>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-muted">
              <div className="flex gap-3">
                <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-fudan" />
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{copy.emailLabel}</p>
                  <a
                    href={`mailto:${content.email}`}
                    className="break-all font-medium text-fudan transition hover:text-ink"
                  >
                    {content.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-fudan" />
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{copy.locationLabel}</p>
                  <p>{content.institution}</p>
                  <p>{content.address}</p>
                </div>
              </div>
            </div>
            <a
              href={mailtoHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-fudan bg-fudan px-4 py-2.5 text-xs font-semibold text-white transition hover:border-ink hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
            >
              <Mail aria-hidden="true" size={14} />
              {copy.emailCtaLabel}
            </a>
          </section>

          <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <p className="eyebrow">{copy.exploreTitle}</p>
            <p className="mt-2.5 text-sm leading-6 text-muted">{copy.exploreDescription}</p>
            <nav className="mt-4 divide-y divide-line border-t border-line">
              {copy.exploreLinks.map((link) => (
                <a
                  key={link.href}
                  href={staticPageHref(link.href)}
                  className="group flex items-center justify-between gap-3 py-3 text-sm font-semibold text-ink transition first:pt-3 last:pb-0 hover:text-fudan"
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    aria-hidden="true"
                    size={15}
                    className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-fudan"
                  />
                </a>
              ))}
            </nav>
          </section>
        </aside>
      </section>

      <script dangerouslySetInnerHTML={{ __html: copySubjectScript }} />
    </div>
  );
}
