import { PageIntro } from "@/components/PageIntro";
import { ResearchIntroPanel } from "@/components/ResearchIntroPanel";
import { researchAreas, researchDirectionsIntro, researchDirectionsQuestion } from "@/lib/content";

export default function ResearchPage() {
  return (
    <>
      <PageIntro
        eyebrow="Research"
        title="Metabolomics & Xenobiotic Metabolism"
        description="We aim to map the small molecules in our bodies and understand how food, microbes, and the environment shape them."
      />

      <section className="grid gap-4 px-5 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <ResearchIntroPanel intro={researchDirectionsIntro} question={researchDirectionsQuestion} />
        </div>

        {researchAreas.map((area, index) => (
          <article
            key={area.slug}
            id={area.slug}
            className="mx-auto w-full max-w-7xl scroll-mt-28 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8 lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.75fr)] lg:items-start">
              <div>
                <p className="text-sm font-semibold text-fudan">0{index + 1}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
                  {area.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted">{area.longDescription}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-normal text-ink">Methods</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    {area.methods.map((method) => (
                      <li key={method} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fudan" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-normal text-ink">Questions</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    {area.questions.map((question) => (
                      <li key={question} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sage" />
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
