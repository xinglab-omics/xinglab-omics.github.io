import type { ResearchArea } from "@/lib/content";

type ResearchHighlightCardProps = {
  area: ResearchArea;
  index: number;
};

export function ResearchHighlightCard({ area, index }: ResearchHighlightCardProps) {
  return (
    <article className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-fudan">0{index + 1}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-7 tracking-[-0.015em] text-ink xl:whitespace-nowrap xl:text-xl xl:leading-8">
        {area.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-7 text-muted">{area.shortDescription}</p>
    </article>
  );
}
