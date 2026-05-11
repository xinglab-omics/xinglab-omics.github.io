import { Mail, MapPin } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PageIntro } from "@/components/PageIntro";
import type { ContactInfo } from "@/lib/content";

type ContactPageViewProps = {
  content: ContactInfo;
  copy: {
    htmlLang: string;
    eyebrow: string;
    title: string;
    description: string;
    applyTitle: string;
    contactTitle: string;
    emailLabel: string;
    alternateHref: string;
  };
};

export function ContactPageView({ content, copy }: ContactPageViewProps) {
  const [joinTextBeforeEmail, joinTextAfterEmail = ""] = content.joinText.split(content.email);
  const isChinese = copy.htmlLang.startsWith("zh");

  return (
    <div lang={copy.htmlLang} className={isChinese ? "font-cjk" : undefined}>
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        action={<LanguageToggle isChinese={isChinese} href={copy.alternateHref} />}
      />

      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-8 sm:px-8 lg:py-10">
        <section>
          <h2 className="text-2xl font-semibold tracking-normal text-ink">{copy.applyTitle}</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            {joinTextBeforeEmail}
            <a
              href={`mailto:${content.email}`}
              className="font-semibold text-fudan transition hover:text-ink"
            >
              {content.email}
            </a>
            {joinTextAfterEmail}
          </p>
          <div className="mt-8 grid gap-5">
            {content.applicationSections.map((section) => (
              <section key={section.title} className="rounded-md border border-line bg-white p-5">
                <h3 className="text-base font-semibold text-ink">{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{section.description}</p>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
                  {section.materials.map((material) => (
                    <li key={material} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fudan" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="border-t border-line pt-10">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">{copy.contactTitle}</h2>
          <div className="mt-6 grid gap-5 text-sm leading-7 text-muted">
            <div className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-fudan" />
              <div>
                <p className="font-semibold text-ink">{content.institution}</p>
                <p>{content.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-fudan" />
              <div>
                <p className="font-semibold text-ink">{copy.emailLabel}</p>
                <a href={`mailto:${content.email}`} className="transition hover:text-fudan">
                  {content.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
