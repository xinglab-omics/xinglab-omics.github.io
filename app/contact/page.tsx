import { Mail, MapPin } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { contactInfo } from "@/lib/content";

export default function ContactPage() {
  const [joinTextBeforeEmail, joinTextAfterEmail = ""] = contactInfo.joinText.split(contactInfo.email);

  return (
    <>
      <PageIntro
        eyebrow="Join Us"
        title="Connect with Xing Lab"
        description="We welcome conversations with motivated students and researchers interested in mass spectrometry and/or metabolomics."
      />

      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-8 sm:px-8 lg:py-8">
        <section>
          {/* <h2 className="text-2xl font-semibold tracking-normal text-ink">Join Us</h2> */}
          <p className="mt-4 text-base leading-8 text-muted">
            {joinTextBeforeEmail}
            <a
              href={`mailto:${contactInfo.email}`}
              className="font-semibold text-fudan transition hover:text-ink"
            >
              {contactInfo.email}
            </a>
            {joinTextAfterEmail}
          </p>
          <div className="mt-8 grid gap-5">
            {contactInfo.applicationSections.map((section) => (
              <section key={section.title} className="rounded-md border border-line bg-paper p-5">
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
          <h2 className="text-2xl font-semibold tracking-normal text-ink">Contact</h2>
          <div className="mt-6 grid gap-5 text-sm leading-7 text-muted">
            <div className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-fudan" />
              <div>
                <p className="font-semibold text-ink">{contactInfo.institution}</p>
                <p>{contactInfo.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-fudan" />
              <div>
                <p className="font-semibold text-ink">Email</p>
                <a href={`mailto:${contactInfo.email}`} className="transition hover:text-fudan">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
