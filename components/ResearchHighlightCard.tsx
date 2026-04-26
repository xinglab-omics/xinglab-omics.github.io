import Link from "next/link";
import type { ResearchArea } from "@/lib/content";

type ResearchHighlightCardProps = {
  area: ResearchArea;
  index: number;
};

export function ResearchHighlightCard({ area, index }: ResearchHighlightCardProps) {
  return (
    <Link
      href={`/research#${area.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition hover:shadow-soft"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-fudan">0{index + 1}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-normal text-ink transition group-hover:text-fudan">
        {area.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{area.summary}</p>
    </Link>
  );
}
