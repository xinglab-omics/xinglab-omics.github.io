import type { ResearchArea } from "@/lib/content";

type ResearchHighlightCardProps = {
  area: ResearchArea;
  index: number;
};

export function ResearchHighlightCard({ area, index }: ResearchHighlightCardProps) {
  return (
    <article className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-fudan">0{index + 1}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h3 className="mt-0 flex text-2xl font-semibold tracking-normal text-ink md:min-h-20 md:items-center">
        {area.title}
      </h3>
      <p className="mt-1 flex-1 text-sm leading-7 text-muted">{area.shortDescription}</p>
    </article>
  );
}
