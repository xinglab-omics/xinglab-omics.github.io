"use client";

import { staticPageHref } from "@/lib/site-paths";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useAutoAdvance } from "@/lib/use-auto-advance";

type NewsTickerProps = {
  items: { title: string; summary: string; dateLabel: string; href: string }[];
};

export function NewsTicker({ items }: NewsTickerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);
  const nextItem = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length);
  }, [items.length]);
  useAutoAdvance(section, items.length > 1 && !paused, 3000, nextItem);

  if (items.length === 0) {
    return null;
  }

  const item = items[activeIndex];

  return (
    <section
      ref={section}
      className="border-b border-line bg-white"
      aria-label="Latest news"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto grid min-h-[220px] max-w-7xl gap-4 overflow-hidden px-5 py-5 sm:px-8 lg:min-h-[116px] lg:grid-cols-[160px_minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="eyebrow">Latest News</p>
          <p className="mt-1 text-xs tabular-nums text-muted">{item.dateLabel}</p>
        </div>

        <div className="flex min-h-20 min-w-0 flex-col justify-center overflow-hidden lg:min-h-16">
          <p className="h-6 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-6 text-ink">
            <a href={item.href} className="transition hover:text-fudan">
              {item.title}
            </a>
          </p>
          <p className="mt-1 h-12 overflow-hidden text-sm leading-6 text-muted">{item.summary}</p>
        </div>

        <div className="flex flex-col items-center gap-3 lg:justify-self-end">
          <div className="flex items-center gap-2">
            {items.map((newsItem, index) => (
              <button
                key={newsItem.href}
                type="button"
                className={`size-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-fudan" : "bg-line hover:bg-muted"
                }`}
                aria-label={`Show news item ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <a
            href={staticPageHref("/news")}
            className="editorial-link group shrink-0"
          >
            <span>View all news</span>
            <ArrowRight aria-hidden="true" size={14} className="transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
