import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        <p className="text-sm font-semibold uppercase tracking-normal text-fudan">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-base leading-7 text-muted">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
