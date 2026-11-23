import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, action }: PageIntroProps) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:py-11">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">{eyebrow}</p>
          {action}
        </div>
        <h1 className="mt-2.5 max-w-4xl text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl">
          {title}
        </h1>
        {description ? <p className="mt-3 max-w-4xl text-sm leading-7 text-muted sm:text-base">{description}</p> : null}
      </div>
    </section>
  );
}
